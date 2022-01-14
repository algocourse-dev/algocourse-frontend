import React, { FC } from 'react'
import { CourseContent as UnconnectedCourseContent } from 'components'
import { useModulesPresenter, usePracticesPresenter, useLearningProgressState } from 'presenters'

export const CourseContent: FC = (props) => {
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
