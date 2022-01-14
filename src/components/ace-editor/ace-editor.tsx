import dynamic from 'next/dynamic'

// https://github.com/securingsincity/react-ace/issues/725
export const AceEditor = dynamic(
    async () => {
        const reactAce = await import('react-ace')

        // Prevent warning in console about misspelled props name.
        await import("ace-builds/src-min-noconflict/ext-language_tools")

        // Import your theme/mode here. <AceEditor mode="javascript" theme="solarized_dark" />
        await import("ace-builds/src-min-noconflict/mode-c_cpp")
        await import("ace-builds/src-min-noconflict/theme-solarized_dark")

        // You can paste these files into your /public folder.
        // You will have to set basePath and setModuleUrl accordingly.
        const ace = await import('ace-builds/src-min-noconflict/ace')
        ace.config.set(
            'basePath',
            'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/'
        )
        ace.config.setModuleUrl(
            'ace/mode/javascript_worker',
            'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-noconflict/worker-javascript.js'
        )

        return reactAce
    },
    {
        ssr: false  // react-ace doesn't support server side rendering as it uses the window object.
    }
)