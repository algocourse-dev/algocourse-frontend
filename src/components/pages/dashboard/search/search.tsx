import React, { memo, useEffect, useState } from 'react'
import classnames from 'classnames'
import styles from 'styles/Search.module.sass'
import { Images } from 'constants/images'
import { ReactSVG } from 'react-svg'
import { Strings } from 'constants/strings'
import { usePreviousDistinct } from 'react-use'

type SearchProps = {
    onSearchIconClick?(): void
}

export const Search = memo<SearchProps>(({onSearchIconClick}) => {
    const [isSearching, _] = useState(false)
    const [value, setValue] = useState<string>('')
    const previousValue = usePreviousDistinct<string>(value)

    useEffect(() => {
        if (!onSearchIconClick) {
            return
        }

        if (!!value && previousValue === '') {
            onSearchIconClick()
        } else if (value === '' && !!previousValue) {
            onSearchIconClick()
        }
    }, [value])

    return (
        <div className={classnames(styles.container, {[styles.isSearching]: isSearching})}>
            <ReactSVG src={Images.SEARCH} className={styles.searchIcon} />
            <input
                onChange={onSearchValueChange}
                type='text'
                placeholder={Strings.DASHBOARD_SEARCH_PLACEHOLDER}
                autoFocus={false}
                value={value} />
        </div>
    )

    // function _onSearchIconClick() {
    //     setSearching(!isSearching)

    //     if (onSearchIconClick) {
    //         onSearchIconClick()
    //     }
    // }

    function onSearchValueChange(event) {
        setValue(event.target.value)
    }

    // function onSearchInputRefChange(searchInputRef: HTMLInputElement) {
    //     if (searchInputRef) {
    //         searchInputRef.focus()
    //         searchInputRef.value = ''
    //     }
    // }
})