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
    openingDate: Date.now()
}
const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})


export function normalizeInitialState(state) {
    console.log(Date.now())
    const test = Date.now()
    console.log('type ', typeof test)
    return state ? normalize(state) : clone(defaultState)
}
