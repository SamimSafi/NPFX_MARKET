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
import LoanTrackingTableRow from './LoanTrackingTableRow';
import LoanTrackingTableToolbar from './LoanTrackingTableToolbar';
import LoanTrackingDelete from './LoanTrackingDelete';
import { ILoanTracking } from 'src/@types/foamCompanyTypes/systemTypes/LoanTracking';
import TakePaidLoanTrackingNewEditForm from '../LoanTrackingForm/TakePaidLoanTrackingNewEditForm';
import PayTakenLoanTrackingNewEditForm from '../LoanTrackingForm/PayTakenLoanTrackingNewEditForm';

// ----------------------------------------------------------------------

export default observer(function LoanTrackingList() {
  const { LoanTrackingStore } = useStore();
  const { translate } = useLocales();
  const {
    loadLoanTracking,
    LoanTrackingList,
    LoanTrackingRegistry,
    totalRecord,
    LoanTrackingearch,
    getLoanTrackingFromRegistry,
    setOpenCloseDialog,
    openDialog,
    setOpenCloseDialogPayTakenLoan,
    openDialogPayTakenLoan,
    setOpenCloseDialogTakePaidLoan,
    openDialogTakePaidLoan,
  } = LoanTrackingStore;
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

  const [LoanTrackingId, setLoanTrackingId] = useState<number>(0);
  const [currencyTypeId, setCurrencyTypeId] = useState<number>(0);
  const [mainAssetId, setMainAssetId] = useState<string>('');
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('GeneralFields.Id')}`, align: 'left' },
    { id: 'currencyType', label: `${translate('CurrencyType.CurrencyType')}`, align: 'left' },
    // { id: 'Asset', label: `${translate('GeneralFields.Asset')}`, align: 'left' },
    { id: 'Date', label: `${translate('GeneralFields.Date')}`, align: 'left' },
    { id: 'dueDate', label: `${translate('GeneralFields.DueDate')}`, align: 'left' },
    { id: 'partner', label: `${translate('Partner.Partner')}`, align: 'left' },
    { id: 'partnerPhone', label: `${translate('Partner.PartnerPhone')}`, align: 'left' },
    { id: 'userName', label: `${translate('User.userName')}`, align: 'left' },
    { id: 'status', label: `${translate('GeneralFields.Status')}`, align: 'left' },
    { id: 'LoanAmount', label: `${translate('LoanTracking.LoanAmount')}`, align: 'left' },
    { id: 'paidAmount', label: `${translate('LoanTracking.PaidAmount')}`, align: 'left' },
    { id: 'remainAmount', label: `${translate('LoanTracking.RemainAmount')}`, align: 'left' },
    { id: 'description', label: `${translate('GeneralFields.Description')}`, align: 'left' },
    { id: '', label: `${translate('GeneralFields.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      LoanTrackingearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        name: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      LoanTrackingearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setLoanTrackingId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };

  const handleOpenConfirmPayTakenLoan = (
    id: number,
    currencyTypeID: number,
    mainAssetId: string
  ) => {
    setOpenCloseDialogPayTakenLoan();
    setLoanTrackingId(id);
    setCurrencyTypeId(currencyTypeID);
    setMainAssetId(mainAssetId);
  };

  const handleCloseConfirmPayTakenLoan = () => {
    setOpenCloseDialogPayTakenLoan();
  };
  const handleEditRow = (id: number) => {
    getLoanTrackingFromRegistry(id);
    navigate(PATH_DASHBOARD.LoanTracking.edit);
  };

  // Paye Recieved Loan
  const handleTakePaidLoanOpenConfirm = (id: number, currencyTypeID: number) => {
    setOpenCloseDialogTakePaidLoan();
    setLoanTrackingId(id);
    setCurrencyTypeId(currencyTypeID);
  };
  const handleCloseTakePaidLoanConfirm = () => {
    setOpenCloseDialogTakePaidLoan();
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
    loadLoanTracking({ pageIndex: newPage, pageSize: rowsPerPage });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadLoanTracking({ pageIndex: 0, pageSize: pageZize });
  };
  useEffect(() => {
    if (LoanTrackingRegistry.size <= 1) {
      loadLoanTracking({ pageIndex: 0, pageSize: rowsPerPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFiltered = applySortFilter({
    tableData: LoanTrackingList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('LoanTracking.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('LoanTracking.LoanTrackingList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('LoanTracking.LoanTrackingList')}` },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.LoanTracking.new}
            >
              {translate('CRUD.Create')}
            </Button>
          }
        />

        <Card>
          <LoanTrackingTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <LoanTrackingTableRow
                        key={row.id}
                        row={row}
                        index={index}
                        onDeleteRow={() => handleOpenConfirm(row.id!)}
                        onPayTakenLoanClicked={() =>
                          handleOpenConfirmPayTakenLoan(
                            row.id!,
                            row.currencyTypeId!,
                            row.mainAssetId!
                          )
                        }
                        onTakePaidLoanClicked={() =>
                          handleTakePaidLoanOpenConfirm(row.id!, row.currencyTypeId!)
                        }
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
              rowsPerPage={rowsPerPage}
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
              <LoanTrackingDelete id={LoanTrackingId} />
            </MyDialog>
            <MyDialog
              open={openDialogTakePaidLoan}
              onClose={handleCloseTakePaidLoanConfirm}
              title={translate('CRUD.TakePaidLoan')}
              size="md"
            >
              <TakePaidLoanTrackingNewEditForm
                TrackingId={LoanTrackingId}
                currencyTypeId={currencyTypeId}
              />
            </MyDialog>

            <MyDialog
              open={openDialogPayTakenLoan}
              onClose={handleCloseConfirmPayTakenLoan}
              title={translate('CRUD.PayTakenLoan')}
              size="md"
            >
              <PayTakenLoanTrackingNewEditForm
                LoanTrackingId={LoanTrackingId!}
                currencyTypeId={currencyTypeId}
                mainAssetId={mainAssetId}
              />
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
  tableData: ILoanTracking[];
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
