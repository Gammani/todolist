import React, {ChangeEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
            <TextField
                variant={"standard"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label={"Title"}
                // className={error ? "error" : ""}
            />
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            {/*<button onClick={onAddTaskClick}>add</button>*/}
            <IconButton
                color={"primary"}
                onClick={onAddTaskClick}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
}