import React, { FC } from 'react'
import { ProgressCard as UnconnectedProgressCard } from 'components'
import { useProgressCardPresenter } from 'presenters'

export const ProgressCard: FC = () => {
    const progressCardPresenter = useProgressCardPresenter()

    return (
        <UnconnectedProgressCard progressCardPresenter={progressCardPresenter} />
    )
}