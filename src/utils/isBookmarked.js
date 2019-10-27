import store from "../store"

export default function isBookmarked(id) {
  const bookmarked = Object.keys(store.getState().bookmarked)
  return bookmarked.includes(id)
}