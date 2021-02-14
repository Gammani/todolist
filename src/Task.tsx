import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (id: string, title: string, todoListId: string) => void
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id, props.todoListId);
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todoListId);
    }

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId);
    }, [props.changeTaskTitle, props.task.id, props.todoListId]);

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            checked={props.task.isDone}
            onChange={onChangeStatus}
        />
        <EditableSpan value={props.task.title} changeValue={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
            <Delete/>
        </IconButton>
    </div>
})