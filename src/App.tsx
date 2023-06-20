import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

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
            let task = {id: v1(), title: title, isDone: false};
            let newTasks = [task, ...tasks];
            setTasks(newTasks);
        }
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    function changeStatus(taskId: string, isDone : boolean){
        let task = tasks.find((item)=> item.id ===  taskId)
        if(task) {
            task.isDone = isDone
        }
        let clone = [...tasks]
        setTasks(clone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      error={error}
                      setError={setError}
                      changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
