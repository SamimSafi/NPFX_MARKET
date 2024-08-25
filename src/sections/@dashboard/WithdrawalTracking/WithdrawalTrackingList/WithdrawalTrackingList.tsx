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
import WithdrawalTrackingTableRow from './WithdrawalTrackingTableRow';
import WithdrawalTrackingTableToolbar from './WithdrawalTrackingTableToolbar';
import WithdrawalTrackingDelete from './WithdrawalTrackingDelete';
import { IWithdrawalTracking } from 'src/@types/foamCompanyTypes/systemTypes/WithdrawalTracking';

// ----------------------------------------------------------------------

export default observer(function WithdrawalTrackingList() {
  const { WithdrawalTrackingStore } = useStore();
  const { tablePagination, onChangePagination } = useSettings();
  const { translate } = useLocales();
  const {
    loadWithdrawalTracking,
    WithdrawalTrackingList,
    WithdrawalTrackingRegistry,
    totalRecord,
    WithdrawalTrackingearch,
    getWithdrawalTrackingFromRegistry,
    setOpenCloseDialog,
    openDialog,
  } = WithdrawalTrackingStore;
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

  const [WithdrawalTrackingId, setWithdrawalTrackingId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('GeneralFields.Id')}`, align: 'left' },
    { id: 'Currency', label: `${translate('CurrencyType.CurrencyType')}`, align: 'left' },
    { id: 'Date', label: `${translate('GeneralFields.Date')}`, align: 'left' },
    { id: 'description', label: `${translate('GeneralFields.Description')}`, align: 'left' },
    { id: 'branch', label: `${translate('Branch.Branch')}`, align: 'left' },
    { id: 'user', label: `${translate('User.user')}`, align: 'left' },
    {
      id: 'withdrawalAmount',
      label: `${translate('WithdrawalTracking.WithdrawalAmount')}`,
      align: 'left',
    },
    { id: '', label: `${translate('GeneralFields.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      WithdrawalTrackingearch({
        pageIndex: 0,
        pageSize: tablePagination,
        name: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      WithdrawalTrackingearch({ pageIndex: 0, pageSize: tablePagination });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setWithdrawalTrackingId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getWithdrawalTrackingFromRegistry(id);
    navigate(PATH_DASHBOARD.ContractType.edit);
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
    loadWithdrawalTracking({ pageIndex: newPage, pageSize: tablePagination });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadWithdrawalTracking({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadWithdrawalTracking({ pageIndex: 0, pageSize: tablePagination });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePagination]);

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    if (WithdrawalTrackingRegistry.size <= 1) {
      loadWithdrawalTracking({ pageIndex: 0, pageSize: tablePagination });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePagination]);

  const dataFiltered = applySortFilter({
    tableData: WithdrawalTrackingList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('WithdrawalTracking.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('WithdrawalTracking.WithdrawalTracking')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('WithdrawalTracking.WithdrawalTracking')}` },
          ]}
          action={
            <>
              <Button
                variant="contained"
                color="error"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.WithdrawalTracking.new}
                sx={{ mr: 1 }}
              >
                {translate('CRUD.WithdraFromAccount')}
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.WithdrawalTracking.deposit}
              >
                {translate('CRUD.DepositToAccount')}
              </Button>
            </>
          }
        />

        <Card>
          <WithdrawalTrackingTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <WithdrawalTrackingTableRow
                        key={row.id}
                        row={row}
                        index={index}
                        onDeleteRow={() => handleOpenConfirm(row.id!)}
                        onEditRow={() => handleEditRow(row.id!)}
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
              <WithdrawalTrackingDelete id={WithdrawalTrackingId} />
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
  tableData: IWithdrawalTracking[];
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
