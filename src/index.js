import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Navigate, Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import Allproduct from './pages/Allproduct';
import NewProduct from './pages/NewProduct';
import NotFound from './pages/NotFound';
import MyCart from './pages/MyCart';
import { useAuthContext } from './context/AuthContext';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './component/CategoryPage';
import Search from './pages/Search';
import Join from './pages/Join';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

//관리자 인증 (여기서 하나라도 맞으면 페이지를 이동할 수 없으며 홈으로 이동하게된다.)
const ProtectRoute = ({checkAdmin, children}) => {
  const { user } = useAuthContext();
  if(!user || (checkAdmin && !user.isAdmin)){
    return <Navigate to='/' replace />
  }
  return children;
}

const routes = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    errorElement : <NotFound />,
    
    children : [ //헤더 페이지 연결
      {path : '/products', element : <Allproduct/>},
      {
        path : '/products/new',
        element :
        <ProtectRoute checkAdmin>
          <NewProduct/>
        </ProtectRoute>
      },
      {path : '/cart', element : <MyCart/>},
      {path : '/products/detail/:id', element : <ProductDetail/>},
      {path : '/products/:category', element : <CategoryPage/>},
      {path : '/search', element : <Search/>},
      {path : '/login', element : <Login/>},
      {path : '/join', element : <Join/>}
    ]
  }
])
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
