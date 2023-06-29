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
    filt: string
}

export const NewTodolist = (props: newTodolistPropsType) => {
    let [value, setValue] = useState('')
    let [error, setError] = useState<null | boolean>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
        setError(false)
    }
    const onClickHandler = () => {
        if (!value) {
            setError(true)
        }
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
            <input
                onChange={onChangeHandler}
                value={value}
                className={error ? 'error-input' : ''}
            />
            <button onClick={onClickHandler}>+</button>
            {error ? <div className={'error-text'}>enter text</div> : ''}
            {props.tasks.map((item) => {

                const onChangeHandlerChecked = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(item.id, event.currentTarget.checked)
                }


                return (
                    <li key={item.id}>
                        <input
                            type={"checkbox"} checked={item.isDone}
                            onChange={onChangeHandlerChecked}/>
                        <span>{item.title}</span>
                        <button onClick={() => removeOnclickHandler(item.id)}>x</button>
                    </li>
                )

            })}
            <button onClick={onAllClickHandler} className={props.filt === 'all' ? 'active-filter' : ''}>All</button>
            <button onClick={onActiveClickHandler} className={props.filt === 'active' ? 'active-filter' : ''}>Active
            </button>
            <button onClick={onComplitedClickHandler}
                    className={props.filt === 'completed' ? 'active-filter' : ''}>Complited
            </button>
        </div>
    )
}
