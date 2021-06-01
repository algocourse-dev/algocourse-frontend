import React, { memo, useState } from 'react'
import classnames from 'classnames'
import styles from 'styles/Search.module.sass'
import { Images } from 'constants/images'
import { ReactSVG } from 'react-svg'
import { Strings } from 'constants/strings'

type SearchProps = {
    onSearchIconClick?(): void
}

export const Search = memo<SearchProps>(({onSearchIconClick}) => {
    const [isSearching, setSearching] = useState(false)

    return (
        <div className={classnames(styles.container, {[styles.isSearching]: isSearching})}>
            <ReactSVG src={Images.SEARCH} className={styles.searchIcon} onClick={_onSearchIconClick}/>
            <input ref={onSearchInputRefChange} type='text' placeholder={Strings.DASHBOARD_SEARCH_PLACEHOLDER}/>
        </div>
    )

    function _onSearchIconClick() {
        setSearching(!isSearching)

        if (onSearchIconClick) {
            onSearchIconClick()
        }
    }

    function onSearchInputRefChange(searchInputRef: HTMLInputElement) {
        if (searchInputRef) {
            searchInputRef.focus()
            searchInputRef.value = ''
        }
    }
})