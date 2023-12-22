import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from "next/link";
import { loginType } from "@/app/(DashboardLayout)/types/auth/auth";
import CustomCheckbox from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";

const AuthLogin = ({ title, subtitle, subtext, password, username, setPassword, setUserName, submit }: loginType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <AuthSocialButtons title="Entrar com" />

    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          ou faça login com
        </Typography>
      </Divider>
    </Box>

    <Stack>
      <Box>
        <CustomFormLabel htmlFor="username">Usuário</CustomFormLabel>
        <CustomTextField
          onChange={(e:any) => setUserName(e.target.value)}
          value={username}

          id="username"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box>
        <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
        <CustomTextField
          onChange={(e:any) => setPassword(e.target.value)}
          value={password}
          id="password"
          type="password"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<CustomCheckbox defaultChecked />}
            label="Lembre-me"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/auth/auth1/forgot-password"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Esqueceu sua senha ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={submit}
        type="submit"
      >
        Sign In
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
