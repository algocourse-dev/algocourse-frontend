import React, { FC } from 'react'
import { CourseContent as UnconnectedCourseContent } from 'components'
import { useModulesPresenter } from 'presenters'

type CourseContentProps = {}

export const CourseContent: FC<CourseContentProps> = (props) => {
    const modulesPresenter = useModulesPresenter()

    return (
        <UnconnectedCourseContent modulesPresenter={modulesPresenter} />
    )
}
