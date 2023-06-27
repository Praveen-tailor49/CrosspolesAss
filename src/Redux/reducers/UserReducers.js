import {
    Show_Modal,
    User_Data,
    User_Single_Data,
    Page_Status,
    Update_Count
} from "../actionType"

const initialState = {
    userData: [], showModal: false, singleData: [], pageStatus: false, updateCount:0
}

const UserReducers = (state = initialState, action) => {
    switch (action.type) {

        case User_Data:
            return {
                ...state,
                userData: action.payload
            };
        case Show_Modal:
            return {
                ...state,
                showModal: action.payload
            };
        case User_Single_Data:
            return {
                ...state,
                singleData: action.payload
            };
        case Page_Status:
            return {
                ...state,
                pageStatus: action.payload
            };
            case Update_Count:
            return {
                ...state,
                updateCount: action.payload
            }

        default:
            return state
    }
}

export default UserReducers