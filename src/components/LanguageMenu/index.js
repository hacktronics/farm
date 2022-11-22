import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export default function LanguageMenu({anchorEl, onClose, onLanguageChange}) {
  return (
    <Menu
      anchorEl={anchorEl}
      id="language-menu"
      open={Boolean(anchorEl)}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 0.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: 0,
            mr: 0,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 78,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <MenuItem>
        <Button startIcon={<img src="/images/flags/us.svg" alt="english" width="24px"/>} onClick={e => onLanguageChange('en')}>
          English
        </Button>
      </MenuItem>
      <MenuItem>
        <Button startIcon={<img src="/images/flags/in.svg" alt="hindi" width="24px"/>} onClick={e => onLanguageChange('hi')}>
          Hindi
        </Button>
      </MenuItem>
      <MenuItem>
        <Button startIcon={<img src="/images/flags/de.svg" alt="german" width="24px"/>} onClick={e => onLanguageChange('de')}>
          German
        </Button>
      </MenuItem>
      <MenuItem>
        <Button startIcon={<img src="/images/flags/br.svg" alt="portuguese" width="24px"/>} onClick={e => onLanguageChange('pt')}>
          Portuguese
        </Button>
      </MenuItem>
      <MenuItem>
        <Button startIcon={<img src="/images/flags/es.svg" alt="spanish" width="24px"/>} onClick={e => onLanguageChange('es')}>
          Spanish
        </Button>
      </MenuItem>
      <MenuItem>
        <Button startIcon={<img src="/images/flags/fr.svg" alt="french" width="24px"/>} onClick={e => onLanguageChange('fr')}>
          French
        </Button>
      </MenuItem>
    </Menu>
  );
}
