import React, { FC } from 'react'
import { StreakCard as UnconnectedStreakCard } from 'components/card'
import { useStreakCardPresenter } from 'presenters'

type StreakCardProps = {

}

export const StreakCard: FC<StreakCardProps> = () => {
    const streakCardPresenter = useStreakCardPresenter()

    return (
        <UnconnectedStreakCard streakCardPresenter={streakCardPresenter} />
    )
}
