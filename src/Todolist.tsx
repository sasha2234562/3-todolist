import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    createNewTask: (value: string) => void
    error: string | null
    setErrop: (value : string | null)=>void
}

export function Todolist(props: PropsType) {

    let [newInputValue, setInputValue] = useState('')

    function buttonHandler() {
        props.createNewTask(newInputValue)
        setInputValue('')
    }

    function inputHandler(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.currentTarget.value)

    }
    function onKeyPress(){
        props.setErrop(null)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button onClick={buttonHandler}>*</button>
            {props.error ? <div>{props.error}</div> : ""}
        </div>
        <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {
                        props.removeTask(t.id)
                    }}>x
                    </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => {
                props.changeFilter("all")
            }}>
                All
            </button>
            <button onClick={() => {
                props.changeFilter("active")
            }}>
                Active
            </button>
            <button onClick={() => {
                props.changeFilter("completed")
            }}>
                Completed
            </button>
        </div>
    </div>
}
