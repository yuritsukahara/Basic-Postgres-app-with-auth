import { userAtom } from "@/atoms";
import { useAtom } from "jotai";
import { RESET } from 'jotai/utils'

type User = {
    "token": string,
    "user": string,
    "groups": string[],
    "authenticated": boolean,
    "exp": number
}

export const useAuth = () => {
    const userString = localStorage.getItem("user");
    const [, setUser] = useAtom(userAtom)
    const isLogged = () => {
        if (!userString) return false

        const user: User = JSON.parse(userString);

        return user.authenticated
    }

    const signOut = () => {
        localStorage.removeItem("user");
        setUser(RESET)
    };

    return { isLogged, signOut };
}

export type AuthContext = ReturnType<typeof useAuth>