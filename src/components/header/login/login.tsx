import React, { FC } from 'react'
import styles from 'styles/Login.module.sass'

type LoginProps = {

}

export const Login: FC<LoginProps> = () => {
    return (<button className={styles.loginButton}>Login</button>)
}
