import { useTipCardPresenter } from 'presenters/card/tip-card'
import React, { FC } from 'react'
import { TipCard as UnconnectedTipCard } from 'components'

type TipCardProps = {

}

export const TipCard: FC<TipCardProps> = () => {
    const tipCardPresenter = useTipCardPresenter()

    return (
        <UnconnectedTipCard tipCardPresenter={tipCardPresenter} />
    )
}