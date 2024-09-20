import { useState } from "react";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { signIn } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const res = await toast.promise(
                signIn(username, password),
                {
                    pending: 'Logando...',
                    success: 'Logado com sucesso!',
                    error: {
                        render({ data }) {
                            return `${data || 'Erro desconhecido'}`;
                        }
                    }, // This will be shown when the promise rejects
                }
            );

            localStorage.setItem('user', JSON.stringify(res));
            navigate({ to: '/' })

        } catch (error) {
            console.error(error);
        }

    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <>
            <form onSubmit={handleSubmit}
                className="flex flex-col gap-3 justify items-center ">
                <TextField className="w-[100%]"
                    onChange={(e) => setUsername(e.target.value)}
                    variant="outlined"
                    id="outlined-basic"
                    label="Usuário"
                    autoComplete="user"
                />
                <FormControl variant="outlined" className="w-[100%]">
                    <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Senha"
                        autoComplete="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                <div className="w-[100%]">
                    <Button className="w-[100%]" type="submit" variant="contained" >
                        Login
                    </Button>
                </div>
            </form >
        </>
    );
}
