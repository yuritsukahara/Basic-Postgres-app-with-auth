import { api } from "@/lib/api";


export const useAuth = () => {

    const isLogged = async () => {
        const userString = localStorage.getItem('user');

        if (!userString) return false

        const userObject = JSON.parse(userString);

        const userInfo = await api.me.$get({}, {
            headers: {
                Authorization: `Bearer ${userObject.token}`,
            },
        });

        return userInfo.ok
    }

    async function signIn(user: string, password: string) {
        const res = await api.getToken.$post({ json: { user, password } });
        const data = await res.json()

        if (!res.ok && 'error' in data) throw Error(data.error)

        return data
    }

    const signOut = () => {
        localStorage.removeItem("user");
    };

    return { isLogged, signOut, signIn };
}

export type AuthContext = ReturnType<typeof useAuth>