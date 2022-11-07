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
import SidebarWithHeader from '@/presentation/components/sidebar/sidebar'
import Header from '@/presentation/components/header/header'
import Projects from '@/presentation/pages/projects/projects'
import { QueryClient, QueryClientProvider } from 'react-query'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import Funcionalidades from '@/presentation/pages/funcionalidades/funcionalidades'
import NotFound from '@/presentation/pages/notFound/notFound'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries on dev mode
      retry: process.env.NODE_ENV !== 'development',
    },
  },
})
console.log(process.env.NODE_ENV)
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
                <Route path="" element={<Header />}>
                  <Route index element={<Projects />} />
                </Route>
                <Route path="project/:id" element={<SidebarWithHeader />}>
                  <Route index element={<Funcionalidades />} />
                </Route>
              </Route>
              <Route
                path="/login"
                element={<Login authentication={new AuthService()} />}
              />
              <Route
                path="/cliente"
                element={<SignUp addAccount={new AddAccountService()} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </ApiContext.Provider>
    </QueryClientProvider>
  )
}

export default Router
