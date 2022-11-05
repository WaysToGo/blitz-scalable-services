import { getConfig } from "blitz"

const { publicRuntimeConfig } = getConfig()

export async function getShortestRoute(coords: string[], profile: string) {
  const newCoords = coords.join(";")
  const radius = coords.map(() => 25)
  return getRoute(newCoords, radius, profile)
}

async function getRoute(coordinates, radius, profile) {
  const radiuses = radius.join(";")
  // // Optimize trips
  // const query = await fetch(
  //   `https://api.mapbox.com/optimized-trips/v1/mapbox/${profile}/${coordinates}?geometries=geojson&source=first&destination=last&roundtrip=false&access_token=${token}`,
  //   { method: "GET" }
  // )

  // Directions
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coordinates}?geometries=geojson&access_token=${publicRuntimeConfig.MAPBOX_ACCESS_TOKEN}`,
    { method: "GET" }
  )

  const response = await query.json()
  // Handle errors
  if (response.code !== "Ok") {
    alert(`${response.code} - ${response.message}.\n`)
    return
  }

  return response.routes[0]
}
