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

return(
    <div>
        {todolists.map((item)=> {
            return(
                <div>
                    <NewTodolist
                        tasks={newTasks}
                        title={item.title}
                    />
            </div>
            )
        })}
    </div>
)
}