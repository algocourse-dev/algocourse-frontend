/* Inspired and referenced from 'reselect */

import { useMemo } from "react";
import { TPresenter } from "./types";
import { UseQueryResult } from 'react-query'

/* One presenters */
type TPresenterFunction<TData> = () => (TPresenter<TData> | UseQueryResult<TData, unknown>)
export function usePresenterCreator<R1, T>(
    presenter: TPresenterFunction<R1>,
    combiner: (res: R1) => T
): TPresenterFunction<T>
/* Two presenters */
export function usePresenterCreator<R1, R2, T>(
    presenter1: TPresenterFunction<R1>,
    presenter2: TPresenterFunction<R2>,
    combiner: (res1: R1, res2: R2) => T
): TPresenterFunction<T>
/* Three presenters */
export function usePresenterCreator<R1, R2, R3, T>(
    presenter1: TPresenterFunction<R1>,
    presenter2: TPresenterFunction<R2>,
    presenter3: TPresenterFunction<R3>,
    combiner: (res1: R1, res2: R2, res3: R3) => T
): TPresenterFunction<T>
export function usePresenterCreator(...funcs) {
    const compiledFunc = funcs.pop()
    const sourceFuncs: Array<() => TPresenter<any>> = getDependencies(funcs)

    const presenterFunc = function() {
        const dataResults: Array<any> = []
        const errorResults: Array<any> = []
        const isErrorResults: Array<boolean> = []
        const isLoadingResults: Array<boolean> = []
        for(let i = 0; i < sourceFuncs.length; i++) {
            const results = sourceFuncs[i]()

            dataResults.push(results.data)
            errorResults.push(results.error)
            isErrorResults.push(results.isError)
            isLoadingResults.push(results.isLoading)
        }

        const presenterData = useMemo(() => compiledFunc.apply(undefined, dataResults), dataResults)

        return {
            data: presenterData,
            error: errorResults.find(error => !!error), 
            isError: isErrorResults.some(Boolean),
            isLoading: isLoadingResults.some(Boolean),
        }
    }

    return presenterFunc
}

function getDependencies(funcs) {
    const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs

    if (!dependencies.every(dep => typeof dep === 'function')) {
        const dependencyTypes = dependencies.map(dep => typeof dep).join(', ')
        throw new Error(
            'Presenter creators expect all input-selectors to be functions, ' +
            `instead received the following types: [${dependencyTypes}]`
        )
    }

    return dependencies
}