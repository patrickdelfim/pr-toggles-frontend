// import { MakeLogin, MakeSignUp, MakeSurveyList, MakeSurveyResult } from '@/main/factories/pages'
// import { ApiContext } from '@/presentation/context'
// import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'
// import { PrivateRoute } from '@/presentation/components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import SignUp from '@/presentation/pages/signUp/signUp'
import AddAccountService from '@/services/add-account-service'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/presentation/styles/theme'
import {
  ApiContext,
  setCurrentAccount,
  getCurrentAccount,
} from '@/presentation/context/api-context'
import AuthService from '@/services/auth-service'
import Login from '@/presentation/pages/login/login'
// import PrivateRoute from '@/presentation/components/private-route/private-route'
import SidebarWithHeader from '@/presentation/components/sidebar/sidebar'
import Header from '@/presentation/components/header/header'
import Dumb from '@/presentation/components/dumbComponent'
import Projects from '@/presentation/pages/projects/projects'
import { QueryClient, QueryClientProvider } from 'react-query'
import PrivateRoute from '@/presentation/components/private-route/private-route'

export const queryClient = new QueryClient()
const Router: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiContext.Provider
        value={{
          setCurrentAccount,
          getCurrentAccount,
        }}
      >
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path='/panel' element={<PrivateRoute />}>
                <Route path="/panel/" element={<Header />}>
                  <Route path="/panel/" element={<Projects />} />
                </Route>
                <Route path="/panel/project" element={<SidebarWithHeader />}>
                  <Route path="/panel/project/" element={<Dumb />} />
                </Route>
              </Route>
              <Route
                path="/login"
                element={<Login authentication={new AuthService()} />}
              />
              <Route
                path="/signup"
                element={<SignUp addAccount={new AddAccountService()} />}
              />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </ApiContext.Provider>
    </QueryClientProvider>
  )
}

export default Router
