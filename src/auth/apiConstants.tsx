const BASE = "http://localhost:8008/"
// base is not neede because it is set in the axios instance.

export default {

    COMPETITION_LIST: "api/competition/list",
    COMPETITION_DETAIL: "api/competition/detail",
    COMPETITION_CREATE: "api/competition/create",
    COMPETITION_UPDATE: "api/competition/update",
    COMPETITION_DELETE: "api/competition/delete",
    COMPETITION_CATEGORIES: "api/competition/categories",
    COMPETITION_CATEGORY_UPDATE: "api/competition/categories-update",
    COMPETITION_CATEGORY_DELETE: "api/competition/categories-delete",

    CLUB_LIST: "api/club-list",
    CLUB_DETAIL: "api/club-create",
    CLUB_UPDATE: "api/club-create",
    CLUB_CREATE: "api/club-update",
    CLUB_DELETE: "api/club-delete",

    CATEGORY_LIST: "api/category-list",

    JUDOKA_LIST: "api/judoka-list",
    JUDOKA_CREATE: "api/judoka-create",
    JUDOKA_DETAIL: "api/judoka-create",
    JUDOKA_UPDATE: "api/judoka-update",
    JUDOKA_DELETE: "api/judoka-delete",

    BASE_URL: BASE,
    TOKEN: "kmasdk2me241ASAS#\"!23alö,f",
    VERIFYUSER: "auth/verifyUser/",
    GOOGLE: "auth/google/"
}
