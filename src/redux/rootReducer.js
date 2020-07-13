import {CELLS_CONTENT, CHANGE_STYLES, TABLE_RESIZE} from '@/redux/types'

export function rootReducer(state, action) {
    switch (action.type) {
    case TABLE_RESIZE:
        // eslint-disable-next-line no-case-declarations
        const type = action.data.type === 'col' ?
            'colState' :
            'rowState'
        return {...state, [type]: getValue(state[type], action)}
    case CELLS_CONTENT:
        return {...state, cellsContent: getValue(state.cellsContent, action), currentText: action.data.value}
    case CHANGE_STYLES:
        return {...state, currentStyles: getValue(state.currentStyles, action)}
    default:
        return state
    }
}

function getValue(state, action) {
    const prevState = state || {}
    prevState[action.data.id] = action.data.value
    return prevState
}

