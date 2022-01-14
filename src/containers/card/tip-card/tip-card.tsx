import { useTipCardPresenter } from 'presenters/card/tip-card'
import React, { FC } from 'react'
import { TipCard as UnconnectedTipCard } from 'components'

export const TipCard: FC = () => {
    const tipCardPresenter = useTipCardPresenter()

    return (
        <UnconnectedTipCard tipCardPresenter={tipCardPresenter} />
    )
}