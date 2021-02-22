import { MockData } from "common"
import {
    TStreakFetcherData,
    TModulesFetcherData
} from "./types"

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

export const MODULES_QUERY_KEY = 'course'
export const modulesFetcher: () => Promise<TModulesFetcherData> = async () => {
    const response = MockData.courseContent
    return response
}
