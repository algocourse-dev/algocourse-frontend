import React, { FC } from 'react'
import styles from 'styles/BaseCard.module.sass'
import Image from 'next/image'

type UtilButtonProps = {
    imgSrc?: string
    onClick?(): void
}

type BaseCardProps = {
    title: string
    utilButton: UtilButtonProps
    mainContentStyle?: string
}

export const BaseCard: FC<BaseCardProps> = ({
    title, utilButton, mainContentStyle, children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.topRow}>
                <div className={styles.title}>{title}</div>
                <div className={styles.utilButtonContainer}>
                    <Image src={utilButton.imgSrc}
                        width={20}
                        height={20}
                        layout='fixed'/>
                </div>
            </div>
            <div className={mainContentStyle}>
                {children}
            </div>
        </div>
    )
}
