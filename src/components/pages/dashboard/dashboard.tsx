import { Header } from 'components/header'
import { Layout } from 'components/layout'
import { SEO } from 'components/seo'
import React, { FC } from 'react'
import styles from 'styles/Dashboard.module.sass'

export const Dashboard: FC = () => {
    return (
        <Layout>
            <SEO title="Dashboard" />

            <Header enableHamburgerMenu={false}
                    showLogoText={false}
                    leftButtonsLabel={['Dashboard', 'Problems', 'Practice', 'Leaderboard']}/>

            <main className={styles.mainContainer}>
                <div className={styles.main}>
                    
                </div>
            </main>

        </Layout>
    )
}
