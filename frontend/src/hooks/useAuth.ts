import { api } from "@/lib/api";
import { Payload } from "@server/sharedTypes";


export const useAuth = () => {

    const isLogged = async () => {

        const userInfo = await api.me.$get();

        return userInfo.ok
    }

    const user = () => {
        const userString = localStorage.getItem('user');

        if (!userString) return {
            user: 'string',
            groups: [],
            authenticated: false,
            exp: 0,
        }

        const userObject = JSON.parse(userString);

        return userObject as Payload
    }

    const userPermission = (permissions: string[]): boolean => {
        const currentUser = user();

        if (permissions.length === 0) {
            return true
        }

        return permissions.some(permission => currentUser.groups.includes(permission));
    };

    async function signIn(user: string, password: string) {
        const res = await api.getToken.$post({ json: { user, password } });

        if (res.status === 500) {
            throw Error('Server error')
        }


        const data = await res.json()


        if (!res.ok && 'error' in data) throw Error(data.error)

        return data
    }

    const signOut = () => {
        localStorage.removeItem("user");
    };

    return { isLogged, signOut, signIn, user, userPermission };
}

export type AuthContext = ReturnType<typeof useAuth>