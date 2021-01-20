import React, { FC } from 'react'
import Head from 'next/head'
import { SITE_DESCRIPTION, SITE_TITLE } from 'constants/constants'

type SEOProps = {
    title: string
    description?: string
}

export const SEO: FC<SEOProps> = ({title, description}) => {
    const metaDescription = description || SITE_DESCRIPTION

    return (
        <Head>
            <title>{`${title} | ${SITE_TITLE}`}</title>
            <link rel='icon' href='/favicon.ico' />
            <meta name='robots' content='follow, index' />
            <meta content={metaDescription} name='description' />
            {/* TODO: other meta tags for SEO */}
        </Head>
    )
} 
