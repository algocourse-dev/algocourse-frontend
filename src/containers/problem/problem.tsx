import React, { FC } from 'react'
import { Problem as UnconnectedProblem } from 'components/problem'
import { useRouter } from 'next/router'
import { useProblemPresenter } from 'presenters'

type ProblemProps = {}

export const Problem: FC<ProblemProps> = () => {
    const router = useRouter()

    const problemPresenter = useProblemPresenter(router.query.pid as string)

    return (
        <UnconnectedProblem problemPresenter={problemPresenter} />
    )
}