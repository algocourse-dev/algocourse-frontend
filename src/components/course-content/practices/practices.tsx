import React, { memo } from 'react'
import styles from 'styles/Practices.module.sass'
import { TCompany, TPractice } from 'constants/types'
import { Images } from 'constants/images'
import { Strings } from 'constants/strings'
import { ProblemResult } from 'constants/constants'
import classnames from 'classnames'
import Image from 'next/image'

type PracticesProps = {
    practices: ReadonlyArray<TPractice>
}

export const Practices = memo<PracticesProps>(({practices: practices}) => {
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

    function renderPractice(practice: TPractice): JSX.Element {
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
                        <tr key={problem.id}>
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
                                <Image src={getStatusIconSrc(problem.status.result)}
                                    width={15.3} height={15.3} layout='fixed' />
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
})
