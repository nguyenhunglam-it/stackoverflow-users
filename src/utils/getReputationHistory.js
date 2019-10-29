import APIs from "../configs/APIsConfig"

export default async function (id, page) {
  return fetch(APIs.REPUTATION_HISTORY(id, page))
    .then((response) => response.json())
    .catch(err => false)
}