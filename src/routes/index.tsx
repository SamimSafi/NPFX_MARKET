import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import Permission from 'src/sections/@dashboard/permission/Permission';
import RoleDetailHeader from 'src/sections/@dashboard/role/roleForm/RoleDetailHeader';
import ChangePasswordForm from 'src/sections/@dashboard/user/userForm/ChangePasswordForm';
import PasswordReset from 'src/sections/@dashboard/user/userList/PasswordReset';
import UserProfile from 'src/sections/@dashboard/user/userList/UserProfile';
import YearCreate from 'src/sections/@dashboard/Year/YearForm/YearCreate';
import YearList from 'src/sections/@dashboard/Year/YearList/YearList';

import PermissionBasedGuard from '../guards/PermissionBasedGuard';
import DistrictCreate from 'src/sections/@dashboard/district/districtForm/DistrictCreate';
import DistrictList from 'src/sections/@dashboard/district/districtList/DistrictList';
import PositionTitleList from 'src/sections/@dashboard/PositionTitle/PositionTitleList/PositionTitleList';
import PositionTitleCreate from 'src/sections/@dashboard/PositionTitle/PositionTitleForm/PositionTitleCreate';
import JobPositionList from 'src/sections/@dashboard/JobPosition/JobPositionList/JobPositionList';
import JobPositionCreate from 'src/sections/@dashboard/JobPosition/JobPositionForm/JobPositionCreate';
import ContractDetailsCreate from 'src/sections/@dashboard/ContractDetails/ContractDetailsForm/ContractDetailsCreate';
import ContractDetailsList from 'src/sections/@dashboard/ContractDetails/ContractDetailsList/ContractDetailsList';
import EmployeeDetailHeader from 'src/sections/@dashboard/Employee/EmployeeForm/EmployeeDetailHeader';
import CustomerList from 'src/sections/@dashboard/Customer/CustomerList/CustomerList';
import CustomerCreate from 'src/sections/@dashboard/Customer/CustomerForm/CustomerCreate';
import SupplierList from 'src/sections/@dashboard/Supplier/SupplierList/SupplierList';
import SupplierCreate from 'src/sections/@dashboard/Supplier/SupplierForm/SupplierCreate';
import ExpenseTypeList from 'src/sections/@dashboard/ExpenseType/ExpenseTypeList/ExpenseTypeList';
import ExpenseTypeCreate from 'src/sections/@dashboard/ExpenseType/ExpenseTypeForm/ExpenseTypeCreate';
import BranchCreate from 'src/sections/@dashboard/Branch/BranchForm/BranchCreate';
import BranchList from 'src/sections/@dashboard/Branch/BranchList/BranchList';
import AssetTypeCreate from 'src/sections/@dashboard/AssetType/AssetTypeForm/AssetTypeCreate';
import AssetTypeList from 'src/sections/@dashboard/AssetType/AssetTypeList/AssetTypeList';
import LoanTypeCreate from 'src/sections/@dashboard/LoanType/LoanTypeForm/LoanTypeCreate';
import LoanTypeList from 'src/sections/@dashboard/LoanType/LoanTypeList/LoanTypeList';
import PaymentTypeList from 'src/sections/@dashboard/PaymentType/PaymentList/PaymentTypeList';
import PaymentTypeCreate from 'src/sections/@dashboard/PaymentType/PaymentTypeForm/PaymentTypeCreate';
import CurrencyTypeCreate from 'src/sections/@dashboard/CurrencyType/CurrencyTypeForm/CurrencyTypeCreate';
import CurrencyTypeList from 'src/sections/@dashboard/CurrencyType/CurrencyTypeList/CurrencyTypeList';
import TradeTrackingCreate from 'src/sections/@dashboard/TradeTracking/TradeTrackingForm/TradeTrackingCreate';
import TradeTrackingList from 'src/sections/@dashboard/TradeTracking/TradeTrackingList/TradeTrackingList';
import PartnersCreate from 'src/sections/@dashboard/Partners/PartnersForm/PartnersCreate';
import PartnersList from 'src/sections/@dashboard/Partners/PartnersList/PartnersList';
import MainAssetCreate from 'src/sections/@dashboard/MainAsset/MainAssetForm/MainAssetCreate';
import MainAssetList from 'src/sections/@dashboard/MainAsset/MainAssetList/MainAssetList';
import LoanTrackingList from 'src/sections/@dashboard/LoanTracking/LoanTrackingList/LoanTrackingList';
import LoanTrackingCreate from 'src/sections/@dashboard/LoanTracking/LoanTrackingForm/LoanTrackingCreate';
import WithdrawalTrackingList from 'src/sections/@dashboard/WithdrawalTracking/WithdrawalTrackingList/WithdrawalTrackingList';
import WithdrawalTrackingCreate from 'src/sections/@dashboard/WithdrawalTracking/WithdrawalTrackingForm/WithdrawalTrackingCreate';
import ExpenseTrackingList from 'src/sections/@dashboard/ExpenseTracking/ExpenseTrackingList/ExpenseTrackingList';
import ExpenseTrackingCreate from 'src/sections/@dashboard/ExpenseTracking/ExpenseTrackingForm/ExpenseTrackingCreate';
import MainAssetDetails from 'src/sections/@dashboard/MainAsset/MainAssetDetails/MainAssetDetails';
import WithdrawalTrackingDepositCreate from 'src/sections/@dashboard/WithdrawalTracking/WithdrawalTrackingForm/WithdrawalTrackingDepositCreate';
import GoogleAuthCreate from 'src/sections/@dashboard/user/userForm/GoogleAuthCreate';
import ApplicationList from 'src/sections/@dashboard/applicationApi/applicationList/ApplicationList';
import ApplicationCreate from 'src/sections/@dashboard/applicationApi/applicationForm/ApplicationCreate';

import NPFXDashboard from 'src/sections/@dashboard/NPFX_DashBoard/NPFXDashboard';



// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'Dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <NPFXDashboard /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },

        // NPFX MARKET COMPONENT RENDERING FOR ROUTES HERE
        {
          path: 'Branch',
          children: [
            { element: <Navigate to="/dashboard/Branch/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Branch-GetAll']}>
                  <BranchList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Branch-Create']}>
                  <BranchCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Branch-Update']}>
                  <BranchCreate />
                </PermissionBasedGuard>
              ),
            },
            //{ path: ':id', element: <InvoiceDetails /> },
            // { path: ':id/edit', element: <InvoiceEdit /> },
            //{ path: 'new', element: <PermissionCreate /> },
          ],
        },
        // Asset Type Routs
        {
          path: 'AssetType',
          children: [
            { element: <Navigate to="/dashboard/AssetType/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['AssetType-GetAll']}>
                  <AssetTypeList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['AssetType-Create']}>
                  <AssetTypeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['AssetType-Update']}>
                  <AssetTypeCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        }, // Asset Type Routs
        {
          path: 'LoanType',
          children: [
            { element: <Navigate to="/dashboard/LoanType/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['LoanType-GetAll']}>
                  <LoanTypeList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['LoanType-Create']}>
                  <LoanTypeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['LoanType-Update']}>
                  <LoanTypeCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'PaymentType',
          children: [
            { element: <Navigate to="/dashboard/PaymentType/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['PaymentType-GetAll']}>
                  <PaymentTypeList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['PaymentType-Create']}>
                  <PaymentTypeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['PaymentType-Update']}>
                  <PaymentTypeCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'CurrencyType',
          children: [
            { element: <Navigate to="/dashboard/CurrencyType/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['CurrencyType-GetAll']}>
                  <CurrencyTypeList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['CurrencyType-Create']}>
                  <CurrencyTypeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['CurrencyType-Update']}>
                  <CurrencyTypeCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'TradeTracking',
          children: [
            { element: <Navigate to="/dashboard/TradeTracking/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['TradeTracking-GetAll']}>
                  <TradeTrackingList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['TradeTracking-Create']}>
                  <TradeTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['TradeTracking-Update']}>
                  <TradeTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'Partners',
          children: [
            { element: <Navigate to="/dashboard/Partners/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Partners-GetAll']}>
                  <PartnersList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Partners-Create']}>
                  <PartnersCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Partners-Update']}>
                  <PartnersCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'MainAsset',
          children: [
            { element: <Navigate to="/dashboard/MainAsset/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['MainAsset-GetAll']}>
                  <MainAssetList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['MainAsset-Create']}>
                  <MainAssetCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['MainAsset-Update']}>
                  <MainAssetCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['MainAsset-Update']}>
                  <MainAssetCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'Details',
              element: (
                // <PermissionBasedGuard hasContent permissions={['MainAsset-Update']}>
                <MainAssetDetails />
                // </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'ExpenseTracking',
          children: [
            { element: <Navigate to="/dashboard/ExpenseTracking/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['ExpenseTracking-GetAll']}>
                  <ExpenseTrackingList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['ExpenseTracking-Create']}>
                  <ExpenseTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['ExpenseTracking-Update']}>
                  <ExpenseTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'LoanTracking',
          children: [
            { element: <Navigate to="/dashboard/LoanTracking/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['LoanTracking-GetAll']}>
                  <LoanTrackingList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['LoanTracking-Create']}>
                  <LoanTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['LoanTracking-Update']}>
                  <LoanTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'WithdrawalTracking',
          children: [
            { element: <Navigate to="/dashboard/WithdrawalTracking/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['WithdrawalTracking-GetAll']}>
                  <WithdrawalTrackingList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['WithdrawalTracking-Create']}>
                  <WithdrawalTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['WithdrawalTracking-Update']}>
                  <WithdrawalTrackingCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'deposit',
              element: (
                <PermissionBasedGuard hasContent permissions={['WithdrawalTracking-Deposit']}>
                  <WithdrawalTrackingDepositCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'depositEdit',
              element: (
                <PermissionBasedGuard hasContent permissions={['WithdrawalTracking-Deposit']}>
                  <WithdrawalTrackingDepositCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'permission',
          children: [
            { element: <Navigate to="/dashboard/permission/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Permission-GetAll']}>
                  <PermissionList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'PermissionFrom/new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Permission-Create']}>
                  <PermissionFrom />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'Permission/edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Permission-Update']}>
                  <PermissionFrom />
                </PermissionBasedGuard>
              ),
            },
            //{ path: ':id', element: <InvoiceDetails /> },
            // { path: ':id/edit', element: <InvoiceEdit /> },
            //{ path: 'new', element: <PermissionCreate /> },
          ],
        },

        // Language
        {
          path: 'Language',
          children: [
            { element: <Navigate to="/dashboard/Language/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Language-GetList']}>
                  <LanguageList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'LanguageCreate/new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Language-Create']}>
                  <LanguageCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'Language/edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Language-Update']}>
                  <LanguageCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },

        {
          path: 'permission',
          children: [
            { element: <Navigate to="/dashboard/permission/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Permission-GetAll']}>
                  <Permission />
                </PermissionBasedGuard>
              ),
            },
          ],
        },

        // Role
        {
          path: 'Role',
          children: [
            { element: <Navigate to="/dashboard/Role/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Role-GetAll']}>
                  <RoleList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'RoleCreate/new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Role-Create']}>
                  <RoleCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'Role/edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Role-Update']}>
                  <RoleCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'Role/detail',
              element: (
                <PermissionBasedGuard hasContent permissions={['Role-GetDetails']}>
                  <RoleDetailHeader />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        // User
        {
          path: 'User',
          children: [
            { element: <Navigate to="/dashboard/User/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['User-GetAll']}>
                  <UserList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'GoogleAuth',
              element: (
                // <PermissionBasedGuard hasContent permissions={['User-GetAll']}>
                <GoogleAuthCreate />
                // </PermissionBasedGuard>
              ),
            },
            {
              path: 'Loglist',
              element: (
                <PermissionBasedGuard hasContent permissions={['User-UserLog']}>
                  <UserLogList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'profile/:id',
              element: (
                <PermissionBasedGuard hasContent permissions={['Profile-Profile']}>
                  <UserProfile />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'UserCreate/new',
              element: (
                <PermissionBasedGuard hasContent permissions={['User-Create']}>
                  <UserCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['User-Update']}>
                  <UserCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'detail/:id',
              element: (
                <PermissionBasedGuard hasContent permissions={['User-GetDetails']}>
                  <UserDetailHeader />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'ChangePassword/changePassword',
              element: <ChangePasswordForm />,
            },
            {
              path: 'ResetPassword/resetPassword',
              element: (
                <PermissionBasedGuard hasContent permissions={['User-PasswordReset']}>
                  <PasswordReset />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        //Archive
        // Year
        {
          path: 'Year',
          children: [
            { element: <Navigate to="/dashboard/Year/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Year-GetList']}>
                  <YearList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Year-Create']}>
                  <YearCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Year-Update']}>
                  <YearCreate />
                </PermissionBasedGuard>
              ),
            },
            //{ path: 'detail', element: <ApplicantRequestDetailHeader /> },
          ],
        },

        // EmployeeD Routs
        {
          path: 'Employee',
          children: [
            { element: <Navigate to="/dashboard/Employee/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Employee-GetAll']}>
                  <EmployeeList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Employee-Create']}>
                  <EmployeeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Employee-Update']}>
                  <EmployeeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'detail',
              element: (
                // <PermissionBasedGuard hasContent permissions={['Card-Update']}>
                <EmployeeDetailHeader />
                // </PermissionBasedGuard>
              ),
            },
          ],
        },

        // ContractDetails Routs
        {
          path: 'ContractDetails',
          children: [
            { element: <Navigate to="/dashboard/ContractDetails/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['ContractDetails-GetList']}>
                  <ContractDetailsList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['ContractDetails-Create']}>
                  <ContractDetailsCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['ContractDetails-Update']}>
                  <ContractDetailsCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },

        // PositionTitle Routs
        {
          path: 'PositionTitle',
          children: [
            { element: <Navigate to="/dashboard/PositionTitle/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['PositionTitle-GetAll']}>
                  <PositionTitleList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['PositionTitle-Create']}>
                  <PositionTitleCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['PositionTitle-Update']}>
                  <PositionTitleCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },

        // Customer Routs
        {
          path: 'Customer',
          children: [
            { element: <Navigate to="/dashboard/Customer/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Customer-GetList']}>
                  <CustomerList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Customer-Create']}>
                  <CustomerCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Customer-Update']}>
                  <CustomerCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        // Supplier Routs
        {
          path: 'Supplier',
          children: [
            { element: <Navigate to="/dashboard/Supplier/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Suppliers-GetList']}>
                  <SupplierList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Suppliers-Create']}>
                  <SupplierCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Suppliers-Update']}>
                  <SupplierCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        // Expense Type Routs
        {
          path: 'ExpenseType',
          children: [
            { element: <Navigate to="/dashboard/ExpenseType/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['ExpenseTypes-GetList']}>
                  <ExpenseTypeList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['ExpenseTypes-Create']}>
                  <ExpenseTypeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['ExpenseTypes-Update']}>
                  <ExpenseTypeCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        // JobPosition Routs
        {
          path: 'JobPosition',
          children: [
            { element: <Navigate to="/dashboard/JobPosition/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['JobPosition-GetAll']}>
                  <JobPositionList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['JobPosition-Create']}>
                  <JobPositionCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['JobPosition-Update']}>
                  <JobPositionCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        //Project Priority duplicated

        {
          path: 'District',
          children: [
            {
              element: (
                <PermissionBasedGuard hasContent permissions={['District-GetAll']}>
                  <Navigate to="/dashboard/District/list" replace />
                </PermissionBasedGuard>
              ),
              index: true,
            },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['District-GetAll']}>
                  <DistrictList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'district/new',
              element: (
                <PermissionBasedGuard hasContent permissions={['District-Create']}>
                  <DistrictCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'district/edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['District-Update']}>
                  <DistrictCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        //HR
        //ContractType
        {
          path: 'ContractType',
          children: [
            {
              element: <Navigate to="/dashboard/ContractType/list" replace />,
              index: true,
            },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['ContractType-GetAll']}>
                  <ContractTypeList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <PermissionBasedGuard hasContent permissions={['ContractType-Create']}>
                  <ContractTypeCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['ContractType-Update']}>
                  <ContractTypeCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        // Application
        {
          path: 'Application',
          children: [
            { element: <Navigate to="/dashboard/Application/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <PermissionBasedGuard hasContent permissions={['Application-GetList']}>
                  <ApplicationList />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'ApplicationCreate/new',
              element: (
                <PermissionBasedGuard hasContent permissions={['Application-Create']}>
                  <ApplicationCreate />
                </PermissionBasedGuard>
              ),
            },
            {
              path: 'Application/edit',
              element: (
                <PermissionBasedGuard hasContent permissions={['Application-Update']}>
                  <ApplicationCreate />
                </PermissionBasedGuard>
              ),
            },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            // { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },

        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ element: <LoginPage />, index: true }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ITSMS

// User
const UserList = Loadable(lazy(() => import('../sections/@dashboard/user/userList/UserList')));
const UserLogList = Loadable(
  lazy(() => import('../sections/@dashboard/user/userList/UserLogList'))
);
const UserCreate = Loadable(lazy(() => import('../sections/@dashboard/user/userForm/UserCreate')));
const UserDetailHeader = Loadable(
  lazy(() => import('../sections/@dashboard/user/userForm/UserDetailHeader'))
);

// Language
const LanguageList = Loadable(
  lazy(() => import('../sections/@dashboard/language/languageList/LanguageList'))
);
const LanguageCreate = Loadable(
  lazy(() => import('../sections/@dashboard/language/languageForm/LanguageCreate'))
);

// Roles
const RoleList = Loadable(lazy(() => import('../sections/@dashboard/role/roleList/RoleList')));
const RoleCreate = Loadable(lazy(() => import('../sections/@dashboard/role/roleForm/RoleCreate')));

// Permission
const PermissionList = Loadable(
  lazy(() => import('../sections/@dashboard/permission/permissionList/PermissionList'))
);
const PermissionFrom = Loadable(
  lazy(() => import('../sections/@dashboard/permission/permissionForm/PermissionFrom'))
);

//Employee rout
const EmployeeList = Loadable(
  lazy(() => import('../sections/@dashboard/Employee/EmployeeList/EmployeeList'))
);

const EmployeeCreate = Loadable(
  lazy(() => import('../sections/@dashboard/Employee/EmployeeForm/EmployeeCreate'))
);

//HR
//ContractType
const ContractTypeList = Loadable(
  lazy(() => import('../sections/@dashboard/ContractType/ContractTypeList/ContractTypeList'))
);

const ContractTypeCreate = Loadable(
  lazy(() => import('../sections/@dashboard/ContractType/ContractTypeForm/ContractTypeCreate'))
);

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductDetails'))
);
const EcommerceProductList = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductList'))
);
const EcommerceProductCreate = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductCreate'))
);
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// APP
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
