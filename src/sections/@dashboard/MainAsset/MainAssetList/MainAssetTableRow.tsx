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
  onCreateLoan: VoidFunction;
  onCreateTrade: VoidFunction;
  onDepositCash: VoidFunction;
  onWithdrawCash: VoidFunction;
  index: any;
};

export default function MainAssetTableRow({
  row,
  onEditRow,
  onDeleteRow,
  onDepositToUser,
  onCreateLoan,
  onCreateTrade,
  onDepositCash,
  onWithdrawCash,
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
                <Iconify sx={{ color: 'success.main' }} icon={'mdi:bank-transfer'} />
                {translate('CRUD.DepositToUser')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onCreateLoan();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'mdi:cash-sync'} />
                {translate('CRUD.CreateLaon')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onCreateTrade();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'mdi:cash-plus'} />
                {translate('CRUD.TradeEntry')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDepositCash();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'mdi:cash-plus'} />
                {translate('CRUD.DepositCash')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onWithdrawCash();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'mdi:cash-minus'} />
                {translate('CRUD.WithDrawCash')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
