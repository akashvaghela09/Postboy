import { 
    ADD_FORM_ROW,
    STORE_BODYDATA_RESPONSE,
    STORE_REQ_RESPONSE
} from '../app/actionType'

const storeReqRes = (payload) => {
    return {
        type: STORE_REQ_RESPONSE,
        payload
    }
}

const storeBodyData = (payload) => {
    return {
        type: STORE_BODYDATA_RESPONSE,
        payload
    }
}

const addFormRow = (payload) => {
    return {
        type: ADD_FORM_ROW,
        payload
    }
}

export { 
    storeReqRes,
    storeBodyData,
    addFormRow
}