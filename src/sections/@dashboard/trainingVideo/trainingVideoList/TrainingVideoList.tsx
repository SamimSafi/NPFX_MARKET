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
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
import useTable, { getComparator, emptyRows } from 'src/hooks/useTable';

// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom } from 'src/components/table';
// sections
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import MyDialog from 'src/components/MyDialog';

import useLocales from 'src/hooks/useLocales';
import TrainingVideoTableRow from './TrainingVideoTableRow';
import TrainingVideoTableToolbar from './TrainingVideoTableToolbar';
import TrainingVideoDelete from './TrainingVideoDelete';
import { TrainingVideo } from 'src/@types/foamCompanyTypes/systemTypes/trainingVideo';

// ----------------------------------------------------------------------

export default observer(function TrainingVideoList() {
  const { translate } = useLocales();
  const { TrainingVideoStore } = useStore();

  const {
    loadTrainingVideoList,
    TrainingVideoList,
    TrainingVideoRegistry,
    getTrainingVideoFromRegistry,
    totalRecord,
    setOpenCloseDialog,
    TrainingVideoSearch,
    openDialog,
    clearSelectedTrainingVideo,
  } = TrainingVideoStore;
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

  const [id, setId] = useState<number>(0);
  const TABLE_HEAD = [
    { id: 'id', label: `${translate('Department.Id')}`, align: 'left' },
    { id: 'dariTitle', label: `${translate('TrainingVideo.DariTitle')}`, align: 'left' },
    { id: 'PashtoTitle', label: `${translate('TrainingVideo.PashtoTitle')}`, align: 'left' },
    { id: 'application', label: `${translate('TrainingVideo.Application')}`, align: 'left' },
    //{ id: 'attachment', label: `${translate('TrainingVideo.attachmentPath')}` },
    { id: '', label: `${translate('GeneralFields.Action')}` },
  ];
  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
    if (filterName.length > 1) {
      TrainingVideoSearch({
        pageIndex: 0,
        pageSize: tablePagination,
        searchBy: filterName,
      });
    } else if (filterName === '') {
      TrainingVideoSearch({ pageIndex: 0, pageSize: tablePagination });
    }
  };

  const handleOpenConfirm = (id: number) => {
    setOpenCloseDialog();
    setId(id);
  };

  const handleCloseConfirm = () => {
    setOpenCloseDialog();
  };
  const handleEditRow = (id: number) => {
    getTrainingVideoFromRegistry(id);
    navigate(PATH_DASHBOARD.TrainingVideo.edit);
  };

  // const handleDetail = (id: number) => {
  //   loadArchiveInfoDetail(id).then((res) => {
  //     navigate(PATH_DASHBOARD.ArchiveInfo.detail);
  //   });
  // };

  // const handleaddAttachment = (id: number) => {
  //   getArchiveFromRegistry(id);
  //   loadArchiveInfoDetail(id).then((res) => {
  //     navigate(PATH_DASHBOARD.ArchiveInfo.Attachments);
  //   });
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadTrainingVideoList({ pageIndex: newPage, pageSize: tablePagination });
  };
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangePagination(event.target.value);
    onChangeRowsPerPage(event.target.value);
    let pageZize = parseInt(event.target.value);
    loadTrainingVideoList({ pageIndex: 0, pageSize: pageZize });
  };

  useEffect(() => {
    onChangeRowsPerPage(tablePagination);
    loadTrainingVideoList({ pageIndex: 0, pageSize: tablePagination });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTrainingVideoList, tablePagination]);

  useEffect(() => {
    if (TrainingVideoRegistry.length <= 1) {
      loadTrainingVideoList({ pageIndex: 0, pageSize: tablePagination });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFiltered = applySortFilter({
    tableData: TrainingVideoList,
    comparator: getComparator(order, orderBy),
    filterName: '',
  });

  const denseHeight = dense ? 52 : 72;

  // const isNotFound = !dataFiltered.length && !!filterName;
  // const isNotFound = !dataFiltered.length && !!filterName;
  const isNotFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Page title={translate('TrainingVideo.Title')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={translate('TrainingVideo.List')}
            links={[
              { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
              {
                name: `${translate('TrainingVideo.TrainingVideo')}`,
                href: PATH_DASHBOARD.TrainingVideo.list,
              },
              { name: `${translate('TrainingVideo.List')}` },
            ]}
            action={
              // <PermissionBasedGuard permissions={['ArchiveInfo-Create']}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.TrainingVideo.new}
                onClick={() => clearSelectedTrainingVideo()}
              >
                {translate('CRUD.Create')}
              </Button>
              // </PermissionBasedGuard>
            }
          />
          <Card>
            <TrainingVideoTableToolbar filterName={filterName} onFilterName={handleFilterName} />

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
                        <TrainingVideoTableRow
                          index={index}
                          key={row.id}
                          row={row}
                          onDeleteRow={() => handleOpenConfirm(row.id!)}
                          onEditRow={() => handleEditRow(row.id!)}
                          // onDetailRow={() => handleDetail(row.id!)}
                          // onAddAttachment={() => handleaddAttachment(row.id!)}
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
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${translate('Pagination.Of')} ${count}`
                }
                count={totalRecord}
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
                <TrainingVideoDelete id={id} />
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
    </>
  );
});

// ----------------------------------------------------------------------

function applySortFilter({
  tableData,
  comparator,
  filterName,
}: {
  tableData: TrainingVideo[];
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
