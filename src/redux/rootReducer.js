import {ACTIVE_CELL, CELLS_CONTENT, TABLE_RESIZE} from '@/redux/types'

export function rootReducer(state, action) {
    let prevState
    console.log(action)
    switch (action.type) {
    case TABLE_RESIZE:
        // eslint-disable-next-line no-case-declarations
        const type = action.data.type === 'col' ?
            'colState' :
            'rowState'
        prevState = state[type] || {}
        prevState[action.data.id] = action.data.value
        return {...state, [type]: prevState}
    case CELLS_CONTENT:
        prevState = state.cellsContent || {}
        prevState[action.data.id] = action.data.value
        // console.log('ssddsd')
        return {...state, cellsContent: prevState}
    case ACTIVE_CELL:
        return {...state, activeCell: action.data}
    default:
        return state
    }
}

