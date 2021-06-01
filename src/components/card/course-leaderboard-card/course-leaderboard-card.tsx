import { Images } from 'constants/images'
import { Strings } from 'constants/strings'
import { TCourseLeaderboardCardPresenter } from 'presenters'
import React, { memo } from 'react'
import { BaseCard } from '../base-card'
import styles from 'styles/CourseLeaderboardCard.module.sass'

type CourseLeaderboardCardProps = {
    courseLeaderboardCardPresenter: TCourseLeaderboardCardPresenter
}

export const CourseLeaderboardCard = memo<CourseLeaderboardCardProps>(({courseLeaderboardCardPresenter}) => {
    if (courseLeaderboardCardPresenter.isLoading) {
        return null  // TODO: handle isLoading
    }

    if (courseLeaderboardCardPresenter.isError) {
        return null  // TODO: handle isError
    }

    return (
        <BaseCard
            title={Strings.LEADERBOARD}
            // utilButton={{imgSrc: Images.EXTERNAL_LINK_BUTTON}}
            className={styles.overrideBaseCard}>
            <div className={styles.container}>

            </div>
        </BaseCard>
    )
})