import React, { memo } from 'react'
import { TTopicPresenterData, TTopicsProgressPresenter } from 'presenters'
import styles from 'styles/Topics.module.sass'
import { Strings } from 'constants/strings'
import classnames from 'classnames'
import { CircularProgressbar } from 'react-circular-progressbar';
import { useRouter } from 'next/router'

type TopicsProps = {
    topics: ReadonlyArray<TTopicPresenterData>
    selectedTopicId: string
    topicsProgress: TTopicsProgressPresenter
    onTopicSelected?(topic: TTopicPresenterData): void
}

export const Topics = memo<TopicsProps>(({topics, selectedTopicId, topicsProgress, onTopicSelected}) => {
    const router = useRouter()

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

    function renderTopic(topic: TTopicPresenterData): JSX.Element {
        const topicClassName = classnames(styles.topic, {[styles.highlightedTopic]: topic.id === selectedTopicId})
        const difficultyClassName = classnames(styles.difficulty, styles[`difficulty${topic.difficulty}`])
        const progressComponent = getProgressComponentForTopic(topic.id)
        return (
            <div className={topicClassName} key={topic.id} onClick={() => onTopicClick(topic)}>
                <span>{topic.title}</span>
                <span>{topic.description}</span>
                <div className={styles.metadataContainer}>
                    <div className={styles.numberOfLessons}>
                        {`${topic.totalLessons} lessons`}
                    </div>
                    <div className={styles.metadata}>
                        <div className={difficultyClassName}>
                            {topic.difficulty}
                        </div>
                        <div className={styles.learn} onClick={() => router.push(`/topic/${topic.id}`)}>Learn</div>
                    </div>
                </div>
                <div className={styles.progressComponent}>
                    {progressComponent}
                </div>
            </div>
        )
    }

    function onTopicClick(topic: TTopicPresenterData): void {
        if (onTopicSelected) {
            onTopicSelected(topic)
        }
    }

    function getProgressComponentForTopic(topicId: string) {
        return <CircularProgressbar value={topicsProgress[topicId]?.percentage || 0}
            strokeWidth={14} className='topicCircularProgressbar' />
    }
})
