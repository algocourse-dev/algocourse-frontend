import React, { FC, ReactNode, Dispatch, SetStateAction } from 'react'
import styles from 'styles/RightNavigationMenu.module.sass'
import { Login } from '../login'
import { FlatMenu } from './flat-menu'
import { HamburgerMenu } from './hamburger-menu'

type RightNavigationMenuProps = {
    items?: Array<ReactNode>
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const RightNavigationMenu: FC<RightNavigationMenuProps> = ({
    items, open, setOpen
}) => {
    return (
        <div className={styles.container}>
            <FlatMenu
                className={styles.flatMenu}
                items={items}
                mainComponent={(<Login />)}
            />
            <HamburgerMenu
                className={styles.hamburgerMenu}
                items={items}
                mainComponent={(<Login />)}
                open={open}
                setOpen={setOpen}
            />
        </div>)
}
