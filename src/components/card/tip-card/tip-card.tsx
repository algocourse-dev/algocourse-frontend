import { Images } from 'constants/images'
import { Strings } from 'constants/strings'
import { TTipCardPresenter } from 'presenters/card/tip-card'
import React, { memo } from 'react'
import { BaseCard } from '../base-card'
import styles from 'styles/TipCard.module.sass'

type TipCardProps = {
    tipCardPresenter: TTipCardPresenter
}

export const TipCard = memo<TipCardProps>(({tipCardPresenter}) => {
    if (tipCardPresenter.isLoading) {
        return null  // TODO: handle isLoading
    }

    if (tipCardPresenter.isError) {
        return null  // TODO: handle isError
    }

    return (
        <BaseCard
            title={Strings.RANDOM_TIP}
            // utilButton={{imgSrc: Images.EXTERNAL_LINK_BUTTON}}
            className={styles.overrideBaseCard}>
            <div className={styles.container}>
                {tipCardPresenter.data.content}
            </div>
        </BaseCard>
    )
})