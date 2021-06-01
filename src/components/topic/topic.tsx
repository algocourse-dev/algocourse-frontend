import { Strings } from 'constants/strings'
import { Header } from 'components/header'
import { Layout } from 'components/layout'
import { TTopicLessonPresenter, TTopicPresenter, TTopicLessonLessonPresenterData } from 'presenters'
import React, { Fragment, memo, SyntheticEvent, useEffect, useRef, useState } from 'react'
import styles from 'styles/Topic.module.sass'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Burger, BurgerRefProps } from 'components/burger'
import { Overlay, OverlayRefProps } from 'components/overlay'
import classnames from 'classnames'
import { CircularProgressbar } from 'react-circular-progressbar'
import { Images } from 'constants/images'
import { useRouter } from 'next/router'
import { BlockType } from 'constants/constants'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import duotoneSea from 'utils/themes/duotone-sea'
import { scroller, Element } from 'react-scroll'
import { usePreviousDistinct } from 'react-use'
import { LoadingSpinner } from 'components/loading-spinner'
import { ReactSVG } from 'react-svg'

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
    const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0)
    const [isNextButtonLoading, setNextButtonLoading] = useState<boolean>(false)
    const [isBackButtonLoading, setBackButtonLoading] = useState<boolean>(false)

    const previousBlockIndex = usePreviousDistinct<number>(currentBlockIndex)

    useEffect(() => {
        if (previousBlockIndex !== undefined) {
            scroller.scrollTo(getBlockAnchorId(currentBlockIndex), {
                duration: 1000,
                delay: 0,
                smooth: 'easeInOutQuart',
                offset: -70
            })
        }
    }, [currentBlockIndex])

    if (topicPresenter.isLoading) {
        return null  // TODO: handle isLoading
    }

    if (topicPresenter.isError) {
        return null  // TODO: handle isError
    }

    return (
        <Layout pageTitle='undefined'>
            <Header className={classnames({[styles.header]: lessonsListShow})}
                    enableHamburgerMenu={false}
                    showLogoText={false}
                    leftButtonsLabel={[
                        Strings.DASHBOARD,
                        Strings.PRACTICE,
                        Strings.LEADERBOARD]}
                    leftButtonsCallbacks={[
                        () => router.push('/dashboard')
                    ]}
                    menuBarClassName={styles.menuBar} />
            <main className={styles.mainContainer}>
                {renderNavigationBar()}
                {renderLessonContent()}
            </main>
        </Layout>
    )

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

    function renderLessonContent(): JSX.Element {
        if (topicLessonPresenter.isLoading) {
            return <div>Loading</div>  // TODO: handle isLoading
        }

        if (topicLessonPresenter.isError) {
            return <div>Error</div>  // TODO: handle isError
        }

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
                    <div className={styles.blocksContainer}>
                        {
                            topicLessonPresenter.data.blocks.slice(0, currentBlockIndex + 2).map((block, index) => {
                                if (block.type !== BlockType.MARKDOWN) {
                                    return null
                                }

                                const blockClassName = classnames({
                                    [styles.block]: true,
                                    [styles.hideBlock]: index > currentBlockIndex,
                                })

                                return (
                                    <Element key={index} name={getBlockAnchorId(index)} className={blockClassName}>
                                        <ReactMarkdown plugins={[gfm]} children={block.content} renderers={renderers}/>
                                    </Element>
                                )
                            })
                        }
                    </div>
                </div>
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
                                            <ReactSVG src={Images.DONE_CHECK_MARK} className={styles.doneCheckMark} /> :
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

        return (
            <div className={styles.navigationMiddle}>
                <div className={styles.navigationMiddleContent}>
                    <button
                        className={classnames({
                            [styles.backActiveButton]: (getCurrentStep() > 1) && !isBackButtonLoading,
                            [styles.backDisabledButton]: getCurrentStep() === 1 || isBackButtonLoading,
                        })}
                        onClick={onBackButtonClick}>
                        {
                            isBackButtonLoading
                                ? <LoadingSpinner className={styles.backLoadingSpinner} />
                                : Strings.BACK
                        }
                    </button>
                    <div>{`${getCurrentStep()}/${getTotalSteps()}`}</div>
                    <button
                        className={classnames({
                            [styles.nextActiveButton]: (getCurrentStep() < getTotalSteps()) && !isNextButtonLoading,
                            [styles.nextDisabledButton]: (getCurrentStep() === getTotalSteps()) || isNextButtonLoading,
                        })}
                        onClick={onNextButtonClick}>
                            {
                                isNextButtonLoading
                                    ? <LoadingSpinner className={styles.nextLoadingSpinner}/>
                                    : Strings.NEXT
                            }
                    </button>
                </div>
        </div>
        )
    }

    function renderNavigationRight(): JSX.Element {
        return (
            <div className={styles.navigationRight}>
            </div>
        )
    }

    function onLessonsListShow() {
        setLessonsListShow(true)
    }

    function onLessonsListHide() {
        burgerRef.current.close()
        setLessonsListShow(false)
    }

    function onBackButtonClick() {
        if (getCurrentStep() > 1 && !isBackButtonLoading) {
            setCurrentBlockIndex(currentBlockIndex - 1)
            setBackButtonLoading(true)
            setTimeout(() => {
                setBackButtonLoading(false)
            }, 1000)
        }
    }

    function onNextButtonClick() {
        if (getCurrentStep() < getTotalSteps() && !isNextButtonLoading) {
            setCurrentBlockIndex(currentBlockIndex + 1)
            setNextButtonLoading(true)
            setTimeout(() => {
                setNextButtonLoading(false)
            }, 1000)
        }
    }

    function onLessonItemClick(lesson: TTopicLessonLessonPresenterData, lessonIndex: number) {
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

    function getTotalSteps(): number {
        return topicLessonPresenter.data.blocks.length
    }

    function getCurrentStep(): number {
        return currentBlockIndex + 1
    }

    function getBlockAnchorId(index: number): string {
        return `block-${index}`
    }
})