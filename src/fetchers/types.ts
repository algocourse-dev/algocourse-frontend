import { TModule } from "common/types"

export type TStreakFetcherData = {
    streak: number
    timeLeft?: number
}

export type TModuleFetcherData = Pick<TModule, 'id' | 'title'>

export type TModulesFetcherData = {
    readonly modules: ReadonlyArray<TModuleFetcherData>
}
