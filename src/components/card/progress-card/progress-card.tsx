import { Images } from 'constants/images'
import { Strings } from 'constants/strings'
import React, { memo } from 'react'
import { BaseCard } from '../base-card'
import styles from 'styles/ProgressCard.module.sass'
import { TProgressCardPresenter } from 'presenters'

type ProgressCardProps = {
    progressCardPresenter: TProgressCardPresenter
}

export const ProgressCard = memo<ProgressCardProps>(({progressCardPresenter}) => {
    if (progressCardPresenter.isLoading) {
        return null  // TODO: handle isLoading
    }

    if (progressCardPresenter.isError) {
        return null  // TODO: handle isError
    }

    const renderProgressItem = (percentage: number,
                                ratio: string,
                                annotation: string) => {
        return (
            <div className={styles.progressBarContainer}>
                <div className={styles.progressContent}>
                    <div>{annotation}</div>
                    <div>{ratio.toString() + ' (' + percentage.toString() + '%)'}</div>
                </div>
                <div className={styles.progressBar}>
                    <div style={{width: percentage.toString() + '%'}}/>
                </div>
            </div>
        )
    }

    return (
        <BaseCard
            title={Strings.YOUR_PREGRESS}
            // utilButton={{imgSrc: Images.EXTERNAL_LINK_BUTTON}}
            className={styles.overrideBaseCard}>
            <div className={styles.container}>
                {renderProgressItem(
                    progressCardPresenter.data.lessonsPercentage,
                    progressCardPresenter.data.lessonsRatio,
                    Strings.LESSONS_LEARNED
                )}
                {renderProgressItem(
                    progressCardPresenter.data.practiceProblemsPercentage,
                    progressCardPresenter.data.practiceProblemsRatio,
                    Strings.PROBLEMS_SOLVED
                )}
            </div>
        </BaseCard>
    )
})

