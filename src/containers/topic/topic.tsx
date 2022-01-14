import React, { FC, useEffect } from 'react'
import { Topic as UnconnectedTopic } from 'components'
import { useRouter } from 'next/router'
import { useTopicPresenter, useTopicLessonPresenter } from 'presenters'
import { handleRedirectionOnPageLoad, isValidTopicPath } from 'use-cases/topic'

export const Topic: FC = () => {
    const router = useRouter()
    const path = router.query.params as string[]

    useEffect(() => {
        handleRedirectionOnPageLoad(router.query.params as string[])
    }, [router.query])

    const topicPresenter = useTopicPresenter(path ? path[0] : undefined)
    const topicLessonPresenter = useTopicLessonPresenter(path ? path[0]: undefined, path ? path[2] : undefined)

    if (isPathBeingCorrected(path)) {
        return null
    }

    return (
        <UnconnectedTopic topicPresenter={topicPresenter} topicLessonPresenter={topicLessonPresenter} />
    )
}

function isPathBeingCorrected(path: Array<string>) {
    return !path || !isValidTopicPath(path) || !path[2]
}