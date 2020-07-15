import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants';

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

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState
