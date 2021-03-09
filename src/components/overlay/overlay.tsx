import React, { ComponentPropsWithoutRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import styles from 'styles/Overlay.module.sass'
import classnames from 'classnames'

type OverlayProps = {
} & ComponentPropsWithoutRef<any>

export type OverlayRefProps = {
    show(): void
}

export const Overlay = forwardRef<OverlayRefProps, OverlayProps>((props, ref) => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false)
        return () => {
            document.removeEventListener('keydown', onKeyDown, false)
        }
    }, [show])

    useImperativeHandle(ref, () => ({
        show: () => setShow(true)
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
        <div className={classnames(styles.container, styles[show ? 'containerShow' : 'containerHide'])} onClick={onContainerClick}>
            {props.children}
        </div>
    )
})