import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Theme } from '@mui/material/styles';
import { Drawer, Link } from '@mui/material';

interface Props {
  theme: Theme;
  colorMode: {
    toggleColorMode: () => void;
  };
}

const NavBarMobile = ({ theme, colorMode }: Props): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  return (
    <Toolbar disableGutters>
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setOpen(true)}
          color="inherit"
        >
          <MenuIcon sx={{ transform: 'scale(1.8)' }} />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            fontFamily: 'Formula1Bold',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            padding: '1rem',
            fontSize: '2rem',
            flexGrow: 1,
            textAlign: 'center',
          }}
        >
          enordin
        </Typography>
      </Box>
    </Toolbar>
  );
};
export default NavBarMobile;
