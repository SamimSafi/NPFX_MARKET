import { useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
//Localization
import React from 'react';
import useLocales from 'src/hooks/useLocales';
import TrainingVideoNewEditForm from './TrainingVideoNewEditForm';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useSettings from 'src/hooks/useSettings';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function TrainingVideoCreate() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('TrainingVideo.CreateTitle')}`
          : `${translate('TrainingVideo.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('TrainingVideo.CreateTrainingVideo')}`
              : `${translate('TrainingVideo.UpdateTrainingVideo')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('TrainingVideo.TrainingVideo')}`,
              href: PATH_DASHBOARD.TrainingVideo.list,
            },
            {
              name: !isEdit
                ? `${translate('TrainingVideo.Create')}`
                : `${translate('TrainingVideo.Update')}`,
            },
          ]}
        />
        <TrainingVideoNewEditForm />
      </Container>
    </Page>
  );
}
