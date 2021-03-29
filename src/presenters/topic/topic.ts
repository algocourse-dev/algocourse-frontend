import { BlockType } from "constants/constants"
import {
    topicLessonFetcher,
    TOPIC_LESSON_QUERY_KEY,
    TTopicFetcherData,
    TOPIC_QUERY_KEY,
    topicFetcher,
    TTopicLessonFetcherData
} from "fetchers"
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

type TTopicLessonPresenterData = TTopicLessonFetcherData & {
    numberOfSteps: number
    stopBlocksIndices: number[]
}
export type TTopicLessonPresenter = TPresenter<TTopicLessonPresenterData>
export function useTopicLessonPresenter(topicId: string, lessonId: string): TTopicLessonPresenter {
    return usePresenterCreator(
        () => useQuery(TOPIC_LESSON_QUERY_KEY(topicId, lessonId), topicLessonFetcher),
        topicLesson => {
            if (!topicLesson) {
                return undefined
            }

            const blocks = topicLesson.blocks
            const stopBlocksIndices = blocks.map((_, index) => index).filter(index => blocks[index].type === BlockType.STOP).concat([blocks.length])

            return {
                ...topicLesson,
                numberOfSteps: stopBlocksIndices.length,
                stopBlocksIndices: stopBlocksIndices
            }
        }
    )()
}