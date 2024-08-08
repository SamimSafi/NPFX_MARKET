import React from 'react';
import { Box, Card, Stack, Avatar, Typography, CardHeader, CardProps } from '@mui/material';
import { DashboardOfBranchsMainAsset } from 'src/@types/foamCompanyTypes/systemTypes/npfxDashboard';



// Define the Props interface
interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: DashboardOfBranchsMainAsset[] | undefined;
}

// Your updated component
export default function MemberBalance({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        {list!.map((contact) => (
          <Stack direction="row" alignItems="center" key={contact.id}>
            <Avatar src={contact.ownerPhotoPath} sx={{ width: 48, height: 48 }} />

            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }} noWrap>
                {contact.ownerUserName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                {contact.assetType}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              ${contact.balanceAmount!.toFixed(2)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
