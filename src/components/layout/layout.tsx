import React, { FC, ReactNode } from 'react'
import styles from 'styles/Layout.module.sass'
import { FontList } from './font-list'
import { SEO } from './seo'
import classnames from 'classnames'

type LayoutProps = {
    pageTitle: string
    children?: ReactNode
    className?: string
}

export const Layout: FC<LayoutProps> = ({pageTitle, children, className}) => {
    return (
        <div className={classnames(styles.layout, className)}>
            <SEO pageTitle={pageTitle} />
            <FontList />
            {children}
        </div>
    )
}
