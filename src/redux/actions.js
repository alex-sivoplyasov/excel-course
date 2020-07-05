import {ACTIVE_CELL, CELLS_CONTENT, TABLE_RESIZE} from '@/redux/types';

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

export function activeCellAction(cell) {
    return {
        type: ACTIVE_CELL,
        data: cell
    }
}
