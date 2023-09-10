import { useMemo, type FC, useState } from 'react'

import classnames from 'classnames'
import { formatTime } from 'utils'

import styles from './MessageBox.module.scss'
import { T_MessageBoxProps } from './types'
import Skeleton from 'components/Skeleton'

const MessageBox: FC<T_MessageBoxProps> = ({ joinedUsername, senderUsername, message, avatar, messageDate }) => {
  const [load, setLoad] = useState(false)

  const isSameUser = useMemo(() => joinedUsername === senderUsername, [joinedUsername, senderUsername])

  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.wrapper__own__message]: isSameUser,
      })}
    >
      <div
        className={classnames(styles.wrapper__inner, {
          [styles.wrapper__inner__own__message]: isSameUser,
        })}
      >
        <p>{message}</p>
        <p className={styles.wrapper__inner__date}>{formatTime(messageDate)}</p>
      </div>
      {!load && <Skeleton className={styles.wrapper__loading} />}
      <img
        className={styles.wrapper__avatar}
        onLoad={() => setLoad(true)}
        src={avatar}
        loading='lazy'
        alt='user avatar'
        width={load ? 40 : 0}
        height={load ? 40 : 0}
      />
    </div>
  )
}

export default MessageBox
