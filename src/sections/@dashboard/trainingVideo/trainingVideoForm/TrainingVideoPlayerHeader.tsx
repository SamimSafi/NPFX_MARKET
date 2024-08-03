import { useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
//Localization
import React, { useEffect, useState } from 'react';
import useLocales from 'src/hooks/useLocales';
import { useStore } from 'src/stores/store';
import Loader from 'src/components/loader/Loader';
import TrainingVideoPlayer from './TrainingVideoPlayer';
// ----------------------------------------------------------------------

export default function TrainingVideoHeader() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const { TrainingVideoStore } = useStore();
  const [isloading, setIsloading] = useState(false);
  const { loadTrainingVideoList } = TrainingVideoStore;

  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');
  const [play, SetPlay] = useState(false);

  useEffect(() => {
    if (!play) SetPlay(true);
  }, [play]);

  useEffect(() => {
    setIsloading(true);
    loadTrainingVideoList({ pageIndex: 0, pageSize: 50 });

    setTimeout(() => {
      setIsloading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      title={
        !isEdit
          ? `${translate('TrainingVideo.PlayerTitle')}`
          : `${translate('TrainingVideo.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('TrainingVideo.VideoPlayer')}`
              : `${translate('TrainingVideo.UpdateNews')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('TrainingVideo.TrainingVideo')}`,
              href: PATH_DASHBOARD.TrainingVideo.list,
            },
            {
              name: !isEdit
                ? `${translate('TrainingVideo.VideoPlayer')}`
                : `${translate('TrainingVideo.Update')}`,
            },
          ]}
        />

        {isloading ? <Loader /> : <TrainingVideoPlayer />}
      </Container>
    </Page>
  );
}
