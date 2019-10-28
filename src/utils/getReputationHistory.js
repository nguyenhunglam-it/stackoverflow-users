import APIs from "../configs/APIsConfig"

export default async function (id) {
  return fetch(APIs.REPUTATION_HISTORY(id))
    .then((response) => response.json())
    .catch(err => false)
}