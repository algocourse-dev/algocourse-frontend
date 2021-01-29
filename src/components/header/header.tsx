import React, { FC, useState } from 'react'
import Image from 'next/image'
import styles from 'styles/Header.module.sass'
import { RightNavigationMenu } from './right-navigation-menu';

type HeaderProps = {
    rightButtonsLabel?: Array<string>
}

export const Header: FC<HeaderProps> = ({rightButtonsLabel}) => {
    const [open, setOpen] = useState(false);
    const rightButtons = buildRightButtons(rightButtonsLabel)

    return (
        <header className={styles.container}>
            <div className={styles.menuBar}>
                <div className={styles.logoContainer}>
                    <Image src='/logo.svg'
                           alt='Logo'
                           width={30}
                           height={30}
                           layout='fixed'/>
                    <div className={styles.logoText}>algocourse</div>
                </div>
                <RightNavigationMenu open={open} setOpen={setOpen} items={rightButtons} />
            </div>
        </header>
    );
}

const buildRightButtons = (rightButtonsLabel: Array<string>) => (
    !rightButtonsLabel ? [] : rightButtonsLabel.map((label, index) => <button key={index} className={styles.rightButton}>{label}</button>)
)
