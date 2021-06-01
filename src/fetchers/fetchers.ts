import { MockData } from 'constants/mock-data'
import { ProblemDifficulty, ProblemResult, TopicDifficulty, TopicNecesssity } from 'constants/constants'
import { TBlock, TCompany, TProblemStatus } from "constants/types"
import { QueryFunctionContext } from "react-query"

export type TStreakFetcherData = {
    streak: number
    timeLeft?: number
}
export const STREAK_DATA_QUERY_KEY = 'streak'
export const streakDataFetcher: () => Promise<TStreakFetcherData> = async () => {
    const response = MockData.streakData

    if (response['streak'] !== 0 && !response['streak']) {
        throw Error('No streak field in streak data!')  // TODO: templating error.
    }

    if (typeof response['streak'] !== 'number') {
        throw Error('streak is not a number!')
    }

    if (response['streak'] < 0) {
        throw Error('streak is negative!')
    }

    return {
        streak: response['streak'],
        timeLeft: response['time_left']
    }
}

type TModuleTopicFetcherData = {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly difficulty: TopicDifficulty
    readonly necesssity: TopicNecesssity
    readonly totalLessons: number
}
type TModuleFetcherData = {
    readonly id: string
    readonly title: string
    readonly topics: ReadonlyArray<TModuleTopicFetcherData>
}
type TModulesFetcherData = {
    readonly modules: ReadonlyArray<TModuleFetcherData>
}
export const MODULES_QUERY_KEY = 'course'
export const modulesFetcher: () => Promise<TModulesFetcherData> = async () => {
    const serverModules = MockData.courseContent

    const clientModules: Array<TModuleFetcherData> = serverModules.modules.map(serverModule => ({
        id: serverModule['id'],
        title: serverModule['title'],
        topics: !serverModule['topics'] ? [] : serverModule.topics.map(serverTopic => ({
            id: serverTopic['id'],
            title: serverTopic['title'],
            description: serverTopic['description'],
            difficulty: serverTopic['difficulty'] as TopicDifficulty,  // TODO: need further validation here
            necesssity: serverTopic['necesssity'] as TopicNecesssity,  // TODO: need further validation here
            totalLessons: serverTopic['total_lessons']
        }))
    }))


    return {
        modules: clientModules
    }
}

export type TTopicsProgressFetcherData = Record<string, { readonly completedLessons: number }>
export const TOPICS_PROGRESS_KEY = 'topics-progress'
export const topicsProgressFetcher: () => Promise<TTopicsProgressFetcherData> = async () => {
    const response = MockData.topicsProgress
    return response
}

type TPracticeProblemFetcherData = {
    readonly id: string
    readonly title: string
    readonly difficulty: ProblemDifficulty
    readonly companies: ReadonlyArray<TCompany>
    readonly totalAccepted: number
    readonly status: TProblemStatus
}
type TPracticeFetcherData = {
    readonly id: string
    readonly title: string
    readonly problems: ReadonlyArray<TPracticeProblemFetcherData>
}
export type TPracticesFetcherData = Record<string, ReadonlyArray<TPracticeFetcherData>>
export const PRACTICES_QUERY_KEY = 'practices'
export const practicesFetcher: () => Promise<TPracticesFetcherData> = async () => {
    const serverPractices = MockData.practices

    function parseCompanies(companies): ReadonlyArray<TCompany> {
        return companies && companies.map((company): TCompany => ({
            id: company['id'],
            name: company['name'],
        }))
    }

    function parseStatus(status): TProblemStatus {
        return {
            result: status['result'] as ProblemResult,
            rejectedReason: status['rejectedReason'],
        }
    }

    function parseProblems(problems): ReadonlyArray<TPracticeProblemFetcherData> {
        return problems && problems.map((problem): TPracticeProblemFetcherData => ({
            id: problem['id'],
            title: problem['title'],
            difficulty: problem['difficulty'] as ProblemDifficulty,
            companies: parseCompanies(problem['companies']),
            totalAccepted: problem['total_accepted'],
            status: parseStatus(problem['status']),
        }))
    }

    function parsePractices(practices): ReadonlyArray<TPracticeFetcherData> {
        return practices && practices.map((practice): TPracticeFetcherData => ({
            id: practice['id'],
            title: practice['title'],
            problems: parseProblems(practice['problems']),
        }))
    }

    const clientPractices: TPracticesFetcherData = serverPractices && Object.keys(serverPractices).reduce(
        (clientPractices, moduleId) => {
            clientPractices[moduleId] = parsePractices(serverPractices[moduleId])
            return clientPractices
        }, {})

    return clientPractices
}

type TTipFetcherData = {
    id: string
    content: string
}
export const TIP_QUERY_KEY = 'tip'
export const tipFetcher: () => Promise<TTipFetcherData> = async () => {
    const response = MockData.tip
    return response
}

type TCourseLeaderboardUserInfoFetcherData = {
    ranking: number
    avatarSrc: string
    name: string
    progress: number
}
type TCourseLeaderBoardFetcherData = {
    topUsers: ReadonlyArray<TCourseLeaderboardUserInfoFetcherData>
    currentUser: TCourseLeaderboardUserInfoFetcherData
}
export const COURSE_LEADERBOARD_QUERY_KEY = 'course-leaderboard'
export const courseLeaderBoardDataFetcher: () => Promise<TCourseLeaderBoardFetcherData> = async () => {
    const response = MockData.courseLeaderboard
    return response
}

type TTopicLessonLessonFetcherData = {
    readonly id: string
    readonly title: string
}
type TTopicFetcherData = {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly difficulty: TopicDifficulty
    readonly necesssity: TopicNecesssity
    readonly totalLessons: number
    readonly completedLessons: number
    readonly lessons: ReadonlyArray<TTopicLessonLessonFetcherData>
}
export const TOPIC_QUERY_KEY = (topicId: string) => ['topic', topicId]
export async function topicFetcher(context: QueryFunctionContext<any>): Promise<TTopicFetcherData> {
    const [_key, topicId] = context.queryKey
    if (!topicId) {
        return undefined
    }
    const serverTopic = MockData.topics[topicId]

    // const promise: Promise<TTopicFetcherData> = new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve({
    //             id: serverTopic['id'],
    //             title: serverTopic['title'],
    //             description: serverTopic['description'],
    //             difficulty: serverTopic['difficulty'] as TopicDifficulty,  // TODO: need further validation here
    //             necesssity: serverTopic['necesssity'] as TopicNecesssity,  // TODO: need further validation here
    //             totalLessons: serverTopic['total_lessons'],
    //             lessons: serverTopic['lessons'],
    //             completedLessons: serverTopic['completed_lessons'],
    //         })
    //     }, 500)
    // })
    const clientTopic = {
        id: serverTopic['id'],
        title: serverTopic['title'],
        description: serverTopic['description'],
        difficulty: serverTopic['difficulty'] as TopicDifficulty,  // TODO: need further validation here
        necesssity: serverTopic['necesssity'] as TopicNecesssity,  // TODO: need further validation here
        totalLessons: serverTopic['total_lessons'],
        lessons: serverTopic['lessons'],
        completedLessons: serverTopic['completed_lessons'],
    }

    return clientTopic
}

type TTopicLessonFetcherData = {
    readonly id: string
    readonly title: string
    readonly blocks: ReadonlyArray<TBlock>
}
export const TOPIC_LESSON_QUERY_KEY = (topicId: string, lessonId: string) => ['topic', topicId, 'lesson', lessonId]
export async function topicLessonFetcher(context: QueryFunctionContext<any>): Promise<TTopicLessonFetcherData> {
    const [_topicKey, topicId, _lessonKey, lessonId] = context.queryKey

    if (!topicId) {
        return undefined
    }

    if (!lessonId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MockData.topicLessons[topicId]['introduction-2'])
            }, 200)
        })
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MockData.topicLessons[topicId][lessonId])
        }, 200)
    })
}

type TProblemFetcherData = {
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
export const PROBLEM_QUERY_KEY = (problemId: string) => ['problemId', problemId]
export async function problemFetcher(context: QueryFunctionContext<any>): Promise<TProblemFetcherData> {
    const [_problemKey, problemId] = context.queryKey

    if (!problemId) {
        return undefined
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!MockData.problems[problemId]) {
                resolve({} as TProblemFetcherData)
            }
            resolve({
                ...MockData.problems[problemId],
                totalAccepted: MockData.problems[problemId]['total_accepted'],
                testCases: MockData.problems[problemId]['test_cases'],
            })
        })
    })
}