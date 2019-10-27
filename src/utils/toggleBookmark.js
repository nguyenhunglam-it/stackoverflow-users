import store from "../store"
import { toggle_bookmark } from "../actions/"

export default function toogleBookmark(user) {
  store.dispatch(toggle_bookmark(user))
  
}