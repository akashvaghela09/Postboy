import { 
    STORE_HISTORY
} from './actionType'

const initialState = {
    history: []
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        
        case STORE_HISTORY:
        return {
            ...state,
            history: payload
        }
        default:
            return state
    }
}

export {reducer}