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
import PaymentTypeNewEditForm from './PaymentTypeNewEditForm';
// sections

// @type

// ----------------------------------------------------------------------

export default function PaymentTypeCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit ? `${translate('PaymentType.AddTitle')}` : `${translate('PaymentType.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('PaymentType.CreatePaymentType')}`
              : `${translate('PaymentType.EditPaymentType')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('PaymentType.PaymentTypeList')}`,
              href: PATH_DASHBOARD.PaymentType.list,
            },
            {
              name: !isEdit
                ? `${translate('PaymentType.New')}`
                : `${translate('PaymentType.Update')}`,
            },
          ]}
        />
        <PaymentTypeNewEditForm />
      </Container>
    </Page>
  );
}
