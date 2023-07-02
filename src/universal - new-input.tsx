import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type propsTypeNewInput = {
    addItem: (title: string) => void
}


export const AddItemForm = (props: propsTypeNewInput) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | boolean>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.addItem(title);
        setError(title.trim() === '')
        setTitle("");
    }
    const onKeyPressHandler= (e: KeyboardEvent<HTMLInputElement>)=> {
        if (e.charCode === 13) {
            addTask();
        }
    }

const addTaskHandler= ()=> {
        addTask()
}

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error-input' : ''}
                   onKeyDown={() => setError(null)}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={'error-text'}>Введите текст</div> }

        </div>
    )
}
