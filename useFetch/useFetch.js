import { useEffect, useState } from "react";


// vamos a almacenar la data para no tener que hacer la peticion nuevamente si ya lo hicimos alguna vez
const localCache = {};



export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    //lo hacemos asi porque sino sería lo mismo que no hacer el hook
    //con esto, si el componente se vuelve a redibujar no se vuelve a disparar el componente http porque en nuestro useFetch tenemos un arreglo vacio.
    useEffect(() => {
        getFetch();    
    }, [url])
    
    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }

    const getFetch = async() =>{

        if (localCache[url]) {
            console.log('usando caché');
            setState({
                data: localCache[url],
                isLoading:false,
                hasError:true,
                error: null,
            })
            return;
        }

        setLoadingState();
        const response = await fetch(url);

        //sleep
        await new Promise( resolve => setTimeout(resolve, 1000));

        //para manejar los errores
        if(!response.ok) {
            //el setState es una funcion dispacher y al hacer usada de esta forma avisa a react que hubo un cambio y hay que volverla a evaluar
            setState({
                data: null,
                isLoading:false,
                hasError:true,
                error: {
                    code: response.status,
                    message: response.statusText,
                }
            })
            return;
        }

        //si no tenemos error continuamos
        const data = await response.json();//para tomar la data como formato de json.
        setState({
            data:data,
            isLoading:false,
            hasError:false,
            error:null,
        })

        //mensaje de caché
        localCache[url] = data;
    }


    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,

    }
}
