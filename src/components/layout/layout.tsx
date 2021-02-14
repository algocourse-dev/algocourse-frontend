import React, { FC, ReactNode } from 'react'
import styles from 'styles/Layout.module.sass'
import { FontList } from './font-list'
import { SEO } from './seo'

type LayoutProps = {
    pageTitle: string
    children?: ReactNode
}

export const Layout: FC<LayoutProps> = ({pageTitle, children}) => {
    return (
        <div className={styles.layout}>
            <SEO pageTitle={pageTitle} />
            <FontList />
            {children}
        </div>
    )
}
