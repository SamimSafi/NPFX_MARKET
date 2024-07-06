import { useFieldArray, useFormContext } from 'react-hook-form';
// @mui
import { Stack, Button, Typography, Divider } from '@mui/material';
// components
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import { Box } from '@mui/material';
import Iconify from '../../../../components/Iconify';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useStore } from 'src/stores/store';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default observer(function InternalDocCcDepartment() {
  const { translate } = useLocales();
  const { commonDropdown } = useStore();
  const { ContractTypeOption, loadContractTypeDDL } = commonDropdown;
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cCDepartment',
  });

  const values = watch();

  const handleAdd = () => {
    append({
      cCDepartment: '',
    });
  };
  const handleRemove = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    loadContractTypeDDL();
  }, []);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
          {translate('CRUD.CCDep')}
        </Typography>
        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          {fields.map((item, index) => {
            return (
              <Stack key={item.id} alignItems="flex-end" spacing={2}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                  <RHFSelect
                    name={`cCDepartment[${index}].CcDepartmentIds`}
                    label={translate('InternalDocument.CCDepName')}
                    sx={{ maxWidth: { md: 450 } }}
                  >
                    <option value="" />
                    {ContractTypeOption.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.text}
                      </option>
                    ))}
                  </RHFSelect>

                  <RHFTextField
                    name={`cCDepartment[${index}].CcComments`}
                    label={translate('InternalDocument.CCComments')}
                    sx={{ maxWidth: { md: 450 } }}
                  />

                  <Button
                    size="small"
                    color="error"
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                    onClick={() => handleRemove(index)}
                  />
                </Stack>
              </Stack>
            );
          })}
        </Stack>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAdd}
            sx={{ flexShrink: 0 }}
          >
            {translate('CRUD.AddNewCC')}
          </Button>
        </Stack>
      </Box>
    </>
  );
});
