// @mui
import { styled } from '@mui/material/styles';
import {
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  Box,
  Avatar,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import Image from 'src/components/Image';
import { PATH_DASHBOARD } from 'src/routes/paths';
import cssStyles from 'src/utils/cssStyles';
// @types
import { useNavigate } from 'react-router';
import Label from 'src/components/Label';
import useLocales from '../../../../hooks/useLocales';
import { baseUrl } from 'src/api/baseUrl';
import { DateConverter } from 'src/sections/common/DateConverter';
import { IEmployeeDetails } from 'src/@types/foamCompanyTypes/Employee';

type Props = {
  row: IEmployeeDetails;
  clearEmployee: () => void;
};
const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 0.2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

export default function EmployeeDetailTableRow({ row, clearEmployee }: Props) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const language = window.localStorage.getItem('i18nextLng');
  const {
    bloodGroup,
    tazkiraNo,
    dateOfBirth,
    branch,
    emergencyPhoneNumber,
    englishFirstName,
    englishSurName,
    gender,
    joinDate,
    leaveDate,
    pashtoFirstName,
    pashtoSurName,
    permenantAddress,
    personalEmail,
    phoneNumber,
    photoPath,
    temporaryAddress,
  } = row;
  console.log(row);
  let Url = baseUrl;
  return (
    <>
      <Grid item xs={6} md={6}>
        <Stack direction="row" spacing={1.5} sx={{ mt: 1, ml: 0, mb: 2 }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            onClick={() => {
              navigate(PATH_DASHBOARD.Employee.list);
              clearEmployee();
            }}
          >
            {translate('CRUD.BackToList')}
          </Button>
        </Stack>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 2, px: 2 }}>
            <Card sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  alt={englishFirstName}
                  src={Url + photoPath}
                  sx={{
                    width: 90,
                    height: 90,
                    zIndex: 11,
                    left: 0,
                    right: 0,
                    bottom: -32,
                    mx: 'auto',
                    position: 'absolute',
                  }}
                />
                <OverlayStyle />
                <Image src={require('src/assets/images/dam.jpg')} alt="" ratio="16/9" />
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 6 }}>
                {language === 'en'
                  ? englishFirstName + ' ' + englishSurName
                  : pashtoFirstName + ' ' + pashtoSurName}
              </Typography>

              <Stack alignItems="center">
                <Typography variant="body2" sx={{ color: 'text.secondary', my: 2.5 }}>
                  {bloodGroup}
                </Typography>
              </Stack>
            </Card>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <Card sx={{ minWidth: 275, borderRadius: '15px 15px 0px 0px' }}>
              <Typography
                variant="h5"
                sx={{ fontSize: 14, textAlign: 'left', mb: 2, mt: 2, ml: 3, color: 'warning.main' }}
                color="text.secondary"
                gutterBottom
              >
                <Label
                  variant="ghost"
                  sx={{ textTransform: 'capitalize', fontSize: 17, p: 2 }}
                  color="warning"
                >
                  {translate('Employee.EmployeeGeneralInfo')}
                </Label>
              </Typography>
            </Card>
            <Box sx={{ mt: 2 }}>
              <Stack>
                <Stack spacing={2} sx={{ p: 3, mt: 1.5 }}>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 0.75,
                        color: 'text.disabled',
                        fontSize: '16px',
                        fontWeight: 'bold',
                      }}
                    >
                      {translate('Employee.dateOfBirth')} :{' '}
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: '16px' }}>
                      {<DateConverter date={dateOfBirth} />}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, color: 'text.disabled', fontSize: '16px' }}
                    >
                      {translate('Employee.personalEmail')}:
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: '16px' }}>
                      {personalEmail}
                    </Typography>
                  </Stack>

                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, color: 'text.disabled', fontSize: '16px' }}
                    >
                      {translate('Employee.PhoneNumber')}:
                    </Typography>{' '}
                    &nbsp;
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, fontSize: '16px' }}
                      dir={language === 'en' ? 'ltr' : 'ltr'}
                    >
                      {' '}
                      {phoneNumber}
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 0.75, color: 'text.disabled', fontSize: '16px' }}
                    >
                      {translate('Employee.cnic')}:
                    </Typography>{' '}
                    &nbsp;
                    <Typography variant="subtitle1" sx={{ mb: 0.75, fontSize: '16px' }}>
                      {tazkiraNo}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
        {/* sx={{ mt: 2, mr: 2, ml: 2, mb: 2 }} */}

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: '100%' }} size="small" aria-label="a dense table">
                {/* <caption>A basic table example with a caption</caption> */}
                <TableBody>
                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.Branch')}
                    </TableCell>
                    <TableCell align="left">{branch.name}</TableCell>

                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.BloodGroup')}
                    </TableCell>
                    <TableCell align="left">{bloodGroup}</TableCell>
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.temporaryAddress')}
                    </TableCell>
                    <TableCell align="left">{temporaryAddress}</TableCell>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.permanentAddress')}
                    </TableCell>
                    <TableCell align="left">{permenantAddress}</TableCell>
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.Gender')}
                    </TableCell>
                    <TableCell align="left">{gender}</TableCell>
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.JoinDate')}
                    </TableCell>
                    <TableCell align="left">{<DateConverter date={joinDate} />}</TableCell>
                    {leaveDate != null && (
                      <>
                        <TableCell
                          align="left"
                          sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                        >
                          {translate('Employee.leaveDate')}
                        </TableCell>
                        <TableCell align="left">{<DateConverter date={leaveDate} />}</TableCell>
                      </>
                    )}
                  </TableRow>

                  <TableRow sx={{ borderBottom: '1px solid rgba(60,60,60,.9)' }}>
                    <TableCell
                      align="left"
                      sx={{ fontWeight: 'bold', color: 'info.main', fontSize: '16px' }}
                    >
                      {translate('Employee.emergencyPhoneNumber')}
                    </TableCell>
                    <TableCell align="left" dir={language === 'en' ? 'ltr' : 'ltr'}>
                      {emergencyPhoneNumber}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
