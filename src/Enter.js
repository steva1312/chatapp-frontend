import React, { useState } from 'react'

function Enter({ saveUsername }) {
  const [username, setUsername] = useState('')

  function formSubmit(e) {
    e.preventDefault()

    const trimmedUsername = username.trim()

    if (trimmedUsername !== '') {
      saveUsername(trimmedUsername)
    }
  }

  return (
    <div className='center enter'>
      <form onSubmit={formSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder='Enter your name...' />
        <button>Enter</button>
      </form>
    </div>
  )
}

export default Enter
