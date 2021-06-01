import { courseLeaderBoardDataFetcher, COURSE_LEADERBOARD_QUERY_KEY } from "fetchers"
import { TPresenter } from "presenters/types"
import { usePresenterCreator } from "presenters/use-presenter-creator"
import { useQuery } from "react-query"

type TCourseLeaderboardUserInfoPresenterData = {
    ranking: number
    avatarSrc: string
    name: string
    progress: number
}
type TCourseLeaderboardCardPresenterData = {
    topUsers: ReadonlyArray<TCourseLeaderboardUserInfoPresenterData>
    currentUser: TCourseLeaderboardUserInfoPresenterData
}
export type TCourseLeaderboardCardPresenter = TPresenter<TCourseLeaderboardCardPresenterData>
export function useCourseLeaderboardCardPresenter(): TCourseLeaderboardCardPresenter {
    return usePresenterCreator(
        () => useQuery(COURSE_LEADERBOARD_QUERY_KEY, courseLeaderBoardDataFetcher),
        leaderboardData => leaderboardData
    )()
}