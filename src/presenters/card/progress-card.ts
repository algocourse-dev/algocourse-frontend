import { ProblemResult } from "common"
import { topicsProgressFetcher, TOPICS_PROGRESS_KEY, TPracticesFetcherData, TTopicsProgressFetcherData } from "fetchers"
import { TModulesPresenterData, useModulesPresenter, usePracticesPresenter } from "presenters/course-content"
import { TPresenter } from "presenters/types"
import { usePresenterCreator } from "presenters/use-presenter-creator"
import { useQuery } from "react-query"

type TProgressCardPresenterData = {
    lessonsPercentage: number
    lessonsRatio: string
    practiceProblemsPercentage: number
    practiceProblemsRatio: string
}
export type TProgressCardPresenter = TPresenter<TProgressCardPresenterData>
export function useProgressCardPresenter(): TProgressCardPresenter {
    return usePresenterCreator(
        () => useModulesPresenter(),
        () => useQuery(TOPICS_PROGRESS_KEY, topicsProgressFetcher),
        () => usePracticesPresenter(),
        (modulesData, progressData, practiceProblemsData) => {
            if (!modulesData || !progressData) {
                return undefined
            }

            const totalLessons = calculateTotalLessons(modulesData)
            const totalCompletedLessons = calculateTotalCompletedLessons(progressData)

            const totalPracticeProblems = calculateTotalPracticeProblems(practiceProblemsData)
            const totalCompletedPracticeLessons = calculateTotalCompletedPracticeLessons(practiceProblemsData)

            return {
                lessonsPercentage: Math.round(totalCompletedLessons / totalLessons * 100),
                lessonsRatio: `${totalCompletedLessons}/${totalLessons}`,
                practiceProblemsPercentage: Math.round(totalCompletedPracticeLessons / totalPracticeProblems * 100),
                practiceProblemsRatio: `${totalCompletedPracticeLessons}/${totalPracticeProblems}`,
            }
        }
    )()
}

function calculateTotalLessons(modulesData: TModulesPresenterData): number {
    return modulesData.modules.reduce((totalLessons, module) => {
        module.topics.forEach(topic => {
            totalLessons += topic.totalLessons
        })
        return totalLessons
    }, 0)
}

function calculateTotalCompletedLessons(progressData: TTopicsProgressFetcherData): number {
    return Object.keys(progressData).reduce((totalCompletedLessons, topicId) => {
        totalCompletedLessons += progressData[topicId].completedLessons
        return totalCompletedLessons
    }, 0)
}

function calculateTotalPracticeProblems(practiceProblemsData: TPracticesFetcherData): number {
    return Object.keys(practiceProblemsData).reduce((totalPracticeProblems, moduleId) => {
        practiceProblemsData[moduleId].forEach(practice => {
            totalPracticeProblems += practice.problems.length
        })
        return totalPracticeProblems
    }, 0)
}

function calculateTotalCompletedPracticeLessons(practiceProblemsData: TPracticesFetcherData): number {
    return Object.keys(practiceProblemsData).reduce((totalPracticeProblems, moduleId) => {
        practiceProblemsData[moduleId].forEach(practice => {
            totalPracticeProblems += practice.problems.filter(problem => problem.status.result === ProblemResult.Accepted).length
        })
        return totalPracticeProblems
    }, 0)
}