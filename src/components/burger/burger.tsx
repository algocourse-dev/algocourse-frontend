import React, { FC, Dispatch, SetStateAction } from 'react'
import styles from 'styles/Burger.module.sass'
import * as cx from 'classnames'

type BurgerProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const Burger: FC<BurgerProps> = ({open, setOpen}) => {
    return (
        <div className={styles.burgerContainer} onClick={() => setOpen(!open)}>
            <div className={cx({[styles.transformDiv1]: open})}/>
            <div className={cx({[styles.transformDiv2]: open})}/>
            <div className={cx({[styles.transformDiv3]: open})}/>
        </div>
    )
}
