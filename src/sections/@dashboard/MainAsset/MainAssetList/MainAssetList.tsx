import { useEffect, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  Switch,
  Button,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../stores/store';
import MyDialog from 'src/components/MyDialog';
import MainAssetTableRow from './MainAssetTableRow';
import MainAssetTableToolbar from './MainAssetTableToolbar';
import MainAssetDelete from './MainAssetDelete';
import { IMainAsset } from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';
import DepositToNewEditForm from '../MainAssetForm/DepositToNewEditForm';
import LoanTrackingNewEditForm from '../../LoanTracking/LoanTrackingForm/LoanTrackingNewEditForm';
import TradeTrackingNewEditForm from '../../TradeTracking/TradeTrackingForm/TradeTrackingNewEditForm';
import WithdrawalTrackingDepositNewEditForm from '../../WithdrawalTracking/WithdrawalTrackingForm/WithdrawalTrackingDepositNewEditForm';
import WithdrawalTrackingNewEditForm from '../../WithdrawalTracking/WithdrawalTrackingForm/WithdrawalTrackingNewEditForm';

// ----------------------------------------------------------------------

export default observer(function MainAssetList() {
  const {
    MainAssetStore,

    MainAssetDetailsStore,
  } = useStore();
  const { translate } = useLocales();
  const { tablePagination, onChangePagination } = useSettings();
  const {
    loadMainAsset,
    MainAssetList,
    MainAssetRegistry,
    totalRecord,
    MainAssetearch,
    getMainAssetFromRegistry,
    setOpenCloseDialog,
    openDialog,
    setOpenCloseDialogDeposit,
    openDialogDeposit,
    setOpenCloseDialogCreateLoan,
    setOpenCloseDialogCreateTrade,
    openDialogCreateTrade,
    openDialogCreateLoan,
    setOpenCloseDialogDepositCash,
    openDialogDepositCash,
    setOpenCloseDialogWithdrawCash,
    openDialogWithdrawCash,
  } = MainAssetStore;

  const {
    GetMainAssetTracking,
    GetLoanTracking,
    loadExpenseTracking,
    loadTradeTracking,
    loadWithdrawalTracking,
    loadMainAssetChildAsset,
    loadMainAssetDetail,
  } = MainAssetDetailsStore;
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const [filterName, setFilterName] = useState(''); //State For Search

  const navigate = useNavigate();

  const [MainAssetId, setMainAssetId] = useState<string>('');
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('GeneralFields.Id')}`, align: 'left' },
    { id: 'AssetType', label: `${translate('MainAsset.AssetType')}`, align: 'left' },
    { id: 'Currency', label: `${translate('CurrencyType.CurrencyType')}`, align: 'left' },
    { id: 'balanceAmount', label: `${translate('MainAsset.BalanceAmount')}`, align: 'left' },
    { id: 'branch', label: `${translate('Branch.Branch')}`, align: 'left' },
    { id: 'depositDate', label: `${translate('MainAsset.DepositDate')}`, align: 'left' },
    { id: 'owneruser', label: `${translate('MainAsset.Owneruser')}`, align: 'left' },
    { id: 'Description', label: `${translate('MainAsset.Description')}`, align: 'left' },
    { id: 'Code', label: `${translate('GeneralFields.Code')}`, align: 'left' },
    { id: '', label: `${translate('GeneralFields.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      MainAssetearch({
        pageIndex: 0,
        pageSize: tablePagination,
        name: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      MainAssetearch({ pageIndex: 0, pageSize: tablePagination });
    }
  };

  const handleOpenConfirm = (id: string) => {
    setOpenCloseDialog();
    setMainAssetId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };

  // Deposit to users
  const handleDepositToUserOpenConfirm = (id: string) => {
    setOpenCloseDialogDeposit();
    setMainAssetId(id);
  };
  const handleCloseDepositConfirm = () => {
    setOpenCloseDialogDeposit();
  };

  // Create Loan
  const handleCreateLoanOpenConfirm = (id: string) => {
    setOpenCloseDialogCreateLoan();
    setMainAssetId(id);
  };
  const handleCloseCreateLoanConfirm = () => {
    setOpenCloseDialogCreateLoan();
  };

  // Create Loan
  const handleCreateTradeOpenConfirm = (id: string) => {
    setOpenCloseDialogCreateTrade();
    setMainAssetId(id);
  };
  const handleCloseCreateTradeConfirm = () => {
    setOpenCloseDialogCreateTrade();
  };

  // Deposit Cash
  const handleDepositCashOpenConfirm = (id: string) => {
    setOpenCloseDialogDepositCash();
    setMainAssetId(id);
  };
  const handleCloseDepositCashConfirm = () => {
    setOpenCloseDialogDepositCash();
  };

  // Withdraw Cash
  const handleWithdrawCashOpenConfirm = (id: string) => {
    setOpenCloseDialogWithdrawCash();
    setMainAssetId(id);
  };
  const handleCloseWithdrawCashConfirm = () => {
    setOpenCloseDialogWithdrawCash();
  };

  const handleEditRow = (id: string) => {
    getMainAssetFromRegistry(id);
    navigate(PATH_DASHBOARD.MainAsset.edit);
  };

  const handleDetail = (id: string) => {
    loadMainAssetDetail(id).then(() => {
    
      GetMainAssetTracking({
        pageIndex: 0,
        pageSize: 10000,
        mainAssetId: id,
      });
      GetLoanTracking({
        pageIndex: 0,
        pageSize: 10000,
        mainAssetId: id,
      });
      loadExpenseTracking({
        pageIndex: 0,
        pageSize: 10000,
        mainAssetId: id,
      });
      loadTradeTracking({
        pageIndex: 0,
        pageSize: 10000,
        mainAssetId: id,
      });
      loadWithdrawalTracking({
        pageIndex: 0,
        pageSize: 10000,
        mainAssetId: id,
      });
      loadMainAssetChildAsset(id);
      navigate(PATH_DASHBOARD.MainAsset.detail(id));
    });
  };

  // const handleDelete = () => {
  //   deleteConstructionType(ConstructionTypeId)
  //     .then(() => {
  //       setOpenConfirm(false);
  //       enqueueSnackbar('Delete  success!');
  //       setConstructionTypeId(0);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       enqueueSnackbar(`${translate('Tostar.DeleteFailed')}`, {
  //         variant: 'error',
  //       });
  //       setOpenConfirm(false);
  //       setConstructionTypeId(0);
  //     });
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadMainAsset({ pageIndex: newPage, pageSize: tablePagination });
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadMainAsset({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadMainAsset({ pageIndex: 0, pageSize: tablePagination });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePagination]);

  useEffect(() => {
    if (MainAssetRegistry.size <= 1) {
      loadMainAsset({ pageIndex: 0, pageSize: rowsPerPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFiltered = applySortFilter({
    tableData: MainAssetList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('MainAsset.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('MainAsset.MainAssetList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('MainAsset.MainAssetList')}` },
          ]}
          action={
            <>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.MainAsset.new}
              >
                {translate('CRUD.Create')}
              </Button>
              {/* <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.MainAsset.detail}
              >
                {translate('CRUD.Details')}
              </Button> */}
              {/* <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.general.ecommerce}
              >
                {translate('CRUD.one')}
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.general.banking}
              >
                {translate('CRUD.two')}
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.general.booking}
              >
                {translate('CRUD.three')}
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.general.analytics}
              >
                {translate('CRUD.four')}
              </Button> */}
            </>
          }
        />

        <Card>
          <MainAssetTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={totalRecord}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <MainAssetTableRow
                        key={row.id}
                        row={row}
                        index={index}
                        onDeleteRow={() => handleOpenConfirm(row.id!)}
                        onDepositToUser={() => handleDepositToUserOpenConfirm(row.id!)}
                        onCreateLoan={() => handleCreateLoanOpenConfirm(row.id!)}
                        onCreateTrade={() => handleCreateTradeOpenConfirm(row.id!)}
                        onDepositCash={() => handleDepositCashOpenConfirm(row.id!)}
                        onWithdrawCash={() => handleWithdrawCashOpenConfirm(row.id!)}
                        onEditRow={() => handleEditRow(row.id!)}
                        onDetailsRow={() => handleDetail(row.id!)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, totalRecord)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              component="div"
              labelRowsPerPage={translate('Pagination.RowsPerPage')}
              count={totalRecord}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${translate('Pagination.Of')} ${count}`
              }
              rowsPerPage={tablePagination}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handlePageSizeChange}
            />
            <MyDialog
              open={openDialog}
              onClose={handleCloseConfirm}
              title={translate('CRUD.DeleteTitle')}
              size="md"
            >
              <MainAssetDelete id={MainAssetId} />
            </MyDialog>
            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label={translate('Pagination.Dense')}
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />

            <MyDialog
              open={openDialogDeposit}
              onClose={handleCloseDepositConfirm}
              title={translate('CRUD.TransferMoney')}
              size="md"
            >
              <DepositToNewEditForm asssetID={MainAssetId!} />
            </MyDialog>

            <MyDialog
              open={openDialogCreateLoan}
              onClose={handleCloseCreateLoanConfirm}
              title={translate('CRUD.CreateLoan')}
              size="md"
            >
              <LoanTrackingNewEditForm asssetID={MainAssetId!} />
            </MyDialog>

            <MyDialog
              open={openDialogCreateTrade}
              onClose={handleCloseCreateTradeConfirm}
              title={translate('CRUD.SaveTrade')}
              size="md"
            >
              <TradeTrackingNewEditForm asssetID={MainAssetId!} />
            </MyDialog>
            <MyDialog
              open={openDialogDepositCash}
              onClose={handleCloseDepositCashConfirm}
              title={translate('CRUD.DepositCash')}
              size="md"
            >
              <WithdrawalTrackingDepositNewEditForm asssetID={MainAssetId} />
            </MyDialog>

            <MyDialog
              open={openDialogWithdrawCash}
              onClose={handleCloseWithdrawCashConfirm}
              title={translate('CRUD.WithdrawCash')}
              size="md"
            >
              <WithdrawalTrackingNewEditForm asssetID={MainAssetId} />
            </MyDialog>

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label={translate('Pagination.Dense')}
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
});

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
}: {
  tableData: IMainAsset[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (item: Record<string, any>) =>
        item.search.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
