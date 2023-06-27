import {
    User_Data
} from "../actionType";

import * as api from '../api'

export const get_User = (data) => async (dispatch) => {
    try {
        const { data } = await api.get_User();
        dispatch({ type: User_Data, payload: data });
      } catch (error) {
        dispatch({ type: User_Data, payload: [] });
      }
};