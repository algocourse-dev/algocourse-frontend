import { TModule, TPractice, TStreak, TTopic } from "common"

export type TStreakFetcherData = TStreak

export type TModuleFetcherData =
    Pick<TModule, 'id' | 'title'> &
    { topics: ReadonlyArray<Omit<TTopic, 'completedLessons'>> }

export type TModulesFetcherData = {
    readonly modules: ReadonlyArray<TModuleFetcherData>
}

export type TTopicsProgressFetcherData = Record<TTopic['id'], Pick<TTopic, 'completedLessons'>>

export type TPracticesFetcherData = Record<TModule['id'], ReadonlyArray<TPractice>>