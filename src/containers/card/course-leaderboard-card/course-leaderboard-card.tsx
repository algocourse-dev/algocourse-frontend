import React, { FC } from 'react'
import { CourseLeaderboardCard as UnconnnectedCourseLeaderboardCard } from 'components'
import { useCourseLeaderboardCardPresenter } from 'presenters'

export const CourseLeaderboardCard: FC = () => {
    const CourseLeaderboardCardPresenter = useCourseLeaderboardCardPresenter()

    return (
        <UnconnnectedCourseLeaderboardCard courseLeaderboardCardPresenter={CourseLeaderboardCardPresenter} />
    )
}