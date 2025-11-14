

export const ORG_TYPES = ["company", "agency", "startup", "nonprofit", "educational", "government", "none"] as const;
export type OrgType = typeof ORG_TYPES[number];

export type ProjectStatus = "active" | "completed" | "archived";

export type Project = {
    id: string,
    publicId: string,
    projName: string,
    projDec: string,
    status: ProjectStatus,
    budget?: number,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    updatedAt: Date,
    orgId: string,
    orgPublicId: string,
    orgIntegrationId: string
}

export type Repository = {
    id: number,
    nodeId: string,
    owner: string,
    fullName: string,
    repoUrl: string,
    orgIntegrationId: string
}

export const enum TaskStatus {
    Closed,
    Open
}

export type Task = {
    id: string,
    publicId?: string,
    publicKey?: string,
    title: string,
    status: TaskStatus
    taskUrl?: string,
    estimatedHours?: number,
    actualHours: number,
    assignees?: string[],
    createdAt: string,
    updatedAt?: string,
    cost: number,
    commitCount: number,
    pullRequestCount: number
}

export type CodeCommit = {
    id: string,
    publicId: string,
    taskId?: string,
    author: string,
    message: string,
    timestamp: string,
    url: string
}

export const enum OrgMemberType {
    Admin,
    ProjectManager,
    Contractor
}

export type OrgMember = {
    id: string,
    orgId: string,
    name: string,
    orgMemberType: OrgMemberType,
    totalHoursLogged: number,
    totalTasksAssigned: number,
    totalTasksCompleted: number,
    hourlyRate: number,
    startDate: string
}

export type ProjectMember = {
    id: string,
    orgMemberId: string,
    projectId: string,
    hoursLogged: number,
    tasksAssigned: number,
    tasksCompleted: number,
}

export const enum TimesheetStatus {
    Draft,
    Approved,
    AwaitingReview,
    ChangesRequested,
    Withdrawn,
    Cancelled
}

export type Timesheet = {
    id: string,
    orgId: string,
    orgMemberId: string,
    periodStart: number,
    periodEnd: number,
    status: TimesheetStatus
}