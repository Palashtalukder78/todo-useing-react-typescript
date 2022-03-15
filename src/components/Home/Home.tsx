import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useCallback, useReducer, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import './Home.css'
interface Todo{
    id: number,
    name: string,
    email: string,
    /* phoneNumber: number */
}
type actionType = {type:"add", name: string, email: string} | {type: "remove", id: number}
const Home = () => {

    function reducer(state: Todo[],action:actionType){
        switch(action.type){
            case "add":
                return[
                    ...state,
                    {
                        id: state.length,
                        name: action.name,
                        email: action.email,
                        /* phoneNumber: action.phoneNumber */
                    }
                ];
                case "remove":
                    return state.filter(({id})=>id !==action.id)
        }
    }
    const [todos,dispatch] = useReducer(reducer,[]);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    // const phoneNumberRef = useRef<HTMLInputElement>(null);

    const onAddUser = useCallback(()=>{
        if(nameRef.current && emailRef.current){
            dispatch({
                type: "add",
                name: nameRef.current.value,
                email: emailRef.current.value
            })
        }

    }, [])
    console.log(todos);
    return (
        <Container sx={{ my: 3 }}>
            <div>
                <Typography variant="h4" component="div" gutterBottom>
               ToDo Application using React & TypeScript
                </Typography>

                <TextField ref={nameRef} style={{width: "30%"}} sx={{ my: 2 }} id="outlined-basic" label="Name" variant="outlined" />
                <TextField ref={emailRef} style={{width: "30%"}} sx={{ my: 2, mx:1 }} id="outlined-basic" label="Email" variant="outlined" />

                <Button onClick={onAddUser} startIcon={<AddIcon />}>
                    Add User
                </Button>
            </div>
            <div>
                {
                    todos.map((todo)=> (
                        <div key={todo.id}>
                            {todo.name}
                        </div>
                    ))
                }
            </div>
        </Container>
    );
};

export default Home;