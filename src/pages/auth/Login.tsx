import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

//localization
import useLocales from 'src/hooks/useLocales';

import LanguagePopover from 'src/layouts/dashboard/header/LanguagePopover';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'end',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'end',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  //maxWidth: 464,
  maxWidth: 500,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  // maxWidth: 480,
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const GlassCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(5),
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 50px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px', // Add curved corners
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { translate } = useLocales();
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Stack direction="row" alignItems={'center'}>
            <LanguagePopover />
            <Typography>Change Language</Typography>
          </Stack>
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Typography variant="h3">{translate('login.WelcomeBack')}</Typography>
            </Stack>

            <Image
              visibleByDefault
              disabledEffect
              src={require('src/assets/images/npfxlogin.png')}
              alt="login"
              width="100"
              height="100"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <GlassCard>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ mb: 4 }}
              >
                <img src={require('src/assets/images/npfx logo.png')} alt="logo" height="100" />
              </Stack>

              <Alert severity="info" sx={{ mb: 3, textAlign: 'center' }}>
                <Typography variant="h6">{translate('login.SignInToMinistry')}</Typography>
              </Alert>

              <LoginForm />

              {/* <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  Get started
                </Link>
              </Typography> */}
            </GlassCard>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
