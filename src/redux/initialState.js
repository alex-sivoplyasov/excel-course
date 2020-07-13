import {storage} from '@core/utils'
import {defaultStyles} from '@/constants';

const defaultState = {
    colState: {},
    rowState: {},
    cellsContent: {},
    currentText: '',
    currentStyles: defaultStyles
}
export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState