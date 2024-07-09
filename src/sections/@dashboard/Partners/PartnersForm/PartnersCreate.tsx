import { useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from 'src/hooks/useLocales';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import PartnersNewEditForm from './PartnersNewEditForm';

// ----------------------------------------------------------------------

export default function PartnersCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={!isEdit ? `${translate('Partners.AddTitle')}` : `${translate('Partners.UpdateTitle')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('Partners.CreatePartners')}`
              : `${translate('Partners.EditPartners')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Partners.PartnersList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit ? `${translate('Partners.New')}` : `${translate('Partners.Update')}`,
            },
          ]}
        />
        <PartnersNewEditForm />
      </Container>
    </Page>
  );
}
