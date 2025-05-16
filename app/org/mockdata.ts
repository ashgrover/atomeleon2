import { Task, TaskStatus } from "../types";


export const MockTasksData: Task[] = [
    {
        id: "1",
        title: "Task 1",
        estimatedHours: "5",
        actualHours: "8",
        status: TaskStatus.Open,
        labels: ["label1, label2, label3"],
        assignees: ["user1"],
        createdDate:"",
    },
    {
        id: "2",
        title: "Task 2",
        estimatedHours: "10",
        actualHours: "16",
        status: TaskStatus.Open,
        labels: ["label1, label2, label3"],
        assignees: ["user1", "user2"],
        createdDate:"",
    },
    {
        id: "3",
        title: "Task 3",
        estimatedHours: "12",
        actualHours: "20",
        status: TaskStatus.Open,
        labels: ["label1, label2, label3"],
        assignees: ["user1", "user2", "user3"],
        createdDate:"",
    }
];