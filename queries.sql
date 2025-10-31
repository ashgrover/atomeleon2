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
    org_name TEXT NOT NULL,
    org_type org_type NOT NULL DEFAULT 'none'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE data_provider AS ENUM (
    'none',
    'github',
    'jira',
    'bitbucket',
    'gitlab'
);

CREATE TABLE organizations_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    data_provider data_provider NOT NULL DEFAULT 'none',
    external_installation_id TEXT,                -- GitHub installation ID (unique per org)
    metadata jsonb default '{}'::jsonb,
    connected_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TYPE user_role AS ENUM ('admin', 'pm', 'contractor');

CREATE TABLE user_organizations (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'contractor',  -- 'admin', 'pm', 'contractor',
    hourly_rate DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY(user_id, organization_id)
);

CREATE TYPE project_status AS ENUM ('active','completed','archived');

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    public_id TEXT UNIQUE NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    proj_name TEXT NOT NULL,
    proj_desc TEXT,
    status project_status DEFAULT 'active', -- 'active', 'completed', 'archived',
    budget DECIMAL(10,2) DEFAULT 0,
    start_date TIMESTAMPTZ DEFAULT now(),
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
);

CREATE TABLE project_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    org_integration_id UUID NOT NULL REFERENCES organizations_integrations(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES organizations_integrations(id) ON DELETE CASCADE,
    external_resource_name TEXT,
    external_resource_id TEXT,
    external_resource_url TEXT,
    metadata jsonb default '{}'::jsonb,
    connected_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    unique (project_id, org_integration_id)
)


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

-- Create Org function
create or replace function create_org (
    public_id text,
    org_name text, 
    org_type org_type
)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  org_id uuid; 
begin
  insert into public.organizations(public_id, org_name, org_type)
  values (public_id, org_name, org_type)
  returning id into org_id;

  insert into public.user_organizations(user_id, organization_id, role)
  values(auth.uid(), org_id, 'admin');
  return true;

  exception
    when others then
      raise exception 'Insert failed: %', sqlerrm;
      return false;
end;
$$;



-- Create Project function
create or replace function create_project (
    org_public_id text,
    public_id text,
    proj_name text,
    proj_desc text,
    budget decimal
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
    declare
    org_id uuid;
    proj_id uuid; 

    begin
    select id into org_id 
    from public.organizations org 
    where org.public_id = org_public_id;
    
    if org_id is null then
        raise exception 'Invalid organization: %', public_id;
    end if;

    if org_id not in (
        select organization_id
        from public.user_organizations
        where user_id = auth.uid()
        and role in ('admin', 'pm')
        ) then
        raise exception 'Invalid org member: %', public_id;
    end if;

    insert into public.projects(public_id, organization_id, proj_name, proj_desc, budget)
    values (public_id, org_id, proj_name, proj_desc, budget)
    returning id into proj_id;

    insert into public.user_projects(user_id, project_id)
    values(auth.uid(), proj_id);
    return true;

    exception
        when others then
        raise exception 'Insert failed: %', sqlerrm;
        return false;
    end;
$$;

create or replace function can_user_edit_project(
    proj_id uuid
)
returns boolean
language plpgsql
set search_path = ''
as $$
    begin
        return exists(
            select 1
            from public.projects p
            where p.id = proj_id
            and exists(
                select 1
                from public.user_organizations uo
                where uo.organization_id = p.organization_id
                and uo.user_id = auth.uid()
                and uo.role in ('admin', 'pm')
            )
            and exists(
                select 1
                from public.user_projects up
                where up.project_id = p.id
                and up.user_id = auth.uid()
            )
        );
    end;
$$;


create or replace function update_project(
    proj_public_id text,
    new_proj_name text,
    new_proj_desc text,
    new_budget decimal
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
    declare
    proj_id uuid;

    begin
        select id into proj_id 
        from public.projects 
        where public_id = proj_public_id;

        if not public.can_user_edit_project(proj_id) then
            raise exception 'Invalid org member: %', auth.uid(); 
        end if;

        update public.projects
        set
            proj_name = new_proj_name,
            proj_desc = new_proj_desc,
            budget = new_budget
        where id = proj_id;

        if not found then
            raise exception 'Update failed: not authorized or project not found';
        end if;

        return true;

        exception
            when others then
                raise exception 'Error: %', sqlerrm;
                return false;
    end;
$$;



create or replace function delete_project (
    org_id uuid,
    proj_id uuid
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
    declare
    deleted_id uuid;

    begin
        if not public.can_user_edit_project(proj_id) then
        raise exception 'Invalid org member: %', auth.uid(); 
        end if; 

        delete from public.projects 
        where id = proj_id
        returning id into deleted_id;

        if deleted_id is null then
            raise exception 'Delete failed for project id: %', proj_id;
        end if;

        return true;

        exception
            when others then
                raise exception 'Error: %', sqlerrm;
                return false;
    end;
$$;

------- User Views ------------
create or replace view user_orgs_view with(security_invoker=true) as
  select o.id, o.public_id, o.org_name, o.org_type
  from organizations o
  join user_organizations u on o.id = u.organization_id
  where u.user_id = auth.uid();

-- User-projects view
create or replace view user_projects_view with(security_invoker=true) as
    select 
        o.public_id as org_publid_id,
        o.id as org_id,
        p.id, 
        p.public_id,
        p.proj_name,
        p.proj_desc,
        p.status,
        p.budget,
        p.start_date,
        p.end_date,
        p.created_at,
        p.updated_at,
        p.repo_url,
        p.org_integration_id
    from projects p
    join organizations o on p.organization_id = o.id;


-------- User policies ----------
create policy "user can access their projects"
on projects
for select
to authenticated
using (
  exists (
    select 1
    from user_projects up
    where up.project_id = projects.id
    and up.user_id = auth.uid()
  )
);

create policy "user can access their projects"
on user_projects
using (auth.uid() = user_projects.user_id);


create policy "user can create project"
on projects
for insert
to authenticated
with check (
 organization_id in (
  select organization_id 
  from user_organizations
  where user_id = auth.uid()
  and role in ('admin', 'pm')
 )
);

create policy "user can edit projects"
on projects
as permissive
for update
to authenticated
using (can_user_edit_project(projects.id))
with check (can_user_edit_project(projects.id))

create policy "user can delete projects"
on "public"."projects"
as permissive
for delete
to authenticated
using (
     exists (
        select 1 
        from public.user_organizations
        where user_id = auth.uid()
        and organization_id = projects.organization_id
        and role in ('admin', 'pm')
    )
    and
    exists (
        select 1
        from public.user_projects
        where user_id = auth.uid()
        and project_id = projects.id
    )
)


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

