import APIs from "../configs/APIsConfig"

export default async function (page) {
  return fetch(APIs.USER_LIST(page))
    .then((response) => response.json())
    .catch(err => false)
}