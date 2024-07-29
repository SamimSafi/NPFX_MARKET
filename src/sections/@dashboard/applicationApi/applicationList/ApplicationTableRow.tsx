import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem } from '@mui/material';
// @types
import { Application } from 'src/@types/application';
// components
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import useLocales from 'src/hooks/useLocales';
// ----------------------------------------------------------------------

type Props = {
  row: Application;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  index: any;
};

export default function ApplicationTableRow({ row, onEditRow, onDeleteRow, index }: Props) {
  const { translate } = useLocales();
  const { title, abbrevation, iconClass, area, description, defaultRoute } = row;

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
      <TableCell align="left">{title}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {abbrevation}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {iconClass}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {defaultRoute}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {area}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {description}
      </TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {/* <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                {translate('CRUD.Delete')}
              </MenuItem> */}

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
