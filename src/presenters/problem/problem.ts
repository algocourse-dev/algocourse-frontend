import { ProblemDifficulty } from "constants/constants"
import { TCompany } from "constants/types"
import { problemFetcher, PROBLEM_QUERY_KEY } from "fetchers"
import { TPresenter } from "presenters/types"
import { usePresenterCreator } from "presenters/use-presenter-creator"
import { useQuery } from "react-query"

type TProblemPresenterData = {
    readonly id: string
    readonly title: string
    readonly difficulty: ProblemDifficulty
    readonly companies: ReadonlyArray<TCompany>
    readonly totalAccepted: number
    readonly testCases: ReadonlyArray<string>
    readonly statement: string
    readonly constraints: string
    readonly hints: ReadonlyArray<string>
}
export type TProblemPresenter = TPresenter<TProblemPresenterData>
export function useProblemPresenter(problemId: string): TProblemPresenter {
    return usePresenterCreator(
        () => useQuery(PROBLEM_QUERY_KEY(problemId), problemFetcher),
        problem => {
            if (!problem) {
                return undefined
            }

            return {
                ...problem,
                title: `${problem.id}. ${problem.title}`
            }
        }
    )()
}
