import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem } from '@mui/material';
// @types

// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import { IMainAsset } from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';
// ----------------------------------------------------------------------

type Props = {
  row: IMainAsset;
  // selected: boolean;
  onEditRow: VoidFunction;
  //onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDepositToUser: VoidFunction;
  index: any;
};

export default function MainAssetTableRow({
  row,
  onEditRow,
  onDeleteRow,
  onDepositToUser,
  index,
}: Props) {
  const { currencyType, ownerUserName, depositDate, balanceAmount } = row;
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
      <TableCell align="left">{currencyType}</TableCell>
      <TableCell align="left">{balanceAmount}</TableCell>
      <TableCell align="left">{depositDate}</TableCell>
      <TableCell align="left">{ownerUserName}</TableCell>

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
                  onDepositToUser();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'vaadin:money-deposit'} />
                {translate('CRUD.DepositToUser')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
