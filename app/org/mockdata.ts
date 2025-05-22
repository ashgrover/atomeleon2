import { CodeCommit, Task, TaskStatus } from "../types";


export const mockTasksData: Task[] = [
    {
        id: "1",
        publicId: "TK-1",
        title: "Task 1",
        estimatedHours: 16,
        actualHours: 8,
        status: TaskStatus.Open,
        labels: ["label1, label2, label3"],
        assignees: ["user1"],
        createdDate: "May 12, 2024",
        updatedDate: "May 20, 2024",
        url: ""
    },
    {
        id: "2",
        publicId: "TK-2",
        title: "Task 2",
        estimatedHours: 10,
        actualHours: 16,
        status: TaskStatus.Open,
        labels: ["label1, label2, label3"],
        assignees: ["user1", "user2"],
        createdDate: "May 12, 2024",
        updatedDate: "May 20, 2024",
        url: ""
    },
    {
        id: "3",
        publicId: "TK-3",
        title: "Task 3",
        estimatedHours: 24,
        actualHours: 20,
        status: TaskStatus.Open,
        labels: ["label1, label2, label3"],
        assignees: ["user1", "user2", "user3"],
        createdDate: "May 12, 2024",
        updatedDate: "May 20, 2024",
        url: ""
    },
    {
        id: "4",
        publicId: "TK-4",
        title: "Feature Request: Enhanced Drag-and-Drop Functionality for Group, Board, and Card Management Feature Request: Enhanced Drag-and-Drop Functionality for Group, Board, and Card Management",
        estimatedHours: 12,
        actualHours: 20,
        status: TaskStatus.Open,
        labels: ["label1, label2, label3"],
        assignees: ["user1", "user2", "user3"],
        createdDate: "May 12, 2024",
        updatedDate: "May 20, 2024",
        url: ""
    }
];

export const mockCodeCommits: CodeCommit[] = [
    {
        id: "1",
        commitId: "8818b71",
        author: "author",
        timestamp: "May 20, 2025",
        message: "This is a commit message 1",
        url: ""
    },
    {
        id: "2",
        commitId: "8818b714",
        author: "author",
        timestamp: "May 20, 2025",
        message: "This is a commit message 2",
        url: ""
    }
]