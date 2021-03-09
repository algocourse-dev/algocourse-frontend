import React, { FC, Fragment, useRef, SyntheticEvent } from 'react'
import styles from 'styles/Login.module.sass'
import { Images, Strings } from 'common'
import { Overlay, OverlayRefProps } from 'components/overlay'
import Image from 'next/image'

type LoginProps = {

}

export const Login: FC<LoginProps> = () => {
    const overlayRef = useRef<OverlayRefProps>(null)

    function onLoginButtonClick() {
        overlayRef.current.show()
    }

    function onLoginPanelClick(e: SyntheticEvent) {
        e.stopPropagation()
    }

    return (
        <Fragment>
            <Overlay ref={overlayRef}>
                <div className={styles.loginPanelContainer} onClick={onLoginPanelClick}>
                    <h2>{Strings.LOGIN_WITH_YOUR_SOCIAL_ACCOUNTS}</h2>
                    <div className={styles.facebookLogin}>
                        <Image src={Images.FACEBOOK_ICON} width={23} height={23} layout='fixed' />
                        <span>{Strings.LOGIN_WITH_FACEBOOK}</span>
                    </div>
                    <div className={styles.githubLogin}>
                        <Image src={Images.GITHUB_ICON} width={23} height={23} layout='fixed' />
                        <span>{Strings.LOGIN_WITH_GITHUB}</span>
                    </div>
                    <div className={styles.googleLogin}>
                        <Image src={Images.GOOGLE_ICON} width={23} height={23} layout='fixed' />
                        <span>{Strings.LOGIN_WITH_GOOGLE}</span>
                    </div>
                </div>
            </Overlay>
            <button className={styles.loginButton} onClick={onLoginButtonClick}>{Strings.LOGIN}</button>
        </Fragment>
    )
}
