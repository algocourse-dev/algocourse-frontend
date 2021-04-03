import React, { FC } from 'react'
import { Problem as UnconnectedProblem } from 'components/problem'

type ProblemProps = {}

export const Problem: FC<ProblemProps> = () => {
    return (
        <UnconnectedProblem />
    )
}