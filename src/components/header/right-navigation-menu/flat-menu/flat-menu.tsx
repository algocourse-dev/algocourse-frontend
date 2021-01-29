import React, { FC, ReactNode } from 'react'

type FlatMenuProps = {
    items?: Array<ReactNode>
    className: string
    mainComponent: ReactNode
}

export const FlatMenu: FC<FlatMenuProps> = ({items, className, mainComponent}) => {
    return (
        <div className={className}>
            {items}
            {mainComponent}
        </div>
    )
}
