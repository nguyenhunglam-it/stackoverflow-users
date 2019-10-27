import { INITIALIZE_BOOKMARK, TOGGLE_BOOKMARK } from "./types";

export const toggle_bookmark = (user) => ({ type: TOGGLE_BOOKMARK, payload: user });
export const initialize_bookmark = (bookmarkedFromStorage) => ({ type: INITIALIZE_BOOKMARK, payload: bookmarkedFromStorage });