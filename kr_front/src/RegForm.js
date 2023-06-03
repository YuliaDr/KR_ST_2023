import './App.css';
import {Avatar, Card, CardActions, CardContent, CardHeader, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {postPost} from "./store/publicationsSlice";
import {useDispatch, useSelector} from "react-redux";
import {register} from "./store/authSlice";


function RegForm() {
    document.body.style.background = '#F4FCFF'

    const dispatch = useDispatch()

    const regHandler = () => {
        if (document.getElementById('surId').value !== '', document.getElementById('nameId').value !== '', document.getElementById('midnameId').value !== '', document.getElementById('emailId').value !== '', document.getElementById('passId').value !== '') {
            dispatch(register({last_name: document.getElementById('surId').value, first_name: document.getElementById('nameId').value, middle_name: document.getElementById('midnameId').value, email: document.getElementById('emailId').value, password: document.getElementById('passId').value}));
        }
        else alert("Заполните все поля!");
    }

    return (
        <div className="App">
            <div className={'containerRegAuth'}>
                <Stack>
                    <Typography variant='h6' fontWeight='bold' margin='0 auto' marginY={3}>
                        Регистрация
                    </Typography>
                    <TextField
                        required
                        id="surId"
                        label="Фамилия"
                        placeholder="Введите фамилию..."
                        margin={'dense'}
                        InputProps={{
                            style: {
                                background: '#FFFFFF'
                            }
                        }}
                    />
                    <TextField
                        required
                        id="nameId"
                        label="Имя"
                        placeholder="Введите имя..."
                        margin={'dense'}
                        InputProps={{
                            style: {
                                background: '#FFFFFF'
                            }
                        }}
                    />
                    <TextField
                    required
                    id="midnameId"
                    label="Отчество"
                    placeholder="Введите отчество..."
                    margin={'dense'}
                    InputProps={{
                        style: {
                            background: '#FFFFFF'
                        }
                    }}
                    />
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
                        onClick={() => { regHandler() }}

                    >
                        Зарегистрироваться
                    </Button>
                    <Typography component={Link} to='/auth/' variant="body1" margin='0 auto'>
                        Войти
                    </Typography>
                </Stack>
            </div>
        </div>
    );
}

export default RegForm;