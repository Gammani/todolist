import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
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


    return (
        <div>
            <h3>
                <EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <button onClick={() => {
                    props.removeTodoList(props.id)
                }}>X
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
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
                            <input
                                type="checkbox"
                                onChange={onChangeStatus}
                                checked={t.isDone}/>
                            <EditableSpan value={t.title} changeValue={changeTaskTitle}/>
                            <button onClick={removeTask}>x
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}