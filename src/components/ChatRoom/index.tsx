import { FC, useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

import { MessageBox } from 'components'

import { T_ChatRoomProps, T_Message } from './types'
import styles from './ChatRoom.module.scss'

const ChatRoom: FC<T_ChatRoomProps> = ({ username, onLogoutClickHandler }) => {
  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessage] = useState<T_Message[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const onMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (inputRef.current) {
      socket?.emit('message', { username, message: inputRef.current.value })
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    let mount = true

    const socket = io('ws://localhost:8000')
    setSocket(socket)

    return () => {
      mount = false

      if (!mount) {
        socket?.emit('leave', username)
        socket?.disconnect()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // to check if we have multiple tabs with the same username logout all sessions with socket

  useEffect(() => {
    socket?.on('leave_room', data => {
      if (data === username) {
        onLogoutClickHandler()
      }
    })

    socket?.on('receive_message', (data: T_Message) => {
      if (data) setMessage(prev => [...prev, data])
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scroll({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__top}>
        <p>Chat Room</p>
      </div>
      <div className={styles.wrapper__middle}>
        <div ref={listRef} about='' className={styles.wrapper__middle__inner}>
          {messages.map(element => (
            <MessageBox
              key={element.id}
              messageDate={element.date}
              message={element.message}
              joinedUsername={username}
              senderUsername={element.username}
            />
          ))}
        </div>
      </div>
      <form className={styles.wrapper__bottom} onSubmit={onMessageSubmit}>
        <input ref={inputRef} className={styles.wrapper__bottom__input} placeholder='Type a message' />
        <button className={styles.wrapper__bottom__button} type='submit'>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatRoom
