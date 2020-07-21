import {defaultStyles, defaultTitle} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
    colState: {},
    rowState: {},
    cellsContent: {},
    currentText: '',
    currentStyles: defaultStyles,
    stylesState: {},
    tableName: defaultTitle,
    openingDate: Date.now()
}
const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})


export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
