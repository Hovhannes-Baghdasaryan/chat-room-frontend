import { FC, useCallback, useRef, useState } from 'react'

import { axiosInstance } from 'libraries'
import { ChatRoom, Header, Join } from 'components'

import 'styles/index.global.scss'

import styles from './App.module.scss'

const App: FC = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '')
  const [avatar, setAvatar] = useState<string>(localStorage.getItem('avatar') || '')

  const [file, setFile] = useState<File>()
  const [filePreview, setFilePreview] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const onLogoutClickHandler = useCallback(() => {
    setUsername('')
    setAvatar('')
    localStorage.removeItem('avatar')
    localStorage.removeItem('username')
  }, [])

  const onChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])

      const fileObjectURL = URL.createObjectURL(e.target.files[0])

      setFilePreview(fileObjectURL)
    }
  }, [])

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const joinUser = async () => {
        const formData = new FormData()

        if (file) formData.append('file', file)

        if (inputRef.current) {
          formData.append('username', inputRef.current.value)
        }

        const { data } = await axiosInstance.post('join', formData)

        localStorage.setItem('username', data.username)
        localStorage.setItem('avatar', data.avatar)
        setUsername(data.username)
        setAvatar(data.avatar)
      }

      joinUser()
    },
    [file]
  )

  return (
    <main className={styles.wrapper}>
      <Header avatar={avatar} username={username} onLogoutClickHandler={onLogoutClickHandler} />
      <section className={styles.wrapper__main}>
        {!username ? (
          <Join
            ref={inputRef}
            filePreview={filePreview}
            onChangeFile={onChangeFile}
            onSubmitHandler={onSubmitHandler}
          />
        ) : (
          <ChatRoom userAvatar={avatar} onLogoutClickHandler={onLogoutClickHandler} username={username} />
        )}
      </section>
    </main>
  )
}

export default App
