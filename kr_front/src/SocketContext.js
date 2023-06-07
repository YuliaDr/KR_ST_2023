import {createContext, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {wait} from "@testing-library/user-event/dist/utils";


export const SocketContext = createContext(null)

export function SocketProvider({ children }) {

    const [value, setValue] = useState('');
    const socket = useRef()
    const [connected, setConnected] = useState(false);

    const auth = useSelector(state => state.auth)


    // function connect(user_id) {
    //     const newSocket = io('ws://localhost:8000/ws/notifications/');
    //
    //     newSocket.on('connect', () => {
    //         newSocket.emit('register', { user_id });
    //     });
    //
    //     setSocket(newSocket);
    // }

    function connect() {
        socket.current = new WebSocket('ws://127.0.0.1:8000/ws/postinfo/')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                user: auth.user.id,
                id: Date.now()
            }

            wait(3).then(r => socket.current.send(JSON.stringify(message)))


            //
            // const JSONmessage = JSON.stringify(message)
            //
            // socket.current.waitForConnection = function (callback, interval) {
            //     if (socket.current.readyState === 1) {
            //         callback();
            //     } else {
            //         var that = this;
            //         // optional: implement backoff for interval here
            //         setTimeout(function () {
            //             that.waitForConnection(callback, interval);
            //         }, interval);
            //     }
            // };
            //
            // socket.current.send = function (JSONmessage, callback) {
            //     socket.current.waitForConnection(function () {
            //         socket.current.send(JSONmessage);
            //         if (typeof callback !== 'undefined') {
            //             callback();
            //         }
            //     }, 1000);
            // };



        }


        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            console.log('12345', message)
            alert(`${message.username_reviewer} оставил(а) рецензию на вашу публикацию "${message.title}"`)
            // alert('На вашу публикацию написали новую рецензию!')
            // setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('Socket закрыт')
        }

        socket.current.onerror = (error) => {
            console.log(error, 'error')
            console.log('Socket произошла ошибка')
        }


        //setSocket(socket)
    }

    const notify = async (post, title, id_poster, email) => {
        const message = {
            id_post: post,
            id_reviewer: auth.user.id,
            username_reviewer: auth.user.first_name + ' ' + auth.user.last_name,
            title: title,
            email: email,
            id_poster: id_poster,
            id: Date.now(),
            event: 'notification'
        }
        socket.current.send(JSON.stringify(message));
        setValue('')
    }

    const disconnect = async () => {
        // const message = {
        //     username,
        //     message: value,
        //     id: Date.now(),
        //     event: 'message'
        // }
        socket.current.close();
        // setValue('')
    }

    // function disconnect() {
    //     if (socket) {
    //         socket.disconnect();
    //         //setSocket(null);
    //     }
    // }

    return (
        <SocketContext.Provider value={{ socket, connect, notify, disconnect }}>
            {children}
        </SocketContext.Provider>
    );
}

