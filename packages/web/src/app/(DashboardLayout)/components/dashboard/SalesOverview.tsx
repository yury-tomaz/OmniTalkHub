import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { Box, FormControl, InputLabel, Stack } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const SalesOverview = () => {

    // select
    const [month, setMonth] = React.useState('1');

    const handleChange = (event: any) => {
        setMonth(event.target.value);
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart: any = [
        {
            name: 'Eanings this month',
            data: [355, 390, 300, 350, 390, 180, 355, 390],
        },
       
    ];

    return (
        <DashboardCard title="Estatisticas" action={
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="inicio" />
                    </LocalizationProvider>

                    <ArrowRightAltIcon />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField label="fim" />
                    </LocalizationProvider>
                </Box>
                <FormControl fullWidth sx={{maxWidth: '150px'}}>
                    <InputLabel id="demo-simple-select-label">Novos contatos</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={''}
                        label="Novos contatos"
                    >
                        <MenuItem value={'Novos contatos'}>Novos contatos</MenuItem>

                    </Select>
                </FormControl>


            </Stack>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={370}
                width={"100%"}
            />
        </DashboardCard>
    );
};

export default SalesOverview;
