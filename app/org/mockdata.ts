import { CodeCommit, Contractor, Member, Task, TaskStatus } from "../types";


export const mockTasksData: Task[] = [
    {
        id: "t1",
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
        id: "t2",
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
        id: "t3",
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
        id: "t4",
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
        taskId: "t1",
        author: "author",
        timestamp: "May 20, 2025",
        message: "This is a commit message 1",
        url: ""
    },
    {
        id: "2",
        commitId: "8818b714",
        taskId: "t2",
        author: "author",
        timestamp: "May 21, 2025",
        message: "This is a commit message 2",
        url: ""
    },
    {
        id: "3",
        commitId: "8818b715",
        taskId: "t3",
        author: "author",
        timestamp: "May 25, 2025",
        message: "This is a commit message 3",
        url: ""
    },
    {
        id: "4",
        commitId: "8818b716",
        taskId: "t4",
        author: "author",
        timestamp: "May 28, 2025",
        message: "This is a commit message 4",
        url: ""
    }
];

export const mockContractors: Contractor[] = [
    {
        id: "c1",
        name: "John Doe",
        totalHoursLogged: 50,
        totalTasksAssigned: 40,
        totalTasksCompleted: 20,
        hourlyRate: 50,
        startDate: "May 20, 2025"
    },
    {
        id: "c2",
        name: "Jane Doe",
        totalHoursLogged: 80,
        totalTasksAssigned: 50,
        totalTasksCompleted: 30,
        hourlyRate: 50,
        startDate: "May 25, 2025"
    },
    {
        id: "c3",
        name: "Alex Doe",
        totalHoursLogged: 20,
        totalTasksAssigned: 10,
        totalTasksCompleted: 5,
        hourlyRate: 50,
        startDate: "May 28, 2025"
    },
    {
        id: "c4",
        name: "Harry Doe",
        totalHoursLogged: 50,
        totalTasksAssigned: 40,
        totalTasksCompleted: 20,
        hourlyRate: 50,
        startDate: "May 30, 2025"
    },
]

export const mockMembers: Member[] = [
    {
        id: "1",
        contractorId: "c1",
        projectId: "p1",
        hoursLogged: 40,
        tasksAssigned: 15,
        tasksCompleted: 10
    },
    {
        id: "2",
        contractorId: "c2",
        projectId: "p1",
        hoursLogged: 20,
        tasksAssigned: 10,
        tasksCompleted: 5
    },
    {
        id: "3",
        contractorId: "c3",
        projectId: "p1",
        hoursLogged: 30,
        tasksAssigned: 20,
        tasksCompleted: 15
    },
    {
        id: "4",
        contractorId: "c4",
        projectId: "p1",
        hoursLogged: 10,
        tasksAssigned: 5,
        tasksCompleted: 2
    },

];