import { useState } from "react";


export const useForm = (initialForm={}) => {
    
    

    const [formState, setFormState] = useState(initialForm);

    // const onInputChange = (event)=>{
    //     console.log(event.target.value)
    // }
    const onInputChange = ({target})=>{
        const {name,value}=target;
        // console.log({name,value});
        setFormState({
           ...formState,
           [ name ]: value, 
        }) 

    };

    const onResetForm = ()=>{
        
        setFormState(initialForm);

        // si dejo como abajo no pasa el test
        // setFormState({
        //     // userName: '',
        //     // email: '',
        //     // password: ''
        //     id:'',
        //     description:'',
        //     done:false

        // })
    }
    
    return {
        //el primero es para las variables y el segundo devuelve todo el componente
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}
