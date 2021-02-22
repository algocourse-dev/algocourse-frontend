import {
    TopicDifficulty,
    TopicNecesssity,
    ProblemDifficulty,
    ProblemResult,
} from "./constants"

export class TTopic {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly difficulty: TopicDifficulty
    readonly necesssity: TopicNecesssity
    readonly totalLessons: number
    readonly completedLessons: number
}

export class TCompany {
    readonly id: string
    readonly name: string
}

export class TProblemStatus {
    readonly result: ProblemResult
    readonly rejectedReason?: string
}

export class TProblem {
    readonly id: string
    readonly title: string
    readonly difficulty: ProblemDifficulty
    readonly companies: ReadonlyArray<TCompany>
    readonly totalAccepted: number
    readonly status: TProblemStatus
}

export class TPractice {
    readonly id: string
    readonly title: string
    readonly problems: ReadonlyArray<TProblem>
}

export type TModule = {
    readonly id: string
    readonly title: string
    readonly topics: ReadonlyArray<TTopic>
    readonly practices: ReadonlyArray<TPractice>
}
