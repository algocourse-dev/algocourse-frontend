import React, { memo } from 'react'
import { TModulePresenterData, TTopicsProgressPresenter, useTopicsProgressPresenter } from 'presenters'
import styles from 'styles/Topics.module.sass'
import Image from 'next/image'
import { Images } from 'constants/images'
import { Strings } from 'constants/strings'
import classnames from 'classnames'
import { CircularProgressbar } from 'react-circular-progressbar';
import { useRouter } from 'next/router'

type TopicsProps = {
    topics: TModulePresenterData['topics']
    topicsProgress: TTopicsProgressPresenter
}

export const Topics = memo<TopicsProps>(({topics}) => {
    const { data: progress, isLoading: isProgressLoading, isError: isProgressError } = useTopicsProgressPresenter()
    const router = useRouter()

    function getProgressComponentForTopic(topicId: string) {
        if (isProgressLoading || isProgressError) {
            return null  // TODO: return loading component
        }
        if (!progress[topicId]) {
            return null  // TODO: return lock component
        }
        if (progress[topicId].percentage >= 100) {
            return null  // TODO: return complete component
        }
        return <CircularProgressbar value={progress[topicId].percentage}
            strokeWidth={14} className='topicCircularProgressbar' />
    }

    function renderTopic(topic: TModulePresenterData['topics'][0]): JSX.Element {
        const difficultyClassName = classnames(styles.difficulty, styles[`difficulty${topic.difficulty}`])
        const progressComponent = getProgressComponentForTopic(topic.id)
        return (
            <div className={styles.topic} key={topic.id} onClick={() => router.push(`/topic/${topic.id}`)}>
                <span>{topic.title}</span>
                <span>{topic.description}</span>
                <div>
                    <Image src={Images.LESSON}
                        width={14}
                        height={14}
                        layout='fixed'/>
                    <span>{`${topic.totalLessons} lessons`}</span>
                </div>
                <div>
                    <Image src={Images.NECESSITY}
                        width={14}
                        height={14}
                        layout='fixed'/>
                    <span>{topic.necesssity}</span>
                </div>
                <div className={difficultyClassName}>
                    {topic.difficulty}
                </div>
                <div className={styles.progressComponent}>
                    {progressComponent}
                </div>
            </div>
        )
    }

    if (topics.length === 0) {
        return null
    }

    return (
        <div className={styles.container}>
            <span>{Strings.LEARN}</span>
            <div className={styles.topics}>
                {topics.map(topic => renderTopic(topic))}
            </div>
        </div>
    )
})
