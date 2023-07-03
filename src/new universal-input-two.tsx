import {ChangeEvent, useState} from "react";

type propsType = {
    removeTask: (id: string, todoId:string)=>void
    addNewTasks: (value: string,todoId: string) => void
    deleteTodo: (todoId: string)=>void
    todoId: string
}

export const NewUniversalInputTwo = (props: propsType) => {
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
        props.addNewTasks(value, props.todoId)
        setValue('')
    }
    const deliteTodolist = ()=> {
        props.deleteTodo(props.todoId)
    }
    return (
<div>
    <button onClick={deliteTodolist}>x</button>
    <input
        onChange={onChangeHandler}
        value={value}
        className={error ? 'error-input' : ''}
    />
    <button onClick={onClickHandler}>+</button>
    {error ? <div className={'error-text'}>enter text</div> : ''}
</div>
    )
}