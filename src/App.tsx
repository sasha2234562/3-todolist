import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";
type  todolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        console.log(todolistId)

        let filteredTasks = tasks.filter(t => t.id !== id);
        console.log(filteredTasks)
        tasksObj[todolistId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    let [error, setError] = useState<null | boolean>(null)

    function addTask(title: string, todolistId: string) {
        const tasks = tasksObj[todolistId]
        setError(title === '')
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
            // tasksObj[todoListId] = [...tasksObj]
            setTasksObj({...tasksObj})
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId : string) {
        const tasks = tasksObj[todolistId]
        let task = tasks.find((item) => item.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        let clone = [...tasks]
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
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cats", isDone: false}
        ]
    });
    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistIdOne, title: "What to learn", filter: 'active'},
        {id: todolistIdTwo, title: "I need to bye today", filter: 'completed'},
    ])

    return (
        <div className={'App'}>
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
                        error={error}
                        setError={setError}
                        changeStatus={changeStatus}
                        filter={item.filter}
                        id={item.id}
                    />
                )

            })}
        </div>
    );
}

export default App;
