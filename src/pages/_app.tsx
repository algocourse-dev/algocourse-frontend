import 'styles/globals.sass'
import { AppProps } from 'next/app'
import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'


function MyApp({ Component, pageProps }: AppProps): ReactNode {
    const queryClientRef = React.useRef<QueryClient>()
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient()
    }

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <Component {...pageProps} />
        </QueryClientProvider>
    )
}

export default MyApp
