// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
// ----------------------------------------------------------------------
const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  lookUp: getIcon('ic_lookup'),
  dmts: getIcon('ic_dmts'),
  ums: getIcon('ic_ums'),
  itsms: getIcon('ic_itsms'),
  hr: getIcon('ic_hr'),
  archive: getIcon('ic_archive'),
  reception: getIcon('ic_reception'),
  news: getIcon('ic_news'),
  administrative: getIcon('ic_administrative'),
  bookdiary: getIcon('ic_bookdiary'),
};

const navConfig = [
  // GENERAL

  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'application', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    // Lookup Table
    items: [
      {
        title: 'lookuptable',
        path: '#1',
        icon: ICONS.lookUp,
        roles: [
          'Branch-GetList',
          'ExpenseType-GetList',
          'assetType-GetList',
          'LoanType-GetList',
          'PaymentType-GetList',
          'CurrencyType-GetList',
          'Partners-GetList',
        ],
        children: [
          {
            title: 'CommonLookUps',
            path: '#5',
            roles: ['Branch-GetList', 'District-GetList', 'Language-GetList'],
            children: [
              {
                title: 'BranchMenu',
                path: PATH_DASHBOARD.Branch.list,
                roles: ['Branch-GetList'],
              },
              {
                title: 'ExpenseTypeMenu',
                path: PATH_DASHBOARD.ExpenseType.list,
                roles: ['ExpenseType-GetList'],
              },
              {
                title: 'AssetTypeMenu',
                path: PATH_DASHBOARD.AssetType.list,
                roles: ['AssetType-GetList'],
              },
              {
                title: 'LoanTypeMenu',
                path: PATH_DASHBOARD.LoanType.list,
                roles: ['LoanType-GetList'],
              },
              {
                title: 'PaymentTypeMenu',
                path: PATH_DASHBOARD.PaymentType.list,
                roles: ['PaymentType-GetList'],
              },
              {
                title: 'CurrencyTypeMenu',
                path: PATH_DASHBOARD.CurrencyType.list,
                roles: ['CurrencyType-GetList'],
              },
              {
                title: 'PartnersMenu',
                path: PATH_DASHBOARD.Partners.list,
                roles: ['Partners-GetList'],
              },
              {
                title: 'contractType',
                path: PATH_DASHBOARD.ContractType.list,
                // roles: ['ExpenseType-GetList'],
              },
              {
                title: 'positionTitle',
                path: PATH_DASHBOARD.PositionTitle.list,
                roles: ['PositionTitle-GetList'],
              },
            ],
          },
          //HR lookups Table
        ],
      },

      // UMS
      {
        title: 'UMS',
        path: '#1',
        icon: ICONS.ums,
        roles: [
          'User-Create',
          'User-GetList',
          'Profile-ChangePassword',
          'Permission-GetList',
          'Role-GetList',
          'Role-Create',
          'Application-GetList',
        ],
        children: [
          {
            title: 'UserManagement',
            path: '#2',
            roles: ['User-Create', 'User-GetList', 'User-UserLog', 'Profile-ChangePassword'],
            children: [
              { title: 'createUser', path: PATH_DASHBOARD.user.new, roles: ['User-Create'] },
              { title: 'Userlist', path: PATH_DASHBOARD.user.list, roles: ['User-GetList'] },
              { title: 'UserLogList', path: PATH_DASHBOARD.user.Loglist, roles: ['User-UserLog'] },
              {
                title: 'changePassword',
                path: PATH_DASHBOARD.user.changePassword,
              },
            ],
          },
          {
            title: 'Role',
            path: '#4',
            roles: ['Role-GetList', 'Role-Create'],
            children: [
              { title: 'list', path: PATH_DASHBOARD.Role.list, roles: ['Role-GetList'] },
              { title: 'create', path: PATH_DASHBOARD.Role.new, roles: ['Role-Create'] },
            ],
          },
        ],
      },
      // Human resource
      // Human resource
      {
        title: 'hr',
        path: '#1',
        icon: ICONS.hr,
        roles: ['Employee-GetList', 'CardDetails-GetPrintableCardList'],
        children: [
          {
            title: 'emp',
            path: PATH_DASHBOARD.Employee.list,
            roles: ['Employee-GetList'],
          },
          // {
          //   title: 'cardPrint',
          //   path: PATH_DASHBOARD.Employee.print,

          //   roles: ['CardDetails-GetPrintableCardList'],
          //   state: { EmployeeIdForPrint: undefined, from: undefined },
          // },
          // {
          //   title: 'EmployeeReport',
          //   path: PATH_DASHBOARD.Employee.accountReport,

          //   // roles: ['CardDetails-GetPrintableCardList'],
          //   // state: { EmployeeIdForPrint: undefined, from: undefined },
          // },
        ],
      },
      {
        title: 'NPFX System',
        path: '#1',
        icon: ICONS.analytics,
        roles: ['MainAsset-GetList', 'CardDetails-GetPrintableCardList'],
        children: [
          {
            title: 'AssetManagementMenu',
            path: PATH_DASHBOARD.MainAsset.list,
            roles: ['MainAsset-GetList'],
          },
          {
            title: 'LoanTrackingMenu',
            path: PATH_DASHBOARD.LoanTracking.list,
            roles: ['LoanTracking-GetList'],
          },
          {
            title: 'TradeTrackingMenu',
            path: PATH_DASHBOARD.TradeTracking.list,
            roles: ['TradeTracking-GetList'],
          },
          {
            title: 'ExpenseTracking',
            path: PATH_DASHBOARD.ExpenseTracking.list,
            roles: ['ExpenseTracking-GetList'],
          },
          {
            title: 'WithdrawalTracking',
            path: PATH_DASHBOARD.WithdrawalTracking.list,
            roles: ['WithdrawalTracking-GetList'],
          },
        ],
      },
    ],
  },
];

export default navConfig;
