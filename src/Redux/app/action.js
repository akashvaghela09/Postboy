import { 
    STORE_HISTORY
} from '../app/actionType'

const storeHistory = (payload) => {
    return {
        type: STORE_HISTORY,
        payload
    }
}


export { 
    storeHistory
}