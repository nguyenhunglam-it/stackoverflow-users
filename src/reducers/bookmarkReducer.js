import { INITIALIZE_BOOKMARK, TOGGLE_BOOKMARK } from "../actions/types";

const initialState = {};
/*
{
  account_id: {
    display_name,
    profile_image,
    reputation
  }
}
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_BOOKMARK:
      return {
        ...state,
        ...action.payload
      }
    case TOGGLE_BOOKMARK:
      user = action.payload;
      if (!state[user.account_id]) {
        return {
          ...state,
          [user.account_id]: {
            display_name: user.display_name,
            profile_image: user.profile_image,
            reputation: user.reputation
          }
        };
      }
      else {
        let newState = { ...state };
        delete newState[user.account_id];
        return newState;
      }

    default:
      return state;
  }
}