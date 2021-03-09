import { StreakCard } from 'containers/card/streak-card'
import { Header } from 'components/header'
import { Layout } from 'components/layout'
import React, { FC } from 'react'
import styles from 'styles/Dashboard.module.sass'
import { Strings } from 'common'
import { CourseContent, ProgressCard } from 'containers'
import { TipCard } from 'containers/card/tip-card'

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
                        <div className={styles.courseNotice}>
                            <h2>Welcome back, Lena!</h2>
                            <p>{Strings.COURSE_NOTICE}</p>
                        </div>
                        <CourseContent />
                    </div>
                    <div className={styles.widgetsContainer}>
                        <StreakCard />
                        <ProgressCard />
                        <TipCard />
                    </div>
                </div>
            </main>

        </Layout>
    )
}
