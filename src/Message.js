import React from 'react'

function Message({ message: { message, user, img } }) {
  return (
    <div>
      {user ? (
        <p>
          <b>{user.username}:</b>
        </p>
      ) : null}

      {img ? <img src={'http://localhost:3001/images/' + img} width='500' /> : <p>{message}</p>}
    </div>
  )
}

export default Message
