import { TModulesPresenter, TPracticesPresenter } from 'presenters'
import React, { Fragment, memo, useState } from 'react'
import { Strings } from 'common'
import styles from 'styles/CourseContent.module.sass'
import classnames from 'classnames'
import { Collapse } from 'react-collapse'
import { Topics } from './topics/topics'
import { Practices } from 'components'

type CourseContentProps = {
    modulesPresenter: TModulesPresenter
    practicesPresenter: TPracticesPresenter
}

type SelectedModuleState = {
    id: string
    isPracticeExpanded: boolean
}

export const CourseContent = memo<CourseContentProps>(({modulesPresenter, practicesPresenter}) => {
    const [selectedModule, setSelectedModule] = useState<SelectedModuleState>({id: undefined, isPracticeExpanded: false})

    if (modulesPresenter.isLoading) {
        // TODO: handle isLoading
        return null
    }

    if (modulesPresenter.isError) {
        // TODO: handle isError
        return null
    }

    const isModuleSelected = (moduleId: string) => {
        return moduleId === selectedModule.id
    }

    const onModuleClick = (moduleId: string) => {
        if (!isModuleSelected(moduleId)) {
            setSelectedModule({id: moduleId, isPracticeExpanded: false})
        } else {
            setSelectedModule({id: undefined, isPracticeExpanded: false})
        }
    }

    const onPracticeExpanded = () => {
        setSelectedModule({...selectedModule, isPracticeExpanded: true})
    }

    const onPracticeCollapsed = () => {
        setSelectedModule({...selectedModule, isPracticeExpanded: false})
    }

    const renderPracticeSection = (moduleId: string) => {
        if (practicesPresenter.isLoading) {
            return null  // TODO: handle isLoading
        }

        if (practicesPresenter.isError) {
            return null  // TODO: handle isError
        }

        return (<Practices practices={practicesPresenter.data[moduleId]} />)
    }

    const renderSeeMoreButton = (moduleId: string) => {
        if (!isModuleSelected(moduleId)) {
            return null
        }

        if (selectedModule.isPracticeExpanded) {
            return (
                <div className={styles.seeMoreButton} onClick={() => onPracticeCollapsed()}>
                    {Strings.SEE_LESS}
                </div>
            )
        }

        if (practicesPresenter.isLoading || practicesPresenter.isError ||
            (practicesPresenter.data[moduleId] && practicesPresenter.data[moduleId].length > 0)) {
            return (
                <div className={styles.seeMoreButton} onClick={() => onPracticeExpanded()}>
                    {Strings.SEE_MORE}
                </div>
            )
        }

        return null
    }
    
    return (
        <Fragment>
            <div className={styles.modulesContainer}>
                {modulesPresenter.data.modules.map(module => {
                    const isSelected = isModuleSelected(module.id)
                    const isPracticeExpanded = isSelected && selectedModule.isPracticeExpanded
                    return (
                        <div key={module.id} className={classnames(styles.moduleContainer, {[styles.highlightedContainer]: isSelected})}>
                            <div className={classnames(styles.moduleTitle, {[styles.highlightedModule]: isSelected})}
                                onClick={() => onModuleClick(module.id)}>
                                <div className={styles.moduleIndex}>{module.index}</div>
                                <h2>{module.title}</h2>
                            </div>

                            <div className={classnames(styles.collapseContainer, {[styles.selectedCollapseContainer]: isSelected, [styles.unselecteCollapseContainer]: !isSelected})}>
                                <Collapse isOpened={isSelected}
                                    theme={{collapse: styles.topicCollapse, content:
                                            classnames(styles.topicContent, {[styles.unselectedCollapseContent]: !isSelected, [styles.selectedCollapseContent]: isSelected})}}>
                                    <Topics topics={module.topics} />
                                </Collapse>

                                <Collapse isOpened={isPracticeExpanded}
                                    theme={{collapse: styles.practiceCollapse, content:
                                        classnames(styles.practiceContent, {[styles.unselectedCollapseContent]: !isSelected, [styles.selectedCollapseContent]: isSelected})}}>
                                    {renderPracticeSection(module.id)}
                                </Collapse>

                                {renderSeeMoreButton(module.id)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
})
