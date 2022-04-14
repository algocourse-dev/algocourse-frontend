import React, { FC, Fragment, useRef, SyntheticEvent } from 'react'
import styles from 'styles/Login.module.sass'
import { Images } from 'constants/images'
import { Strings } from 'constants/strings'
import { Overlay, OverlayRefProps } from 'components/overlay'

export const Login: FC = () => {
    const overlayRef = useRef<OverlayRefProps>(null)

    function onLoginButtonClick() {
        overlayRef.current.show()
    }

    function renderSocialLogin(text: string, iconSrc: string, className: string): JSX.Element {
        return (
            <div className={className}>
                <img src={iconSrc} width={23} height={23} />
                <span>{text}</span>
            </div>
        )
    }

    return (
        <Fragment>
            <Overlay ref={overlayRef}>
                <div className={styles.loginPanelContainer} onClick={(e: SyntheticEvent) => e.stopPropagation()}>
                    <h2>{Strings.LOGIN_WITH_YOUR_SOCIAL_ACCOUNTS}</h2>
                    {renderSocialLogin(Strings.LOGIN_WITH_FACEBOOK, Images.FACEBOOK_ICON, styles.facebookLogin)}
                    {renderSocialLogin(Strings.LOGIN_WITH_GITHUB, Images.GITHUB_ICON, styles.githubLogin)}
                    {renderSocialLogin(Strings.LOGIN_WITH_GOOGLE, Images.GOOGLE_ICON, styles.googleLogin)}
                </div>
            </Overlay>
            <button className={styles.loginButton} onClick={onLoginButtonClick}>{Strings.LOGIN}</button>
        </Fragment>
    )
}
