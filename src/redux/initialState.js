// import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants';
import {clone} from '@core/utils';

const defaultState = {
    colState: {},
    rowState: {},
    cellsContent: {},
    currentText: '',
    currentStyles: defaultStyles,
    stylesState: {},
    tableName: defaultTitle,
}
const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})


export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}
