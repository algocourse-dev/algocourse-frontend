import {
    TopicDifficulty,
    TopicNecesssity,
    ProblemDifficulty,
    ProblemResult,
} from "./constants"

export type TCompany = {
    readonly id: string
    readonly name: string
}

export type TProblemStatus = {
    readonly result: ProblemResult
    readonly rejectedReason?: string
}

export type TProblem = {
    readonly id: string
    readonly title: string
    readonly difficulty: ProblemDifficulty
    readonly companies: ReadonlyArray<TCompany>
    readonly totalAccepted: number
    readonly status: TProblemStatus
}

export type TPractice = {
    readonly id: string
    readonly title: string
    readonly problems: ReadonlyArray<TProblem>
}

export type TTopic = {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly difficulty: TopicDifficulty
    readonly necesssity: TopicNecesssity
    readonly totalLessons: number
    readonly completedLessons: number
}

export type TModule = {
    readonly id: string
    readonly title: string
    readonly topics: ReadonlyArray<TTopic>
}

export type TStreak = {
    streak: number
    timeLeft?: number
}

export type TCourseLeaderboardUserInfo = {
    avatarSrc: string
    name: string
    progress: number
}
