import React, { memo } from 'react'
import styles from 'styles/Practices.module.sass'
import { Images, ProblemResult, Strings, TCompany, TPractice } from 'common'
import classnames from 'classnames'
import Image from 'next/image'

type PracticesProps = {
    practices: ReadonlyArray<TPractice>
}

export const Practices = memo<PracticesProps>(({practices: practices}) => {
    if (!practices || practices.length === 0) {
        return null
    }

    const generateCompaniesNames = (companies: ReadonlyArray<TCompany>) => {
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

    return (
        <div className={styles.container}>
            <span>{Strings.PRACTICE}</span>
            <div className={styles.practices}>
                {practices.map(practice => {
                    return (
                        <div className={styles.tableContainer} key={practice.id}>
                            <div className={classnames(styles.tableName, 'textAlign_left')}>
                                {practice.title}
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='textAlign_left'>{Strings.ID}</th>
                                        <th className='textAlign_left'>{Strings.PROBLEM}</th>
                                        <th className='textAlign_left'>{Strings.DIFFICULTY}</th>
                                        <th className='textAlign_right'>{Strings.COMPANIES}</th>
                                        <th className='textAlign_right'>{Strings.ACCEPTED}</th>
                                        <th className='textAlign_right'>{Strings.STATUS}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {practice.problems.map(problem => (
                                    <tr key={problem.id}>
                                        <td className='textAlign_left'>{problem.id}</td>
                                        <td className={classnames(styles.problemTitle, 'textAlign_left')}>{problem.title}</td>
                                        <td className='textAlign_left'>
                                            <div className={classnames(styles.problemDifficulty, styles[`difficulty${problem.difficulty}`])}>
                                                {problem.difficulty}
                                            </div>
                                        </td>
                                        <td className='textAlign_right'>{generateCompaniesNames(problem.companies)}</td>
                                        <td className='textAlign_right'>{problem.totalAccepted}</td>
                                        <td className='textAlign_right'>
                                            <Image src={getStatusIconSrc(problem.status.result)}
                                                width={15.3} height={15.3} layout='fixed' />
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>

        </div>
    )
})
