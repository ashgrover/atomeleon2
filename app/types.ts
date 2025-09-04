

export type Project = {
    id: string,
    orgId: string,
    title: string,
    description?: string,
    budget?: number,
    repoUrl: string,
    labels?: string[],
    startDate: string,
    createdDate: string,
}

export const enum TaskStatus {
    Closed,
    Open
}

export type Task = {
    id: string,
    publicId?: string,
    publicKey?: string,
    projectId?: string,
    title: string,
    type?: string,
    estimatedHours?: number,
    actualHours: number,
    status: TaskStatus
    labels?: string[],
    assignees?: string[],
    createdDate: string,
    updatedDate?: string,
    dueDate?: string,
    url?: string
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