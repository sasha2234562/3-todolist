import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string)=> void
}

export function EditableSpan(props: EditableSpanPropsType) {

    let [title, setTitle] = useState(props.title);

    let [editMode, setEditMode] = useState<boolean>(false)
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                onChange={onChangeHandler}
                onBlur={activateViewMode}
                value={title} placeholder={title} autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}