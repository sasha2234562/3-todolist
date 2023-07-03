import {useState} from "react";
import {v1} from "uuid";
import {NewTodolist} from "./newTodolist";
import {FilterValuesType, todolistType} from "./App";
import {NewUniversalInputTwo} from "./new universal-input-two";

export type  newTasksType = {
    id: string
    title: string
    isDone: boolean
}

export const NewApp = () => {
    const addNewTasks = (value: string, todoId: string) => {
        let tasks = allTasksObj[todoId];
        if (value) {
            let task = {id: v1(), title: value, isDone: true}
            let newTasks = [task, ...tasks]
            allTasksObj[todoId] = newTasks;
            setAllTaskaObj({...allTasksObj})
        }
    }
    const removeTask = (id: string, todoId: string) => {
        let tasks = allTasksObj[todoId]
        let filterTasks = tasks.filter((item) => item.id !== id);
        allTasksObj[todoId] = filterTasks

        setAllTaskaObj({...allTasksObj})
    }
    const changeStatus = (id: string, checked: boolean, todoId: string) => {

        let task = allTasksObj[todoId];
        let todolist = task.find((item) => item.id === id)
        if (todolist) {
            todolist.isDone = checked
            setAllTaskaObj({...allTasksObj})
        }
    }
    const filter = (filter: FilterValuesType, todoId: string) => {
        let todolist = todolists.find((item) => item.id === todoId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }
    const todolistOne = v1();
    const todolistTwo = v1();

    let [allTasksObj, setAllTaskaObj] = useState({
        [todolistOne]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistTwo]: [
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Air", isDone: true},
            {id: v1(), title: "Cream", isDone: false},
            {id: v1(), title: "Ise", isDone: false},
        ]
    })

    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistOne, title: "What do you do today?", filter: 'active'},
        {id: todolistTwo, title: "I need to bye tomorrow", filter: 'completed'},
    ])

    const  deleteTodolist = (todoId: string)=> {
        let todo = todolists.find((item)=> item.id !== todoId);
        todo&& setTodolists([todo])
        delete allTasksObj[todoId]
        setAllTaskaObj({...allTasksObj})

    }
    return (
        <div>
            {todolists.map((item) => {
                let tasksForTodolist = allTasksObj[item.id]
                if (item.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter((item) => item.isDone === false)
                }
                if (item.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter((item) => item.isDone === true)
                }
                return (
                    <div key={item.id}>
                        <NewTodolist
                            key={item.id}
                            removeTask={removeTask}
                            tasks={tasksForTodolist}
                            title={item.title}
                            addNewTasks={addNewTasks}
                            changeStatus={changeStatus}
                            filter={filter}
                            filt={item.filter}
                            todoId={item.id}
                            deleteTodo={deleteTodolist}
                        />
                    </div>
                )
            })}
        </div>
    )
}