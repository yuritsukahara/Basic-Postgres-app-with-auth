import React from 'react';
// Mui components
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

// icons
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton } from '@mui/material';

//Atoms
import { useAtom } from 'jotai';
import { sidebarAtom } from '@/atoms';

// Swipe Menu
type Anchor = 'left';

const iOS =
    typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function SwipeableTemporaryDrawer() {
    const [state, setState] = useAtom(sidebarAtom);



    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };


    return (
        <div>
            {(['left'] as const).map((anchor) => {
                return (
                    <React.Fragment key={anchor}>
                        <IconButton aria-label="menu" onClick={toggleDrawer(anchor, true)} ><MenuIcon className="text-white" /></IconButton>
                        <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS}
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                        >
                            <Box
                                sx={{ width: 250 }}
                                role="presentation"
                            // onClick={toggleDrawer(anchor, false)}
                            // onKeyDown={toggleDrawer(anchor, false)}

                            >
                            </Box>
                        </SwipeableDrawer>
                    </React.Fragment>
                );
            })}
        </div>
    );
}