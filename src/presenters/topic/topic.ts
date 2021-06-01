import { TopicDifficulty, TopicNecesssity } from "constants/constants"
import { TBlock } from "constants/types"
import {
    topicLessonFetcher,
    TOPIC_LESSON_QUERY_KEY,
    TOPIC_QUERY_KEY,
    topicFetcher,
} from "fetchers"
import { TPresenter } from "presenters/types"
import { usePresenterCreator } from "presenters/use-presenter-creator"
import { useQuery } from "react-query"

export type TTopicLessonLessonPresenterData = {
    readonly id: string
    readonly title: string
}
type TTopicPresenterData = {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly difficulty: TopicDifficulty
    readonly necesssity: TopicNecesssity
    readonly totalLessons: number
    readonly completedLessons: number
    readonly lessons: ReadonlyArray<TTopicLessonLessonPresenterData>
}
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

type TTopicLessonPresenterData = {
    readonly id: string
    readonly title: string
    readonly blocks: ReadonlyArray<TBlock>
}
export type TTopicLessonPresenter = TPresenter<TTopicLessonPresenterData>
export function useTopicLessonPresenter(topicId: string, lessonId: string): TTopicLessonPresenter {
    return usePresenterCreator(
        () => useQuery(TOPIC_LESSON_QUERY_KEY(topicId, lessonId), topicLessonFetcher),
        topicLesson => topicLesson
    )()
}