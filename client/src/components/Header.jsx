import React from 'react'
import { AppBar, Toolbar, styled, InputBase, Box } from '@mui/material';
import { Menu as MenuIcone, Search, Tune, HelpOutlineOutlined, AccountCircleOutlined, SettingsOutlined, AppsOutlined } from "@mui/icons-material";
import { gmailLogo } from "../constants/Constants";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyledAppBar = styled(AppBar)({
    background: '#f5f5f5',
    boxShadow: 'none',
})

const SearchWrapper = styled(Box)({
    background: '#EAF1FB',
    marginLeft: 80,
    borderRadius: 8,
    minWidth: 690,
    maxWidth: 720,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div': {
        width: '100%',
        padding: '0 10px'
    }
});

const OptionsWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    '& > svg': {
        marginLeft: 20
    }
})

function Header({ toggleDrawer }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
      localStorage.removeItem("token")
      window.location.reload()
    };
    return (
        <StyledAppBar position='static'>
            <Toolbar>
                <MenuIcone color='action' onClick={toggleDrawer} />
                <img src={gmailLogo} alt="logo" style={{ width: 100, marginLeft: 15 }} />
                <SearchWrapper>
                    <Search color='action' />
                    <InputBase placeholder='Search mail' />
                    <Tune color='action' />
                </SearchWrapper>
                <OptionsWrapper>
                    <HelpOutlineOutlined color='action' />
                    <SettingsOutlined color='action' />
                    <AppsOutlined color='action' />
                    <AccountCircleOutlined color='action'
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header