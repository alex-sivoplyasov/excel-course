export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer(initialState, {type: '__INIT__'})
    let listeners = []

    return {
        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter( listener => listener !== fn)
                }
            }
        },
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach( listener => listener(state))
        },
        getState() {
            return state
        }
    }
}

// class createStore {
//     constructor(rootReducer, initialState = {}) {
//         this.state = rootReducer(...initialState, {type: '__INIT__'})
//         this.listeners = []
//     }
//
//     subscribe(fn) {
//         this.listeners.push(fn)
//         return () => {
//             this.listeners.filter( listener => listener !== fn)
//         }
//
//     }
//
//     dispatch(action) {
//         this.state = rootReducer(this.state, action)
//         this.listeners.forEach( listener => listener(this.state))
//     }
//
//     getState() {
//
//     }
// }
