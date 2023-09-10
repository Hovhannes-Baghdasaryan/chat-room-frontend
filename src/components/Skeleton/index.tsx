import type { FC } from 'react'
import classNames from 'classnames'

import { T_SkeletonProps } from './types'
import styles from './Skeleton.module.scss'

import classnames from 'classnames'

const Skeleton: FC<T_SkeletonProps> = ({ className = '' }) => (
  <div className={classnames({ [className]: className })}>
    <span className={styles.skeleton}></span>
  </div>
)

export default Skeleton
