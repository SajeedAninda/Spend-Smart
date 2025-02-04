import useAuth from './useAuth'
import useAxiosInstance from './useAxiosInstance'
import { useQuery } from '@tanstack/react-query'

const useCurrentUserData = () => {
  let { loggedInUser } = useAuth()
  let currentUserEmail = loggedInUser?.email
  let axiosInstance = useAxiosInstance()

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['userData', currentUserEmail],
    queryFn: async () => {
      const response = await axiosInstance.get(`/userData/${currentUserEmail}`)
      return response.data
    },
    enabled: !!currentUserEmail
  })

  return { userData, isUserLoading }
}

export default useCurrentUserData
