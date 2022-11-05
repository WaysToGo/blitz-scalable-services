import getUsers from "app/admin/users/queries/getUsers"

//*** */Make changes to this file with caution***
export const AppConstants = {
  fieldTypes: {
    search: "search",
    searchUnmerged: "search_unmerged",
    number: "number",
    dropdownWithDBSource: "dropdownWithDBSource",
    dropdownWithDBSourceUnMerged: "dropdownWithDBSourceUnMerged",
    dropdownWithStaticData: "dropdownWithStaticData",
    searchWithImage: "searchWithImage",
    dropdownWithStaticImage: "dropdownWithStaticImage",
    autoCompleteWithImageDifferentSource: "autoCompleteWithImageDifferentSource",
    divider: "divider",
    checkbox: "checkbox",
  },
  PROFILES: {
    ADMIN: "admin",
    MANAGER: "manager", //default for now or change in create role.ts
    DIRECTOR: "director",
    SENIOR_MANAGER: "senior manager",
  },
  profileValues: ["admin", "manager", "director", "senior manager"],
  RiceCabinetHingeLocation: ["Left", "Right"],

}
