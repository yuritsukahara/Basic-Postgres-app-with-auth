import React, { useEffect } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
//Atoms
import { useAtom } from 'jotai';
import { sidebarAtom } from '@/atoms';
import { menus } from "./menus";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";


export default function Menus() {
    const [, setState] = useAtom(sidebarAtom);
    const { userPermission } = useAuth()

    const [open, setOpen] = React.useState(menus.map(() => ({
        isOpen: false
    })));


    const handleClick = (index: number) => {
        setOpen(open.map((menu, i) => {
            if (i === index) {
                return { ...menu, isOpen: !menu.isOpen };
            }
            return menu;
        }));
    };

    const closeOthers = (index: number) => {
        setOpen(open.map((menu, i) => {
            if (i === index) {
                return { ...menu, isOpen: menu.isOpen };
            }
            return { ...menu, isOpen: false };
        }));
    };

    useEffect(() => {
        menus.forEach((menu, index) => {
            menu.submenus.forEach((submenu) => {
                if (location.pathname === submenu.link) {
                    setOpen(open.map((menu, i) => {
                        if (i === index) {
                            return { ...menu, isOpen: true };
                        }
                        return menu;
                    }));
                }
            });
        });
    }, [location.pathname]);

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Menu
                </ListSubheader>
            }
        >
            {menus.map((menu, index) => (userPermission(menu.auth) &&
                <React.Fragment key={index}>
                    <ListItemButton onClick={() => handleClick(index)}>
                        <ListItemText primary={menu.menu} />
                        {open[index].isOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open[index].isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {menu.submenus.map((submenu, subIndex) => (userPermission(submenu.auth) &&
                                <Link key={subIndex} to={submenu.link}
                                    onClick={() => {
                                        setState({ left: false });
                                        closeOthers(index)
                                    }}
                                >
                                    {({ isActive }) => {
                                        return (
                                            <ListItemButton selected={isActive} sx={{ pl: 4 }}>
                                                <ListItemText primary={submenu.titulo} />
                                            </ListItemButton>
                                        )
                                    }}
                                </Link>
                            ))}
                        </List>
                    </Collapse>
                </React.Fragment>
            ))}
        </List>
    );
}