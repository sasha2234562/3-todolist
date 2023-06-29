import {newTasksType} from "./newApp";
import {ChangeEvent, useState} from "react";


type newTodolistPropsType = {
    tasks: Array<newTasksType>
    title: string
    addNewTasks: (value: string)=>void
    removeTask:(id: string)=> void
}

export const NewTodolist = (props: newTodolistPropsType) => {
    let [value, setValue] = useState('')

    const onChangeNandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }
    const onClickHandler = () => {
        props.addNewTasks(value)
        setValue('')
    }
    const removeOnclickHandler= (id: string)=> {
        props.removeTask(id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <input onChange={onChangeNandler} value={value}/>
            <button onClick={onClickHandler}>+</button>
            {props.tasks.map((item) => {

                return (
                    <li key={item.id}>
                        <input type={"checkbox"} checked={item.isDone}/>
                        <span>{item.title}</span>
                        <button onClick={()=>removeOnclickHandler(item.id)}>x</button>
                    </li>
                )

            })}
            <button>All</button>
            <button>Active</button>
            <button>Complited</button>
        </div>
    )
}
