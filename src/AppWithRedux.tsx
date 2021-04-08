import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType, TodolistType} from "./App";


export type FilterValuesType = "all" | "active" | "completed";


function AppWithRedux() {

    console.log("AppWithRedux is called")


    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodoListAC(title));
    }, [dispatch]);
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(RemoveTodoListAC(todoListId));
    }, [dispatch]);
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, todoListId));
    }, [dispatch]);
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodoListFilterAC(value, todolistId));
    }, []);
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId));
    }, [dispatch]);
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId));
    }, [dispatch]);
    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    }, [dispatch]);
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId));
    }, [dispatch]);


    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodoListTasks = tasks[tl.id];

                            return (
                                <Grid key={tl.id} item>
                                    <Paper style={{padding: "20px"}} elevation={2}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={allTodoListTasks}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;