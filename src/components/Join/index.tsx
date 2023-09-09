import { LegacyRef, forwardRef } from 'react'

import styles from './Join.module.scss'
import { T_JoinProps } from './types'

const Join = forwardRef(({ onSubmitHandler }: T_JoinProps, ref: LegacyRef<HTMLInputElement>) => (
  <form className={styles.form} onSubmit={onSubmitHandler}>
    <input ref={ref} className={styles.form__input} type='text' />
    <button className={styles.form__button} type='submit'>
      Join
    </button>
  </form>
))

export default Join
