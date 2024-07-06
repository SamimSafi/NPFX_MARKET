import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem, Tooltip } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { observer } from 'mobx-react-lite';
//localization
import useLocales from 'src/hooks/useLocales';
//
import Label from '../../../../components/Label';
import { useStore } from 'src/stores/store';
import { stripHtmlTags, themeMode } from 'src/utils/general';
import { tableRowsColor } from 'src/@types/common';
import { COMMON_CONSTANT } from 'src/constantFile/CommonConstant';
import { DOCUMENT_TYPE_CONSTANT } from 'src/constantFile/DmtsConstant/DocumentTypeConstant';
import { DateConverter } from 'src/sections/common/DateConverter';
import { productList } from 'src/@types/foamCompanyTypes/productOrder';
// ----------------------------------------------------------------------

type Props = {
  row: productList;
  index: any;
};

export default observer(function ProductOrderTableRow({ row, index }: Props) {
  const language = window.localStorage.getItem('i18nextLng');
  const { translate } = useLocales();
  const { id, name, surName, totalAmount, paidAmount, remainAmount, createdOn } = row;
  const {
    LoginStore: { user },
  } = useStore();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {name}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {surName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {totalAmount}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {paidAmount}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {remainAmount}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {createdOn}
      </TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'error.main' }} icon={'eva:trash-2-fill'} />
                {translate('CRUD.Delete')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
    //</Tooltip>
  );
});
