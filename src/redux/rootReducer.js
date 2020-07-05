import {CELLS_CONTENT, TABLE_RESIZE} from '@/redux/types'

export function rootReducer(state, action) {
    let prevState
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
        return {...state, cellsContent: prevState, currentText: action.data.value}
    default:
        return state
    }
}

