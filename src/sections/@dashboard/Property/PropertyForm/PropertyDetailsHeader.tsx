// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { observer } from 'mobx-react-lite';
import { useStore } from 'src/stores/store';
import useLocales from '../../../../hooks/useLocales';
import PropertyDetailsTablerow from '../PropertyList/PropertyDetailsTablerow';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from 'src/components/loader/Loader';
import MyDialog from 'src/components/MyDialog';
import PropertyPaymentNewEditForm from './PropertyPaymentNewEditForm';
import PropertyAssignmentNewEditForm from './PropertyAssignmentNewEditForm';
// ----------------------------------------------------------------------

export default observer(function PropertyDetailsHeader() {
  const { translate } = useLocales();
  const {
    PropertyStore: {
      PropertyDetails,
      loadPropertyDetails,
      openPaymentDialog,
      setOpenClosePaymentDialog,
      openAssignDialog,
      setOpenCloseAssignDialog,
      selectedPayment,
      selectedAssignment,
    },
  } = useStore();

  const { id } = useParams();
  const [isloading, setIsloading] = useState(true);

  const { themeStretch } = useSettings();

  useEffect(() => {
    if (id != null) {
      loadPropertyDetails(Number(id)).then(() => {
        setTimeout(() => {
          setIsloading(false);
        }, 1000);
      });
    }
  }, [id, loadPropertyDetails]);

  return (
    <Page title={translate('Property.DetailsTitle')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('Property.DetailsTitle')}
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Property.PropertyList')}`, href: PATH_DASHBOARD.Property.list },
          ]}
        />
        {isloading ? <Loader /> : <PropertyDetailsTablerow row={PropertyDetails!} />}
      </Container>

      {selectedPayment !== undefined ? (
        <MyDialog
          open={openPaymentDialog}
          onClose={setOpenClosePaymentDialog}
          title={translate('CRUD.Payment')}
          size="md"
        >
          <PropertyPaymentNewEditForm id={Number(id)} payment={selectedPayment} />
        </MyDialog>
      ) : (
        <></>
      )}

      {selectedAssignment !== undefined ? (
        <MyDialog
          open={openAssignDialog}
          onClose={setOpenCloseAssignDialog}
          title={translate('CRUD.Assignment')}
          size="md"
        >
          <PropertyAssignmentNewEditForm id={Number(id)} Assignment={selectedAssignment} />
        </MyDialog>
      ) : (
        <></>
      )}
    </Page>
  );
});
