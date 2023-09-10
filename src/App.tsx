import { FC, useCallback, useState } from 'react'

import { ChatRoom, Header, Join } from 'components'

import 'styles/index.global.scss'

import styles from './App.module.scss'

const App: FC = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '')
  const [avatar, setAvatar] = useState<string>(localStorage.getItem('avatar') || '')

  const onLogoutClickHandler = useCallback(() => {
    setUsername('')
    setAvatar('')
    localStorage.removeItem('avatar')
    localStorage.removeItem('username')
  }, [])

  return (
    <main className={styles.wrapper}>
      <Header avatar={avatar} username={username} onLogoutClickHandler={onLogoutClickHandler} />
      <section className={styles.wrapper__main}>
        {!username ? (
          <Join setAvatar={setAvatar} setUsername={setUsername} />
        ) : (
          <ChatRoom userAvatar={avatar} onLogoutClickHandler={onLogoutClickHandler} username={username} />
        )}
      </section>
    </main>
  )
}

export default App
