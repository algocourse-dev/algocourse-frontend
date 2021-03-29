import { Strings } from 'constants/strings'
import { Header } from 'components/header'
import { Layout } from 'components/layout'
import { TTopicLessonPresenter, TTopicPresenter } from 'presenters'
import React, { Fragment, memo, SyntheticEvent, useRef, useState } from 'react'
import styles from 'styles/Topic.module.sass'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Burger, BurgerRefProps } from 'components/burger'
import { Overlay, OverlayRefProps } from 'components/overlay'
import classnames from 'classnames'
import { CircularProgressbar } from 'react-circular-progressbar'
import { Images } from 'constants/images'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BlockType } from 'constants/constants'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { duotoneSea as style } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import duotoneSea from 'utils/themes/duotone-sea'

type TopicProps = {
    topicPresenter: TTopicPresenter
    topicLessonPresenter: TTopicLessonPresenter
}

export const Topic = memo<TopicProps>(({
    topicPresenter,
    topicLessonPresenter,
}) => {
    const router = useRouter()
    const burgerRef = useRef<BurgerRefProps>(null)
    const lessonsListRef = useRef<OverlayRefProps>(null)
    const [lessonsListShow, setLessonsListShow] = useState<boolean>(false)
    const [currentStep, setCurrentStep] = useState<number>(1)

    if (topicPresenter.isLoading) {
        return null  // TODO: handle isLoading
    }

    if (topicPresenter.isError) {
        return null  // TODO: handle isError
    }

    function renderNavigationBar(): JSX.Element {
        return (
            <Fragment>
                <Overlay ref={lessonsListRef}
                    className={styles.lessonsListOverlay}
                    onShow={onLessonsListShow}
                    onHide={onLessonsListHide}>
                    {renderLessonsList()}
                </Overlay>
                <div className={styles.navigationBar}>
                    {renderNavigationLeft()}
                    {renderNavigationMiddle()}
                    {renderNavigationRight()}
                </div>
            </Fragment>
        )
    }

    function renderNavigationLeft(): JSX.Element {
        return (
            <div className={styles.navigationLeft}>
                <Burger ref={burgerRef}
                    className={styles.burgerContainer}
                    barsClassName={styles.burgerBarsClassName}
                    onClick={onBurgerClick}
                    bar1ClassName={styles.burgerBar1}
                    bar3ClassName={styles.burgerBar3} />
                <div className={styles.lessonTitle}>
                    {getLessonTitle()}
                </div>
            </div>
        )
    }

    function renderNavigationMiddle(): JSX.Element {
        if (topicLessonPresenter.isLoading) {
            return <div>Loading</div>  // TODO: handle isLoading
        }

        if (topicLessonPresenter.isError) {
            return <div>Error</div>  // TODO: handle isError
        }

        const { numberOfSteps } = topicLessonPresenter.data

        return (
            <div className={styles.navigationMiddle}>
                <div className={styles.navigationMiddleContent}>
                    <button
                        className={classnames({
                            [styles.backActiveButton]: currentStep > 1,
                            [styles.backDisabledButton]: currentStep === 1
                        })}
                        onClick={onBackButtonClick}>
                        {Strings.BACK}
                    </button>
                    <div>{`${currentStep}/${numberOfSteps}`}</div>
                    <button
                        className={classnames({
                            [styles.nextActiveButton]: currentStep < numberOfSteps,
                            [styles.nextDisabledButton]: currentStep === numberOfSteps
                        })}
                        onClick={onNextButtonClick}>
                        {Strings.NEXT}
                    </button>
                </div>
        </div>
        )
    }

    function onBackButtonClick() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    function onNextButtonClick() {
        if (currentStep < topicLessonPresenter.data.numberOfSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    function renderNavigationRight(): JSX.Element {
        return (
            <div className={styles.navigationRight}>
            </div>
        )
    }

    function renderLessonsList(): JSX.Element {
        return (
            topicPresenter.isLoading ?
                null :  // TODO: handle isLoading
            topicPresenter.isError ?
                null :  // TODO handle is Error
                (<div className={classnames(styles.lessonsListContainer, {[styles.isLessonsListShow]: lessonsListShow})}
                    onClick={(e: SyntheticEvent) => e.stopPropagation()}>
                    <div className={styles.lessonsListBack} onClick={() => router.push('/dashboard')}>{Strings.BACK_TO_ALL_TOPICS}</div>
                    <div className={styles.lessonsListTopicInfo}>
                        <h1>{topicPresenter.data.title}</h1>
                        <p>{topicPresenter.data.description}</p>
                    </div>
                    <div className={styles.lessonsList}>
                        <div>{Strings.LESSONS}</div>
                        <ul>
                            {topicPresenter.data.lessons.map((lesson, index) => (
                                <li key={lesson.id} className={classnames({
                                    [styles.lessonCompleted]: isCompleted(index),
                                    [styles.lessonNotStarted]: isNotStarted(index),
                                    [styles.lessonSelected]: isSelected(index),
                                    [styles.lessonNextToLearn]: isNextToLearn(index),
                                })} onClick={() => onLessonItemClick(lesson, index)}>
                                    <span>{lesson.title}</span>
                                    {
                                        isCompleted(index) ?
                                            <Image src={Images.DONE_CHECK_MARK} width={16} height={16} layout='fixed'/> :
                                            <div className={styles.lessonsProgress}>
                                                <CircularProgressbar value={0} strokeWidth={14} className='topicCircularProgressbar' />
                                            </div>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>)
        )
    }

    function onLessonItemClick(lesson: TTopicPresenter['data']['lessons'][0], lessonIndex: number) {
        if ((isCompleted(lessonIndex) || isNextToLearn(lessonIndex)) && !isSelected(lessonIndex)) {
            router.replace(`/topic/${topicPresenter.data.id}/lesson/${lesson.id}`)
            lessonsListRef.current.hide()
        }
    }

    function onBurgerClick(open: boolean) {
        if (open) {
            lessonsListRef.current.show()
        } else {
            lessonsListRef.current.hide()
        }
    }

    function onLessonsListShow() {
        setLessonsListShow(true)
    }

    function onLessonsListHide() {
        burgerRef.current.close()
        setLessonsListShow(false)
    }

    function renderLessonContent(): JSX.Element {
        if (topicLessonPresenter.isLoading) {
            return <div>Loading</div>  // TODO: handle isLoading
        }

        if (topicLessonPresenter.isError) {
            return <div>Error</div>  // TODO: handle isError
        }

        const stopBlockIndex = topicLessonPresenter.data.stopBlocksIndices[currentStep - 1]

        const renderers = {
            code: ({language, value}) => {
               return (
                    <div className={styles.syntaxHighlighterContainer}>
                        <SyntaxHighlighter wrapLongLines style={duotoneSea} language={language} children={value}/>
                    </div>
               )
            }
        }

        return (
            <div className={styles.lessonContent}>
                {/* <div className={styles.lessonHeader}>
                    <h1>Qui officia deserunt mollit anim id est laborum</h1>
                </div> */}

                <div className={styles.lessonContentContainer}>
                    <div className={styles.lessonContent}>
                        {/* <ReactMarkdown plugins={[gfm]} children={markdown} /> */}
                        {
                            topicLessonPresenter.data.blocks.slice(0, stopBlockIndex).map((block, index) => {
                                // return <div key={index}>{!!block.content && block.content}</div>
                                return (block.type === BlockType.MARKDOWN ) &&
                                    <ReactMarkdown key={index} plugins={[gfm]} children={block.content} renderers={renderers}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    function isCompleted(lessonIndex: number): boolean {
        return lessonIndex < getCompletedLessons()
    }

    function isNotStarted(lessonIndex: number): boolean {
        return lessonIndex > getCompletedLessons()
    }

    function isSelected(lessonIndex: number): boolean {
        return lessonIndex === getLessonIndex()
    }

    function isNextToLearn(lessonIndex: number): boolean {
        return lessonIndex === getCompletedLessons()
    }

    function getCompletedLessons(): number {
        return topicPresenter.data?.completedLessons
    }

    function getLessonTitle(): string {
        if (topicPresenter.isLoading) {
            return ''  // TODO: handle isLoading
        }

        if (topicPresenter.isError) {
            return ''  // TODO: handle isError
        }

        return topicPresenter.data.lessons[getLessonIndex()]?.title
    }

    function getLessonIndex(): number {
        return topicPresenter.data?.lessons?.findIndex(lesson => lesson.id === getLessonId())
    }

    function getLessonId(): string {
        return topicLessonPresenter.data?.id
    }

    return (
        <Layout pageTitle='undefined' className={styles.topicLayout}>
            <Header className={classnames({[styles.header]: lessonsListShow})}
                    enableHamburgerMenu={false}
                    showLogoText={false}
                    leftButtonsLabel={[
                        Strings.DASHBOARD,
                        Strings.PRACTICE,
                        Strings.LEADERBOARD]}
                    menuBarClassName={styles.menuBar}/>
            <main className={styles.mainContainer}>
                {renderNavigationBar()}
                {renderLessonContent()}
            </main>
        </Layout>
    )
})