import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

// action

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType
    id: string
}


const initialState: Array<TodolistType> = [];

type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todoListsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state, {id: action.todoListId, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const RemoveTodoListAC =
    (todoListId: string): RemoveTodoListActionType => ({type: "REMOVE-TODOLIST", id: todoListId})
export const AddTodoListAC =
    (title: string): AddTodoListActionType => {
        return ({type: "ADD-TODOLIST", title: title, todoListId: v1()})
    }
export const ChangeTodoListTitleAC =
    (title: string, id: string): ChangeTodoListTitleActionType => ({
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        id: id
    })
export const ChangeTodoListFilterAC =
    (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => ({
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter
    })