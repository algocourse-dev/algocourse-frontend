import React, { FC } from 'react'
import { CourseContent as UnconnectedCourseContent } from 'components'
import { useModulesPresenter, usePracticesPresenter, useLearningProgressState } from 'presenters'

type CourseContentProps = {}

export const CourseContent: FC<CourseContentProps> = (props) => {
    const modulesPresenter = useModulesPresenter()
    const practicesPresenter = usePracticesPresenter()
    const learningProgressState = useLearningProgressState()

    return (
        <UnconnectedCourseContent
            modulesPresenter={modulesPresenter}
            practicesPresenter={practicesPresenter}
            learningProgressState={learningProgressState}
        />
    )
}
