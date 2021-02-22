import { TModulePresenterData } from 'presenters'
import React, { memo } from 'react'
import styles from 'styles/CourseModule.module.sass'

type CourseModuleProps = {
    className: string
    moduleData: TModulePresenterData
    onClick?(moduleId: string): void
}

export const CourseModule = memo<CourseModuleProps>(({className, moduleData, onClick}) => {
    const onHandleClick = () => {
        if (onClick) {
            onClick(moduleData.id)
        }
    }

    return (
        <div className={className} onClick={onHandleClick}>
            {moduleData.title}
        </div>
    )
})
