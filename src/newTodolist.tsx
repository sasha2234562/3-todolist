import {newTasksType} from "./newApp";


type newTodolistPropsType = {
    tasks: Array<newTasksType>
    title: string
}

export const NewTodolist = (props: newTodolistPropsType) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <input/>
            <button>+</button>
            {props.tasks.map((item) => {
                return (
                    <div>
                        <li>
                            <input type={"checkbox"} checked={item.isDone}/>
                            <span>{item.title}</span>
                            <button>x</button>
                        </li>
                    </div>
                )
            })}
        </div>
    )
}
