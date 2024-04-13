// js porque return js

export const todoReducer = (initialState=[],action) => {


    switch (action.type) {
        case '[TODO] Add Todo':
            // con el push mutamos los arreglo
            // map o filter para regresar un nuevo elemento bassado en ele arreglo anterior
            return [...initialState,action.payload]

        case '[TODO] Remove Todo':
            // filter porque regresa nuevo arreglo
            return initialState.filter(todo=>todo.id !== action.payload);
    
        case '[TODO] ToggleTodo':
            // uso map porque devuelve arreglo
            return initialState.map(todo => {
                if(todo.id === action.payload){
                    return{
                        ...todo,
                        done: !todo.done
                    }
                }

                return todo;
            })
        
        default:
            return initialState;
    }
}