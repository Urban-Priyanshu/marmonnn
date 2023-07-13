import { Suspense, lazy, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, useNavigate, useRoutes } from 'react-router';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';
import ManageUsers from './content/SuperAdmin/ManageUsers';
import EditUser from './content/SuperAdmin/EditUser';
import ManageCustomers from './content/SystemAdmin/ManageUsers';
import Login from './content/Auth/Login';
import ForgotPassword from './content/Auth/Forgot Password';
import Register from './content/Auth/Register';
import { useSelector } from 'react-redux';
import { getAuthUser } from './redux/actions/authActions';
import ResetPassword from './content/Auth/Reset Password';
import UnderDev from './content/pages/Status/UnderDevelopment/UnderDev';
import UnderDevv from './content/pages/Status/UnderDevelopment/underDevv';
import EditCustomer from './content/SystemAdmin/ManageUsers/SingleCustomer';
import ManageSalesCustomers from './content/SalesRep/ManageCustomers';
import DuoCallBack from './DuoCallBack';
import CustomerPortalBulkOrder from './content/CustomerPortal/BulkOrder';
import BarCodeScanner from './content/CustomerPortal/BarcodeScanner';
import CustomerPortalBlanketPo from './content/CustomerPortal/BlanketPo';
import CustomerPortalForecast from './content/CustomerPortal/ForecastConfig';
import CustomerPortalMain from './content/CustomerPortal/Product';

import ProductCart from './content/CustomerPortal/Product/Cart';
import ProductDetail from './content/CustomerPortal/Product/ProductDetail';

import OrderHistory from './content/CustomerPortal/Product/Table/orderHistory';
import NoPermissions from './content/pages/Status/NoPermissions';
import CompareForecast from './content/SystemAdmin/ManageUsers/SingleCustomer/CustomerTabs/ForestOrderConfig/CompareForecast';
import OverallDashboard from './content/Dashboard/Overall';
import Dashboard from './content/Dashboard';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// manage-userss.

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);

const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const AppRoutes = () => {
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const customerData = useSelector((state) => state?.customers?.customerData);
  const navigate = useNavigate();

  if (!authUser) {
    return useRoutes([
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="auth" replace />
          }
        ]
      },
      {
        path: 'auth',
        element: <BaseLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="login" replace />
          },

          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          },
          {
            path: 'register',
            element: <Register />
          },
          {
            path: 'duoCallback',
            element: <DuoCallBack />
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          }
        ]
      },
      {
        path: '*',
        element: <Navigate to="auth" replace />
      }
    ]);
  } else if (
    authUser &&
    authUser?.roles?.some((d) => d?.id === 1 || (d?.id === 1 && d?.id === 2))
  ) {
    return useRoutes([
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="manage-users" replace />
          },

          {
            path: 'overview',
            element: <Navigate to="/" replace />
          },
          {
            path: 'status',
            children: [
              {
                path: '',
                element: <Navigate to="404" replace />
              },
              {
                path: '404',
                element: <Status404 />
              },
              {
                path: '500',
                element: <Status500 />
              },
              {
                path: 'maintenance',
                element: <StatusMaintenance />
              }
            ]
          },
          {
            path: '*',
            element: <Status404 />
          }
        ]
      },
      {
        path: '/',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="manage-users" replace />
          },

          {
            path: 'manage-users',
            element: <ManageUsers />
          },

          {
            path: 'manage-customers',
            element: <ManageCustomers />
          },
          {
            path: 'manage-sales-customers',
            element: <ManageSalesCustomers />
          },
          {
            path: 'compare-forecast',
            element: <CompareForecast />
          },

          {
            path: 'portal',
            element: <Dashboard />
          },

          {
            path: 'home',
            element: <StatusMaintenance />
          },
          {
            path: 'customers',
            element: <StatusMaintenance />
          },
          {
            path: 'under-development',
            element: <StatusMaintenance />
          },
          {
            path: 'settings',
            element: <StatusMaintenance />
          },
          {
            path: 'profile',
            element: <StatusMaintenance />
          }
        ]
      },
      {
        path: 'auth',
        element: <BaseLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="login" replace />
          },

          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },
      {
        path: 'customer-portal',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },
          customerData?.features?.find((d) => d?.featureCode === 'BF')
            ? {
                path: ':id/products',
                element: <CustomerPortalMain />
              }
            : {
                path: ':id/products',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BO')
            ? {
                path: ':id/bulkOrder',
                element: <CustomerPortalBulkOrder />
              }
            : {
                path: ':id/bulkOrder',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BPO')
            ? {
                path: ':id/blanketPo',
                element: <CustomerPortalBlanketPo />
              }
            : {
                path: ':id/blanketPo',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BCS')
            ? {
                path: ':id/BarCodeScanner',
                element: <BarCodeScanner />
              }
            : {
                path: ':id/BarCodeScanner',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'FC')
            ? {
                path: ':id/forecast',
                element: <CustomerPortalForecast />
              }
            : {
                path: ':id/forecast',
                element: <NoPermissions />
              },

          {
            path: ':id/cart',
            element: <ProductCart />
          },
          {
            path: `:id/product/:partNumber`,
            element: <ProductDetail />
          },
          {
            path: `:id/orderHistory`,
            element: <OrderHistory />
          }
        ]
      },
      {
        path: 'manage-users',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },

          {
            path: ':id',
            element: <EditUser />
          }
        ]
      },
      {
        path: 'manage-customers',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },

          {
            path: ':id',
            element: <EditCustomer />
          }
        ]
      }
    ]);
  } else if (
    authUser &&
    authUser?.roles?.some((d) => d?.id === 2 || (d?.id === 2 && d?.id === 3))
  ) {
    return useRoutes([
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="manage-customers" replace />
          },

          {
            path: 'overview',
            element: <Navigate to="/" replace />
          },
          {
            path: 'status',
            children: [
              {
                path: '',
                element: <Navigate to="404" replace />
              },
              {
                path: '404',
                element: <Status404 />
              },
              {
                path: '500',
                element: <Status500 />
              },
              {
                path: 'maintenance',
                element: <StatusMaintenance />
              }
            ]
          },
          {
            path: '*',
            element: <Status404 />
          }
        ]
      },
      {
        path: '/',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="manage-customers" replace />
          },

          {
            path: 'manage-customers',
            element: <ManageCustomers />
          },

          {
            path: 'manage-sales-customers',
            element: <ManageSalesCustomers />
          },

          {
            path: 'portal',
            element: <OverallDashboard />
          },
          {
            path: 'home',
            element: <StatusMaintenance />
          },
          {
            path: 'customers',
            element: <StatusMaintenance />
          },
          {
            path: 'under-development',
            element: <StatusMaintenance />
          },
          {
            path: 'settings',
            element: <StatusMaintenance />
          },
          {
            path: 'profile',
            element: <StatusMaintenance />
          }
        ]
      },
      {
        path: 'auth',
        element: <BaseLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="login" replace />
          },

          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },
      {
        path: 'manage-customers',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },

          {
            path: ':id',
            element: <EditCustomer />
          }
        ]
      },
      {
        path: 'customer-portal',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },
          customerData?.features?.find((d) => d?.featureCode === 'BF')
            ? {
                path: ':id/products',
                element: <CustomerPortalMain />
              }
            : {
                path: ':id/products',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BO')
            ? {
                path: ':id/bulkOrder',
                element: <CustomerPortalBulkOrder />
              }
            : {
                path: ':id/bulkOrder',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BPO')
            ? {
                path: ':id/blanketPo',
                element: <CustomerPortalBlanketPo />
              }
            : {
                path: ':id/blanketPo',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BCS')
            ? {
                path: ':id/BarCodeScanner',
                element: <BarCodeScanner />
              }
            : {
                path: ':id/BarCodeScanner',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'FC')
            ? {
                path: ':id/forecast',
                element: <CustomerPortalForecast />
              }
            : {
                path: ':id/forecast',
                element: <NoPermissions />
              },

          {
            path: ':id/cart',
            element: <ProductCart />
          },
          {
            path: `:id/product/:partNumber`,
            element: <ProductDetail />
          },
          {
            path: `:id/orderHistory`,
            element: <OrderHistory />
          }
        ]
      }
    ]);
  } else if (authUser && authUser?.roles?.some((d) => d?.id === 3)) {
    return useRoutes([
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="manage-sales-customers" replace />
          },

          {
            path: 'overview',
            element: <Navigate to="/" replace />
          },
          {
            path: 'status',
            children: [
              {
                path: '',
                element: <Navigate to="404" replace />
              },
              {
                path: '404',
                element: <Status404 />
              },
              {
                path: '500',
                element: <Status500 />
              },
              {
                path: 'maintenance',
                element: <StatusMaintenance />
              }
            ]
          },
          {
            path: '*',
            element: <Status404 />
          }
        ]
      },
      {
        path: '/',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="manage-sales-customers" replace />
          },

          {
            path: 'manage-sales-customers',
            element: <ManageSalesCustomers />
          },
          {
            path: 'compare-forecast',
            element: <CompareForecast />
          },

          {
            path: 'portal',
            element: <OverallDashboard />
          },
          {
            path: 'home',
            element: <StatusMaintenance />
          },
          {
            path: 'customers',
            element: <StatusMaintenance />
          },
          {
            path: 'under-development',
            element: <StatusMaintenance />
          },
          {
            path: 'settings',
            element: <StatusMaintenance />
          },
          {
            path: 'profile',
            element: <StatusMaintenance />
          }
        ]
      },

      {
        path: 'auth',
        element: <BaseLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="login" replace />
          },

          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },

      {
        path: 'manage-customers',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },

          {
            path: ':id',
            element: <EditCustomer />
          }
        ]
      },
      {
        path: 'customer-portal',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },
          customerData?.features?.find((d) => d?.featureCode === 'BF')
            ? {
                path: ':id/products',
                element: <CustomerPortalMain />
              }
            : {
                path: ':id/products',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BO')
            ? {
                path: ':id/bulkOrder',
                element: <CustomerPortalBulkOrder />
              }
            : {
                path: ':id/bulkOrder',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BPO')
            ? {
                path: ':id/blanketPo',
                element: <CustomerPortalBlanketPo />
              }
            : {
                path: ':id/blanketPo',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'BCS')
            ? {
                path: ':id/BarCodeScanner',
                element: <BarCodeScanner />
              }
            : {
                path: ':id/BarCodeScanner',
                element: <NoPermissions />
              },
          customerData?.features?.find((d) => d?.featureCode === 'FC')
            ? {
                path: ':id/forecast',
                element: <CustomerPortalForecast />
              }
            : {
                path: ':id/forecast',
                element: <NoPermissions />
              },

          {
            path: ':id/cart',
            element: <ProductCart />
          },
          {
            path: `:id/product/:partNumber`,
            element: <ProductDetail />
          },
          {
            path: `:id/orderHistory`,
            element: <OrderHistory />
          }
        ]
      }
    ]);
  } else if (authUser && authUser?.roles?.some((d) => d?.id > 3)) {
    return useRoutes([
      {
        path: '',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="portal" replace />
          },

          {
            path: 'overview',
            element: <Navigate to="/" replace />
          },
          {
            path: 'status',
            children: [
              {
                path: '',
                element: <Navigate to="404" replace />
              },
              {
                path: '404',
                element: <Status404 />
              },
              {
                path: '500',
                element: <Status500 />
              },
              {
                path: 'maintenance',
                element: <StatusMaintenance />
              }
            ]
          },
          {
            path: '*',
            element: <Status404 />
          }
        ]
      },
      {
        path: '/',
        element: <SidebarLayout />,
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to={`customer-portal/${authUser?.associateCustomerId}`}
                replace
              />
            )
          },

          {
            path: 'portal',
            element: <OverallDashboard />
          },

          {
            path: 'home',
            element: <StatusMaintenance />
          },
          {
            path: 'customers',
            element: <StatusMaintenance />
          },
          {
            path: 'under-development',
            element: <StatusMaintenance />
          },
          {
            path: 'settings',
            element: <StatusMaintenance />
          },
          {
            path: 'profile',
            element: <StatusMaintenance />
          }
        ]
      },

      {
        path: 'customer-portal',
        element: <SidebarLayout />,
        children: [
          {
            path: 'user',
            element: <Navigate to=":id" replace />
          },

          authUser?.features?.find((d) => d?.featureCode === 'BF')
            ? {
                path: `${authUser?.associateCustomerId}/products`,
                element: <CustomerPortalMain />
              }
            : {
                path: `${authUser?.associateCustomerId}/products`,
                element: <NoPermissions />
              },
          authUser?.features?.find((d) => d?.featureCode === 'BO')
            ? {
                path: `${authUser?.associateCustomerId}/bulkOrder`,
                element: <CustomerPortalBulkOrder />
              }
            : {
                path: `${authUser?.associateCustomerId}`,
                element: <NoPermissions />
              },
          authUser?.features?.find((d) => d?.featureCode === 'BPO')
            ? {
                path: `${authUser?.associateCustomerId}/blanketPo`,
                element: <CustomerPortalBlanketPo />
              }
            : {
                path: `${authUser?.associateCustomerId}`,
                element: <NoPermissions />
              },
          authUser?.features?.find((d) => d?.featureCode === 'BCS')
            ? {
                path: `${authUser?.associateCustomerId}/BarCodeScanner`,
                element: <BarCodeScanner />
              }
            : {
                path: `${authUser?.associateCustomerId}`,
                element: <NoPermissions />
              },
          authUser?.features?.find((d) => d?.featureCode === 'FC')
            ? {
                path: `${authUser?.associateCustomerId}/forecast`,
                element: <CustomerPortalForecast />
              }
            : {
                path: `${authUser?.associateCustomerId}`,
                element: <NoPermissions />
              },
          {
            path: `${authUser?.associateCustomerId}/product/:id`,
            element: <ProductDetail />
          },
          {
            path: `${authUser?.associateCustomerId}/cart`,
            element: <ProductCart />
          },
          {
            path: `${authUser?.associateCustomerId}/orderHistory`,
            element: <OrderHistory />
          },
          {
            path: 'compare-forecast',
            element: <CompareForecast />
          }
        ]
      },

      {
        path: 'auth',
        element: <BaseLayout />,
        children: [
          {
            path: '',
            element: <Navigate to="login" replace />
          },

          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />
          },
          {
            path: 'reset-password',
            element: <ResetPassword />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      }
    ]);
  }
};

export default AppRoutes;
