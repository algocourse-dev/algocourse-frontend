import { StreakCard } from 'containers/card/streak-card'
import { Header } from 'components/header'
import { Layout } from 'components/layout'
import React, { FC, useState } from 'react'
import styles from 'styles/Dashboard.module.sass'
import { Strings } from 'constants/strings'
import { CourseContent, ProgressCard } from 'containers'
import { TipCard } from 'containers/card/tip-card'
import { CourseLeaderboardCard } from 'containers/card/course-leaderboard-card'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import { Search } from './search'
import { useHtmlClassName } from 'utils/hooks/hooks'

export const Dashboard: FC = () => {
    const router = useRouter()
    const [isSearching, setSearching] = useState(false)

    useHtmlClassName(styles.html)

    return (
        <Layout pageTitle={Strings.DASHBOARD} className={styles.layout}>
            <Header enableHamburgerMenu={false}
                    showLogoText={true}
                    leftButtonsLabel={[
                        Strings.DASHBOARD,
                        Strings.PRACTICE,
                        Strings.LEADERBOARD]}
                    leftButtonsCallbacks={[
                        () => router.push('/dashboard')
                    ]} />
            <main className={styles.mainContainer}>
                <div className={styles.main}>
                    <div className={classnames(styles.courseContainer, {[styles.isSearching]: isSearching})}>
                        <div className={styles.courseHeader}>
                            <Search onSearchIconClick={() => setSearching(!isSearching)} />
                            <div className={styles.courseIntro}>
                                <h2>Welcome back, Lena!</h2>
                            </div>
                        </div>
                        <div className={styles.courseContent}>
                            <CourseContent />
                            <div className={styles.contentOverlay} />
                        </div>
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
