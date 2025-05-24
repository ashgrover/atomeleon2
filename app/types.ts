

export type Project = {
    id: string,
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
    parentId?: string,
    publicId?: string,
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
    commitId: string,
    author: string,
    message: string,
    timestamp: string,
    url: string
}