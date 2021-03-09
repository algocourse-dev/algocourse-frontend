import { useQuery } from 'react-query'
import { TPresenter } from "presenters/types";
import { TModuleFetcherData, TPracticesFetcherData } from 'fetchers/types'
import { modulesFetcher, MODULES_QUERY_KEY, practicesFetcher, PRACTICES_QUERY_KEY } from "fetchers"
import { usePresenterCreator } from 'presenters/use-presenter-creator';

export type TModulePresenterData = TModuleFetcherData & { index: string }
export type TModulesPresenterData = {
    readonly modules: ReadonlyArray<TModulePresenterData>
}
export type TModulesPresenter = TPresenter<TModulesPresenterData>
export function useModulesPresenter(): TModulesPresenter {
    return usePresenterCreator(
        () => useQuery(MODULES_QUERY_KEY, modulesFetcher),
        (modulesData) => {
            return !modulesData ? undefined : {
                modules: modulesData.modules.map((module, index) => ({
                    ...module,
                    title: `${module.title}`,
                    index: '0'.repeat((modulesData.modules.length - 1).toString().length- index.toString().length) + index.toString()
                }))
            }
        }
    )()
}

type TPracticesPresenterData = TPracticesFetcherData
export type TPracticesPresenter = TPresenter<TPracticesPresenterData>
export function usePracticesPresenter(): TPracticesPresenter {
    return usePresenterCreator(
        () => useQuery(PRACTICES_QUERY_KEY, practicesFetcher),
        practices => practices
    )()
}

