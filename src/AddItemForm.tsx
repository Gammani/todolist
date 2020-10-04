import React, {ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    };
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            onAddTaskClick();
        }
    };

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={onAddTaskClick}>add</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}