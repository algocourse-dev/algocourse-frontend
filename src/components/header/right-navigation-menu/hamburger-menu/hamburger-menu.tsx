import { Burger } from 'components/burger';
import React, { FC, ReactNode, Dispatch, SetStateAction } from 'react'
import styles from 'styles/HamburgerMenu.module.sass'
import classnames from 'classnames'

type HamburgerMenuProps = {
    items?: Array<ReactNode>
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    className: string
    mainComponent: ReactNode
}

export const HamburgerMenu: FC<HamburgerMenuProps> = ({items, open, setOpen, className, mainComponent}) => {
    const pane = classnames({
        [styles.container]: true,
        [styles.isOpened]: open,
        [styles.isClosed]: !open,
    });

    return (<div className={className}>
        <div className={pane}>
            {mainComponent}
            <div className={styles.hamburgerMenuSeparator}/>
            {items}
        </div>
        <Burger open={open} setOpen={setOpen}/>
    </div>)
}
