import {ChangeEvent, KeyboardEvent, useState} from "react";


type propsTypeNewInput = {
    addItem: (title: string) => void
}


export const AddItemForm = (props: propsTypeNewInput) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | boolean>(null)


    const addItem = () => {
        props.addItem(title);
        setError(title.trim() === '')
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error-input' : ''}
                   onKeyDown={() => setError(null)}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-text'}>Введите текст</div> }

        </div>
    )
}
