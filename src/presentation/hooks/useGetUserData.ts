import { useContext } from 'react'
import { ApiContext } from '../context'
import jwt_decode from 'jwt-decode'

function useGetUserData (): any {
  const { getCurrentAccount } = useContext(ApiContext)
  const userData = getCurrentAccount()
  const decodedData = jwt_decode(userData.accessToken)
  return decodedData
}
export default useGetUserData
