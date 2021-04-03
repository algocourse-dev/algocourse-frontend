import { useQuery } from 'react-query'
import { TPresenter } from "presenters/types";
import { TModuleFetcherData, TPracticesFetcherData } from 'fetchers/types'
import { modulesFetcher, MODULES_QUERY_KEY, practicesFetcher, PRACTICES_QUERY_KEY, topicsProgressFetcher, TOPICS_PROGRESS_KEY } from "fetchers"
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

type TTopicsProgressPresenterData = Record<string, { percentage: number }>
export type TTopicsProgressPresenter = TPresenter<TTopicsProgressPresenterData>
export function useTopicsProgressPresenter(): TTopicsProgressPresenter {
    return usePresenterCreator(
        () => useModulesPresenter(),
        () => useQuery(TOPICS_PROGRESS_KEY, topicsProgressFetcher),
        (modulesData, progressData) => {
            if (!modulesData || !progressData) {
                return undefined
            }

            const topics: Record<string, TModulePresenterData['topics'][0]> = modulesData.modules.reduce((topics, module) => {
                module.topics.forEach((topic) => {
                    topics[topic.id] = topic
                })
                return topics
            }, {})
        
            let presenterData = {}
            for(const topicId of Object.keys(progressData)) {
                if (!!topics[topicId]) {
                    presenterData[topicId] = { percentage: progressData[topicId].completedLessons / topics[topicId].totalLessons * 100 }
                }
            }

            return presenterData
        }
    )()
}
