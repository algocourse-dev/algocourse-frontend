import React, { memo } from 'react'
import styles from 'styles/LoadingSpinner.module.sass'
import classnames from 'classnames'

type LoadingSpinnerProps = {
    className?: string
}

export const LoadingSpinner = memo<LoadingSpinnerProps>(({className}) => {
    return (<div className={classnames(styles.loader, className)} />)
})