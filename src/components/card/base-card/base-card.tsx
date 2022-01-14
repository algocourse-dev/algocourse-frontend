import React, { FC } from 'react'
import styles from 'styles/BaseCard.module.sass'
import classnames from 'classnames'
import { ReactSVG } from 'react-svg'

type UtilButtonProps = {
    imgSrc?: string
    onClick?(): void
}

type BaseCardProps = {
    title: string
    utilButton?: UtilButtonProps
    mainContentStyle?: string
    className?: string
}

export const BaseCard: FC<BaseCardProps> = ({
    title, utilButton, mainContentStyle, className, children}) => {
    return (
        <div className={classnames(styles.container, className)}>
            <div className={styles.topRow}>
                <div className={styles.title}>{title}</div>
                {
                    !!utilButton && (
                        <div className={styles.utilButtonContainer}>
                            <ReactSVG src={utilButton.imgSrc} />
                        </div>
                    )
                }
            </div>
            <div className={mainContentStyle}>
                {children}
            </div>
        </div>
    )
}
