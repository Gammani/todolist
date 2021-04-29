import React, {useEffect, useState} from 'react'
import {todoListAPI} from "../api/todolist-api";


export default {
    title: 'TodoLists-API'
}

export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todoListAPI.getTodoLists()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.createTodoList("Hello World")
            .then((res) => {
                setState(res.data.data.item)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'ce8783f1-4e4d-4aba-8b6d-c6af642d1e74';
        todoListAPI.deleteTodoList(todoListId)
            .then((res) => {
               setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '16554a3a-14d4-4475-a390-1d584c319846';
        todoListAPI.updateTodoList(todoListId, 'Hello World')
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}