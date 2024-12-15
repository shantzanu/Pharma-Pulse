import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
// import Customers from 'pages/customers';
// import AddCustomer from 'pages/customers/addCustomer';
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Customers = Loadable(lazy(() => import('pages/itemMaster')));
const AddCustomer = Loadable(lazy(() => import('pages/itemMaster/addItem')));
const Invoices = Loadable(lazy(() => import('pages/invoices')));
const AddInvoices = Loadable(lazy(() => import('pages/invoices/addInvoices')));
const Medicine = Loadable(lazy(() => import('pages/medicine')));
const AddMedicine = Loadable(lazy(() => import('pages/medicine/addMedicine')));
// const Category = Loadable(lazy(() => import('pages/category')));
const AddCategory = Loadable(lazy(() => import('pages/category/addCategory')));
const Inventory = Loadable(lazy(() => import('pages/inventory')));
const AddItems = Loadable(lazy(() => import('pages/itemMaster/addItem')));
const ItemMaster = Loadable(lazy(() => import('pages/itemMaster')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'customers',
      element: <Customers />
    },
    {
      path: 'add-customer',
      element: <AddCustomer />
    },
    {
      path: 'invoices',
      element: <Invoices />
    },
    {
      path: 'add-invoices',
      element: <AddInvoices />
    },
    {
      path: 'medicine',
      element: <Medicine />
    },
    {
      path: 'add-medicine',
      element: <AddMedicine />
    },
    // {
    //   path: 'category',
    //   element: <Category />
    // },
    {
      path: 'add-category',
      element: <AddCategory />
    },
    {
      path: 'inventory',
      element: <Inventory />
    },
    {
      path: 'add-item',
      element: <AddItems />
    },
    {
      path: 'item-list',
      element: <ItemMaster />
    },
 
  ]
};

export default MainRoutes;
