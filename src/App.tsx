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

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    let [error, setError] = useState<null | boolean>(null)

    function addTask(title: string) {
        setError(title === '')
        if (title !== '') {
            let task = {
                id: v1(),
                title: title,
                isDone: false
            };
            let newTasks = [task, ...tasks];
            setTasks(newTasks);
        }
    }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todo = todolists.find((item) => item.id === todoListId);
        if (todo) {
            todo.filter = value;
            setTodolists([...todolists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((item) => item.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        let clone = [...tasks]
        setTasks(clone)
    }
    let todolistIdOne = v1();
    let todolistIdTwo = v1();
    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistIdOne, title: "What to learn", filter: 'active'},
        {id: v1(), title: "What to learn", filter: 'completed'},
    ])

let [allTasks, setAllTasks] = useState({

})
    return (
        <div className={'App'}>
            {todolists.map((item) => {

                let tasksForTodolist = tasks;

                if (item.filter === "active") {
                    tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (item.filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone === true);
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
