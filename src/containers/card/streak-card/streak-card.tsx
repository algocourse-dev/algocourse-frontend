import React, { FC } from 'react'
import { StreakCard as UnconnectedStreakCard } from 'components/card'
import { useStreakCardPresenter } from 'presenters'

export const StreakCard: FC = () => {
    const streakCardPresenter = useStreakCardPresenter()

    return (
        <UnconnectedStreakCard streakCardPresenter={streakCardPresenter} />
    )
}
