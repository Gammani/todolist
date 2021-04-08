import React, {useCallback} from "react";
import {FilterValuesType, TaskType, TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    filter: FilterValuesType
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log("TodoList is called");
    const todoList = useSelector<AppRootStateType, TodolistType>(state => state.todoLists.filter(todo => todo.id === props.id)[0]);
    //const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title);
    }, [props.changeTodoListTitle, props.id]);
    const removeTodolist = () => {
        props.removeTodoList(props.id);
    }

    const onAllClickHandler = useCallback(() => {
        console.log("all")
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => {
        console.log("active")
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => {
        console.log("completed")
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id]);


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan value={todoList.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {
                    tasksForTodolist.map(t => <Task
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        task={t}
                        todoListId={props.id}
                        key={t.id}
                    />)
                }
            </div>
            <div>
                <Button
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
});