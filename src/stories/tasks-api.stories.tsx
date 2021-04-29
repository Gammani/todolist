import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";


export default {
    title: 'Tasks-API'
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        taskAPI.getTasks("16554a3a-14d4-4475-a390-1d584c319846")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "16554a3a-14d4-4475-a390-1d584c319846";
        taskAPI.createTask(todoListId, "Hello World")
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "16554a3a-14d4-4475-a390-1d584c319846";
        const taskId = "f15eda1a-83d5-4cb1-ba65-d283edb96a43"
        taskAPI.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "16554a3a-14d4-4475-a390-1d584c319846";
        const taskId = "c07c22f3-d00b-42f3-adce-bf71626161b2"
        taskAPI.updateTask(todoListId, taskId, "New title")
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}