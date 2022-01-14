import { Strings } from 'constants/strings'
import React, { forwardRef, memo, useState } from 'react'
import styles from 'styles/ConsolePane.module.sass'
import classnames from 'classnames'
import { Images } from 'constants/images'
import { ReactSVG } from 'react-svg'

enum ConsolePaneTab {
    CustomInput = 'Custom input',
    Output = 'Output',
}

const ConsolePaneTabString = {
    [ConsolePaneTab.CustomInput]: Strings.CUSTOM_INPUT,
    [ConsolePaneTab.Output]: Strings.OUTPUT,
}

export const ConsolePane = memo(forwardRef<HTMLDivElement>((props, ref) => {
    const [tab, setTab] = useState<ConsolePaneTab>(ConsolePaneTab.Output)

    return (
        <div className={styles.container} ref={ref}>
            {renderTabsBar()}
            {renderTabContent()}
            {renderControlBar()}
        </div>
    )

    function renderTabsBar(): JSX.Element {
        return (
            <div className={styles.tabsBar}>
                {
                    Object.keys(ConsolePaneTabString).map(_tab => (
                        <div key={_tab} className={classnames({[styles.selectedTab]: tab === _tab})} onClick={() => setTab(_tab as ConsolePaneTab)}>
                            {ConsolePaneTabString[_tab]}
                        </div>
                    ))
                }
            </div>
        )
    }

    function renderTabContent(): JSX.Element {
        return (
            <div className={styles.tabContent}>
                {
                    tab === ConsolePaneTab.CustomInput ?
                        renderInputBox() :
                    tab === ConsolePaneTab.Output ?
                        renderOutputBox() :
                    null
                }
            </div>
        )
    }

    function renderControlBar(): JSX.Element {
        return (
            <div className={styles.controlBar}>
                <div className={styles.minimizeButton}>
                    <div>Console</div>
                    <ReactSVG src={Images.DOWN_FILLED_ARROW} className={styles.downFilledArrow} />
                </div>
                <div>
                    <button>Run code</button>
                    <button>Submit</button>
                </div>
            </div>
        )
    }

    function renderInputBox(): JSX.Element {
        return (
            <textarea className={styles.inputBox} />
        )
    }

    function renderOutputBox(): JSX.Element {
        return null
    }

}))