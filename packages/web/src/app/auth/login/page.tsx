"use client";
import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// components
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import AuthLogin from '../authForms/AuthLogin';
import { useLogin } from "@/app/auth/login/use-login";

export default function Login2() {

const {operations, models} = useLogin();

  return (
    <PageContainer title="Login Page" description="this is Sample page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                submit={operations.login}
                username={models.user}
                password={models.password}
                setPassword={operations.updatePassword}
                setUserName={operations.updateUser}
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      Novo no Omni Talk?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/auth/auth2/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Crie a sua conta aqui
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

Login2.layout = "Blank";

