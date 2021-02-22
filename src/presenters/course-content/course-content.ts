import { useQuery } from 'react-query'
import { TPresenter } from "presenters/types";
import { TModuleFetcherData } from 'fetchers/types'
import { modulesFetcher, MODULES_QUERY_KEY } from "fetchers";

export type TModulePresenterData = TModuleFetcherData

export type TModulesPresenterData = {
    readonly modules: ReadonlyArray<TModulePresenterData>
}

export type TModulesPresenter = TPresenter<TModulesPresenterData>

export const useModulesPresenter: () => TModulesPresenter = () => {
    const { data, error, isLoading, isError } = useQuery(MODULES_QUERY_KEY, modulesFetcher)
    return { data, error, isLoading, isError }
}
