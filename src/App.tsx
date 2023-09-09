import { FC, useCallback, useRef, useState } from 'react'

import { ChatRoom, Header, Join } from 'components'

import 'styles/index.global.scss'

import styles from './App.module.scss'

const App: FC = () => {
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '')

  const ref = useRef<HTMLInputElement>(null)

  const onLogoutClickHandler = useCallback(() => {
    setUsername('')
    localStorage.removeItem('username')
  }, [])

  const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (ref.current) {
      setUsername(ref.current.value)
      localStorage.setItem('username', ref.current.value)
    }
  }, [])

  return (
    <main className={styles.wrapper}>
      <Header username={username} onLogoutClickHandler={onLogoutClickHandler} />
      <section className={styles.wrapper__main}>
        {!username ? (
          <Join ref={ref} onSubmitHandler={onSubmitHandler} />
        ) : (
          <ChatRoom onLogoutClickHandler={onLogoutClickHandler} username={username} />
        )}
      </section>
    </main>
  )
}

export default App
