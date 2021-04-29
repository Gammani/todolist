import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd53ad02d-1ee2-4ffc-9e75-df6b59b01ee8'
    }
})

export const taskAPI = {
    getTasks(todoListId: string) {
        return instance.get(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post(`todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete(`todo-lists/${todoListId}/tasks/${taskId}
`)
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, title)
    }
}

// type TaskType = {
//     description: string
//     title: string
//     completed: boolean
//     status: number
//     priority: number
//     startDate: datetime
//     deadline: datetime
//     id: string
//     todoListId: string
//     order: number
//     addedDate: datetime
// }