import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  TableRow,
  TableCell,
  MenuItem,
  Button,
  Tooltip,
  IconButton,
  Collapse,
  Box,
  Table,
  TableBody,
  TableHead,
  Typography,
} from '@mui/material';
// @types
import { InternalDocument } from '../../../../@types/internalDocument';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { observer } from 'mobx-react-lite';
//localization
import useLocales from 'src/hooks/useLocales';
//
import Label from '../../../../components/Label';
import { DateConverter } from 'src/sections/common/DateConverter';
import { useStore } from 'src/stores/store';
import { stripHtmlTags, themeMode } from 'src/utils/general';
import { tableRowsColor } from 'src/@types/common';
import { COMMON_CONSTANT } from 'src/constantFile/CommonConstant';
import { DOCUMENT_TYPE_CONSTANT } from 'src/constantFile/DmtsConstant/DocumentTypeConstant';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// ----------------------------------------------------------------------

type Props = {
  row: InternalDocument;
  index: any;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onDetailRow: VoidFunction;
  onQuickForwardRow: VoidFunction;
  onUnForwardRow: VoidFunction;
  onForwardRow: VoidFunction;
  onRejectRow: VoidFunction;
  documentLink: VoidFunction;
  handleCcDeparment: VoidFunction;
  ViewDocument: VoidFunction;
  AddTahriratNumber: VoidFunction;
  sendDocument?: VoidFunction;
  receiveDocument?: VoidFunction;
  highlightColor?: tableRowsColor;
  send?: boolean;
  doubleClick: any;
  MarkAsRead?: VoidFunction;
  isRead: boolean;
};

export default observer(function InternalDocumentReceivedTableRow({
  row,
  index,
  onEditRow,
  onDeleteRow,
  onDetailRow,
  onQuickForwardRow,
  onUnForwardRow,
  onForwardRow,
  onRejectRow,
  documentLink,
  handleCcDeparment,
  ViewDocument,
  AddTahriratNumber,
  sendDocument,
  receiveDocument,
  highlightColor,
  send,
  doubleClick,
  isRead,
  MarkAsRead,
}: Props) {
  const theme = useTheme();
  const language = window.localStorage.getItem('i18nextLng');
  const { translate } = useLocales();
  const {
    // userId,
    internalDocumentId,
    //documentBookRecivedNumber,
    // documentRecievNumber,
    //documentNumber,
    trackingNumber,
    tahriratNumber,
    toDepartmentName,
    documentTypeName,
    fromDepartmentName,
    processStatusName,
    processStatusId,
    deadlineDays,
    documentLevelName,
    createdOn,
    documentTypeId,
    documentActionName,
    documentActionId,
    documentSubject,
    documentBody,
    createdBy,
    sentAsCC,
    documentCreatedBy,
    documentVerifyDate,
    departmentId,
    hasInOutRecord,
    documentCreatedByName,
  } = row;
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
    // <Tooltip
    //   title={
    //     <span>
    //       {translate('Validation.DoubleClick')}{' '}
    //       <span style={{ color: '#00bcd4', fontSize: '13px', fontWeight: 'bold' }}>
    //         {stripHtmlTags(documentBody)}
    //       </span>{' '}
    //       {translate('Validation.DocumentDetails')}{' '}
    //     </span>
    //   }
    //   placement="top"
    // >
    <TableRow
      hover
      sx={{
        backgroundColor:
          themeMode() === 'light'
            ? highlightColor?.lightGreen
            : highlightColor?.darkGreen || isRead
            ? ''
            : 'rgba(211, 211, 211, 0.2)',
        cursor: 'pointer',
      }}
      onClick={doubleClick}
    >
      <TableCell align="left">{index + 1}</TableCell>
      <Tooltip
        title={
          <span>
            {translate('Validation.DoubleClick')}{' '}
            <span style={{ color: '#00bcd4', fontSize: '13px', fontWeight: 'bold' }}>
              {documentSubject}
            </span>{' '}
            {translate('Validation.DocumentDetails')}{' '}
          </span>
        }
        placement="top"
        followCursor
      >
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {documentSubject.length <= 15
            ? stripHtmlTags(documentSubject)
            : `${stripHtmlTags(documentSubject.substring(0, 15))} ...`}
        </TableCell>
      </Tooltip>
      <Tooltip
        title={
          <span>
            {translate('Validation.DoubleClick')}{' '}
            <span style={{ color: '#00bcd4', fontSize: '13px', fontWeight: 'bold' }}>
              {stripHtmlTags(documentBody)}
            </span>{' '}
            {translate('Validation.DocumentDetails')}{' '}
          </span>
        }
        placement="top"
        followCursor
      >
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {stripHtmlTags(documentBody)} ...
        </TableCell>
      </Tooltip>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {fromDepartmentName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {documentLevelName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {documentTypeName}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {
          <Label
            variant="ghost"
            color={
              (processStatusId === COMMON_CONSTANT.COMPLETED && 'success') ||
              (processStatusId === COMMON_CONSTANT.APPROVE && 'info') ||
              (processStatusId === COMMON_CONSTANT.REJECT && 'error') ||
              (processStatusId === COMMON_CONSTANT.DRAFT && 'warning') ||
              (processStatusId === COMMON_CONSTANT.NOT_COMPLETED && 'warning') ||
              'primary'
            }
            sx={{ textTransform: 'capitalize' }}
          >
            {processStatusName == ''
              ? `${translate('InternalDocument.NoActionCC')}`
              : processStatusName}
          </Label>
        }
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        <DateConverter date={createdOn} />
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize', alignItems: 'center' }}>
        {documentCreatedByName}
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
                  MarkAsRead!();
                  handleCloseMenu();
                }}
              >
                {isRead === true ? (
                  <Iconify sx={{ color: 'warning.main' }} icon={'fluent:mail-unread-24-regular'} />
                ) : (
                  <Iconify sx={{ color: 'primary.main' }} icon={'fluent:mail-read-24-regular'} />
                )}

                {isRead == true
                  ? `${translate('CRUD.MarkAsUnread')}`
                  : `${translate('CRUD.MarkAsRead')}`}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onDetailRow();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'info.main' }} icon={'eva:clipboard-fill'} />
                {translate('CRUD.Detail')}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  ViewDocument();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'fa6-solid:file-pdf'} />
                {translate('CRUD.View')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  AddTahriratNumber();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'success.main' }} icon={'fluent:document-page-number-24-filled'} />
                {translate('CRUD.AddTahrirat')}
              </MenuItem>
              {hasInOutRecord === true ||
              documentTypeId === DOCUMENT_TYPE_CONSTANT.OFFER_LETTER ? (
                <>
                  <MenuItem
                    onClick={() => {
                      onUnForwardRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify sx={{ color: 'warning.main' }} icon={'eva:skip-forward-fill'} />
                    {translate('CRUD.UnForward')}
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      onForwardRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify sx={{ color: 'primary.main' }} icon={'eva:arrow-forward-fill'} />
                    {translate('CRUD.Forward')}
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      onRejectRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify sx={{ color: 'error.main' }} icon={'eva:close-fill'} />
                    {translate('CRUD.Reject')}
                  </MenuItem>
                </>
              )}

              <MenuItem
                sx={{
                  display:
                    documentTypeId === DOCUMENT_TYPE_CONSTANT.OFFER_LETTER ||
                    hasInOutRecord === true
                      ? 'none'
                      : '',
                }}
                onClick={() => {
                  receiveDocument!();
                  handleCloseMenu();
                }}
              >
                <Iconify sx={{ color: 'info.main' }} icon={'mdi:invoice-receive'} />
                {translate('CRUD.Receive')}
              </MenuItem>

              <MenuItem
                sx={{
                  display: hasInOutRecord === false ? 'none' : '',
                }}
                onClick={() => {
                  documentLink();
                }}
              >
                <Iconify sx={{ color: 'error.secondary' }} icon={'eva:link-fill'} />
                {translate('CRUD.DocumentLink')}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
    // </Tooltip>
  );
});
