import { Images, Strings } from 'common'
import React, { memo } from 'react'
import { BaseCard } from '../base-card'
import styles from 'styles/ProgressCard.module.sass'
import { TProgressCardPresenter } from 'presenters'
import { CircularProgressbar } from 'react-circular-progressbar'
import classnames from 'classnames'
import Image from 'next/image'

type ProgressCard = {
    progressCardPresenter: TProgressCardPresenter
}

export const ProgressCard = memo<ProgressCard>(({progressCardPresenter}) => {
    if (progressCardPresenter.isLoading) {
        return null  // TODO: handle isLoading
    }

    if (progressCardPresenter.isError) {
        return null  // TODO: handle isError
    }

    const renderProgressItem = (containerClassName: string,
                                percentage: number,
                                annotation: string,
                                circularProgressClassName: string,
                                innerCircleClassName: string,
                                innerIcon: {
                                    src: string,
                                    width: number,
                                    height: number,
                                }) => {
        return (
            <div className={containerClassName}>
                <div className={styles.circularProgressContainer}>
                    <div className={styles.circularProgress}>
                        <CircularProgressbar
                            className={circularProgressClassName}
                            value={percentage} />
                    </div>
                    <div className={classnames(styles.innerCircle, innerCircleClassName)}>
                        <Image
                            src={innerIcon.src}
                            width={innerIcon.width}
                            height={innerIcon.height}
                            layout='fixed' />
                    </div>
                </div>
                <div className={styles.progressContent}>
                    <span>{`${percentage} %`}</span>
                    <span>{annotation}</span>
                </div>
            </div>
        )
    }

    return (
        <BaseCard
            title={Strings.YOUR_PREGRESS}
            utilButton={{imgSrc: Images.EXTERNAL_LINK_BUTTON}}
            className={styles.overrideBaseCard}>
            <div className={styles.container}>
                {renderProgressItem(
                    styles.lessonsProgress,
                    progressCardPresenter.data.lessonsPercentage,
                    Strings.LESSONS_LEARNED,
                    'lessonsCircularProgressbar',
                    styles.lessonsInnerCircle,
                    {
                        src: Images.LESSON_ROYAL_BLUE,
                        width: 14.33,
                        height: 17.46,
                    }
                )}
                {renderProgressItem(
                    styles.practicesProgress,
                    progressCardPresenter.data.practiceProblemsPercentage,
                    Strings.PRACTICE_PROBLEMS_SOLVED,
                    'practiceProblemsCircularProgressbar',
                    styles.practiceProblemsInnerCircle,
                    {
                        src: Images.TERMINAL_MULBERRY,
                        width: 17,
                        height: 13,
                    }
                )}
            </div>
        </BaseCard>
    )
})

