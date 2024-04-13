import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/TodoReducer';

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'recolectar la piedra del poder',
    //     done:false,
    // },
]

const init = ()=>{
    // si no hay todos de vuelve objeto vacio
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {

    const [todos,dispatch] = useReducer(todoReducer, initialState,init)

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter(todo=>!todo.done).length;

    useEffect(() => {
        // localStorage no se importa es un api que viene en js
        localStorage.setItem('todos',JSON.stringify(todos));

    
        // la dependencia [] va mirar los todos se vuelve a ejecutar    cuando cambia
        // useEffect se disparará cada vez que se recargue o agregue
    }, [todos])
    
    
    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }
    
        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        })
    };

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] ToggleTodo',
            payload: id,
        })
    };

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount,
    }
}
