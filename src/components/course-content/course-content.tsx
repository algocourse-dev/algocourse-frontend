import { TModulePresenterData, TModulesPresenter, TPracticesPresenter, TLearningProgressStatePresenter } from 'presenters'
import React, { Fragment, memo, useState, useRef, useEffect } from 'react'
import styles from 'styles/CourseContent.module.sass'
import classnames from 'classnames'
import { Collapse } from 'react-collapse'
import { Topics } from './topics/topics'
import { Practices } from 'components'
import { CircularProgressbar } from 'react-circular-progressbar'

type CourseContentProps = {
    modulesPresenter: TModulesPresenter
    practicesPresenter: TPracticesPresenter
    learningProgressState: TLearningProgressStatePresenter
}

export const CourseContent = memo<CourseContentProps>(({modulesPresenter, practicesPresenter, learningProgressState}) => {
    const [selectedModuleId, setSelectedModuleId] = useState<string>(undefined)
    const [selectedTopicId, setSelectedTopicId] = useState<string>(undefined)
    const hasSetDefaultSelectedModuleId = useRef<boolean>(false)

    useEffect(() => {
        const modules = modulesPresenter.data?.modules
        if (!!modules && modules.length > 0 && !hasSetDefaultSelectedModuleId.current) {
            setSelectedModuleId(modules[0].id)
            hasSetDefaultSelectedModuleId.current = true
        }
    }, [modulesPresenter.data])

    if (modulesPresenter.isLoading) {
        // TODO: handle isLoading
        return null
    }

    if (modulesPresenter.isError) {
        // TODO: handle isError
        return null
    }

    if (learningProgressState.isLoading) {
        // TODO: handle isLoading
        return null
    }

    if (learningProgressState.isError) {
        // TODO: handle isError
        return null
    }

    return (
        <Fragment>
            <div className={styles.modulesContainer}>
                {modulesPresenter.data.modules.map(module => {
                    const isSelected = isModuleSelected(module.id)
                    return (
                        <div key={module.id} className={classnames(styles.moduleContainer, {[styles.highlightedContainer]: isSelected})}>
                            {renderModuleTitle(module)}
                            <div className={classnames(styles.collapseContainer, {[styles.selectedCollapseContainer]: isSelected, [styles.unselecteCollapseContainer]: !isSelected})}>
                                {renderCollapsibleTopicsAndPractices(module)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )

    function renderCollapsibleTopicsAndPractices(module: TModulePresenterData): JSX.Element {
        const isSelected = isModuleSelected(module.id)
        return (                        
            <Collapse isOpened={isSelected}
                theme={{collapse: styles.topicCollapse, content:
                        classnames(styles.topicContent, {[styles.unselectedCollapseContent]: !isSelected, [styles.selectedCollapseContent]: isSelected})}}>
                <Topics
                    topics={module.topics}
                    selectedTopicId={selectedTopicId}
                    onTopicSelected={(topic) => setSelectedTopicId(topic.id)}
                    topicsProgress={learningProgressState.data.topicsProgress} />
                {
                    practicesPresenter.isLoading ?
                        null :  // TODO: handle isLoading
                    practicesPresenter.isError ?
                        null :
                    <Practices
                        practices={practicesPresenter.data[module.id]}
                        selectedTopicId={selectedTopicId} />
                }
            </Collapse>
        )
    }

    function renderModuleTitle(module: TModulePresenterData): JSX.Element {
        const isSelected = isModuleSelected(module.id)
        return (
            <div className={classnames(styles.moduleTitleContainer, {[styles.highlightedModule]: isSelected})}
                onClick={() => onModuleClick(module.id)}>
                <div className={styles.moduleIndex}>{module.index}</div>
                <div className={styles.moduleTitle}>{module.title}</div>
                <div className={styles.moduleInfo}>{'3 topics • 12 problems'}</div>
                <div className={styles.moduleProgress}>
                    <CircularProgressbar value={0} strokeWidth={16} />
                </div>
            </div>
        )
    }

    function isModuleSelected(moduleId: string) {
        return moduleId === selectedModuleId
    }

    function onModuleClick(moduleId: string) {
        if (!isModuleSelected(moduleId)) {
            setSelectedModuleId(moduleId)
        }
    }
})
