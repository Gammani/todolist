import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";



type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title);
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist = () => {
        props.removeTodoList(props.id);
    }


    return (
        <div>
            <h3>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {
                    props.tasks.map(t => {

                        const removeTask = () => props.removeTask(t.id, props.id);
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                        }

                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(t.id, title, props.id);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={onChangeStatus}
                            />
                            <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                            <IconButton onClick={removeTask}>
                                <Delete/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
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
}