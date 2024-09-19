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
import PropertyTableRow from './PropertyTableRow';
import PropertyDelete from './PropertyDelete';
import { IPropertyType } from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
import PropertyTableToolbar from './PropertyTableToolbar';
import PropertyAssignmentNewEditForm from '../PropertyForm/PropertyAssignmentNewEditForm';
import PropertyPaymentNewEditForm from '../PropertyForm/PropertyPaymentNewEditForm';
import PropertyChangeStatus from '../PropertyForm/PropertyChangeStatus';

// ----------------------------------------------------------------------

export default observer(function PropertyList() {
  const { PropertyStore } = useStore();
  const { translate } = useLocales();
  const { tablePagination, onChangePagination } = useSettings();
  const {
    loadProperty,
    PropertyList,
    PropertyRegistry,
    totalRecord,
    Propertyearch,
    getPropertyFromRegistry,
    setOpenCloseDialog,
    openDialog,
    setOpenCloseAssignDialog,
    openAssignDialog,
    setOpenClosePaymentDialog,
    openPaymentDialog,
    setOpenCloseChangeStatusDialog,
    openChangeStatusDialog,
  } = PropertyStore;
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

  const [PropertyId, setPropertyId] = useState<number>();
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('GeneralFields.Id')}`, align: 'left' },
    { id: 'Name', label: `${translate('GeneralFields.Name')}`, align: 'left' },
    { id: 'model', label: `${translate('Property.Model')}`, align: 'left' },
    { id: 'details', label: `${translate('Employee.Details')}`, align: 'left' },
    { id: 'price', label: `${translate('Property.Price')}`, align: 'left' },
    { id: 'amountPaid', label: `${translate('Property.AmountPaid')}`, align: 'left' },
    { id: 'condition', label: `${translate('Property.Condition')}`, align: 'left' },
    { id: 'ُCategory', label: `${translate('Categorys.Categorys')}`, align: 'left' },
    { id: '', label: `${translate('GeneralFields.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      Propertyearch({
        pageIndex: 0,
        pageSize: tablePagination,
        searchBy: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      Propertyearch({ pageIndex: 0, pageSize: tablePagination });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setPropertyId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };

  const handleOpenChangeStatusConfirm = (id: number) => {
    setPropertyId(id);
    setOpenCloseChangeStatusDialog();
  };

  const handleCloseChangeStatusConfirm = () => {
    setOpenCloseChangeStatusDialog();
  };

  const handleCloseConfirmAssign = () => {
    setOpenCloseAssignDialog();
  };
  const handleCloseConfirmPayment = () => {
    setOpenClosePaymentDialog();
  };

  const handleEditRow = (id: number) => {
    getPropertyFromRegistry(id);
    navigate(PATH_DASHBOARD.Property.edit);
  };

  const handleAssignProperty = (id: number) => {
    setPropertyId(id);
    getPropertyFromRegistry(id).then(() => {
      setOpenCloseAssignDialog();
    });
  };
  const handlePaymentProperty = (id: number) => {
    setPropertyId(id);
    getPropertyFromRegistry(id).then(() => {
      setOpenClosePaymentDialog();
    });
  };

  const handleDetail = (id: number) => {
    navigate(PATH_DASHBOARD.Property.detail(id));
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
    loadProperty({ pageIndex: newPage, pageSize: tablePagination });
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadProperty({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadProperty({ pageIndex: 0, pageSize: tablePagination });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePagination]);

  useEffect(() => {
    if (PropertyRegistry.size <= 1) {
      loadProperty({ pageIndex: 0, pageSize: rowsPerPage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFiltered = applySortFilter({
    tableData: PropertyList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title={translate('Property.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Property.PropertyList')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },

            { name: `${translate('Property.PropertyList')}` },
          ]}
          action={
            <>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.Property.new}
              >
                {translate('CRUD.Create')}
              </Button>
            </>
          }
        />

        <Card>
          <PropertyTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <PropertyTableRow
                        key={row.id}
                        row={row}
                        index={index}
                        onDeleteRow={() => handleOpenConfirm(row.id!)}
                        onEditRow={() => handleEditRow(row.id!)}
                        onDetailsRow={() => handleDetail(row.id!)}
                        handleAssignProperty={() => handleAssignProperty(row.id!)}
                        handlePaymentProperty={() => handlePaymentProperty(row.id!)}
                        handleOpenChangeStatusConfirm={() => handleOpenChangeStatusConfirm(row.id!)}
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
              <PropertyDelete id={PropertyId!} />
            </MyDialog>

            <MyDialog
              open={openAssignDialog}
              onClose={handleCloseConfirmAssign}
              title={translate('CRUD.Assign')}
              size="md"
            >
              <PropertyAssignmentNewEditForm id={PropertyId!} />
            </MyDialog>

            <MyDialog
              open={openPaymentDialog}
              onClose={handleCloseConfirmPayment}
              title={translate('CRUD.Payment')}
              size="md"
            >
              <PropertyPaymentNewEditForm id={PropertyId!} />
            </MyDialog>

            <MyDialog
              open={openChangeStatusDialog}
              onClose={handleCloseChangeStatusConfirm}
              title={translate('CRUD.ChangeStatus')}
              size="md"
            >
              <PropertyChangeStatus id={PropertyId!} />
            </MyDialog>
            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label={translate('Pagination.Dense')}
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
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
  tableData: IPropertyType[];
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
        item.searchBy.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
