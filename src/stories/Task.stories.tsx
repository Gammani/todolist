import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";



export default {
    title: 'Task Stories',
    component: Task,
}

const removeCallback = action('Remove button inside Task clicked');
const changeStatusCallback = action('Status changed inside Task');
const changeTitleCallback = action('Title changed inside Task');


export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task
                task={{id: '1', isDone: true, title: "CSS"}}
                removeTask={removeCallback}
                changeTaskStatus={changeStatusCallback}
                changeTaskTitle={changeTitleCallback}
                todoListId={"todoList1"}
            />
            <Task
                task={{id: '2', isDone: false, title: "JS"}}
                removeTask={removeCallback}
                changeTaskStatus={changeStatusCallback}
                changeTaskTitle={changeTitleCallback}
                todoListId={"todoList1"}
            />
        </div>
    )
}
