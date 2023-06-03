import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import './AppBar.css'
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect} from "react";
import {logout} from "./store/authSlice";
import {fetchComments, fetchPosts, fetchUsers, postPost} from "./store/publicationsSlice";
import {SocketContext} from "./SocketContext";
// import MenuIcon from '@mui/icons-material/Menu';

export default function PubReviewAppBar() {
    // const posts = useSelector(state => state.posts)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { disconnect } = useContext(SocketContext);

    // useEffect(() => {
    //     dispatch(check())
    // }, [dispatch])

    const logoutHandler = () => {
        disconnect();
        dispatch(logout());
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar variant="outlined" position="fixed" className="PubReviewAppBar" sx={{ background: '#D5E7F6', borderBottomWidth: 1, borderBottomColor: '#000000', height: 64 }}>
                {auth.auth === 1 ?
                    <Toolbar>
                        {/*<IconButton*/}
                        {/*    size="large"*/}
                        {/*    edge="start"*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="menu"*/}
                        {/*    sx={{ mr: 2 }}*/}
                        {/*>*/}
                        {/*</IconButton>*/}
                        {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>*/}
                        {/*    News*/}
                        {/*</Typography>*/}

                        <Typography component={Link}
                                    to="/"
                                    sx={{ fontSize: 20,
                                        fontFamily: "Hiragino Maru Gothic ProN",
                                        color: '#000000',
                                        textDecoration: 'none'
                                    }}
                        >
                            Publication Review
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Avatar></Avatar>
                        <Typography sx={{ color: '#000000', margin: 1 }} variant="body">
                            {auth.username}
                        </Typography>
                        <Button
                            size="small"
                            variant="contained"
                            sx={{ boxShadow: 'none',
                                backgroundColor: '#9CC4FF',
                                color: '#000000',
                                borderRadius: 3}}
                            onClick={() => { logoutHandler() }}
                        >Выйти</Button>
                    </Toolbar>:
                    <Toolbar>
                        <Typography component={Link}
                                    to="/"
                                    sx={{ fontSize: 20,
                                        fontFamily: "Hiragino Maru Gothic ProN",
                                        color: '#000000',
                                        textDecoration: 'none'
                                    }}
                        >
                            Publication Review
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        {/*<Avatar></Avatar>*/}
                        {/*<Typography sx={{ color: '#000000', margin: 1 }} variant="body">*/}
                        {/*    Веремейчик К.И.*/}
                        {/*</Typography>*/}
                        <Button component={Link}
                                to="/registration"
                                size="small"
                                variant="contained"
                                sx={{ boxShadow: 'none',
                                    backgroundColor: '#9CC4FF',
                                    color: '#000000',
                                    borderRadius: 3,
                                    margin: 1
                                }}
                        >Зарегистрироваться</Button>
                        <Button component={Link}
                                to="/auth"
                                size="small"
                                variant="contained"
                                sx={{ boxShadow: 'none',
                                    backgroundColor: '#9CC4FF',
                                    color: '#000000',
                                    borderRadius: 3}}
                        >Войти</Button>
                    </Toolbar>
                }

            </AppBar>
        </Box>
    );
}