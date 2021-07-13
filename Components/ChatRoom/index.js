import { useState, useEffect, useCallback, useRef } from 'react';
import Chat from 'twilio-chat';
import styles from './styles.module.css';
import SendIcon from '../Icons/SendIcon';
import Loader from "react-loader-spinner";
import { DateTime } from 'luxon';

const ChatRoom = ({ token, roomName, closeChat }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(async () => {
    if (token) {
      const client = await Chat.create(token)
      setupChatClient(client)
      setClient(client)
    }
    return (() => {
      client.shutdown()
      client(null)
      channel(null)
      messages([])
    })
  }, [token]);

  const setupChatClient = async (client) => {

    let channel

    try {

      channel = await client.getChannelByUniqueName(roomName)

    } catch (error) {

      if (error.body.code === 50300) {
        channel = await client.createChannel({ uniqueName: roomName });
      }

      console.log(error)

    }

    if (channel) {
      setChannel(channel)
      channel.join().catch(function (err) { });
      channel.getMessages().then(messages => {
        messagesLoaded(messages)
        setLoading(false)
        scrollToBottom()
      })
      channel.on('messageAdded', messageAdded);

    }

    // client.getChannelByUniqueName('general')
    //   .then(channel => {
    //     console.log(channel)
    //     chan = channel
    //     // chan = channel
    //     // setChannel(channel)
    //   })
    //   .catch(error => {
    //     if (error.body.code === 50300) {
    //       console.log('doesnt exist')
    //       return client.createChannel({ uniqueName: 'general' });
    //     } else {
    //       console.log('channel exists')
    //       console.log('error => ', error)
    //     }
    //   })
    //   .then(channel => {
    //     console.log(channel)
    //     chan = channel
    //     // setChannel(channel)
    //     return channel.join().catch(() => { });
    //   })
    //   .then(() => {
    //     console.log('worked')
    //     chan.getMessages().then(messages => messagesLoaded(messages))
    //     chan.on('messageAdded', messageAdded);
    //     setLoading(false)
    //   })
    //   .catch(error => console.log(error));
  }

  const formatMessage = (message) => {
    return {
      text: message.body,
      author: message.author,
      timestamp: message.state.timestamp
    }
  }

  const messagesLoaded = (messagePage) => {
    setMessages(messagePage.items.map(message => formatMessage(message)))
    scrollToBottom()
    console.log(messagePage.items.map(message => formatMessage(message)))
  }

  const messageAdded = (message) => {
    setMessages(prevMessages => [...prevMessages, formatMessage(message)]);
    scrollToBottom();
  }

  const sendMessage = (event) => {
    event.preventDefault();
    setMessage('')
    scrollToBottom()
    channel.sendMessage(message);
  }

  const handleMessageChange = useCallback(event => {
    setMessage(event.target.value)
    // setMessage(event.target.value);
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className={styles.chat_window}>
      <div className={styles.chat_header}>
        <h4>
          Mensajes
        </h4>
        <button className={styles.closeChat} onClick={closeChat}>
          X
        </button>
      </div>
      <div className={`${styles.messages_container} ${loading && styles.align_center}`}>
        {
          loading ?
            <Loader
              type="Puff"
              color="#00BFFF"
              height={50}
              width={50}
              timeout={false} //3 secs
            />
            : (messages.length > 0) && messages.map(item => (
              <div className={`${styles.message} ${channel.configuration.userIdentity === item.author ? styles.local_message : styles.external_message}`}>
                <div className={styles.message_wrapper}>
                  <p className={styles.message_sender}>
                    {channel.configuration.userIdentity === item.author ? 'Tú' : item.author} -
                    {/* <span className={styles.message_time}>{new Date(item.timestamp).toString()}</span> */}
                    <span className={styles.message_time}>{
                      DateTime.fromObject(item.timestamp).setLocale('es').toLocaleString(DateTime.DATETIME_MED)
                    }</span>
                  </p>
                  <p className={styles.message_content}>{item.text}</p>
                </div>
              </div>
            ))
        }
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.form_container}>
        <form onSubmit={sendMessage}>
          <textarea
            type="text"
            id="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Escríbe un mensaje"
            required
          />
          <button className={styles.submit_button}>
            <SendIcon size={20} />
          </button>
        </form>
      </div>

    </div>
  )
}
export default ChatRoom