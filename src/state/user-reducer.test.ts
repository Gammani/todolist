import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' })

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // your code here
    const action = {
        type: 'INCREMENT-CHILDREN-COUNT'
    }
    const endState = userReducer(startState, action );
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});

test('user reducer should name change to user', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Dimych' };
    // your code here
    const action = {
        type: 'CHANGE-NAME',
        name: 'Dmitriy'
    }
    const endState = userReducer(startState, action );
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(2);
    expect(endState.name).toBe('Dmitriy')
});