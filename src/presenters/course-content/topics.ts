import { useQuery } from 'react-query'
import { TPresenter } from "presenters/types";
import { topicsProgressFetcher, TOPICS_PROGRESS_KEY } from "fetchers"
import { usePresenterCreator } from 'presenters/use-presenter-creator';
import { TModulePresenterData, useModulesPresenter } from './course-content';

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