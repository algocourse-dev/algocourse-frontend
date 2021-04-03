import React, { ComponentPropsWithoutRef, forwardRef, useImperativeHandle, useState, memo } from 'react'
import styles from 'styles/Burger.module.sass'
import classnames from 'classnames'

type BurgerProps = {
    onClick?(open: boolean): void
    className?: string
    barsClassName?: string
    bar1ClassName?: string
    bar2ClassName?: string
    bar3ClassName?: string
} & ComponentPropsWithoutRef<any>

export type BurgerRefProps = {
    open(): void
    close(): void
}

export const Burger = memo(forwardRef<BurgerRefProps, BurgerProps>(({
    onClick = () => undefined,
    className,
    barsClassName,
    bar1ClassName,
    bar2ClassName,
    bar3ClassName,
}, ref) => {
    const [open, setOpen] = useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        open: () => setOpen(true),
        close: () => setOpen(false),
    } as BurgerRefProps))

    function onBurgerClick() {
        onClick(!open)
        setOpen(!open)
    }

    return (
        <div className={classnames(styles.burgerContainer, className)} onClick={onBurgerClick}>
            <div className={classnames(
                barsClassName,
                bar1ClassName,
                {[styles.transformDiv1]: open}
            )}/>
            <div className={classnames(
                barsClassName,
                bar2ClassName,
                {[styles.transformDiv2]: open}
            )}/>
            <div className={classnames(
                barsClassName,
                bar3ClassName,
                {[styles.transformDiv3]: open}
            )}/>
        </div>
    )
}))
