import React, { FC } from 'react'
import { CourseLeaderboardCard as UnconnnectedCourseLeaderboardCard } from 'components'
import { useCourseLeaderboardCardPresenter } from 'presenters'

type CourseLeaderboardCardProps = {}

export const CourseLeaderboardCard: FC<CourseLeaderboardCardProps> = () => {
    const CourseLeaderboardCardPresenter = useCourseLeaderboardCardPresenter()

    return (
        <UnconnnectedCourseLeaderboardCard courseLeaderboardCardPresenter={CourseLeaderboardCardPresenter} />
    )
}