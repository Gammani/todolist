// User:
type StateType = {
    name: string,
    age: number,
    childrenCount: number
}

// action:
type ActionType = {
    type: string,          // тип действия
    [key: string]: string
}


// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state


export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            //state.age = state.age + 1;
            const newState = {...state}
            newState.age = state.age + 1
            return newState;
        case 'INCREMENT-CHILDREN-COUNT':
            //state.childrenCount = state.childrenCount + 1;
            return {...state, childrenCount: state.childrenCount + 1};
        case 'CHANGE-NAME':
            return {...state, name: action.name}
        default:
            throw new Error("I don't understand this type")
    }
}