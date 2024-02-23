import { ReactNode, useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 240, textAlign: 'center', marginTop: "64px" }}>
      <List>
        {[
          { title: 'Overview', path: 'dashboard' },
          { title: 'Rewards', path: 'rewards' },
          { title: 'Transaction History', path: 'transactions' },
          { title: "Sample Vendor [DEMO]", path: "vendor" },
        ].map(({ title, path }) => (
          <ListItem key={title} disablePadding>
            <ListItemButton component={Link} href={`/${path}`}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#301934', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Blockchain Credit Service [DEMO BUILD]
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawerContent}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: 8, // Adjust marginTop to account for AppBar height
        }}
      >
        <Toolbar /> {/* Ensures content is not hidden under the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
