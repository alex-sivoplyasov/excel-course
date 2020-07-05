import {storage} from '@core/utils';

const defaultState = {
    colState: {},
    rowState: {},
    cellsContent: {},
    currentText: ''
}
export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState
