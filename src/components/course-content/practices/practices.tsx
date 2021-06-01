import React, { memo } from 'react'
import styles from 'styles/Practices.module.sass'
import { TCompany } from 'constants/types'
import { Images } from 'constants/images'
import { Strings } from 'constants/strings'
import { ProblemResult } from 'constants/constants'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { TPracticePresenterData, TPracticeProblemPresenterData } from 'presenters'
import { ReactSVG } from 'react-svg'

type PracticesProps = {
    practices: ReadonlyArray<TPracticePresenterData>
}

export const Practices = memo<PracticesProps>(({practices: practices}) => {
    const router = useRouter()

    if (!practices || practices.length === 0) {
        return null
    }

    return (
        <div className={styles.container}>
            <span>{Strings.PRACTICE}</span>
            <div className={styles.practices}>
                {practices.map(practice => renderPractice(practice))}
            </div>
        </div>
    )

    function renderPractice(practice: TPracticePresenterData): JSX.Element {
        return (
            <div className={styles.tableContainer} key={practice.id}>
                <div className={styles.tableName}>
                    {practice.title}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>{Strings.ID}</th>
                            <th>{Strings.PROBLEM}</th>
                            <th>{Strings.DIFFICULTY}</th>
                            <th>{Strings.COMPANIES}</th>
                            <th>{Strings.ACCEPTED}</th>
                            <th>{Strings.STATUS}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {practice.problems.map(problem => (
                        <tr key={problem.id} onClick={() => onProblemClick(problem)}>
                            <td>{problem.id}</td>
                            <td className={styles.problemTitle}>{problem.title}</td>
                            <td>
                                <div className={classnames(styles.problemDifficulty, styles[`difficulty${problem.difficulty}`])}>
                                    {problem.difficulty}
                                </div>
                            </td>
                            <td>{generateCompaniesNames(problem.companies)}</td>
                            <td>{problem.totalAccepted}</td>
                            <td>
                                <ReactSVG src={getStatusIconSrc(problem.status.result)}
                                    className={getStatusIconStyle(problem.status.result)} />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    function generateCompaniesNames(companies: ReadonlyArray<TCompany>) {
        return companies.map(company => company.name).join(', ')
    }

    function getStatusIconSrc(result: ProblemResult): string {
        switch (result) {
            case ProblemResult.Accepted:
                return Images.ACCEPTED_CHECK_MARK
            case ProblemResult.Rejected:
                return Images.REJECTED_CHECK_MARK
            case ProblemResult.Unsolved:
                return Images.UNSOLVED_CHECK_MARK
            default:
                return ''
        }
    }

    function getStatusIconStyle(result: ProblemResult): string {
        switch (result) {
            case ProblemResult.Accepted:
                return styles.acceptedIcon
            case ProblemResult.Rejected:
                return styles.rejectedIcon
            case ProblemResult.Unsolved:
                return styles.unsolvedIcon
            default:
                return ''
        }
    }

    function onProblemClick(problem: TPracticeProblemPresenterData) {
        router.push(`/problem/${problem.id}`)
    }
})
