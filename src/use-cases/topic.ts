import { topicLessonFetcher, TOPIC_LESSON_QUERY_KEY } from "fetchers"
import { queryClient } from "utils/query-client"
import Router from 'next/router'

export const handleRedirectionOnPageLoad = async (path: Array<string>) => {
    if (!path) {
        return
    }

    if (!isValidTopicPath(path)) {
        Router.replace('/404')
        return
    }

    const topicId = path[0]
    const lessonId = path[2]

    if (!path[2]) {
        try {
            const data = await queryClient.fetchQuery(TOPIC_LESSON_QUERY_KEY(topicId, lessonId), topicLessonFetcher)
            Router.replace(`/topic/${topicId}/lesson/${data.id}`)
            return
        } catch(error) {
            Router.replace('/404')
            return
        }
    }
}

/**
 * Validate the topic path, correct syntax is:
 *   - {topicId}
 *   - {topicId}/lesson
 *   - {topicId}/lesson/{lessonId}
 
 * @param path - the path to be validated.
 * @returns - true if path is valid, false otherwise.
 */
export function isValidTopicPath(path: ReadonlyArray<string>): boolean {
    if (path!.length > 3) {
        return false
    }

    if (path!.length > 1 && path![1] !== 'lesson') {
        return false
    }

    return true
}
