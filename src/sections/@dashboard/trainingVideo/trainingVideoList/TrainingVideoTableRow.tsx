import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem, Tooltip } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { observer } from 'mobx-react-lite';
import useLocales from 'src/hooks/useLocales';
import PermissionBasedGuard from 'src/guards/PermissionBasedGuard';
import { stripHtmlTags } from 'src/utils/general';
import { TrainingVideo } from 'src/@types/foamCompanyTypes/systemTypes/trainingVideo';

// ----------------------------------------------------------------------

type Props = {
  row: TrainingVideo;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  // onDetailRow: VoidFunction;
  // onAddAttachment: VoidFunction;
  index: any;
};

export default observer(function TrainingVideoTableRow({
  row,
  onEditRow,
  onDeleteRow,
  // onDetailRow,
  // onAddAttachment,
  index,
}: Props) {
  const { dariTitle, pashtoTitle, application } = row;
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { translate } = useLocales();
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>{index + 1}</TableCell>
      <Tooltip title={dariTitle} placement="top" followCursor>
        <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
          {dariTitle.length <= 22
            ? stripHtmlTags(dariTitle)
            : `${stripHtmlTags(dariTitle.substring(0, 22))} ...`}
        </TableCell>
      </Tooltip>
      <Tooltip title={pashtoTitle} placement="top" followCursor>
        <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
          {pashtoTitle.length <= 22
            ? stripHtmlTags(pashtoTitle)
            : `${stripHtmlTags(pashtoTitle.substring(0, 22))} ...`}
        </TableCell>
      </Tooltip>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {application}
      </TableCell>
      {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {attachment}
      </TableCell> */}
      {/* <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {attachment}
      </TableCell> */}

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <PermissionBasedGuard permissions={['TrainingVideo-Delete']}>
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
              </PermissionBasedGuard>

              <PermissionBasedGuard permissions={['News-Update']}>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify sx={{ color: 'warning.main' }} icon={'eva:edit-fill'} />
                  {translate('CRUD.Update')}
                </MenuItem>
              </PermissionBasedGuard>

              {/* <PermissionBasedGuard permissions={['ArchiveInfo-GetDetail']}>
                <MenuItem
                  onClick={() => {
                    onDetailRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify sx={{ color: 'info.main' }} icon={'eva:clipboard-outline'} />
                  {translate('CRUD.Detail')}
                </MenuItem>
              </PermissionBasedGuard>

              <PermissionBasedGuard permissions={['AttachmentFile-Create']}>
                <MenuItem
                  onClick={() => {
                    onAddAttachment();
                    handleCloseMenu();
                  }}
                >
                  <Iconify sx={{ color: 'primary.main' }} icon={'mingcute:attachment-line'} />
                  {translate('CRUD.AddAttchment')}
                </MenuItem>
              </PermissionBasedGuard> */}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
});
