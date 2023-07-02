import React, {ChangeEvent, KeyboardEvent} from "react";

type propsTypeNewInput = {
    title: string
    onChange: (e: string) => void
    onKeyPress: (e: number)=>void
    error: null| boolean
    addTask: ()=>void
    setError: (value: null| boolean)=>void
}


export const UniversalNewInput = (props: propsTypeNewInput) => {
    const onChangeHandler= (e: ChangeEvent<HTMLInputElement>)=>{
        props.onChange(e.currentTarget.value)
    }
    const onKeyPressHandler= (e: KeyboardEvent<HTMLInputElement>)=> {
        props.onKeyPress(e.charCode)
    }

const addTaskHandler= ()=> {
        props.addTask()
}

    return (
        <div>
            <input value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={props.error ? 'error-input' : ''}
                   onKeyDown={() => props.setError(null)}
            />
            <button onClick={addTaskHandler}>+</button>
            {props.error ? <div className={'error-text'}>Введите текст</div> : ''}

        </div>
    )
}
