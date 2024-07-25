// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Avatar,
  Tooltip,
  CardProps,
  Typography,
  CardHeader,
  IconButton,
} from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { IMainAssetChild } from 'src/@types/foamCompanyTypes/systemTypes/MainAsset';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: IMainAssetChild[];
}

export default function MainAssetContacts({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        // subheader={subheader}
        // action={
        //   <Tooltip title="Add Contact">
        //     <IconButton color="primary" size="large">
        //       <Iconify icon={'eva:plus-fill'} width={20} height={20} />
        //     </IconButton>
        //   </Tooltip>
        // }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {list.map((contact) => (
          <Stack direction="row" alignItems="center" key={contact.id}>
            <Avatar src={contact.ownerPhotoPath} sx={{ width: 48, height: 48 }} />

            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {contact.ownerUserName}
              </Typography>

              {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contact.balanceAmount}
              </Typography> */}
            </Box>
            <Box>
              {/* <Typography variant="body2" noWrap>
                Earn */}
              <Typography variant="body2" sx={{ color: 'success.main' }}>
                2000$
              </Typography>
              {/* </Typography> */}
            </Box>
            {/* <IconButton size="small" color="success">
              <Iconify icon={'eva:bar-chart-2-outline'} width={22} height={22} />
            </IconButton> */}
          </Stack>
        ))}

        {/* <Button variant="outlined" size="large" color="inherit">
          View All
        </Button> */}
      </Stack>
    </Card>
  );
}
