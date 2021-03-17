import { TCourseLeaderboardUserInfo, TModule, TPractice, TStreak, TTopic } from "constants/types"

export type TStreakFetcherData = TStreak

export type TModuleFetcherData =
    Pick<TModule, 'id' | 'title'> &
    { topics: ReadonlyArray<Omit<TTopic, 'completedLessons' | 'lessons'>> }

export type TModulesFetcherData = {
    readonly modules: ReadonlyArray<TModuleFetcherData>
}

export type TTopicsProgressFetcherData = Record<TTopic['id'], Pick<TTopic, 'completedLessons'>>

export type TPracticesFetcherData = Record<TModule['id'], ReadonlyArray<TPractice>>

export type TTipData = {
    id: string
    content: string
}

export type TCourseLeaderBoardData = {
    topUsers: ReadonlyArray<TCourseLeaderboardUserInfo>
    currentUser: TCourseLeaderboardUserInfo
}

export type TTopicFetcherData = TTopic
