import React, { FC } from 'react'
import { Topic as UnconnectedTopic } from 'components'
import { useRouter } from 'next/router'
import { useTopicPresenter } from 'presenters'

type TopicProps = {}

export const Topic: FC<TopicProps> = (props) => {
    const router = useRouter()
    const { tid } = router.query

    const topicPresenter = useTopicPresenter(tid as string)
    // const lessonContent = useLessonContentPresenter()

    return (
        <UnconnectedTopic topicPresenter={topicPresenter} />
    )
}