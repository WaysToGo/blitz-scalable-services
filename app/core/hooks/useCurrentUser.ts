import getCurrentUser from "app/admin/users/queries/getCurrentUser"
import { useQuery } from "blitz"

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null, { refetchOnWindowFocus: false })
  return user
}
