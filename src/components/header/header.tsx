import React, { FC, useState } from 'react'
import Image from 'next/image'
import styles from 'styles/Header.module.sass'
import { Login } from './login'
import classnames from 'classnames'
import { Images } from 'constants/images'
import { Burger } from 'components/burger'

type HeaderProps = {
    className?: string
    leftButtonsLabel?: Array<string>
    enableHamburgerMenu?: boolean
    showLogoText?: boolean
    menuBarClassName?: string
}

export const Header: FC<HeaderProps> = ({
    className,
    leftButtonsLabel,
    enableHamburgerMenu = true,
    showLogoText = true,
    menuBarClassName
}) => {
    const [open, setOpen] = useState(false);
    const leftButtons = buildLeftButtons(leftButtonsLabel)

    function renderLeftNavigationBar(): JSX.Element {
        return (
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
        )
    }

    function renderRightNavigationBar(): JSX.Element {
        return (
            <div className={styles.rightNavigationBar}>
                <div className={classnames(
                        styles.rightFlatMenu,
                        {[styles.noCollapseOnExtraSmall]: !enableHamburgerMenu})}>
                    <Login />
                </div>
                {renderHamburgerMenu()}
            </div>
        )
    }

    function renderHamburgerMenu(): JSX.Element {
        const pane = classnames(
            styles.hamburgerMenuContent, 
            {
                [styles.isOpened]: open,
                [styles.isClosed]: !open,
            }
        );

        return enableHamburgerMenu ? (
            <div className={classnames(
                    styles.hamburgerMenu,
                    {[styles.noCollapseOnExtraSmall]: !enableHamburgerMenu})}>
                <Burger onClick={onBurgerClick}/>
                <div className={pane}>
                    <div className={styles.hamburgerMenuHeaderContainer}>
                        <Login />
                    </div>
                    <div className={styles.hamburgerMenuItemsContainer}>
                        {leftButtons}
                    </div>
                </div>
            </div>
        ) : null
    }

    function onBurgerClick(open: boolean) {
        setOpen(open)
    }

    return (
        <header className={classnames(styles.container, className)}>
            <div className={classnames(styles.menuBar, menuBarClassName)}>
                {renderLeftNavigationBar()}
                {renderRightNavigationBar()}
            </div>
        </header>
    );
}

const buildLeftButtons = (leftButtonsLabel: Array<string>) => (
    !leftButtonsLabel ? [] : leftButtonsLabel.map((label, index) => <button key={index} className={styles.leftButton}>{label}</button>)
)
