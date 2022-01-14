import { UseQueryResult } from 'react-query'

export type TPresenter<TData = unknown, TError = unknown> =
    Pick<UseQueryResult<TData, TError>, 'data' | 'error' | 'isLoading' | 'isError'>
