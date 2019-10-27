import AsyncStorage from '@react-native-community/async-storage';
import store from "../store";
import { toggle_bookmark } from "../actions/";

export default function toogleBookmark(user) {
  store.dispatch(toggle_bookmark(user));
  const bookmarked = JSON.stringify(store.getState().bookmarked);
  AsyncStorage.setItem("bookmarked", bookmarked)
}