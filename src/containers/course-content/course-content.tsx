import React, { FC } from 'react'
import { CourseContent as UnconnectedCourseContent } from 'components'
import { useModulesPresenter, usePracticesPresenter, useTopicsProgressPresenter } from 'presenters'

type CourseContentProps = {}

export const CourseContent: FC<CourseContentProps> = (props) => {
    const modulesPresenter = useModulesPresenter()
    const practicesPresenter = usePracticesPresenter()
    const topicsProgress = useTopicsProgressPresenter()

    return (
        <UnconnectedCourseContent
            modulesPresenter={modulesPresenter}
            practicesPresenter={practicesPresenter}
            topicsProgress={topicsProgress}
        />
    )
}
