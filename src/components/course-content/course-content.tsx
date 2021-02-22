import { TModulesPresenter } from 'presenters'
import React, { Fragment, memo, useState } from 'react'
import { Strings } from 'common'
import styles from 'styles/CourseContent.module.sass'
import { CourseModule } from './course-module'
import classnames from 'classnames'

type CourseContentProps = {
    modulesPresenter: TModulesPresenter
}

export const CourseContent = memo<CourseContentProps>(({modulesPresenter}) => {
    const [selectedModule, setSelectedModule] = useState<string>(undefined)

    if (modulesPresenter.isLoading) {
        // TODO: handle isLoading
        return null
    }

    if (modulesPresenter.isError) {
        // TODO: handle isError
        return null
    }

    const onModuleClick = (moduleId: string) => setSelectedModule(moduleId)
    
    return (
        <Fragment>
            <div className={styles.title}>{Strings.COURSE_CONTENT}</div>
            <div className={styles.modulesContainer}>
                {modulesPresenter.data.modules.map(module => {
                    const isSelected = module.id === selectedModule
                    return (
                        <div className={styles.moduleContainer}>
                            <div className={classnames(styles.moduleTitle, {[styles.highlightedModule]: isSelected})}
                                onClick={() => onModuleClick(module.id)}>
                                {module.title}
                            </div>

                            <div className={classnames({[styles.collapsible]: !isSelected, [styles.expanded]: isSelected})}>
                                <p>{'test test tes test testestes tes'}</p>
                                <br></br>
                                <p>{'test test tes test testestes tes'}</p>
                                <br></br>
                                <p>{'test test tes test testestes tes'}</p>
                            </div>
                        {/* <CourseModule
                            key={module.id}
                            className={classnames(styles.moduleContainer, {[styles.highlightedModule]: module.id === selectedModule})}
                            moduleData={module}
                            onClick={onModuleClick} /> */}
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
})
