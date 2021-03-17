import React, { FC } from 'react'
import { Strings } from 'constants/strings'
import Head from 'next/head'

type SEOProps = {
    pageTitle: string
    description?: string
}

export const SEO: FC<SEOProps> = ({pageTitle, description}) => {
    const metaDescription = description || Strings.SITE_DESCRIPTION

    return (
        <Head>
            <title>{`${pageTitle} | ${Strings.SITE_TITLE}`}</title>
            <link rel='icon' href='/favicon.ico' />
            <meta name='robots' content='follow, index' />
            <meta content={metaDescription} name='description' />
            {/* TODO: other meta tags for SEO */}
        </Head>
    )
} 
