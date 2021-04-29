import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd53ad02d-1ee2-4ffc-9e75-df6b59b01ee8'
    }
})

export const todoListAPI = {
    getTodoLists() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todoListId}`, {title})
    }
}

type CommonResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}