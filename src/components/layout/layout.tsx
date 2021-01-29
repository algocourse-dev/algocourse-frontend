import React, { FC, ReactNode } from 'react'
import styles from 'styles/Layout.module.sass'

type LayoutProps = {
    children?: ReactNode
}

export const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}
