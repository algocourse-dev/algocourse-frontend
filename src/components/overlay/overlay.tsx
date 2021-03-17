import React, { ComponentPropsWithoutRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import styles from 'styles/Overlay.module.sass'
import classnames from 'classnames'
import { usePrevious } from 'utils/hooks'

type OverlayProps = {
    className?: string
    onShow?(): void
    onHide?(): void
} & ComponentPropsWithoutRef<any>

export type OverlayRefProps = {
    show(): void
    hide(): void
}

export const Overlay = forwardRef<OverlayRefProps, OverlayProps>(({
    className,
    onShow = () => undefined,
    onHide = () => undefined,
    children,
}, ref) => {
    const [show, setShow] = useState<boolean>(false)
    const prevShow = usePrevious<boolean>(show)

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false)
        return () => {
            document.removeEventListener('keydown', onKeyDown, false)
        }
    }, [show])

    useEffect(() => {
        if (!prevShow && show) {
            onShow()
            return
        }
        if (prevShow && !show) {
            onHide()
            return
        }
    }, [show])

    useImperativeHandle(ref, () => ({
        show: () => setShow(true),
        hide: () => setShow(false)
    } as OverlayRefProps))

    function onContainerClick() {
        setShow(false)
    }

    function onKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            setShow(false)
        }
    }

    return (
        <div className={classnames(styles.container, className, styles[show ? 'containerShow' : 'containerHide'])} onClick={onContainerClick}>
            {children}
        </div>
    )
})