// import React, {useEffect, useRef, useState} from 'react';
// import Button from "@mui/material/Button";
// import {useSelector} from "react-redux";
// // import axios from "axios";
//
// const WebSock = () => {
//     const [messages, setMessages] = useState([]);
//     const [value, setValue] = useState('');
//     const socket = useRef()
//     const [connected, setConnected] = useState(false);
//     const [username, setUsername] = useState('')
//     const auth = useSelector(state => state.auth)
//
//     function connect() {
//         socket.current = new WebSocket('ws://localhost:5000')
//
//         socket.current.onopen = () => {
//             setConnected(true)
//             const message = {
//                 event: 'connection',
//                 user: auth.user.id,
//                 id: Date.now()
//             }
//             socket.current.send(JSON.stringify(message))
//         }
//         socket.current.onmessage = (event) => {
//             const message = JSON.parse(event.data)
//             console.log('12345', message)
//             alert('Новое сообщение')
//             setMessages(prev => [message, ...prev])
//         }
//         socket.current.onclose= () => {
//             console.log('Socket закрыт')
//         }
//         socket.current.onerror = () => {
//             console.log('Socket произошла ошибка')
//         }
//
//     }
//     const notify = async () => {
//         const message = {
//             username,
//             message: value,
//             id: Date.now(),
//             event: 'message'
//         }
//         socket.current.send(JSON.stringify(message));
//         setValue('')
//     }
//
//     //
//     // if (!connected) {
//     //     return (
//     //         <div className="center">
//     //             <div className="form">
//     //                 <input
//     //                     value={username}
//     //                     onChange={e => setUsername(e.target.value)}
//     //                     type="text"
//     //                     placeholder="Введите ваше имя"/>
//     //                 <button onClick={connect}>Войти</button>
//     //             </div>
//     //         </div>
//     //     )
//     // }
//
//     return (
//         <>
//             { !connected &&
//                 <>{connect}</>
//             }
//             { auth.auth === 1 &&
//                 <>
//                     { !connected &&
//                         <>{connect}</>
//                     }
//                     <Button
//                         size="small"
//                         variant="contained"
//                         sx={{ boxShadow: 'none',
//                             backgroundColor: '#9CC4FF',
//                             color: '#000000',
//                             direction: 'ltr',
//                             borderRadius: 3}}
//                         onClick={() => { connect() }}
//                     >Подключение</Button>
//                     <Button
//                         size="small"
//                         variant="contained"
//                         sx={{ boxShadow: 'none',
//                             backgroundColor: '#9CC4FF',
//                             color: '#000000',
//                             direction: 'ltr',
//                             borderRadius: 3}}
//                         onClick={ notify }
//                     >Уведомление</Button>
//
//                 </>
//
//             }
//
//         </>
//
//
//
//     )
//
// }
//
// export default WebSock;