import { StreakCard } from 'containers/card/streak-card'
import { Header } from 'components/header'
import { Layout } from 'components/layout'
import React, { FC } from 'react'
import styles from 'styles/Dashboard.module.sass'
import { Strings } from 'constants/strings'
import { CourseContent, ProgressCard } from 'containers'
import { TipCard } from 'containers/card/tip-card'
import { CourseLeaderboardCard } from 'containers/card/course-leaderboard-card'
import { useRouter } from 'next/router'

export const Dashboard: FC = () => {
    const router = useRouter()

    return (
        <Layout pageTitle={Strings.DASHBOARD} className={styles.layout}>
            <Header enableHamburgerMenu={false}
                    showLogoText={false}
                    leftButtonsLabel={[
                        Strings.DASHBOARD,
                        Strings.PRACTICE,
                        Strings.LEADERBOARD]}
                    leftButtonsCallbacks={[
                        () => router.push('/dashboard')
                    ]} />
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
                        <CourseLeaderboardCard />
                    </div>
                </div>
            </main>

        </Layout>
    )
}
