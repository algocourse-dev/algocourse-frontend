import {
    ProblemResult,
    BlockType,
} from "./constants"

export type TCompany = {
    readonly id: string
    readonly name: string
}

export type TProblemStatus = {
    readonly result: ProblemResult
    readonly rejectedReason?: string
}

export type TBlock = {
    readonly type: BlockType
    readonly stop: boolean
    readonly [key: string]: any
}

export type TMarkdownBlock = Pick<TBlock, 'type'> & {
    readonly content: string
}
