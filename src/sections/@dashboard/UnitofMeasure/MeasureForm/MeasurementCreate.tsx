import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useLocales from 'src/hooks/useLocales';
// _mock_
import { _userList } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import MeasurementNewEditForm from './MeasurementNewEditForm';
// sections

// @type

// ----------------------------------------------------------------------

export default function MeasurementCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('Measurement.AddTitle')}`
          : `${translate('Measurement.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('Measurement.CreateMeasurement')}`
              : `${translate('Measurement.EditMeasurement')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Measurement.MeasurementList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('Measurement.New')}`
                : `${translate('Measurement.Update')}`,
            },
          ]}
        />
        <MeasurementNewEditForm />
      </Container>
    </Page>
  );
}
