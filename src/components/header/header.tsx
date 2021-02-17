import React, { FC, useState } from 'react'
import Image from 'next/image'
import styles from 'styles/Header.module.sass'
import { Login } from './login'
import { HamburgerMenu } from './hamburger-menu'
import classnames from 'classnames'
import { Images } from 'common'

type HeaderProps = {
    leftButtonsLabel?: Array<string>
    enableHamburgerMenu?: boolean
    showLogoText?: boolean
}

export const Header: FC<HeaderProps> = ({
    leftButtonsLabel,
    enableHamburgerMenu = true,
    showLogoText = true
}) => {
    const [open, setOpen] = useState(false);
    const leftButtons = buildLeftButtons(leftButtonsLabel)

    return (
        <header className={styles.container}>
            <div className={styles.menuBar}>

                <div className={styles.leftNavigationBar}>
                    <div className={styles.logoContainer}>
                        <Image src={Images.LOGO}
                            width={22}
                            height={22}
                            layout='fixed'/>
                        {showLogoText && <div className={styles.logoText}>algocourse</div>}
                    </div>
                    <div className={classnames(
                            styles.leftButtons,
                            {[styles.noCollapseOnExtraSmall]: !enableHamburgerMenu})}>
                        {leftButtons}
                    </div>
                </div>

                <div className={styles.rightNavigationBar}>
                    <div className={classnames(
                            styles.rightFlatMenu,
                            {[styles.noCollapseOnExtraSmall]: !enableHamburgerMenu})}>
                        <Login />
                    </div>
                    {
                        enableHamburgerMenu &&
                        <HamburgerMenu
                            className={styles.hamburgerMenu}
                            items={leftButtons}
                            mainComponent={(<Login />)}
                            open={open}
                            setOpen={setOpen}
                        />
                    }
                </div>
            </div>
        </header>
    );
}

const buildLeftButtons = (leftButtonsLabel: Array<string>) => (
    !leftButtonsLabel ? [] : leftButtonsLabel.map((label, index) => <button key={index} className={styles.leftButton}>{label}</button>)
)
