import { Strings } from 'constants/strings'
import { Header } from 'components/header'
import { Layout } from 'components/layout'
import { TTopicPresenter } from 'presenters'
import React, { memo, SyntheticEvent, useRef, useState } from 'react'
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

type TopicProps = {
    topicPresenter: TTopicPresenter
}

export const Topic = memo<TopicProps>(({
    topicPresenter
}) => {
    const burgerRef = useRef<BurgerRefProps>(null)
    const lessonsListRef = useRef<OverlayRefProps>(null)
    const [lessonsListShow, setLessonsListShow] = useState<boolean>(false)
    const router = useRouter()

    const markdown = `A paragraph with *emphasis* and **strong importance**. A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')  // highlight-line
~~~
`

    function renderNavigationBar(): JSX.Element {
        return (
            <div className={styles.navigationBar}>
                {renderNavigationLeft()}
                {renderNavigationMiddle()}
                {renderNavigationRight()}
            </div>   
        )
    }

    function renderNavigationLeft(): JSX.Element {
        return (
            <div className={styles.navigationLeft}>
                <Overlay ref={lessonsListRef}
                    className={styles.lessonsListOverlay}
                    onShow={onLessonsListShow}
                    onHide={onLessonsListHide}>
                        {renderLessonsList()}
                </Overlay>
                <Burger ref={burgerRef}
                    className={styles.burgerContainer}
                    barsClassName={styles.burgerBarsClassName}
                    onClick={onBurgerClicked}
                    bar1ClassName={styles.burgerBar1}
                    bar3ClassName={styles.burgerBar3} />
                <div>
                    {getCurrentLessonTitle()}
                </div>
            </div>
        )
    }

    function renderNavigationMiddle(): JSX.Element {
        return (
            <div className={styles.navigationMiddle}>
                <div className={styles.navigationMiddleContent}>
                    <button>{Strings.BACK}</button>
                    <div>1/14</div>
                    <button>{Strings.NEXT}</button>
                </div>
        </div>
        )
    }

    function renderNavigationRight(): JSX.Element {
        return (
            <div className={styles.navigationRight}>
                y
            </div>
        )
    }

    function getCurrentLessonTitle(): string {
        if (topicPresenter.isLoading) {
            return ''  // TODO: handle isLoading
        }

        if (topicPresenter.isError) {
            return ''  // TODO: handle isError
        }

        return topicPresenter.data.lessons[topicPresenter.data.completedLessons].title
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
                                    [styles.lessonInProgress]: isInProgress(index),
                                })}>
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

    function onBurgerClicked(open: boolean) {
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
        return (
            <div className={styles.lessonContent}>
                <div className={styles.lessonHeader}>
                    <h1>Qui officia deserunt mollit anim id est laborum</h1>
                </div>

                <div className={styles.lessonContentContainer}>
                    <div className={styles.lessonContent}>
                        <ReactMarkdown plugins={[gfm]} children={markdown} />
                    </div>
                </div>
            </div>
        )
    }

    const isCompleted = (lessonIndex) => lessonIndex < topicPresenter.data?.completedLessons;

    const isNotStarted = (lessonIndex) => lessonIndex > topicPresenter.data?.completedLessons;

    const isInProgress = (lessonIndex) => lessonIndex === topicPresenter.data?.completedLessons;

    return (
        <Layout pageTitle='undefined' className={styles.topicLayout}>
            <Header className={classnames({[styles.header]: lessonsListShow})}
                    enableHamburgerMenu={false}
                    showLogoText={false}
                    leftButtonsLabel={[
                        Strings.DASHBOARD,
                        Strings.PROBLEMS,
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