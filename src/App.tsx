import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "Wat to learn", filter: "all"},
        {id: todolistId2, title: "Wat to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "meat", isDone: true},
            {id: v1(), title: "banana", isDone: false},
            {id: v1(), title: "orange", isDone: false}
        ]
    })

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: "all"
        };
        setTodoLists([...todoLists, newTodolist]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    function removeTodoList(todoListId: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId);
        setTodoLists(newTodoLists);
        delete tasks[todoListId];
        setTasks({...tasks});
    }
    function changeTodoListTitle(todoListId: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }
    function removeTask(taskId: string, todoListId: string) {
        let todoList = tasks[todoListId];
        tasks[todoListId] = todoList.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }
    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoList];
        setTasks({...tasks});
    }
    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoList = tasks[todoListId];
        let task = todoList.find(task => task.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }
    function changeTaskTitle(id: string, title: string, todoListId: string) {
        let todoList = tasks[todoListId];
        let task = todoList.find(task => task.id === id);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }


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
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                            }
                            return (
                                <Grid key={tl.id} item>
                                    <Paper style={{padding: "20px"}} elevation={2}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
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

export default App;