import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Theme } from '@mui/material/styles';

interface Props {
  theme: Theme;
  colorMode: {
    toggleColorMode: () => void;
  };
}

const NavBarDesktop = ({ theme, colorMode }: Props): JSX.Element => {
  const pathName = window.location.pathname;

  return (
    <Toolbar disableGutters>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: 'flex',
          fontFamily: 'Formula1Bold',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          padding: '1rem',
        }}
      >
        ArcheShip
      </Typography>
      <Box
        sx={{
          display: 'flex',
          width: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.primary',
          borderRadius: 1,
        }}
      >
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Toolbar>
  );
};
export default NavBarDesktop;
