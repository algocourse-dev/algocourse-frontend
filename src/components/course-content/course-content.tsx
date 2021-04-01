import { TModulePresenterData, TModulesPresenter, TPracticesPresenter, TTopicsProgressPresenter } from 'presenters'
import React, { Fragment, memo, useState } from 'react'
import { Strings } from 'constants/strings'
import styles from 'styles/CourseContent.module.sass'
import classnames from 'classnames'
import { Collapse } from 'react-collapse'
import { Topics } from './topics/topics'
import { Practices } from 'components'

type CourseContentProps = {
    modulesPresenter: TModulesPresenter
    practicesPresenter: TPracticesPresenter
    topicsProgress: TTopicsProgressPresenter
}

type SelectedModuleState = {
    id: string
    isPracticeExpanded: boolean
}

export const CourseContent = memo<CourseContentProps>(({modulesPresenter, practicesPresenter, topicsProgress}) => {
    const [selectedModule, setSelectedModule] = useState<SelectedModuleState>({id: undefined, isPracticeExpanded: false})

    if (modulesPresenter.isLoading) {
        // TODO: handle isLoading
        return null
    }

    if (modulesPresenter.isError) {
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
                                {renderCollapsibleTopics(module)}
                                {renderCollapsiblePractices(module)}
                                {renderSeeMoreButton(module.id)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )

    function renderCollapsibleTopics(module: TModulePresenterData): JSX.Element {
        const isSelected = isModuleSelected(module.id)
        return (                        
            <Collapse isOpened={isSelected}
                theme={{collapse: styles.topicCollapse, content:
                        classnames(styles.topicContent, {[styles.unselectedCollapseContent]: !isSelected, [styles.selectedCollapseContent]: isSelected})}}>
                <Topics topics={module.topics} topicsProgress={topicsProgress} />
            </Collapse>
        )
    }

    function renderCollapsiblePractices(module: TModulePresenterData): JSX.Element {
        const isSelected = isModuleSelected(module.id)
        const isPracticeExpanded = isSelected && selectedModule.isPracticeExpanded
        return (
            <Collapse isOpened={isPracticeExpanded}
                theme={{collapse: styles.practiceCollapse, content:
                    classnames(styles.practiceContent, {[styles.unselectedCollapseContent]: !isSelected, [styles.selectedCollapseContent]: isSelected})}}>
                {
                    practicesPresenter.isLoading ?
                        null :  // TODO: handle isLoading
                    practicesPresenter.isError ?
                        null :
                    <Practices practices={practicesPresenter.data[module.id]} />            
                }
            </Collapse>
        )
    }

    function renderSeeMoreButton(moduleId: string): JSX.Element {
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

    function renderModuleTitle(module: TModulePresenterData): JSX.Element {
        const isSelected = isModuleSelected(module.id)
        return (
            <div className={classnames(styles.moduleTitle, {[styles.highlightedModule]: isSelected})}
                onClick={() => onModuleClick(module.id)}>
                <div className={styles.moduleIndex}>{module.index}</div>
                <h2>{module.title}</h2>
            </div>
        )
    }

    function isModuleSelected(moduleId: string) {
        return moduleId === selectedModule.id
    }

    function onModuleClick(moduleId: string) {
        if (!isModuleSelected(moduleId)) {
            setSelectedModule({id: moduleId, isPracticeExpanded: false})
        } else {
            setSelectedModule({id: undefined, isPracticeExpanded: false})
        }
    }

    function onPracticeExpanded() {
        setSelectedModule({...selectedModule, isPracticeExpanded: true})
    }

    function onPracticeCollapsed() {
        setSelectedModule({...selectedModule, isPracticeExpanded: false})
    }
})
