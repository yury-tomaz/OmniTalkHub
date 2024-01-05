"use client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from '@mui/material/styles';

function WhatsappPage() {
  const [qrCode, setQrCode] = useState("data:image/png;base64,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");

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;
  const info = theme.palette.info.main;
  const text = theme.palette.text.primary;
  const contrast = theme.palette.primary.dark;

  return (
    <Box height={' calc(100vh - 130px) '} display="flex" justifyContent="space-between" alignItems="flex-start">
      <Box style={{
        flex: '1',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem'
      }}>

        <Typography variant="h1" style={{
          color: primary,
          fontWeight: 'bold',
          fontSize: '3rem',
          marginBottom: '1rem'
        }} gutterBottom>
          Entre com sua conta do Whatsapp
        </Typography>

        <Typography variant="body1" style={{
          color: primary,
          fontSize: '1.5rem',
          marginBottom: '2rem',
          opacity: 0.8
        }} gutterBottom>
          Para continuar, scanneie o QR Code com seu celular
        </Typography>

        {/* lista de beneficios */}

        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Box display="flex" alignItems="center" mb={2}>
            <CheckIcon style={{ color: text }} />
            <Typography variant="body1" style={{
              color: text,
              fontSize: '1.5rem',
              marginLeft: '1rem'
            }} gutterBottom>
              Receba notificações de novos pedidos
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <CheckIcon style={{ color: text }} />
            <Typography variant="body1" style={{
              color: text,
              fontSize: '1.5rem',
              marginLeft: '1rem'
            }} gutterBottom>
              Responda seus clientes de forma rápida
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <CheckIcon style={{ color: text }} />
            <Typography variant="body1" style={{
              color: text,
              fontSize: '1.5rem',
              marginLeft: '1rem'
            }} gutterBottom>
              Gerencie seus pedidos de forma simples
            </Typography>
          </Box>

        </Box>


      </Box>
      <Paper
        elevation={20}
        style={{
          backgroundColor: primary,
          width: "30%", height: '100%',
          padding: '3rem',
          borderRadius: '20px',
        }}

      >
        <Box style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '1.5rem',

        }}>

          <img style={{ flex: 1, borderRadius: '16px', maxWidth: '250px' }} src={qrCode} />
        </Box>

        <Box
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '1.5rem',
          }}
        >
          <FormGroup style={{ width: '100%' }}>
            <FormControlLabel
              style={{ color: '#fff' }}
              control={
                <Switch

                  color="warning"

                />}
              label="webhook" />

            <TextField
              disabled={false}
              id="outlined-basic"
              fullWidth
              label="Webhook"
              variant="outlined"
              style={{ width: '100%', marginTop: '1rem' }}
              color="warning"
              InputLabelProps={{
                style: { color: '#fff' },
              }}

            />

          </FormGroup>

        </Box>

        <Button variant="contained" style={{
          backgroundColor: '#25D366',
          color: '#fff',
          width: '100%',
          height: '3rem',
          marginTop: '1.5rem',
          borderRadius: '16px',
          fontWeight: 'bold'
        }} startIcon={<WhatsAppIcon />} >
          Entrar com o Whatsapp
        </Button>

      </Paper>

    </Box>

  );
}


export default WhatsappPage;