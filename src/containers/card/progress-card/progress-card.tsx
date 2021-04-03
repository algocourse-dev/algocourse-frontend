import React, { FC } from 'react'
import { ProgressCard as UnconnectedProgressCard } from 'components'
import { useProgressCardPresenter } from 'presenters'

type ProgressCardProps = {}

export const ProgressCard: FC<ProgressCardProps> = () => {
    const progressCardPresenter = useProgressCardPresenter()

    return (
        <UnconnectedProgressCard progressCardPresenter={progressCardPresenter} />
    )
}