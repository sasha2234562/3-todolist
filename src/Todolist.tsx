import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./universal - new-input";
import {EditableSpan} from "./EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, id: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: string
    id: string
    changeTaskTitle: (id: string, newValue: string, todiId: string) => void
    changeTodolistTitle: (newTitle: string, id: string)=> void
    removeTodolist: (todoId: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    function changeTodolistTitle(newValue: string) {
        props.changeTodolistTitle(props.id, newValue)
    }
    const removeTodolistHandler= ()=> {
        props.removeTodolist(props.id)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    function onChangeHandlerChecked(event: ChangeEvent<HTMLInputElement>) {
                        props.changeStatus(t.id, event.currentTarget.checked, props.id)
                    }

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChange = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }


                    return <li key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeHandlerChecked}
                        />
                        <EditableSpan onChange={onChange} title={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
            <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''}>Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
            </button>
        </div>
    </div>
}

