import {
    APPLY_STYLE,
    CELLS_CONTENT,
    CHANGE_STYLES, OPENING_DATE, TABLE_NAME,
    TABLE_RESIZE
} from '@/redux/types'

export function rootReducer(state, action) {
    let field
    let val
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
        return {...state, currentStyles: action.data}
    case APPLY_STYLE:
        field = 'stylesState'
        val = state[field] || {}
        action.data.ids.forEach( id => {
            val[id] = {...val[id], ...action.data.value}
        })
        return {
            ...state,
            [field]: val,
            currentStyles: {...state.currentStyles, ...action.data.value}
        }
    case TABLE_NAME:
        return {...state, tableName: action.data}
    case OPENING_DATE:
        console.log(action)
        return {...state, openingDate: action.data}
    default:
        return state
    }
}

function getValue(state, action) {
    const prevState = state || {}
    prevState[action.data.id] = action.data.value
    return prevState
}

