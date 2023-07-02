import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./universal - new-input";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]

        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        if (title !== '') {
            let task = {
                id: v1(),
                title: title,
                isDone: false
            };
            let newTasks = [task, ...tasks];
            tasksObj[todolistId] = newTasks
            setTasksObj({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todo = todolists.find((item) => item.id === todoListId);
        if (todo) {
            todo.filter = value;
            setTasksObj({...tasksObj})
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId]
        let task = tasks.find((item) => item.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasksObj({...tasksObj})
    }

    let todolistIdOne = v1();
    let todolistIdTwo = v1();

    let [tasksObj, setTasksObj] = useState({
        [todolistIdOne]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistIdTwo]: [
            {id: v1(), title: "Meat", isDone: true,},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cats", isDone: false}
        ]
    });
    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistIdOne, title: "What to learn", filter: 'active'},
        {id: todolistIdTwo, title: "I need to bye today", filter: 'completed'},
    ])
    const deliteTodo = (todoId: string) => {
        let filter = todolists.filter((item) => item.id === todoId)
        setTodolists(filter)
    }
const  addTodolist = (title: string)=> {
        let todolist: todolistType = {
            id: v1(),
            filter: 'all',
            title: title,
        }
setTodolists([todolist, ...todolists])
    setTasksObj({
        ...tasksObj,
        [todolist.id]: []
    })
}


    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((item) => {

                let tasksForTodolist = tasksObj[item.id];

                if (item.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (item.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={item.id}
                        title={item.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={item.filter}
                        id={item.id}
                        // deliteTodo={deliteTodo}
                    />
                )

            })}
            {/*<NewApp/>*/}
        </div>
    );
}

export default App;
