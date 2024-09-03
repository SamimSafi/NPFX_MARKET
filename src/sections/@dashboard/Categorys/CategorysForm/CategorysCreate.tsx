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
import CategorysNewEditForm from './CategorysNewEditForm';

// ----------------------------------------------------------------------

export default function CategorysCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={!isEdit ? `${translate('Categorys.AddTitle')}` : `${translate('Categorys.UpdateTitle')}`}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('Categorys.CreateCategorys')}`
              : `${translate('Categorys.EditCategorys')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('Categorys.CategorysList')}`,
              href: PATH_DASHBOARD.Categorys.list,
            },
            {
              name: !isEdit ? `${translate('Categorys.New')}` : `${translate('Categorys.Update')}`,
            },
          ]}
        />
        <CategorysNewEditForm />
      </Container>
    </Page>
  );
}
