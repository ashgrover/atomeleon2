import { CodeCommit, ProjectMember, OrgMember, Task, TaskStatus, OrgMemberType, Timesheet, TimesheetStatus } from "../types";


export const mockTasksData: Task[] = [
    {
        id: "t1",
        publicId: "TK-1",
        publicKey: "TK-1",
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
        publicKey: "TK-2",
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
        publicKey: "TK-3",
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
        publicKey: "TK-4",
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
        publicId: "8818b71",
        taskId: "t1",
        author: "author",
        timestamp: "May 20, 2025",
        message: "This is a commit message 1",
        url: ""
    },
    {
        id: "2",
        publicId: "8818b714",
        taskId: "t2",
        author: "author",
        timestamp: "May 21, 2025",
        message: "This is a commit message 2",
        url: ""
    },
    {
        id: "3",
        publicId: "8818b715",
        taskId: "t3",
        author: "author",
        timestamp: "May 25, 2025",
        message: "This is a commit message 3",
        url: ""
    },
    {
        id: "4",
        publicId: "8818b716",
        taskId: "t4",
        author: "author",
        timestamp: "May 28, 2025",
        message: "This is a commit message 4",
        url: ""
    }
];

export const mockOrgMembers: OrgMember[] = [
    {
        id: "c1",
        orgId: "o1",
        name: "John Doe",
        orgMemberType: OrgMemberType.Contractor,
        totalHoursLogged: 50,
        totalTasksAssigned: 40,
        totalTasksCompleted: 20,
        hourlyRate: 50,
        startDate: "May 20, 2025"
    },
    {
        id: "c2",
        orgId: "o2",
        name: "Jane Doe",
        orgMemberType: OrgMemberType.Contractor,
        totalHoursLogged: 80,
        totalTasksAssigned: 50,
        totalTasksCompleted: 30,
        hourlyRate: 50,
        startDate: "May 25, 2025"
    },
    {
        id: "c3",
        orgId: "o3",
        name: "Alex Doe",
        orgMemberType: OrgMemberType.Contractor,
        totalHoursLogged: 20,
        totalTasksAssigned: 10,
        totalTasksCompleted: 5,
        hourlyRate: 50,
        startDate: "May 28, 2025"
    },
    {
        id: "c4",
        orgId: "o4",
        name: "Harry Doe",
        orgMemberType: OrgMemberType.Contractor,
        totalHoursLogged: 50,
        totalTasksAssigned: 40,
        totalTasksCompleted: 20,
        hourlyRate: 50,
        startDate: "May 30, 2025"
    },
]

export const mockMembers: ProjectMember[] = [
    {
        id: "1",
        orgMemberId: "c1",
        projectId: "p1",
        hoursLogged: 40,
        tasksAssigned: 15,
        tasksCompleted: 10
    },
    {
        id: "2",
        orgMemberId: "c2",
        projectId: "p1",
        hoursLogged: 20,
        tasksAssigned: 10,
        tasksCompleted: 5
    },
    {
        id: "3",
        orgMemberId: "c3",
        projectId: "p1",
        hoursLogged: 30,
        tasksAssigned: 20,
        tasksCompleted: 15
    },
    {
        id: "4",
        orgMemberId: "c4",
        projectId: "p1",
        hoursLogged: 10,
        tasksAssigned: 5,
        tasksCompleted: 2
    },

];

export const MockTimesheets: Timesheet[] = [
    {
        id: "t1",
        orgId: "o1",
        orgMemberId: "c1",
        periodStart: 1747764983000,
        periodEnd: 1748542583000,
        status: TimesheetStatus.AwaitingReview
    },
    {
        id: "t2",
        orgId: "o1",
        orgMemberId: "c2",
        periodStart: 1747764983000,
        periodEnd: 1748542583000,
        status: TimesheetStatus.AwaitingReview
    },
    {
        id: "t3",
        orgId: "o1",
        orgMemberId: "c3",
        periodStart: 1747764983000,
        periodEnd: 1748542583000,
        status: TimesheetStatus.ChangesRequested
    },
    {
        id: "t4",
        orgId: "o1",
        orgMemberId: "c4",
        periodStart: 1747764983000,
        periodEnd: 1748542583000,
        status: TimesheetStatus.Approved
    },
    {
        id: "t5",
        orgId: "o1",
        orgMemberId: "c5",
        periodStart: 1747764983000,
        periodEnd: 1748542583000,
        status: TimesheetStatus.Withdrawn
    },
    {
        id: "t6",
        orgId: "o1",
        orgMemberId: "c6",
        periodStart: 1747764983000,
        periodEnd: 1748542583000,
        status: TimesheetStatus.Cancelled
    },
];