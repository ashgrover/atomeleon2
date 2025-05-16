

export type Project = {
    id: string,
    title: string,
    description?: string,
    budget?: number,
    repoUrl: string,
    labels?: string[],
    createdDate: string
}

export const enum TaskStatus {
    Closed,
    Open
}

export type Task = {
    id: string,
    parentId?: string,
    title: string,
    type?: string,
    estimatedHours?: string,
    actualHours: string,
    status: TaskStatus
    labels?: string[],
    assignees?: string[],
    createdDate: string,
    updatedDate?: string,
    dueDate?: string
}