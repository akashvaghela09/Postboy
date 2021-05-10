import { 
    ADD_FORM_ROW,
    STORE_BODYDATA_RESPONSE,
    STORE_REQ_RESPONSE    
} from './actionType'

const initialState = {
    reqRes: [],
    bodyData: "",
    formList: []
}

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        
        case STORE_REQ_RESPONSE:
            return {
                ...state,
                reqRes: payload
            }
        case STORE_BODYDATA_RESPONSE:
            return {
                ...state,
                bodyData: payload
            }
        case ADD_FORM_ROW:
        return {
            ...state,
            formList: payload
        }
        default:
            return state
    }
}

export {reducer}