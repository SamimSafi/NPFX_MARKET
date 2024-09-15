import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem } from '@mui/material';
// @types

// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import { IPropertyType } from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
// ----------------------------------------------------------------------

type Props = {
  row: IPropertyType;
  // selected: boolean;
  onEditRow: VoidFunction;
  //onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDetailsRow: VoidFunction;
  handleAssignProperty: VoidFunction;
  handlePaymentProperty: VoidFunction;
  index: any;
};

export default function PropertyTableRow({
  row,
  onEditRow,
  onDeleteRow,
  onDetailsRow,
  handleAssignProperty,
  handlePaymentProperty,
  index,
}: Props) {
  const { name, model, details, price, category } = row;
  const { translate } = useLocales();
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{model}</TableCell>
      <TableCell align="left">{details}</TableCell>
      <TableCell align="left">{price}</TableCell>
      {/* <TableCell align="left">
        <DateConverter date={depositDate} />
      </TableCell> */}
      <TableCell align="left">{category}</TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                {translate('CRUD.Delete')}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'warning.main' }} icon={'eva:edit-fill'} />
                {translate('CRUD.Update')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDetailsRow();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'eva:clipboard-outline'} />
                {translate('CRUD.Detail')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleAssignProperty();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'eva:clipboard-outline'} />
                {translate('CRUD.Assign')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handlePaymentProperty();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'eva:clipboard-outline'} />
                {translate('CRUD.Payment')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
