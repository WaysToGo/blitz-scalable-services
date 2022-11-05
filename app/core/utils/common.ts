// remove object keys with empty  values
export const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key]
    }
  })
  return obj
}

//Sort stores by distance
export const sortStores = (stores) => {
  return stores.sort((a, b) => {
    if (parseFloat(a.distance) > parseFloat(b.distance)) {
      return 1
    }
    if (parseFloat(a.distance) < parseFloat(b.distance)) {
      return -1
    }
    return 0 // a must be equal to b
  })
}

//Format address string to display
export const getAddress = (
  address: string,
  city: string,
  state: string,
  country: string,
  zip: string
) => {
  return `${address ? address : ""}${city ? ", " + city : ""} ${state ? +", " + state : ""} ${
    country ? ", " + country : ""
  } ${zip ? zip : ""}`
}
