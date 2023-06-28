import {useState} from "react";
import {v1} from "uuid";
import {NewTodolist} from "./newTodolist";

export type  newTasksType = {
    id: string
    title: string
    isDone: boolean
}

export const NewApp = () => {

    let [newTasks, setNewTasks] = useState<Array<newTasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])
    let [todolists, setTodolists] = useState([
        {id: v1(), title: "What do you do today?", filter: 'active'},
        {id: v1(), title: "I need to bye tomorrow", filter: 'completed'},
    ])

    let [newTask, setNewTask] = useState<Array<newTasksType>>(newTasks)
    const addNewTasks = (value:string) => {
            let task = {id: v1(), title: value, isDone: true}
            if(value) {
                let task = {id: v1(), title: value, isDone: true}
                setNewTask([task, ...newTask])
            }
    }
    const removeTask = (id: string)=>{
        let filterTasks = newTask.filter((item)=> item.id !== id);
        console.log(filterTasks)
        setNewTask([...filterTasks])
    }
return(
    <div>
        {todolists.map((item)=> {
            return(
                <div key={item.id}>
                    <NewTodolist
                        removeTask={removeTask}
                        tasks={newTask}
                        title={item.title}
                        addNewTasks={addNewTasks}
                    />
            </div>
            )
        })}
    </div>
)
}