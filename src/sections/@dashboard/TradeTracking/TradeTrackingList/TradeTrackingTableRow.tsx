import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem } from '@mui/material';
// @types

// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useLocales from 'src/hooks/useLocales';
import { ITradeTracking } from 'src/@types/foamCompanyTypes/systemTypes/TradeTracking';
import { DateConverter } from 'src/sections/common/DateConverter';
// ----------------------------------------------------------------------

type Props = {
  row: ITradeTracking;
  // selected: boolean;
  onEditRow: VoidFunction;
  //onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: any;
};

export default function TradeTrackingTableRow({ row, onEditRow, onDeleteRow, index }: Props) {
  const {
    currencyType,
    date,
    description,
    userName,
    branch,
    tradeAmount,
    profitAmount,
    lossAmount,
  } = row;
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
      <TableCell align="left">{branch}</TableCell>
      <TableCell align="left">
        {' '}
        {date !== undefined ? <DateConverter date={date} /> : <></>}
      </TableCell>
      <TableCell align="left">{description}</TableCell>
      <TableCell align="left">{userName}</TableCell>
      <TableCell align="left">{tradeAmount}</TableCell>
      <TableCell align="left">{profitAmount}</TableCell>
      <TableCell align="left">{lossAmount}</TableCell>

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
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
