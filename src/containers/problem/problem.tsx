import React, { FC } from 'react'
import { Problem as UnconnectedProblem } from 'components/problem'
import { useRouter } from 'next/router'
import { useProblemPresenter } from 'presenters'

export const Problem: FC = () => {
    const router = useRouter()

    const problemPresenter = useProblemPresenter(router.query.pid as string)

    return (
        <UnconnectedProblem problemPresenter={problemPresenter} />
    )
}