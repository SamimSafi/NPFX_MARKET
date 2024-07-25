import { format } from 'date-fns';
import { IconifyIcon } from '@iconify/react';
// @mui
import {
  Box,
  Card,
  Table,
  Avatar,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableHeadCustom } from '../../../../components/table';
import { IGetMainAssetTracking } from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: IGetMainAssetTracking[];
  tableLabels: any;
}

export default function MainAssetTracking({
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BankingRecentTransitionsRow key={row.currencyTypeId} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type BankingRecentTransitionsRowProps = {
  row: IGetMainAssetTracking;
};

function BankingRecentTransitionsRow({ row }: BankingRecentTransitionsRowProps) {
  // const theme = useTheme();

  // const isLight = theme.palette.mode === 'light';

  // const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  // const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setOpenMenuActions(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpenMenuActions(null);
  // };

  // const handleDownload = () => {
  //   handleCloseMenu();
  //   console.log('DOWNLOAD', row.currencyTypeId);
  // };

  // const handlePrint = () => {
  //   handleCloseMenu();
  //   console.log('PRINT', row.currencyTypeId);
  // };

  // const handleShare = () => {
  //   handleCloseMenu();
  //   console.log('SHARE', row.currencyTypeId);
  // };

  // const handleDelete = () => {
  //   handleCloseMenu();
  //   console.log('DELETE', row.currencyTypeId);
  // };

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">{row.userName}</Typography>
            {/* <Typography variant="subtitle2"> {row.description}</Typography> */}
          </Box>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2">
          {format(new Date(row.transactionDate), 'dd MMM yyyy')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {format(new Date(row.transactionDate), 'p')}
        </Typography>
      </TableCell>

      <TableCell>{fCurrency(row.debitAmount)}</TableCell>

      <TableCell>{fCurrency(row.creditAmount)}</TableCell>
      <TableCell>{fCurrency(row.balanceAmount)}</TableCell>
      <TableCell>{fCurrency(row.description)}</TableCell>

      {/* <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem onClick={handleDownload}>
                <Iconify icon={'eva:download-fill'} />
                Download
              </MenuItem>

              <MenuItem onClick={handlePrint}>
                <Iconify icon={'eva:printer-fill'} />
                Print
              </MenuItem>

              <MenuItem onClick={handleShare}>
                <Iconify icon={'eva:share-fill'} />
                Share
              </MenuItem>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell> */}
    </TableRow>
  );
}

// ----------------------------------------------------------------------

type AvatarIconProps = {
  icon: IconifyIcon | string;
};

function AvatarIcon({ icon }: AvatarIconProps) {
  return (
    <Avatar
      sx={{
        width: 48,
        height: 48,
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Iconify icon={icon} width={24} height={24} />
    </Avatar>
  );
}

// ----------------------------------------------------------------------

function renderAvatar(category: string, avatar: string | null) {
  if (category === 'Books') {
    return <AvatarIcon icon={'eva:book-fill'} />;
  }
  if (category === 'Beauty & Health') {
    return <AvatarIcon icon={'eva:heart-fill'} />;
  }
  return avatar ? (
    <Avatar
      alt={category}
      src={avatar}
      sx={{ width: 48, height: 48, boxShadow: (theme) => theme.customShadows.z8 }}
    />
  ) : null;
}
