import { Header } from 'components/header'
import { Layout } from 'components/layout'
import { Strings } from 'constants/strings'
import { useRouter } from 'next/router'
import React, { useRef, memo, useEffect } from 'react'
import styles from 'styles/Problem.module.sass'
import { IDEPane } from './ide-pane'
import { Ace } from 'ace-builds'

type ProblemProps = {}

export const Problem = memo<ProblemProps>((props) => {
    const router = useRouter()

    const verticalHandlerRef = useRef<HTMLDivElement>(undefined)
    const horizontalHandlerRef = useRef<HTMLDivElement>(undefined)
    const mainRef = useRef<HTMLDivElement>(undefined)
    const problemPaneRef = useRef<HTMLDivElement>(undefined)
    const idePaneRef = useRef<HTMLDivElement>(undefined)

    const aceEditorRef = useRef<Ace.Editor>(undefined)

    const isVerticalHandlerDragging = useRef<boolean>(false)
    const isHorizontalHandlerDragging = useRef<boolean>(false)

    useEffect(() => {
        const localOnMouseDown = event => onMouseDown(event)
        const localOnMouseUp = event => onMouseUp(event)
        const localOnMouseMove = event => onMouseMove(event)

        document.addEventListener('mousedown', localOnMouseDown)
        document.addEventListener('mouseup', localOnMouseUp)
        document.addEventListener('mousemove', localOnMouseMove)

        return () => {
            document.removeEventListener('mousedown', localOnMouseDown)
            document.removeEventListener('mouseup', localOnMouseUp)
            document.removeEventListener('mousemove', localOnMouseMove)
        }
    }, [])

    return (
        <Layout pageTitle='undefined'>
            <Header enableHamburgerMenu={false}
                    showLogoText={false}
                    leftButtonsLabel={[
                        Strings.DASHBOARD,
                        Strings.PRACTICE,
                        Strings.LEADERBOARD,
                    ]}
                    leftButtonsCallbacks={[
                        () => router.push('/dashboard')
                    ]} />
            <main className={styles.mainContainer}>
                <div className={styles.main} ref={mainRef}>
                    {renderProblemPane()}
                    <div className={styles.verticalHandler} ref={verticalHandlerRef} />
                    {renderIDEAndConsolePane()}
                </div>
            </main>
        </Layout>
    )

    function renderProblemPane(): JSX.Element {
        return (
            <div className={styles.problemPaneContainer} ref={problemPaneRef}>

            </div>
        )
    }

    function renderIDEAndConsolePane(): JSX.Element {
        return (
            <div className={styles.IDEAndConsolePaneContainer}>
                <IDEPane onAceEditorLoad={onAceEditorLoad} ref={idePaneRef} />
                <div className={styles.horizontalHandler} ref={horizontalHandlerRef} />
                {renderConsolePane()}
            </div>
        )
    }

    function renderConsolePane(): JSX.Element {
        return(
            <div className={styles.consolePaneContainer}>
                
            </div>
        )
    }

    function onMouseDown(event: MouseEvent) {
        isVerticalHandlerDragging.current = event.target === verticalHandlerRef.current
        isHorizontalHandlerDragging.current = event.target === horizontalHandlerRef.current
    }

    function onMouseUp(event: MouseEvent) {
        isVerticalHandlerDragging.current = false
        isHorizontalHandlerDragging.current = false
    }

    function onMouseMove(event: MouseEvent) {
        handleVerticalHandlerDragging(event)
        handleHorizontalHandlerDragging(event)
    }

    function handleVerticalHandlerDragging(event: MouseEvent) {
        if (!isVerticalHandlerDragging.current || !mainRef.current || !problemPaneRef.current) {
            return
        }

        const pointerRelativeXpos = event.clientX - mainRef.current.offsetLeft

        problemPaneRef.current.style.width = pointerRelativeXpos + 'px'
        problemPaneRef.current.style.flexGrow = 'unset'

        if (!!aceEditorRef.current) {
            aceEditorRef.current.resize()
        }
    }

    function handleHorizontalHandlerDragging(event: MouseEvent) {
        if (!isHorizontalHandlerDragging.current || !mainRef.current || !idePaneRef.current) {
            return
        }

        const pointerRelativeYpos = event.clientY - mainRef.current.offsetTop

        idePaneRef.current.style.height = pointerRelativeYpos + 'px'
        idePaneRef.current.style.flexGrow = 'unset'

        if (!!aceEditorRef.current) {
            aceEditorRef.current.resize()
        }
    }

    function onAceEditorLoad(editor: Ace.Editor) {
        aceEditorRef.current = editor
    }
})