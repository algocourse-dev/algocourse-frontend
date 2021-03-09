import React, { FC } from 'react'
import { Topic as UnconnectedTopic } from 'components'
import { useRouter } from 'next/router'

type TopicProps = {}

export const Topic: FC<TopicProps> = (props) => {
    const router = useRouter()
    const { tid } = router.query

    console.log('nhan-debug', tid)

    return (
        <UnconnectedTopic />
    )
}