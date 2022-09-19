// import { MakeLogin, MakeSignUp, MakeSurveyList, MakeSurveyResult } from '@/main/factories/pages'
// import { ApiContext } from '@/presentation/context'
// import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '../adapters/current-account-adapter'
// import { PrivateRoute } from '@/presentation/components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import SignUp from '@/presentation/pages/accessLayout/signUp/signUp'
import AddAccountService from '@/services/add-account-service'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/presentation/styles/theme'
import { ApiContext, setCurrentAccount, getCurrentAccount } from '@/presentation/context/api-context'
import AuthService from '@/services/auth-service'
import Login from '@/presentation/pages/accessLayout/login/login'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
    value={{
      setCurrentAccount,
      getCurrentAccount
    }}
      >
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<PrivateRoute />}>
              <Route path="/" element={<MakeSurveyList />} />
              <Route path="/surveys/:id" element={<MakeSurveyResult />} />
            </Route> */}
            <Route path="/login" element={<Login authentication={new AuthService()} />} />
            <Route
              path="/signup"
              element={<SignUp addAccount={new AddAccountService()} />}
            />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApiContext.Provider>
  )
}

export default Router
