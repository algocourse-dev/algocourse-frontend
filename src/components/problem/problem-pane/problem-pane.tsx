import React, { memo, forwardRef, useState, Fragment } from 'react'
import styles from 'styles/ProblemPane.module.sass'
import { Strings } from 'constants/strings'
import classnames from 'classnames'
import { TProblemPresenter } from 'presenters'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Images } from 'constants/images'
import { ReactSVG } from 'react-svg'

type ProblemPaneProps = {
    readonly problemPresenter: TProblemPresenter
}

enum ProblemPaneTab {
    Problem = 'Problem',
    Solution = 'Solution',
    Submissions = 'Submissions',
}

const ProblemPaneTabString = {
    [ProblemPaneTab.Problem]: Strings.PROBLEM,
    [ProblemPaneTab.Solution]: Strings.SOLUTION,
    [ProblemPaneTab.Submissions]: Strings.SUBMISSIONS
}

export const ProblemPane = memo(forwardRef<HTMLDivElement, ProblemPaneProps>(({
    problemPresenter
}, ref) => {
    const [tab, setTab] = useState<ProblemPaneTab>(ProblemPaneTab.Problem)

    return (
        <div className={styles.container} ref={ref}>
            {renderTabsBar()}
            {renderTabContent()}
            {renderProblemsNavigationBar()}
        </div>
    )

    function renderTabsBar(): JSX.Element {
        return (
            <div className={styles.tabsBar}>
                {
                    Object.keys(ProblemPaneTabString).map(_tab => (
                        <div key={_tab} className={classnames({[styles.selectedTab]: tab === _tab})} onClick={() => setTab(_tab as ProblemPaneTab)}>
                            {ProblemPaneTabString[_tab]}
                        </div>
                    ))
                }
            </div>
        )
    }

    function renderTabContent(): JSX.Element {
        return (
            <div className={styles.tabContent}>
                {
                    tab === ProblemPaneTab.Problem ?
                        renderStatement() :
                    tab === ProblemPaneTab.Solution ?
                        renderSolution() :
                    tab === ProblemPaneTab.Submissions ?
                        renderSubmissions() :
                        null
                }
            </div>
        )
    }

    function renderProblemsNavigationBar(): JSX.Element {
        return (
            <div className={styles.problemsNavigationBar}>
                <div>Problem Collection: Module 1 Practice</div>
                <div className={styles.navigationButtons}>
                    <button className={styles.navigationButton}>
                        <ReactSVG src={Images.LEFT_ARROW} className={styles.arrow} />
                        <div>{Strings.PREV}</div>
                    </button>
                    <button className={styles.navigationButton}>
                        <div>{Strings.NEXT}</div>
                        <ReactSVG src={Images.RIGHT_ARROW} className={styles.arrow} />
                    </button>
                </div>
            </div>
        )
    } 

    function renderStatement(): JSX.Element {
        if (problemPresenter.isLoading) {
            return <div>Loading</div>  // TODO: handle isLoading
        }

        if (problemPresenter.isError) {
            return <div>Error</div>  // TODO: handle isError
        }
        
        const {
            title,
            statement
        } = problemPresenter.data

        return (
            <div className={styles.statementContainer}>
                <h1>{title}</h1>
                <div className={styles.statement}>
                    <ReactMarkdown plugins={[gfm]} children={statement} />
                </div>
                {renderTestCases()}
                {renderConstraints()}
                {renderHints()}
                {renderCompanies()}
            </div>
        )
    }

    function renderSolution(): JSX.Element {
        return (
            <div>
                {ProblemPaneTabString[tab]}
            </div>
        )
    }

    function renderSubmissions(): JSX.Element {
        return (
            <div>
                {ProblemPaneTabString[tab]}
            </div>
        )
    }

    function renderTestCases(): JSX.Element {
        return (
            <Fragment>
                <h2>Example test cases</h2>
                <div className={styles.testCases}>
                    {
                        problemPresenter.data.testCases.map((testCase, index) => (
                            <div key={index}>
                                <ReactMarkdown plugins={[gfm]} children={testCase} allowDangerousHtml={true} />
                            </div>
                        ))
                    }
                </div>
            </Fragment>
        )
    }

    function renderConstraints(): JSX.Element {
        return (
            <Fragment>
                <h2>Constraints</h2>
                <div className={styles.constraints}>
                    <ReactMarkdown plugins={[gfm]} children={problemPresenter.data.constraints} allowDangerousHtml={true} />
                </div>
            </Fragment>
        )
    }

    function renderHints(): JSX.Element {
        return (
            <Fragment>
                <h2>Hints</h2>
                <div className={styles.hints}>
                    {
                        problemPresenter.data.hints.map((hint, index) => (
                            <div key={index}>{`Hint ${index + 1}`}</div>
                        ))
                    }
                </div>
            </Fragment>
        )
    }

    function renderCompanies(): JSX.Element {
        return (
            <Fragment>
                <h2>Companies</h2>
            </Fragment>
        )
    }
}))