import { useMemo, type FC } from 'react'

import classNames from 'classnames'

import { formatTime } from 'utils'

import styles from './MessageBox.module.scss'
import { T_MessageBoxProps } from './types'

const MessageBox: FC<T_MessageBoxProps> = ({ joinedUsername, senderUsername, message, messageDate }) => {
  const isSameUser = useMemo(() => joinedUsername === senderUsername, [joinedUsername, senderUsername])

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper__own__message]: isSameUser,
      })}
    >
      <div
        className={classNames(styles.wrapper__inner, {
          [styles.wrapper__inner__own__message]: isSameUser,
        })}
      >
        <p>{senderUsername}</p>
        <p>{message}</p>
        <p className={styles.wrapper__inner__date}>{formatTime(messageDate)}</p>
      </div>
    </div>
  )
}

export default MessageBox
