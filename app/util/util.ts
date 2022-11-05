import { AppConstants } from "app/core/constants/AppConstants"
import { Role } from "types"
import { Routes } from "blitz"

export const urlAndRolesObj = {

}
export const isUserAuthorized = (role, page) => {
  return urlAndRolesObj[page]?.includes(role)
}
