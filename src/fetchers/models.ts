export enum TopicDifficulty {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced'
}

export enum TopicNecesssity {
    MustLearn = 'Must learn',
    GoodToKnow = 'Good to know'
}

export enum ProblemDifficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard'
}

export enum ProblemResult {
    Accepted = 'Accepted',
    Rejected = 'Rejected',
    Unsolved = 'Unsolved'
}

export class Topic {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly difficulty: TopicDifficulty
    readonly necesssity: TopicNecesssity
    readonly totalLessons: number
    readonly completedLessons: number
}

export class Company {
    readonly id: string
    readonly name: string
}

export class ProblemStatus {
    readonly result: ProblemResult
    readonly rejectedReason?: string
}

export class Problem {
    readonly id: string
    readonly title: string
    readonly difficulty: ProblemDifficulty
    readonly companies: ReadonlyArray<Company>
    readonly totalAccepted: number
    readonly status: ProblemStatus
}

export class Practice {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly problems: ReadonlyArray<Problem>
}

export class Module {
    readonly id: string
    readonly title: string
    readonly topics: ReadonlyArray<Topic>
    readonly practices: ReadonlyArray<Practice>
}

export type TStreakData = {
    streak: number
    timeLeft?: number
}
