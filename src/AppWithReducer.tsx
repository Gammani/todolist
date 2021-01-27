import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";


function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todolistId1, title: "Wat to learn", filter: "all"},
        {id: todolistId2, title: "Wat to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        let action = AddTodoListAC(title);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }
    function removeTodoList(todoListId: string) {
        let action = RemoveTodoListAC(todoListId);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }
    function changeTodoListTitle (newTitle: string, todoListId: string) {
        dispatchToTodoLists(ChangeTodoListTitleAC(newTitle, todoListId));
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchToTodoLists(ChangeTodoListFilterAC(value, todolistId));
    }
    function removeTask(taskId: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(taskId, todoListId));
    }
    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title, todoListId));
    }
    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId));
    }
    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId));
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
                            let allTodoListTasks = tasks[tl.id];
                            let tasksForTodolist = allTodoListTasks;

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