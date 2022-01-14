import { useQuery } from 'react-query'
import { STREAK_DATA_QUERY_KEY, streakDataFetcher, TStreakFetcherData } from 'fetchers'
import { TPresenter } from 'presenters/types'
import { Strings } from 'constants/strings'
import { StreakStatus } from 'constants/constants'

type TStreakCardPresenterData = {
    streakStatus: any
    streakDays: string
    streakNote: string
}

export type TStreakCardPresenter = TPresenter<TStreakCardPresenterData>

export const useStreakCardPresenter: () => TStreakCardPresenter = () => {
    const { data, error, isLoading, isError } = useQuery(STREAK_DATA_QUERY_KEY, streakDataFetcher)
    return {
        data: converTStreakFetcherData(data),
        error,
        isLoading,
        isError,
    }
}

function converTStreakFetcherData(data: TStreakFetcherData): TStreakCardPresenterData {
    if (!data) {
        return undefined
    }

    return {
        streakStatus: (data.streak === 0 || !!data.timeLeft) ? StreakStatus.STREAK_OFF : StreakStatus.STREAK_ON,
        streakDays: data.streak + ' ' + Strings.DAYS,
        streakNote: (data.streak === 0 || !!data.timeLeft) ?
            Strings.STREAK_NOTE_TODO : Strings.STREAK_NOTE_DONE
    }
}
