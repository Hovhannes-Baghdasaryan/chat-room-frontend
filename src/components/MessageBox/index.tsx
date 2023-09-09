import type { FC } from 'react'

import classNames from 'classnames'
import moment from 'moment'

import styles from './MessageBox.module.scss'
import { T_MessageBoxProps } from './types'

const MessageBox: FC<T_MessageBoxProps> = ({ joinedUsername, senderUsername, message, messageDate }) => (
  <div
    className={classNames(styles.wrapper, {
      [styles.wrapper__own__message]: joinedUsername === senderUsername,
    })}
  >
    <div
      className={classNames(styles.wrapper__inner, {
        [styles.wrapper__inner__own__message]: joinedUsername === senderUsername,
      })}
    >
      <p>{senderUsername}</p>
      <p>{message}</p>
      <p className={styles.wrapper__inner__date}>{moment(messageDate).format('LT')}</p>
    </div>
  </div>
)

export default MessageBox
