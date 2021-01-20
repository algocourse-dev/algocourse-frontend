import React, { FC } from 'react'
import Image from 'next/image'
import { Footer } from 'components/footer'
import { Header } from 'components/header'
import styles from 'styles/Home.module.sass'
import { SEO } from 'components/seo'
import { Layout } from 'components/layout'

export const Home: FC = () => {
    return (
        <Layout>
            <SEO title="Home page" />

            <Header rightButtonsLabel={['Home', 'Features', 'Pricing', 'FAQs', 'Contact us']} />
                    {/* <button className={styles.navigationHeaderButton}>Home</button>,
                    <button className={styles.navigationHeaderButton}>Features</button>,
                    <button className={styles.navigationHeaderButton}>Pricing</button>,
                    <button className={styles.navigationHeaderButton}>FAQs</button>,
                    <button className={styles.navigationHeaderButton}>Contact us</button>
            ]}/> */}

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
    return (
        <div className={styles.landingBlockContainer}>
            <div className={styles.landingDescription}>
                <div className={styles.smallDecorBar} />
                <h1>
                    The most definitive <br className={styles.newline}/>
                    Algorithm and Data Structures <br className={styles.newline}/>
                    course for your coding interview
                </h1>
                <p>
                    <span className={styles.siteTitle}>algocourse</span> is specifically designed to get you fully prepared <br className={styles.newline}/>
                    through instructive and interactive lessons
                </p>
                <div className={styles.landingButtons}>
                    <button className={styles.getStartedButton}>Get Started</button>
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
