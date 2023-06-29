import {newTasksType} from "./newApp";
import {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";


type newTodolistPropsType = {
    tasks: Array<newTasksType>
    title: string
    addNewTasks: (value: string) => void
    removeTask: (id: string) => void
    changeStatus: (id: string, checked: boolean) => void
    filter: (filter: FilterValuesType) => void
}

export const NewTodolist = (props: newTodolistPropsType) => {
    let [value, setValue] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }
    const onClickHandler = () => {
        props.addNewTasks(value)
        setValue('')
    }
    const removeOnclickHandler = (id: string) => {
        props.removeTask(id)
    }

const onAllClickHandler = () => {
props.filter('all')
}
const onActiveClickHandler = () => {
        props.filter('active')
}
const onComplitedClickHandler = () => {
        props.filter('completed')
}
return (
    <div>
        <h3>{props.title}</h3>
        <input onChange={onChangeHandler} value={value}/>
        <button onClick={onClickHandler}>+</button>
        {props.tasks.map((item) => {

            const onChangeHandlerChecked = (event: ChangeEvent<HTMLInputElement>) => {
                props.changeStatus(item.id, event.currentTarget.checked)
            }


            return (
                <li key={item.id}>
                    <input type={"checkbox"} checked={item.isDone} onChange={onChangeHandlerChecked}/>
                    <span>{item.title}</span>
                    <button onClick={() => removeOnclickHandler(item.id)}>x</button>
                </li>
            )

        })}
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onComplitedClickHandler}>Complited</button>
    </div>
)
}
