import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import Message from './Message'
import axios from './api/axios'

let socket

function Chat({ username }) {
  const [userObject, setUserObject] = useState()
  const [userMessage, setUserMessage] = useState('')
  const [activeUsers, setActiveUsers] = useState([])
  const [messages, setMessages] = useState([])

  const inputImageRef = useRef()

  useEffect(() => {
    socket = io.connect('https://one312dopisivanje.onrender.com/')

    socket.on('user-joined', user => {
      setActiveUsers(prevActiveUsers => [...prevActiveUsers, user])

      setMessages(prevMessages => [...prevMessages, { message: `${user.username} has joined!`, user: null, img: null }])
    })

    socket.on('user-left', user => {
      setActiveUsers(prevActiveUsers => prevActiveUsers.filter(u => u.id !== user.id))

      setMessages(prevMessages => [...prevMessages, { message: `${user.username} has left...`, user: null, img: null }])
    })

    socket.on('receive-message', message => {
      setMessages(prevMessage => [...prevMessage, message])
    })

    socket.emit('join', username, ({ users }) => {
      setUserObject(users[users.length - 1])

      setActiveUsers(users)
    })

    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [username])

  function sendMessage(e) {
    e.preventDefault()

    socket.emit('send-message', { message: userMessage, user: userObject, img: null })

    setUserMessage('')
  }

  //async if needed
  function sendImage(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('files', inputImageRef.current.files[0])
    formData.append('user', JSON.stringify(userObject))

    console.log(formData)

    axios.post('/image', formData)
  }

  return (
    <div>
      <form onSubmit={sendMessage}>
        <input value={userMessage} onChange={e => setUserMessage(e.target.value)} placeholder='Write a message...' />
        <button>Send</button>
      </form>

      <form encType='multipart/form-data' onSubmit={sendImage}>
        <input ref={inputImageRef} id='file' type='file' accept='image/*' />
        <button>Send image</button>
      </form>

      <div>
        {messages.map((message, i) => (
          <Message key={i} message={message} />
        ))}
      </div>

      <ul>{activeUsers.map(user => (user.username !== username ? <li key={user.id}>{user.username}</li> : null))}</ul>
    </div>
  )
}

export default Chat
