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

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "Wat to learn", filter: "all"},
        {id: todolistID2, title: "Wat to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "meat", isDone: true},
            {id: v1(), title: "banana", isDone: false},
            {id: v1(), title: "orange", isDone: false}
        ]
    })

    function addTodolist(title: string) {
        let newTodolistID = v1();
        let newTodolist: TodolistType = {
            id: newTodolistID,
            title: title,
            filter: "all"
        };
        setTodoLists([...todoLists, newTodolist]);
        setTasks({
            ...tasks,
            [newTodolistID]: []
        })
    }

    function removeTodoList(todoListID: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
        setTodoLists(newTodoLists);
        delete tasks[todoListID];
        setTasks({...tasks});
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todoLists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskID: string, todoListID: string) {
        let todoList = tasks[todoListID];
        tasks[todoListID] = todoList.filter(t => t.id !== taskID);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoList];
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(task => task.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoList = tasks[todoListID];
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