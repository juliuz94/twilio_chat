import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css'
import MutedMicroPhoneIcon from '../Icons/MutedMicrophoneIcon'
import MutedCameraIcon from '../Icons/MutedCameraIcon'
import UserIcon from '../Icons/UserIcon'

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = trackMap => Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

  useEffect(() => {
    const trackSubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => [...videoTracks, track]);
      } else {
        setAudioTracks(audioTracks => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = track => {
      if (track.kind === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(v => v !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(a => a !== track));
      }
    };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  // useEffect(() => {
  //   const videoTrack = videoTracks[0];
  //   if (videoTrack) {
  //     videoTrack.attach(videoRef.current);
  //     return () => {
  //       videoTrack.detach();
  //     };
  //   }
  // }, [videoTracks]);
  useEffect(() => {
    const videoTrack = videoTracks[0];
    console.log(videoTrack)
    if (videoTrack) {
      if (!videoTrack.isEnabled) {
        videoTrack.detach();
        setAudioMuted(true)
      } else {
        videoTrack.attach(videoRef.current);
      }
      videoTrack.on('disabled', () => {
        console.log(`${participant.identity} disabled Video`)
        setVideoMuted(true)
      });
      videoTrack.on('enabled', () => {
        console.log(`${participant.identity} enabled Video`)
        setVideoMuted(false)
      });
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks, videoMuted]);

  // useEffect(() => {
  //   console.log(audioTracks)
  //   const audioTrack = audioTracks[0];
  //   if (audioTrack) {
  //     audioTrack.attach(audioRef.current);
  //     return () => {
  //       audioTrack.detach();
  //     };
  //   }
  // }, [audioTracks]);
  useEffect(() => {
    const audioTrack = audioTracks[0];
    console.log(audioTrack)
    if (audioTrack && audioTrack !== 'undefined') {
      if (!audioTrack.isEnabled) {
        setAudioMuted(true)
        audioTrack.detach();
      } else {
        audioTrack.attach(audioRef.current);
      }
      audioTrack.on('disabled', () => {
        console.log(`${participant.identity} disabled Audio`)
        setAudioMuted(true)
      });
      audioTrack.on('enabled', () => {
        console.log(`${participant.identity} enabled Audio`)
        setAudioMuted(false)
      });
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks, audioMuted]);


  // more to come

  return (
    <div className={styles.participant}>

      { (videoMuted || audioMuted ) && 
        <div className={styles.icons}>
          {videoMuted && <MutedCameraIcon />}
          {audioMuted && <MutedMicroPhoneIcon />}
        </div>
      }

      <div className={styles.image_container}>
        {videoMuted ?
          <div className={styles.user_icon_container}>
            <UserIcon size={45} width={10} />
          </div>
          :
          <video ref={videoRef} autoPlay={true} />
        }
      </div>
      <audio ref={audioRef} autoPlay={true} muted={false} />
      <h3>{participant.identity}</h3>
    </div>
  );
};

export default Participant;
