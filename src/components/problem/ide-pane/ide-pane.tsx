import { AceEditor } from 'components/ace-editor'
import { Ace } from 'ace-builds'
import React, { forwardRef, memo } from 'react'
import styles from 'styles/IDEPane.module.sass'
import { Images } from 'constants/images'
import { ReactSVG } from 'react-svg'

type IDEPaneProps = {
    onAceEditorLoad?: (editor: Ace.Editor) => void
}

export const IDEPane = memo(forwardRef<HTMLDivElement, IDEPaneProps>(({onAceEditorLoad}, ref) => {
    return (
        <div className={styles.container} ref={ref}>
            {renderControlBar()}
            {renderIDE()}
        </div>
    )

    function renderControlBar(): JSX.Element {
        return (
            <div className={styles.controlBar}>
                <div className={styles.language}>C++</div>
                <div className={styles.extraButtons}>
                    <ReactSVG src={Images.RESET} className={styles.extraButton} />
                    <ReactSVG src={Images.GEAR} className={styles.extraButton} />
                    <ReactSVG src={Images.RESIZE} className={styles.extraButton} />
                </div>
            </div>
        )
    }

    function renderIDE(): JSX.Element {
        const code = `class Solution {
public:
    struct HASH {   
        size_t operator()(const pair<int, int> & x) const {
            return hash<long long>()(((long long)x.first)^(((long long)x.second)<<32));
        }
    };
    
    int numberOfArithmeticSlices(vector<int>& A) {
        int n = A.size();
        unordered_map<pair<int, int>, int, HASH> M;
        int res = 0;
        for(int i = 1; i < A.size(); i++) {
            int d = A[i] - A[i-1];
            if (i == 1) M[make_pair(1, d)] = 1;
            else {
                if (A[i-1] - A[i-2] != d) continue;
                M[make_pair(i, d)] = 2 + M[make_pair(i-2, d)];
                res += max(0, M[make_pair(i, d)] - 1);
            }
        }
        return res;
    }
};`

        return (
            <AceEditor
                name='aceEditor'
                onLoad={onLoad}
                mode='c_cpp'
                theme='twilight'
                value={code}
                wrapEnabled={true}
                showPrintMargin={false}
            />
        )
    }

    function onLoad(editor: Ace.Editor) {
        if (!!onAceEditorLoad) {
            onAceEditorLoad(editor)
        }
        editor.renderer.setPadding(10)
        editor.renderer.setScrollMargin(10, 0, 0, 0)
    }
}))