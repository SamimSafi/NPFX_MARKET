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
import CurrencyTypeNewEditForm from './CurrencyTypeNewEditForm';
import React from 'react';
// sections

// @type

// ----------------------------------------------------------------------

export default function CurrencyTypeCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { translate } = useLocales();
  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  return (
    <Page
      title={
        !isEdit
          ? `${translate('CurrencyType.AddTitle')}`
          : `${translate('CurrencyType.UpdateTitle')}`
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit
              ? `${translate('CurrencyType.CreateCurrencyType')}`
              : `${translate('CurrencyType.EditCurrencyType')}`
          }
          links={[
            { name: `${translate('Department.Dashboard')}`, href: PATH_DASHBOARD.root },
            {
              name: `${translate('CurrencyType.CurrencyTypeList')}`,
              href: PATH_DASHBOARD.ContractDetails.list,
            },
            {
              name: !isEdit
                ? `${translate('CurrencyType.New')}`
                : `${translate('CurrencyType.Update')}`,
            },
          ]}
        />
        <CurrencyTypeNewEditForm />
      </Container>
    </Page>
  );
}
