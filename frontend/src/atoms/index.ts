import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils'


const userStorage: any = createJSONStorage(() => localStorage)
const tempStorage: any = createJSONStorage(() => sessionStorage)

const userAtom = atomWithStorage('user', {
    "token": "",
    "user": "",
    "groups": [] as string[],
    "authenticated": false,
    "exp": 0
}, userStorage);

const formAtom = atomWithStorage('form', {}, tempStorage);

const sidebarAtom = atom({
    left: false,
});


export { userAtom, sidebarAtom, formAtom }
