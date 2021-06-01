import { useEffect } from 'react'

export function useHtmlClassName(className: string) {
    useEffect(() => {
        document.querySelector('html').classList.add(className)

        return () => document.querySelector('html').classList.remove(className)
    }, [])
}