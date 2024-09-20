export interface Submenu {
    titulo: string;
    link: string;
    auth: string[];
}

export interface Menu {
    menu: string;
    auth: string[];
    submenus: Submenu[];
}

export const menus: Menu[] = [
    {
        menu: 'Users',
        auth: ['ADMIN'],
        submenus: [
            {
                titulo: "Users",
                link: '/users',
                auth: ['ADMIN']
            }
        ]
    },
    {
        menu: 'Groups',
        auth: ['ADMIN', 'BASIC'],
        submenus: [
            {
                titulo: "Groups",
                link: '/groups',
                auth: ['ADMIN', 'BASIC']
            },
        ]
    },
    {
        menu: 'Company',
        auth: [],
        submenus: [
            {
                titulo: "About",
                link: '/about',
                auth: []
            },
        ]
    },
]