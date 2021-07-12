import { useState, useEffect } from 'react'
import Video from 'twilio-video';
import Participant from '../Participant'
import ExternalParticipant from '../ExternalParticipant'
import styles from './styles.module.css'
import MicrophoneIcon from '../Icons/MicrophoneIcon'
import CameraIcon from '../Icons/CameraIcon'
import PhoneIcon from '../Icons/PhoneIcon'
import ChatIcon from '../Icons/ChatIcon'

const VideoRoom = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };
    Video.connect(token, {
      name: roomName
    }).then(room => {
      console.log(room)
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <ExternalParticipant key={participant.sid} participant={participant} />
  ));

  const trackpubsToTracks = trackMap => {
    const tracksArr = Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);
    console.log(tracksArr)
    return tracksArr
  };

  const handleVideoToggle = () => {
    const videoTracks = trackpubsToTracks(room.localParticipant.videoTracks)
    const track = videoTracks[0]
    if (track.isEnabled) {
      console.log('Video Muted')
      track.disable();
      setVideoMuted(true)
    } else {
      console.log('Video Disabled')
      track.enable()
      setVideoMuted(false)
    }
  }

  const handleAudioToggle = () => {
    console.log(room.localParticipant.audioTracks)
    const audioTracks = trackpubsToTracks(room.localParticipant.audioTracks)
    const track = audioTracks[0]
    if (track.isEnabled) {
      console.log('Muted Self')
      track.disable();
      setAudioMuted(true)
    } else {
      console.log('Unmuted Self')
      track.enable()
      setAudioMuted(false)
    }
  }

  return (
    <section className={styles.room_container}>
      <div className={styles.participants}>
        <div className={styles.external_participants}>
          {remoteParticipants}
        </div>
        <div className={styles.local_participant}>
          {room ? (
            <Participant
              key={room.localParticipant.sid}
              participant={room.localParticipant}
              audioMuted={audioMuted}
              videoMuted={videoMuted}
            />
          ) : (
            ''
          )}
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.data_col}>
          {roomName}
        </div>
        <div className={styles.actions_col}>
          <button className={styles.action_button} onClick={() => handleAudioToggle()}>
            <MicrophoneIcon />
          </button>
          <button className={styles.action_button} onClick={() => handleVideoToggle()}>
            <CameraIcon />
          </button>
          <button className={styles.action_button} onClick={handleLogout}>
            <PhoneIcon />
          </button>
        </div>
        <div className={styles.chat_col}>
          <ChatIcon />
        </div>

      </footer>
    </section>
  )
}

export default VideoRoom