import { FC, useRef, useState } from 'react'

import { axiosInstance } from 'libraries'

import styles from './Join.module.scss'
import { T_JoinProps } from './types'

const Join: FC<T_JoinProps> = ({ setAvatar, setUsername }) => {
  const [file, setFile] = useState<File>()
  const [loading, setLoading] = useState(false)
  const [filePreview, setFilePreview] = useState('')
  const [filePreviewError, setFilePreviewError] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const joinUser = async () => {
      const formData = new FormData()

      if (file) formData.append('file', file)

      if (inputRef.current) {
        formData.append('username', inputRef.current.value)
      }

      try {
        setLoading(true)
        const { data } = await axiosInstance.post('join', formData)
        setLoading(false)

        localStorage.setItem('username', data.username)
        localStorage.setItem('avatar', data.avatar)
        setUsername(data.username)
        setAvatar(data.avatar)
        setFilePreview('')
      } catch (err: any) {
        setLoading(false)
        setFilePreviewError(err?.response?.data?.message)
      }
    }

    joinUser()
  }

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileObjectURL = URL.createObjectURL(e.target.files[0])

      setFile(e.target.files[0])
      setFilePreview(fileObjectURL)

      if (filePreviewError) setFilePreviewError('')
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={styles.form__inner}>
        <input ref={inputRef} className={styles.form__inner__input} disabled={loading} required />
        <div className={styles.form__inner__upload} role='button'>
          <label htmlFor='imageUpload' className={styles.form__inner__upload__label}>
            Upload
          </label>

          <input onChange={onChangeFile} className={styles.form__inner__upload__input} type='file' id='imageUpload' />
        </div>
      </div>
      {filePreview && <img style={{ borderRadius: '50%' }} src={filePreview} width={70} height={70} />}
      {filePreviewError && <p className={styles.form__error}>{filePreviewError}</p>}
      <button disabled={loading} className={styles.form__button} type='submit'>
        Join
      </button>
    </form>
  )
}

export default Join
