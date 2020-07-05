import {storage} from '@core/utils';

const defaultState = {
    colState: {},
    rowState: {},
    cellsContent: {},
    activeCell: '1:1'
}
export const initialState = storage('excel-state')
    ? storage('excel-state')
    : defaultState
