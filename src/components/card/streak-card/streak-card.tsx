import React, { FC, memo } from 'react'
import { BaseCard } from '../base-card'
import styles from 'styles/StreakCard.module.sass'
import Image from 'next/image'
import { TStreakCardPresenter } from 'presenters'
import { Strings, Images, StreakStatus } from 'common'
import classnames from 'classnames'

type StreakCardProps = {
    streakCardPresenter: TStreakCardPresenter
}

export const StreakCard = memo<StreakCardProps>(({streakCardPresenter}) => {

    if (streakCardPresenter.isLoading) {
        // TODO: UI for isLoading.
        return null
    }

    if (streakCardPresenter.isError) {
        // TODO: UI for isError (error is in streakCardPresenter.error)
        return null
    }

    const { streakStatus, streakDays, streakNote } = streakCardPresenter.data
    const streakImageSource = streakStatus === StreakStatus.STREAK_ON ? Images.STREAK_FIRE : Images.NO_STREAK_FIRE
    const streakDaysStyle = classnames(styles.streakDaysOff, {[styles.streakDaysOn]: streakStatus === StreakStatus.STREAK_ON})

    return (
        <BaseCard
            title={Strings.YOUR_STREAK}
            utilButton={{imgSrc: Images.EXTERNAL_LINK_BUTTON}}
            >
            <div className={styles.container}>
                <div className={styles.streakImage}>
                    <Image src={streakImageSource}
                        width={39}
                        height={52}
                        layout='fixed'/>
                </div>
                <div className={streakDaysStyle}>
                    {streakDays}
                </div>
                <div className={styles.streakNote}>
                    {streakNote}
                </div>
            </div>
        </BaseCard>
    )
})

// export const StreakCard = React.memo(StreakCard2)
