import { FC, useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

import { axiosInstance } from 'libraries'
import { MessageBox, Skeleton } from 'components'

import { T_ChatRoomProps, T_Message } from './types'
import styles from './ChatRoom.module.scss'

const ChatRoom: FC<T_ChatRoomProps> = ({ username, userAvatar, onLogoutClickHandler }) => {
  const [socket, setSocket] = useState<Socket>()
  const [typingUser, setTyping] = useState<string | null>(null)
  const [messages, setMessage] = useState<T_Message[]>([])
  const [loading, setLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const onMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (inputRef.current) {
      socket?.emit('message', { username, userAvatar, message: inputRef.current.value })
      inputRef.current.value = ''
    }
  }

  const onInputFocus = () => {
    socket?.emit('typing', username)
  }

  const onInputBlur = () => {
    socket?.emit('typing', '')
  }

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setLoading(true)
        const { data } = await axiosInstance.get('messages')
        setLoading(false)

        setMessage(data)
      } catch (err) {
        setLoading(false)
      }
    }

    let mount = true

    const socket = io('ws://localhost:8000')
    setSocket(socket)

    fetchMessage()

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

    socket?.on('receive_typing', username => {
      setTyping(username)
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

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scroll({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [typingUser])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__top}>
        <p>Chat Room</p>
      </div>

      <div className={styles.wrapper__middle}>
        <div ref={listRef} className={styles.wrapper__middle__inner}>
          {!loading
            ? messages.map(element => (
                <MessageBox
                  key={element.id}
                  avatar={element.userAvatar}
                  message={element.message}
                  joinedUsername={username}
                  senderUsername={element.username}
                  messageDate={new Date(element.date)}
                />
              ))
            : [1, 2, 3, 4, 5].map(element => (
                <Skeleton key={element} className={styles.wrapper__middle__inner__loading} />
              ))}

          {typingUser !== username && typingUser && (
            <p className={styles.wrapper__middle__inner__typing}>{typingUser} is typing...</p>
          )}
        </div>
      </div>
      <form className={styles.wrapper__bottom} onSubmit={onMessageSubmit}>
        <input
          ref={inputRef}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          className={styles.wrapper__bottom__input}
          placeholder='Type a message'
        />
        <button className={styles.wrapper__bottom__button} type='submit'>
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatRoom
