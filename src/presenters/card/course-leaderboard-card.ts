import { courseLeaderBoardDataFetcher, COURSE_LEADERBOARD_QUERY_KEY, TCourseLeaderBoardData } from "fetchers"
import { TPresenter } from "presenters/types"
import { usePresenterCreator } from "presenters/use-presenter-creator"
import { useQuery } from "react-query"

type TCourseLeaderboardCardPresenterData = TCourseLeaderBoardData
export type TCourseLeaderboardCardPresenter = TPresenter<TCourseLeaderboardCardPresenterData>
export function useCourseLeaderboardCardPresenter(): TCourseLeaderboardCardPresenter {
    return usePresenterCreator(
        () => useQuery(COURSE_LEADERBOARD_QUERY_KEY, courseLeaderBoardDataFetcher),
        leaderboardData => leaderboardData
    )()
}