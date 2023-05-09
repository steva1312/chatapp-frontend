import React, { useState } from 'react'
import Enter from './Enter'
import Chat from './Chat'

function App() {
  const [username, setUsername] = useState('')

  return <div>{username === '' ? <Enter saveUsername={setUsername} /> : <Chat username={username} />}</div>
}

export default App
