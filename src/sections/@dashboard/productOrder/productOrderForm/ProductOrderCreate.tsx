import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections

//localization
import useLocales from 'src/hooks/useLocales';
import ProductOrderNewEditForm from './ProductOrderNewEditForm';
// ----------------------------------------------------------------------

export default function ProductOrderCreate() {
  const { translate } = useLocales();

  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page title={translate('InternalDocument.Title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('InternalDocument.CreateNewInternalDoc')}`
              : `${translate('InternalDocument.EditInternalDoc')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('InternalDocument.InternalDoc')}`,
              // href: PATH_DASHBOARD.InternalDocument.list,
            },
            {
              name: !isEdit
                ? `${translate('InternalDocument.NewInternalDoc')}`
                : `${translate('InternalDocument.UpdateInternalDoc')}`,
            },
          ]}
        />
        <ProductOrderNewEditForm />
      </Container>
    </Page>
  );
}
