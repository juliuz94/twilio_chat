import { useState, useCallback } from 'react'
import Header from '../Header'
import Lobby from '../Lobby'
import Room from '../Room'
import VideoRoom from '../VideoRoom'
import styles from './styles.module.css'

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, [])

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, [])

  const handleSubmit = useCallback(async event => {
    event.preventDefault();
    const data = await fetch('api/videoToken', {
      method: 'POST',
      body: JSON.stringify({
        identity: username,
        room: roomName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    console.log(data)
    setToken(data);
  }, [username, roomName]);

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      // <Room roomName={roomName} token={token} handleLogout={handleLogout} />
      <VideoRoom roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className={styles.room_container}>
      <Header />
      <div>
        {render}
      </div>
    </div>
  );
};

export default VideoChat;