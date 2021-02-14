import React, { FC, useState } from 'react'
import Image from 'next/image'
import styles from 'styles/Header.module.sass'
import { Login } from './login';
import { HamburgerMenu } from './hamburger-menu';

type HeaderProps = {
    leftButtonsLabel?: Array<string>
}

export const Header: FC<HeaderProps> = ({leftButtonsLabel}) => {
    const [open, setOpen] = useState(false);
    const leftButtons = buildLeftButtons(leftButtonsLabel)

    return (
        <header className={styles.container}>
            <div className={styles.menuBar}>

                <div className={styles.leftNavigationBar}>
                    <div className={styles.logoContainer}>
                        <Image src='/logo.svg'
                            alt='Logo'
                            width={22}
                            height={22}
                            layout='fixed'/>
                        <div className={styles.logoText}>algocourse</div>
                    </div>
                    <div className={styles.leftButtons}>
                        {leftButtons}
                    </div>
                </div>

                <div className={styles.rightNavigationBar}>
                    <div className={styles.rightFlatMenu}>
                        <Login />
                    </div>
                    <HamburgerMenu
                        className={styles.hamburgerMenu}
                        items={leftButtons}
                        mainComponent={(<Login />)}
                        open={open}
                        setOpen={setOpen}
                    />
                </div>
            </div>
        </header>
    );
}

const buildLeftButtons = (leftButtonsLabel: Array<string>) => (
    !leftButtonsLabel ? [] : leftButtonsLabel.map((label, index) => <button key={index} className={styles.leftButton}>{label}</button>)
)
