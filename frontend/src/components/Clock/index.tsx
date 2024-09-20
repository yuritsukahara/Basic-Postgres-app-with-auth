import { useState } from "react";
import "./style.css";
import { Box, Typography } from "@mui/material";
import LoadingIndicator from "../LoadingIndicator";
// relogio home

const Clock = () => {
    const [timeUpdater, setTimeUpdater] = useState({ "time": '', "dia_semana": '', "verbose_date": '' });
    const [loading, setLoading] = useState(true)

    function getTime() {
        const date = new Date();
        let h: any = date.getHours(); // 0 - 23
        let m: any = date.getMinutes(); // 0 - 59
        let s: any = date.getSeconds(); // 0 - 59

        const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        const dia_semana = dias[date.getDay()];
        const dia = date.getDate();
        const mes = meses[date.getMonth()];
        const year = date.getFullYear();

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        const verbose_date = dia + " de " + mes + " de " + year;
        const time = h + ":" + m + ":" + s;

        setTimeUpdater({ "time": time, "dia_semana": dia_semana, "verbose_date": verbose_date })
        setLoading(false)
    }

    setInterval(() => getTime(), 1000)

    return (
        <Box className="col w-100" >
            <Box id="ClockDisplay" className="rounded-xl clock row align-items-center p-16 " sx={{ boxShadow: 1 }}>
                {loading ? <LoadingIndicator /> : ''}
                <Typography variant='h5' className="clock-wide text-center">{timeUpdater.dia_semana}</Typography>
                <Typography variant='h5' className="clock-wide text-center ">{timeUpdater.verbose_date}</Typography>
                <Typography variant='h4' className="clock-wider text-center orbitron">{timeUpdater.time}</Typography>
            </Box>
        </Box >
    )
}
export default Clock
