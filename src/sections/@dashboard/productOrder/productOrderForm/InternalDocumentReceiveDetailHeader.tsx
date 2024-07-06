// @mui
import { Card, Container, Grid, TableBody, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableHeadCustom } from 'src/components/table';
import { InternalDocumentDetailTableRow } from '../productOrderList';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import { translateRect } from '@fullcalendar/common';
//localization
import useLocales from 'src/hooks/useLocales';
import InternalDocumentReceiveDetailTableRow from '../productOrderList/InternalDocumentReceiveDetailTableRow';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import InternalDocumentStore from 'src/stores/InternalDocument/internalDocumentStore';
import Loader from 'src/components/loader/Loader';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ID', label: 'Doc ID', align: 'left' },
  { id: 'numberOfPages', label: 'No. Of Pages', align: 'left' },
  { id: 'returnDate', label: 'Return Date', align: 'left' },
  { id: 'documentDate', label: 'Document Date', align: 'left' },
  { id: 'attachmentDescription', label: 'Attachment Desc', align: 'left' },
  { id: 'documentSubject', label: 'Document Subject', align: 'left' },
  { id: 'documentNumber', label: 'Document Number', align: 'left' },
  { id: 'documentTypeId', label: 'Document Type ID', align: 'left' },
  { id: 'fromDepartmentId', label: 'From Dep ID', align: 'left' },
  { id: 'toDepartmentId', label: 'To Dep Id', align: 'left' },
  { id: 'documentLevelId', label: 'Doc Level ID ', align: 'left' },
  { id: 'departmentId', label: 'Department ID', align: 'left' },
];

export default observer(function InternalDocumentReceiveDetailHeader() {
  const { translate } = useLocales();
  const {
    InternalDocumentStore: { SelectedInternalDocumentDetail },
    InternalDocumentStore,
  } = useStore();

  const { loadInternalDocumentDetail, loadInternalDocumentDetailFromTracking } =
    InternalDocumentStore;

  const { id } = useParams();

  const [isloading, setIsloading] = useState(false);

  // useEffect(() => {
  //   if (isBeforeDeadLine != null) {
  //     getItsmsByBeforeAndAfterDeadLine(isBeforeDeadLine!).then(() => {
  //       setIsloading(true);
  //       setTimeout(() => {
  //         setIsloading(false);
  //       }, 1000);
  //     });
  //   }
  // }, [isBeforeDeadLine]);

  useEffect(() => {
    if (id != null) {
      // loadInternalDocumentDetail(id);
      loadInternalDocumentDetailFromTracking(Number(id));
      loadInternalDocumentDetail(Number(id)).then(() => {
        setIsloading(true);
        setTimeout(() => {
          setIsloading(true);
        }, 1000);
      });
    } else {
      setIsloading(true);
    }
  }, [id]);

  const { themeStretch } = useSettings();
  return (
    <Page title={translate('InternalDocument.DetailTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`${translate('InternalDocument.InDocDetails')}`}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('InternalDocument.InternalDoc')}`,
              href: PATH_DASHBOARD.InternalDocument.list,
            },
          ]}
        />
        {isloading ? (
          <InternalDocumentReceiveDetailTableRow row={SelectedInternalDocumentDetail!} />
        ) : (
          <Loader></Loader>
        )}
      </Container>
    </Page>
  );
});
