import 'styles/globals.sass'
import { AppProps } from 'next/app'
import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { queryClient } from 'utils/query-client'

function MyApp({ Component, pageProps }: AppProps): ReactNode {
    const queryClientRef = React.useRef<QueryClient>()
    if (!queryClientRef.current) {
        queryClientRef.current = queryClient
    }

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp
