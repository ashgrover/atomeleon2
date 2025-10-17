CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE org_type AS ENUM ('company', 'agency', 'startup', 'nonprofit', 'educational', 'government', 'none');

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    public_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    org_type org_type NOT NULL DEFAULT 'none'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE integration_type AS ENUM (
    'none',
    'github',
    'jira',
    'bitbucket',
    'gitlab'
);

CREATE TABLE organizations_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    integration_type integration_type NOT NULL DEFAULT 'none',
    external_installation_id TEXT,                -- GitHub installation ID (unique per org)
    metadata JSONB DEFAULT '{}'::JSONB,  -- any provider-specific details
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE user_role AS ENUM ('admin', 'pm', 'contractor');

CREATE TABLE user_organizations (
    public_id TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'contractor',  -- 'admin', 'pm', 'contractor',
    hourly_rate DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY(user_id, organization_id)
);

CREATE TYPE project_status AS ENUM ('active','completed','archived');

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    public_id TEXT UNIQUE NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status project_status DEFAULT 'active', -- 'active', 'completed', 'archived',
    budget DECIMAL(10,2),
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    repo_url TEXT,
    org_integration_id UUID REFERENCES organizations_integrations(id) ON DELETE SET NULL
);


CREATE TABLE user_projects (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, user_id)
);

CREATE TABLE labels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(project_id, name) -- prevents duplicates per project
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    public_id TEXT UNIQUE NOT NULL,
    external_id TEXT,
    external_key TEXT,
    external_url TEXT,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT,
    status TEXT DEFAULT 'todo',       -- 'todo', 'in_progress', 'done',
    estimated_hours DECIMAL(10,2),
    actual_hours DECIMAL(10,2),
    priority TEXT,
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE task_labels (
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    label_id UUID NOT NULL REFERENCES labels(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, label_id)
);

CREATE TABLE task_assignees (
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    PRIMARY KEY (task_id, user_id)
);


CREATE TABLE time_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    log_date TIMESTAMPTZ NOT NULL,
    hours DECIMAL(10,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE timesheet_status AS ENUM ('draft', 'submitted', 'approved', 'rejected');

CREATE TABLE timesheets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    public_id TEXT UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    status timesheet_status DEFAULT 'draft',
    submitted_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    rejected_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, organization_id, start_date),
    CHECK(end_date > start_date)
);

CREATE TABLE timesheet_entry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    timesheet_id UUID NOT NULL REFERENCES timesheets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    entry_date TIMESTAMPTZ NOT NULL,
    hours_logged DECIMAL(10,2) NOT NULL,
    UNIQUE(timesheet_id, user_id, task_id, entry_date)
);

-- Indexes
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_labels_project_id ON labels(project_id);
CREATE INDEX idx_task_labels_label_id ON task_labels(label_id);
CREATE INDEX idx_task_labels_task_id ON task_labels(task_id);
CREATE INDEX idx_time_logs_task_id ON time_logs(task_id);
CREATE INDEX idx_time_logs_user_id ON time_logs(user_id);
CREATE INDEX idx_timesheets_user_id ON timesheets(user_id);
CREATE INDEX idx_timesheet_entry_timesheet_id ON timesheet_entry(timesheet_id);


CREATE OR REPLACE FUNCTION cleanup_user_projects_on_project_org_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete user_project links where user no longer belongs to the new org
    DELETE FROM user_projects
    WHERE project_id = NEW.id
      AND user_id NOT IN (
          SELECT user_id
          FROM user_organizations
          WHERE organization_id = NEW.organization_id
      );

    -- -- Update the organization_id in user_projects for remaining users
    -- UPDATE user_projects
    -- SET organization_id = NEW.organization_id
    -- WHERE project_id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_cleanup_user_projects_on_project_org_change
AFTER UPDATE OF organization_id ON projects
FOR EACH ROW
EXECUTE FUNCTION cleanup_user_projects_on_project_org_change();


-- uuidv7 function, from: https://gist.github.com/kjmph/5bd772b2c2df145aa645b837da7eca74
create or replace function uuid_generate_v7()
returns uuid
language plpgsql
volatile
set search_path = ''
as $$
begin
  -- use random v4 uuid as starting point (which has the same variant we need)
  -- then overlay timestamp
  -- then set version 7 by flipping the 2 and 1 bit in the version 4 string
  return encode(
    set_bit(
      set_bit(
        overlay(uuid_send(gen_random_uuid())
                placing substring(int8send(floor(extract(epoch from clock_timestamp()) * 1000)::bigint) from 3)
                from 1 for 6
        ),
        52, 1
      ),
      53, 1
    ),
    'hex')::uuid;
end
$$;


-- For later
ALTER TABLE user_projects
  ADD CONSTRAINT fk_user_projects_project_org
    FOREIGN KEY (project_id, organization_id)
    REFERENCES projects(id, organization_id)
    ON DELETE CASCADE
    DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE user_projects
  ADD CONSTRAINT fk_user_projects_user_org
    FOREIGN KEY (user_id, organization_id)
    REFERENCES user_organizations(user_id, organization_id)
    ON DELETE CASCADE
    DEFERRABLE INITIALLY DEFERRED;

