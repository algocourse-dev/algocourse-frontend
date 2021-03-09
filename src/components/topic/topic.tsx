import { Header } from 'components/header'
import { Layout } from 'components/layout'
import React, { memo } from 'react'

type TopicProps = {

}

export const Topic = memo<TopicProps>((props) => {
    return (
        <Layout pageTitle='undefined'>
            <Header enableHamburgerMenu={false}
                    showLogoText={false}/>
        </Layout>
    )
})