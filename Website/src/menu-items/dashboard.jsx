// assets
import { DashboardOutlined, ProfileOutlined, UsergroupDeleteOutlined, ContainerOutlined, DollarOutlined,FileProtectOutlined, MedicineBoxOutlined, InsertRowLeftOutlined } from '@ant-design/icons';
// icons
const icons = {
  DashboardOutlined,
  ProfileOutlined,
  UsergroupDeleteOutlined,
  ContainerOutlined,
  DollarOutlined,
  FileProtectOutlined,
  MedicineBoxOutlined,
  InsertRowLeftOutlined
};
// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Pharma Pulse',
  type: 'group',
  children: [
    { 
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'item-master',
      title: 'Item Master',
      type: 'item',
      url: '/item-list',
      icon: icons.MedicineBoxOutlined,
      breadcrumbs: false
    },
    {
      id: 'invoices',
      title: 'Invoices',
      type: 'item',
      url: '/invoices',
      icon: icons.ContainerOutlined,
      breadcrumbs: false
    },
    {
      id: 'purchase bill',
      title: 'Purchase Bill',
      type: 'item',
      url: '/medicine',
      icon: icons.ContainerOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'category',
    //   title: 'Category',
    //   type: 'item',
    //   url: '/category',
    //   icon: icons.ContainerOutlined,
    //   breadcrumbs: false
    // },
    {
      id: 'inventory',
      title: 'Inventory',
      type: 'item',
      url: '/inventory',
      icon: icons.InsertRowLeftOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'salary_summary',
    //   title: 'Salary Summary',
    //   type: 'item',
    //   url: '/salary-summary',
    //   icon: icons.DollarOutlined,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'payroll',
    //   title: 'Payroll Summary',
    //   type: 'item',
    //   url: '/payroll',
    //   icon: icons.FileProtectOutlined,
    //   breadcrumbs: false
    // }
  ]
};

export default dashboard;
