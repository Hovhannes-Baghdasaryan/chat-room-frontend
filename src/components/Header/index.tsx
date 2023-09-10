import { FC } from 'react'

import styles from './Header.module.scss'
import { T_HeaderProps } from './types'

const Header: FC<T_HeaderProps> = ({ username, avatar, onLogoutClickHandler }) => (
  <header className={styles.wrapper}>
    <h1 className={styles.wrapper__title}>Chat Room</h1>
    <p className={styles.wrapper__info}>{username ? `Logged In ${username}` : 'Join to start chatting'}</p>
    <div className={styles.wrapper__profile}>
      {avatar && (
        <img className={styles.wrapper__profile__avatar} src={avatar} alt='user avatar' width={40} height={40} />
      )}
      <button className={styles.wrapper__profile__button} onClick={onLogoutClickHandler}>
        {username && 'Logout'}
      </button>
    </div>
  </header>
)

export default Header
