import { FC } from 'react'

import styles from './Header.module.scss'
import { T_HeaderProps } from './types'

const Header: FC<T_HeaderProps> = ({ username, onLogoutClickHandler }) => (
  <header className={styles.wrapper}>
    <h1 className={styles.wrapper__title}>Chat Room</h1>
    <p className={styles.wrapper__info}>{username ? `Logged In ${username}` : 'Join to start chatting'}</p>
    <button className={styles.wrapper__button} onClick={onLogoutClickHandler}>
      {username && 'Logout'}
    </button>
  </header>
)

export default Header
