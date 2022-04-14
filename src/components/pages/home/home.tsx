import React, { FC } from 'react'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import styles from 'styles/Home.module.sass'
import { Layout } from 'components/layout'
import { useRouter } from 'next/router'
import { Strings } from 'constants/strings'
import { Images } from 'constants/images'
import { useHtmlClassName } from 'utils/hooks/hooks'

export const Home: FC = () => {
    useHtmlClassName(styles.html)

    return (
        <Layout pageTitle={Strings.HOME_PAGE}>
            <Header leftButtonsLabel={[
                Strings.HOME,
                Strings.FEATURES,
                Strings.PRICING,
                Strings.FAQs,
                Strings.CONTACT_US]} />

            <main className={styles.mainContainer}>
                <LandingBlock />
                <img className={styles.landingCurve} src={Images.LANDING_CURVE} />
                <div className={styles.dummyDiv}></div>
            </main>

            <Footer />
        </Layout>
    )
}

const LandingBlock: FC = () => {
    const router = useRouter()

    return (
        <div className={styles.main}>
            <div className={styles.landingBlockContainer}>
                <div className={styles.landingDescription}>
                    <h1>Get you fully prepared for coding interviews</h1>
                    <p>through easy explained and interactive lessons</p>
                    <div className={styles.landingButtons}>
                        <button className={styles.getStartedButton}
                                onClick={() => router.push('/dashboard')}>
                            Go to course
                        </button>
                        <button className={styles.readMissionButton}>Why us?</button>
                    </div>
                </div>
                <div className={styles.landingLogo}>
                    <img
                        src={Images.LANDING_LOGO}
                        width='600'
                        height='480' />
                </div>
            </div>
        </div>
    )
}
