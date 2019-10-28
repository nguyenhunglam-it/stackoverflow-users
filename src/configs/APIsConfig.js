const PAGE_SIZE = 30;
const SITE = "stackoverflow";
export default {
    USER_LIST: (page) => "https://api.stackexchange.com/2.2/users?page=" + page + "&pagesize=" + PAGE_SIZE + "&site=" + SITE,
    REPUTATION_HISTORY: (id) => "https://api.stackexchange.com/2.2/users/" + id + "/reputation-history?page=1&pagesize=30&site=" + SITE
}