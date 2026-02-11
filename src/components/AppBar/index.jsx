import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Pagination from '@mui/material/Pagination';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import TranslateIcon from '@mui/icons-material/Translate';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LanguageMenu from '../LanguageMenu';
import AccountMenu from '../AccountMenu';
import { useTranslation } from 'react-i18next';

export default function HeaderAppBar({programMode, setProgramMode, gameLevel, onGameLevelChange, onLanguageChange}) {
  const { t } = useTranslation();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [volumeMute, setVolumeMute] = useState(false);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProgramModeChange = (event, newProgramMode) => {
    setProgramMode(newProgramMode);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleAccountMenuClose = () => {
    setProfileAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'transparent'}}>
        <Toolbar>
          <img src="/images/logo.png" alt="logo" height={32}/>
          <Box sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup color="primary" exclusive value={programMode} onChange={handleProgramModeChange} sx={{color: "#FFF"}}>
            <ToggleButton value="blocks" sx={{color: "#2e7d32"}}>{t("Blocks")}</ToggleButton>
            <ToggleButton value="python" sx={{color: "#2e7d32"}}>{t("Python")}</ToggleButton>
            <ToggleButton value="javascript" sx={{color: "#2e7d32"}}>{t("JavaScript")}</ToggleButton>
          </ToggleButtonGroup>
          <Box sx={{ flexGrow: 1 }} />
          <Pagination color="primary" page={gameLevel} onChange={onGameLevelChange} count={10}/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{mr:'6rem', ml: "4rem", display:"inline-flex", alignItems:"center"}}>
              <IconButton size="large" aria-label="stars" color="inherit">
                <img src="/images/gold_star.svg" alt="star" width="36px"/>
              </IconButton>
              <Box sx={{fontSize:"2rem", fontWeight:700, fontFamily: "'Caveat', cursive"}}>0 / 100</Box>
            </Box>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{my:"auto"}} onClick={handleLanguageMenuOpen}>
              <TranslateIcon />
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={e => setVolumeMute(!volumeMute)}>
              {volumeMute ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <IconButton
              size="large"
              aria-label="toggle full screen mode"
              color="inherit"
              sx={{my:"auto"}}
              onClick={toggleFullScreen}
            >
              <FullscreenIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{my:"auto"}}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <LanguageMenu anchorEl={languageAnchorEl} onClose={handleLanguageMenuClose} onLanguageChange={onLanguageChange}/>
      <AccountMenu anchorEl={profileAnchorEl} onClose={handleAccountMenuClose} />
      {renderMobileMenu}
    </Box>
  );
}