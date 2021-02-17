import { StreakCard } from 'containers/card/streak-card'
import { Header } from 'components/header'
import { Layout } from 'components/layout'
import React, { FC } from 'react'
import styles from 'styles/Dashboard.module.sass'
import { Strings } from 'common'

export const Dashboard: FC = () => {
    return (
        <Layout pageTitle={Strings.DASHBOARD}>
            <Header enableHamburgerMenu={false}
                    showLogoText={false}
                    leftButtonsLabel={[
                        Strings.DASHBOARD,
                        Strings.PROBLEMS,
                        Strings.PRACTICE,
                        Strings.LEADERBOARD]}/>

            <main className={styles.mainContainer}>
                <div className={styles.main}>
                    <div className={styles.courseContainer}>

                    </div>
                    <div className={styles.widgetsContainer}>
                        <StreakCard />
                    </div>
                </div>
            </main>

        </Layout>
    )
}
