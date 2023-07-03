import {newTasksType} from "./newApp";
import {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {NewUniversalInputTwo} from "./new universal-input-two";


type newTodolistPropsType = {
    tasks: Array<newTasksType>
    title: string
    addNewTasks: (value: string, todoId: string) => void
    removeTask: (id: string, todoId: string) => void
    changeStatus: (id: string, checked: boolean, todoId: string) => void
    filter: (filter: FilterValuesType, todoId: string) => void
    filt: string
    todoId: string
    deleteTodo: (todoId: string) => void
}

export const NewTodolist = (props: newTodolistPropsType) => {
    const removeOnclickHandler = (id: string) => {
        props.removeTask(id, props.todoId)
    }

    const onAllClickHandler = () => {
        props.filter('all', props.todoId)
    }
    const onActiveClickHandler = () => {
        props.filter('active', props.todoId)
    }
    const onComplitedClickHandler = () => {
        props.filter('completed', props.todoId)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <NewUniversalInputTwo todoId={props.todoId} removeTask={props.removeTask} addNewTasks={props.addNewTasks} deleteTodo={props.deleteTodo}/>
            {/*<button onClick={deliteTodolist}>x</button>*/}
            {/*<input*/}
            {/*    onChange={onChangeHandler}*/}
            {/*    value={value}*/}
            {/*    className={error ? 'error-input' : ''}*/}
            {/*/>*/}
            {/*<button onClick={onClickHandler}>+</button>*/}
            {/*{error ? <div className={'error-text'}>enter text</div> : ''}*/}
            {props.tasks.map((item) => {

                const onChangeHandlerChecked = (event: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(item.id, event.currentTarget.checked, props.todoId)
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
            <button
                onClick={onAllClickHandler}
                className={props.filt === 'all' ? 'active-filter' : ''}
            >All
            </button>
            <button
                onClick={onActiveClickHandler}
                className={props.filt === 'active' ? 'active-filter' : ''}
            >Active
            </button>
            <button
                onClick={onComplitedClickHandler}
                className={props.filt === 'completed' ? 'active-filter' : ''}>Complited
            </button>
        </div>
    )
}
