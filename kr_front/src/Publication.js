import './App.css';
import PubReviewAppBar from "./AppBar";
import {Avatar, Card, CardActions, CardContent, CardHeader, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import notify from "./WebSocket"
// import {check} from "./store/authSlice";
import {fetchCommentsForPost, fetchPost, fetchUsers, postComment, postPost} from "./store/publicationsSlice";
import { SocketContext } from './SocketContext';
import WebSock from "./WebSocket";

function Publication() {
    document.body.style.background = '#F4FCFF'
    const current = new Date();
    const curDate = current.toLocaleDateString("ru-RU")
    // const [alert, setAlert] = useState(null);
    const { notify } = useContext(SocketContext);

    function handleNotify() {
        notify();
    }

    // useEffect(() => {
    //     if (socket) {
    //         socket.on('message', (data) => {
    //             setAlert(data.message);
    //         });
    //     }
    // }, [socket]);

    let param = useParams().id;
    const auth = useSelector(state => state.auth)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(check())
        dispatch(fetchPost(param))
        dispatch(fetchUsers())
        dispatch(fetchCommentsForPost(param))
    }, [dispatch, param])

    const newRevHandler = () => {
        if (document.getElementById('reviewId').value !== '') {
            notify(posts.post.id, posts.post.title, posts.post.user, posts.users.find(user => user.id === posts.post.user)?.email);
            dispatch(postComment({review: document.getElementById('reviewId').value, post: posts.post.id, user: auth.user.id}));
        }
        else alert("Заполните все поля!");
    }

    return (
        <div className="App">
            <PubReviewAppBar/>
            <div className={'container'}>
                <div style={{ height: 64, marginBottom: 16}}></div>

                {posts.loading &&  <div className="d-flex justify-content-center"></div> }
                {!posts.loading && posts.error ? <div>{posts.error}</div>: null}
                {!posts.loading && posts.post.title ? (
                    <div>
                        <Stack spacing={1} marginY={2}>
                            <Typography variant="h6" fontWeight='bold'>
                                {posts.post.title}
                            </Typography>
                            <Typography variant="body1">
                                {posts.post.annotation}
                            </Typography>
                            <Typography variant="body1">
                                Авторство: {posts.post.authors}
                            </Typography>
                            <Typography variant="body1">
                                Дата публикации: {new Date(posts.post.date).toLocaleDateString('ru')}
                            </Typography>
                        </Stack>

                        {posts.commentsForPost.map((comment, index) => {
                            return (
                                <Card variant={'outlined'} sx={{ borderWidth: 1, borderColor: '#000000', borderRadius: 5, marginBottom: 2}}>
                                    <CardHeader
                                        style={{ background: '#D5E7F6', height: 22}}
                                        avatar={
                                            <Avatar></Avatar>
                                        }
                                        subheader={new Date(comment.date).toLocaleDateString('ru')}
                                        title={
                                            <Typography variant="body">
                                                {/*{posts.users.find(user => user.id === comment.user)?.username}*/}
                                                {posts.users.find(user => user.id === comment.user)?.first_name + ' ' + posts.users.find(user => user.id === comment.user)?.last_name}

                                            </Typography>
                                        }
                                    />
                                    <CardContent style={{ background: '#F4FCFF'}}>
                                        <Typography variant="body1">
                                            {comment.text}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )
                        })}

                        {auth.auth === 1 &&
                            <Card variant={'outlined'} sx={{ borderWidth: 1, borderColor: '#000000', borderRadius: 5, marginBottom: 2}}>
                                <CardHeader
                                    style={{ background: '#D5E7F6', height: 22}}
                                    avatar={
                                        <Avatar></Avatar>
                                    }
                                    subheader={curDate}
                                    title={
                                        <Typography variant="body">
                                            {auth.username}
                                        </Typography>
                                    }
                                />
                                <CardContent style={{ background: '#F4FCFF'}}>
                                    <TextField
                                        // disabled
                                        id="reviewId"
                                        multiline
                                        label="Рецензия"
                                        placeholder="Введите рецензию к публикации..."
                                        minRows={3}
                                        margin={'dense'}
                                        fullWidth
                                        InputProps={{
                                            style: {
                                                background: '#FFFFFF'
                                            }
                                        }}
                                    />
                                </CardContent>
                                <CardActions sx={{ direction: 'rtl', background: '#F4FCFF'}}>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        sx={{ boxShadow: 'none',
                                            backgroundColor: '#9CC4FF',
                                            color: '#000000',
                                            direction: 'ltr',
                                            borderRadius: 3}}
                                        onClick={() => { newRevHandler() }}
                                        // onClick={() => { notify() }}

                                    >Опубликовать</Button>
                                </CardActions>
                            </Card>
                        }

                    </div>

                    ): null }

            </div>
        </div>
    );
}

export default Publication;