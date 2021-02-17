import { TStreakData } from "./models"

export const STREAK_DATA_QUERY_KEY = 'streak'
export const streakDataFetcher: () => Promise<TStreakData> = async () => {
    const response = { streak: 5 }  // TODO: replace with actual API call.

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
