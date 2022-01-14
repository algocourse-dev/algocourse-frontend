import React, { FC } from 'react'
import Head from 'next/head'

export const FontList: FC = () => {
    return (
        <Head>
            <link
                rel="preload"
                href="/fonts/Gilroy/Gilroy-Bold.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Gilroy/Gilroy-SemiBold.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Gilroy/Gilroy-Medium.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/Gilroy/Gilroy-Regular.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/AvertaStd/AvertaStd-Bold.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/AvertaStd/AvertaStd-SemiBold.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/AvertaStd/AvertaStd-Regular.ttf"
                as="font"
                crossOrigin=""
            />
        </Head>
    )
}
