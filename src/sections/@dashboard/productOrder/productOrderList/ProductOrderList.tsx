import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
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
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
// sections
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import useLocales from 'src/hooks/useLocales';
import useTabs from 'src/hooks/useTabs';
import { MailOutline } from '@mui/icons-material';
import { productList } from 'src/@types/foamCompanyTypes/productOrder';
import ProductOrderTableRow from './ProductOrderTableRow';
import { ProductOrderTableToolbar } from '.';

// ----------------------------------------------------------------------

export default observer(function ProductOrderList() {
  const { translate } = useLocales();

  const {
    ProductOrderStore,
    commonDropdown: { loadContractTypeDDL, ContractTypeOption },
  } = useStore();
  const {
    loadProductOrder,
    ProductOrderList,
    ProductOrderRegistry,
    totalRecord,
    selectedProductOrder,
    ProductOrderearch,
    getProductOrderFromRegistry,
    setOpenCloseDialog,
    openDialog,
    clearSelectedProductOrder,
  } = ProductOrderStore;

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
  const [filterName, setFilterName] = useState('');

  const navigate = useNavigate();
  const TABLE_HEAD = [
    { id: 'id', label: `${translate('InternalDocument.Id')}`, align: 'left' },
    { id: 'subject', label: `${translate('InternalDocument.DocumentSubject')}`, align: 'left' },
    { id: 'body', label: `${translate('InternalDocument.DocBody')}`, align: 'left' },
    { id: 'to Department', label: `${translate('InternalDocument.ToDep')}`, align: 'left' },
    { id: 'Document Level', label: `${translate('InternalDocument.DocLevel')}`, align: 'left' },
    {
      id: 'fromDepartmentEnglishName',
      label: `${translate('InternalDocument.DocType')}`,
      align: 'left',
    },
    {
      id: 'processStatusEnglishName',
      label: `${translate('InternalDocument.Status')}`,
      align: 'left',
    },
    { id: '', label: `${translate('InternalDocument.CreateDate')}` },
    { id: 'CreatedBy', label: `${translate('InternalDocument.CreatedBy')}` },
    { id: '', label: `${translate('Department.Action')}` },
  ];

  const [internalDocumentId, setInternalDocumentId] = useState<number>(0);
  const { currentTab: processStatusId, onChangeTab: onFilterStatus } = useTabs('0');
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      ProductOrderearch({
        pageIndex: 0,
        pageSize: rowsPerPage,
        search: filterName,
      });
    } else if (filterName === '') {
      ProductOrderearch({ pageIndex: 0, pageSize: rowsPerPage });
    }
  };

  // Get Detail
  // const handleDetail = (id: number, fromDep: number) => {
  //   loadParentDepartment(fromDep).then(() => {
  //     loadInternalDocumentDetailFromTracking(id);
  //     loadInternalDocumentDetail(id).then(() => {
  //       navigate(PATH_DASHBOARD.InternalDocument.detail(id));
  //     });
  //   });
  // };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setInternalDocumentId(id);
    //setDetailCloseDialog();
  };

  // const handleRejectConfirm = (id: number) => {
  //   setInternalDocumentId(id);
  //   setDetailCloseDialog();
  //   // setOpenCloseDialog();
  // };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
    // setDetailCloseDialog();
  };

  // const handleEditRow = (id: number) => {
  //   loadUserHighDepartmentDropdown().then(() => {
  //     getProductOrderFromRegistry(id);
  //     loadInternalDocForEdit(id).then(() => {
  //       navigate(PATH_DASHBOARD.InternalDocument.edit);
  //     });
  //   });
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadProductOrder({ pageIndex: newPage, pageSize: rowsPerPage });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRowsPerPage(event);
    let pageZize = parseInt(event.target.value);
    loadProductOrder({ pageIndex: 0, pageSize: pageZize });
  };
  useEffect(() => {
    // if (ProductOrderRegistry.size <= 1) {
    loadProductOrder({ pageIndex: 0, pageSize: rowsPerPage });
    // }
  }, [loadProductOrder, rowsPerPage]);

  const dataFiltered = applySortFilter({
    tableData: ProductOrderList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!processStatusId);

  // const getLengthByStatus = (status: string) =>
  //   ProductOrderList.filter((item) => item.customerName?.toString() === status).length;

  // const TABS = [
  //   {
  //     value: '0',
  //     label: translate('ProcessName.All'),
  //     color: 'info',
  //     count: ProductOrderList.length,
  //   },
  //   {
  //     value: '1',
  //     label: translate('ProcessName.Completed'),
  //     color: 'success',
  //     count: getLengthByStatus('1'),
  //   },
  //   {
  //     value: '2',
  //     label: translate('ProcessName.InProcess'),
  //     color: 'primary',
  //     count: getLengthByStatus('2'),
  //   },
  //   {
  //     value: '3',
  //     label: translate('ProcessName.Pending'),
  //     color: 'warning',
  //     count: getLengthByStatus('3'),
  //   },
  //   {
  //     value: '4',
  //     label: translate('ProcessName.NotCompleted'),
  //     color: 'secondary',
  //     count: getLengthByStatus('4'),
  //   },
  //   {
  //     value: '5',
  //     label: translate('ProcessName.Approve'),
  //     color: 'success',
  //     count: getLengthByStatus('5'),
  //   },
  //   {
  //     value: '6',
  //     label: translate('ProcessName.Reject'),
  //     color: 'error',
  //     count: getLengthByStatus('6'),
  //   },
  //   {
  //     value: '7',
  //     label: translate('ProcessName.DocumentProcessEnd'),
  //     color: 'primary',
  //     count: getLengthByStatus('7'),
  //   },
  //   {
  //     value: '8',
  //     label: translate('ProcessName.ReplytoReceivedDocument'),
  //     color: 'info',
  //     count: getLengthByStatus('8'),
  //   },
  //   {
  //     value: '9',
  //     label: translate('ProcessName.ExecuteandMessageSending'),
  //     color: 'warning',
  //     count: getLengthByStatus('9'),
  //   },
  //   {
  //     value: '10',
  //     label: translate('ProcessName.ProcessStart'),
  //     color: 'secondary',
  //     count: getLengthByStatus('10'),
  //   },
  //   {
  //     value: '11',
  //     label: translate('ProcessName.Sent'),
  //     color: 'info',
  //     count: getLengthByStatus('11'),
  //   },
  //   {
  //     value: '14',
  //     label: translate('InternalDocument.Draft'),
  //     color: 'warning',
  //     count: getLengthByStatus('14'),
  //   },
  // ] as const;

  return (
    <Page title={translate('InternalDocument.ListTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('InternalDocument.SentDocumentsList')}
          icon={<MailOutline />}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            // {
            //   name: `${translate('InternalDocument.InternalDoc')}`,
            //   href: PATH_DASHBOARD.InternalDocument.root,
            // },
            { name: `${translate('InternalDocument.SentDocumentsList')}` },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.ContractType.new}
            >
              {translate('CRUD.Create')}
            </Button>
          }
        />

        <Card>
          {/* <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={processStatusId}
            onChange={onFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {TABS.filter((item) => item.count > 0).map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={<Label color={tab.color}> {tab.count} </Label>}
                label={tab.label}
              />
            ))}
          </Tabs>

          <Divider /> */}
          <ProductOrderTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <ProductOrderTableRow key={row.id} index={index} row={row} />
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
            {/* <Box sx={{ ml: 5 }}>
              <Typography variant="caption" color="textSecondary">
                {translate('InternalDocument.Note')}
              </Typography>
            </Box> */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200]}
              labelRowsPerPage={translate('Pagination.RowsPerPage')}
              component="div"
              count={totalRecord}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${translate('Pagination.Of')} ${count}`
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handlePageSizeChange}
            />

            {/* <MyDialog
              open={openDialog}
              onClose={handleCloseConfirm}
              title={translate('CRUD.DeleteTitle')}
              size="md"
            >
              <InternalDocumentDelete id={internalDocumentId} />
            </MyDialog> */}

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label={translate('Pagination.Dense')}
              sx={{ px: 3, py: 1.5, top: 10, position: { md: 'absolute' } }}
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
  tableData: productList[];
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
