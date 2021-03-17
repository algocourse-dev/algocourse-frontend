import { TTopic } from "constants/types"
import { topicFetcher, TOPIC_QUERY_KEY, TTopicFetcherData } from "fetchers"
import { TPresenter } from "presenters/types"
import { usePresenterCreator } from "presenters/use-presenter-creator"
import { useQuery } from "react-query"

type TTopicPresenterData = TTopicFetcherData
export type TTopicPresenter = TPresenter<TTopicPresenterData>
export function useTopicPresenter(topicId: string): TTopicPresenter {
    return usePresenterCreator(
        () => useQuery(TOPIC_QUERY_KEY(topicId), topicFetcher),
        topic => {
            if (!topic) {
                return undefined
            }

            return {
                ...topic,
                lessons: topic.lessons.map((lesson, index) => ({
                    ...lesson,
                    title: `${index + 1}. ${lesson.title}`
                }))
            }
        }
    )()
}

// export function useLessonContentPresenter(): TLessonContentPresenter {
//     return usePresenterCreator(
//         () => useQuery(),

//     )()
// }