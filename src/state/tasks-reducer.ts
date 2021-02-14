import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todoListId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}


const initialState: TasksStateType = {};

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state};
            let todoListTasks = copyState[action.todoListId];
            copyState[action.todoListId] = todoListTasks.filter(t => t.id !== action.taskId);
            return copyState;
        }
        case 'ADD-TASK': {
            let copyState = {...state};
            let newTask = {id: v1(), title: action.title, isDone: false};
            copyState[action.todoListId] = [newTask, ...copyState[action.todoListId]]
            return copyState;
        }
        case 'CHANGE-TASK-STATUS': {
            // return {
            //     ...state,
            //     [action.todoListId]: state[action.todoListId].map(task => {
            //         if (task.id !== action.taskId) {
            //             return task
            //         } else {
            //             return {...task, isDone: action.isDone}
            //         }
            //     })
            // }
            let todoListTasks = state[action.todoListId];
            state[action.todoListId] = todoListTasks
                .map(t => t.id === action.taskId
                ? {...t, isDone: action.isDone}
                : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            // return {
            //     ...state,
            //     [action.todoListId]: state[action.todoListId].map(task => {
            //         if (task.id !== action.taskId) {
            //             return task
            //         } else {
            //             return {...task, title: action.title}
            //         }
            //     })
            // }
            let todoListTasks = state[action.todoListId];
            state[action.todoListId] = todoListTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId: todoListId}
}
export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
}