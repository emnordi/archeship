import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Theme } from '@mui/material/styles';

import { BrowserView, MobileView } from 'react-device-detect';
import NavBarMobile from './NavBarMobile';
import NavBarDesktop from './NavBarDesktop';

interface Props {
  theme: Theme;
  colorMode: {
    toggleColorMode: () => void;
  };
}

const ResponsiveAppBar = ({ theme, colorMode }: Props): JSX.Element => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : '#CBC3E3',
      }}
    >
      <Container maxWidth="xl">
        <MobileView>
          <NavBarMobile theme={theme} colorMode={colorMode} />
        </MobileView>
        <BrowserView>
          <NavBarDesktop theme={theme} colorMode={colorMode} />
        </BrowserView>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
