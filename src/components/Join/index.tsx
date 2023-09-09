import { LegacyRef, forwardRef } from 'react'

import styles from './Join.module.scss'
import { T_JoinProps } from './types'

const Join = forwardRef(
  ({ onSubmitHandler, onChangeFile, filePreview }: T_JoinProps, ref: LegacyRef<HTMLInputElement>) => (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <input ref={ref} className={styles.form__input} required />
      <div className={styles.form__upload}>
        <label htmlFor='imageUpload' className={styles.form__upload__label}>
          Upload
        </label>

        <input className={styles.form__upload__input} type='file' id='imageUpload' onChange={onChangeFile} />
      </div>
      {filePreview && <img src={filePreview} width={100} height={100} />}
      <button className={styles.form__button} type='submit'>
        Join
      </button>
    </form>
  )
)

export default Join
