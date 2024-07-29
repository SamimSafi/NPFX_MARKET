import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Switch,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
import useTable, { getComparator, emptyRows } from 'src/hooks/useTable';

// components
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from 'src/components/table';
// sections
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import { Application } from 'src/@types/application';
import ApplicationTableToolbar from './ApplicationTableToolbar';
import ApplicationTableRow from './ApplicationTableRow';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

export default observer(function ApplicationList() {
  const { ApplicationStore } = useStore();
  const { translate } = useLocales();
  const {
    loadApplication,
    ApplicationList,
    ApplicationRegistry,
    totalRecord,
    ApplicationSearch,
    getApplicationRegistry,
    setOpenCloseDialog,
  } = ApplicationStore;
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

  const { themeStretch, tablePagination, onChangePagination } = useSettings();
  const [filterName, setFilterName] = useState('');
  const navigate = useNavigate();
  const TABLE_HEAD = [
    { id: 'ID', label: `${translate('Department.Id')}`, align: 'left' },
    { id: 'title', label: `${translate('APPlication.Title')}`, align: 'left' },
    { id: 'abbrevation', label: `${translate('APPlication.Abbrevation')}`, align: 'left' },
    { id: 'iconClass', label: `${translate('APPlication.IconClass')}`, align: 'left' },
    { id: 'defaultRoute', label: `${translate('APPlication.DefaultRoute')}`, align: 'left' },
    { id: 'area', label: `${translate('APPlication.Area')}`, align: 'left' },
    { id: 'description', label: `${translate('APPlication.Description')}`, align: 'left' },
    { id: '', label: `${translate('Department.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      ApplicationSearch({
        pageIndex: 0,
        pageSize: tablePagination,
        title: filterName,
        //dariName: filterName,
      });
    } else if (filterName === '') {
      ApplicationSearch({ pageIndex: 0, pageSize: tablePagination });
    }
  };

  const handleEditRow = (id: number) => {
    getApplicationRegistry(id);
    navigate(PATH_DASHBOARD.Application.edit);
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadApplication({ pageIndex: newPage, pageSize: tablePagination });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadApplication({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadApplication({ pageIndex: 0, pageSize: tablePagination });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadApplication, tablePagination]);

  useEffect(() => {
    if (ApplicationRegistry.size <= 1) {
      loadApplication({ pageIndex: 0, pageSize: tablePagination });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFiltered = applySortFilter({
    tableData: ApplicationList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <Page title="Application: Application List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('APPlication.App')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('APPlication.App')}`,
              href: PATH_DASHBOARD.Application.root,
            },
            { name: `${translate('APPlication.AppList')}` },
          ]}
        />

        <Card>
          <ApplicationTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                      <ApplicationTableRow
                        index={index}
                        key={row.id}
                        row={row}
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
              rowsPerPageOptions={[5, 10, 25, 50, 100, 150, 200]}
              component="div"
              labelRowsPerPage={translate('Pagination.RowsPerPage')}
              count={totalRecord}
              rowsPerPage={tablePagination}
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
              <ApplicationDelete id={applicationId} />
            </MyDialog> */}
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
  tableData: Application[];
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
        item.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
