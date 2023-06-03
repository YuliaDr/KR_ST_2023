import './App.css';
import {Avatar, Card, CardActions, CardContent, CardHeader, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {login} from "./store/authSlice";
import {useDispatch} from "react-redux";
import {useContext} from "react";
import {SocketContext} from "./SocketContext";

function AuthForm() {
    document.body.style.background = '#F4FCFF'

    const dispatch = useDispatch()
    const { connect } = useContext(SocketContext);


    const authHandler = () => {
        if (document.getElementById('emailId').value !== '', document.getElementById('passId').value !== '') {
            dispatch(login({email: document.getElementById('emailId').value, password: document.getElementById('passId').value}));
        }
        else alert("Заполните все поля!");
    }

    return (
        <div className="App">
            <div className={'containerRegAuth'}>
                <Stack>
                    <Typography variant='h6' fontWeight='bold' margin='0 auto' marginY={3}>
                        Авторизация
                    </Typography>
                    <TextField
                        required
                        id="emailId"
                        label="Электронная почта"
                        placeholder="Введите электронную почту..."
                        margin={'dense'}
                        type={'email'}
                        InputProps={{
                            style: {
                                background: '#FFFFFF'
                            }
                        }}
                    />
                    <TextField
                        required
                        id="passId"
                        label="Пароль"
                        placeholder="Введите пароль..."
                        margin={'dense'}
                        type={'password'}
                        InputProps={{
                            style: {
                                background: '#FFFFFF'
                            }
                        }}
                    />
                    <Button
                        size="small"
                        variant="contained"
                        sx={{ boxShadow: 'none',
                            backgroundColor: '#9CC4FF',
                            color: '#000000',
                            borderRadius: 3,
                            margin: '0 auto',
                            marginY: 2
                        }}
                        component={Link}
                        to="/"
                        onClick={() => { authHandler() }}

                    >
                        Войти
                    </Button>
                    <Typography component={Link} to='/registration/' variant="body1" margin='0 auto'>
                        Зарегистрироваться
                    </Typography>
                </Stack>
            </div>
        </div>
    );
}

export default AuthForm;