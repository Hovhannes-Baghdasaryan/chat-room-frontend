import { FC, useState } from 'react'

import { Skeleton } from 'components'

import styles from './Header.module.scss'
import { T_HeaderProps } from './types'

const Header: FC<T_HeaderProps> = ({ username, avatar, onLogoutClickHandler }) => {
  const [isLoad, setIsLoad] = useState(false)

  return (
    <header className={styles.wrapper}>
      <h1 className={styles.wrapper__title}>Chat Room</h1>
      <p className={styles.wrapper__info}>{username ? `Logged In ${username}` : 'Join to start chatting'}</p>
      <div className={styles.wrapper__profile}>
        {isLoad && <Skeleton />}
        <img
          className={styles.wrapper__profile__avatar}
          onLoad={() => {
            setIsLoad(true)
          }}
          src={avatar}
          loading='lazy'
          alt='user avatar'
          width={isLoad ? 40 : 0}
          height={isLoad ? 40 : 0}
        />
        <button className={styles.wrapper__profile__button} onClick={onLogoutClickHandler}>
          {username && 'Logout'}
        </button>
      </div>
    </header>
  )
}

export default Header
