import React, { FC } from 'react'
import Image from 'next/image'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import styles from 'styles/Home.module.sass'
import { Layout } from 'components/layout'
import { useRouter } from 'next/router'

export const Home: FC = () => {
    return (
        <Layout pageTitle='Home page'>
            <Header leftButtonsLabel={['Home', 'Features', 'Pricing', 'FAQs', 'Contact us']} />

            <main className={styles.mainContainer}>
                <div className={styles.main}>
                    <LandingBlock />
                </div>
            </main>

            <Footer />
        </Layout>
    )
}

const LandingBlock: FC = () => {
    const router = useRouter()

    return (
        <div className={styles.landingBlockContainer}>
            <div className={styles.landingDescription}>
                <h1>
                    <span className='boldText'>The Ultimate Course</span> <br className={styles.newline}/>
                    for your coding interview<br className={styles.newline}/>
                </h1>
                <p>
                    <span className={styles.siteTitle}>algocourse</span> is specifically designed to get you fully prepared <br className={styles.newline}/>
                    through instructive and interactive lessons
                </p>
                <div className={styles.landingButtons}>
                    <button className={styles.getStartedButton}
                            onClick={() => router.push('/dashboard')}>
                        Go to course
                    </button>
                    <button className={styles.readMissionButton}>Read our mission letter</button>
                </div>
            </div>
            <div className={styles.landingLogo}>
                <Image
                    src='/landing-logo.svg'
                    alt='Landing Logo'
                    width='250'
                    height='235.9'
                    layout='intrinsic' />
            </div>
        </div>
    )
}
