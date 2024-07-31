import { Suspense, lazy } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from "react-router-dom";
import { routes } from './routes/routes';
import SuspenseLoader from './components/common/SuspenseLoader';
import Signin from './signin/Signin';
import Register from './signin/Register';
import { AuthorizeUser, UnAuthorizeUser } from './middleware/AuthorizeUser';
const ErrorComponent = lazy(() => import('./components/common/ErrorComponent'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/register" element={<AuthorizeUser><Register /></AuthorizeUser>} />
     
        <Route path={'/signin'} element={ <AuthorizeUser><Signin /></AuthorizeUser>} />
      <Route path={routes.main.path} element={<UnAuthorizeUser><Navigate to={`${routes.emails.path}/inbox`} /></UnAuthorizeUser>} />
      <Route path={routes.main.path} element={<UnAuthorizeUser><routes.main.element /></UnAuthorizeUser>}>
        <Route path={`${routes.emails.path}/:type`} element={<UnAuthorizeUser><routes.emails.element /></UnAuthorizeUser>} errorComponent={<ErrorComponent />} />
        <Route path={routes.view.path} element={<UnAuthorizeUser></UnAuthorizeUser>} errorComponent={<ErrorComponent />} />
      </Route>
      <Route path={routes.invalid.path} element={<UnAuthorizeUser><Navigate to={`${routes.emails.path}/inbox`} /></UnAuthorizeUser>} />
    </Route>
  )
)


function App() {

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
