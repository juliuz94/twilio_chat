import { useState, useEffect, useCallback } from 'react'
import Header from '../Header'
import Lobby from '../Lobby'
import Room from '../Room'
import VideoRoom from '../VideoRoom'
import ChatRoom from '../ChatRoom'
import styles from './styles.module.css'

const VideoChat = ({appointmentData, userType, ...props}) => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const [chatToken, setChatToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, [])

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, [])

  // const handleSubmit = useCallback(async event => {
  //   event.preventDefault();
  //   try {
  //     const data = await fetch('api/videoToken', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         identity: username,
  //         room: roomName
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }).then(res => res.json());
  //     setToken(data);

  //     const chatData = await fetch('api/chatToken', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         identity: username
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }).then(res => res.json());
  //     setChatToken(chatData)

  //   } catch (error) {
  //     console.log('error =>', error)
  //     console.log('error stack =>', error.stack)
  //   }
  // }, [username, roomName]);

  useEffect(async () => {
    setRoomName(appointmentData.id)
    console.log(userType)
    try {
      const data = await fetch('api/videoToken', {
        method: 'POST',
        body: JSON.stringify({
          identity: userType === 'patient' ? `${appointmentData.id_usuario.nombre} ${appointmentData.id_usuario.apellido}` : `${appointmentData.id_medico.nombre} ${appointmentData.id_medico.apellido}`,
          room: appointmentData.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data);

      const chatData = await fetch('api/chatToken', {
        method: 'POST',
        body: JSON.stringify({
          identity: userType === 'patient' ? `${appointmentData.id_usuario.nombre} ${appointmentData.id_usuario.apellido}` : `${appointmentData.id_medico.nombre} ${appointmentData.id_medico.apellido}`
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setChatToken(chatData)

    } catch (error) {
      console.log('error =>', error)
      console.log('error stack =>', error.stack)
    }
  }, [appointmentData, userType])

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  // let render;
  // if (token) {
  //   render = (
  //     // <Room roomName={roomName} token={token} handleLogout={handleLogout} />
  //     <>
  //       <VideoRoom roomName={roomName} token={token} chatToken={chatToken} handleLogout={handleLogout} />
  //     </>
  //   );
  // } else {
  //   render = (
  //     <Lobby
  //       username={username}
  //       roomName={roomName}
  //       handleUsernameChange={handleUsernameChange}
  //       handleRoomNameChange={handleRoomNameChange}
  //       handleSubmit={handleSubmit}
  //     />
  //   );
  // }

  return (
    <div className={styles.room_container}>
      <Header />
      <div>
        {/* {render} */}
        { (token && chatToken ) ? <VideoRoom roomName={roomName} token={token} chatToken={chatToken} handleLogout={handleLogout} /> : 'Loading...'}
      </div>
    </div>
  );
};

export default VideoChat;