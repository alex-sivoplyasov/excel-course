import {
    APPLY_STYLE,
    CELLS_CONTENT,
    CHANGE_STYLES, TABLE_NAME,
    TABLE_RESIZE
} from '@/redux/types'

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function cellContentAction(data) {
    return {
        type: CELLS_CONTENT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function setTableName(data) {
    return {
        type: TABLE_NAME,
        data
    }
}
