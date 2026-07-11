import React, { useState } from "react";
import {
  Box, Paper, Tabs, Tab, Drawer,
  List, ListItemButton, ListItemText, Typography,
  useTheme, useMediaQuery, IconButton, AppBar, Toolbar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import Dashboard from "../pages/Dashboard";
import ServiceProvider from "../pages/Serviceprovider";
import Bus from "../pages/Bus/Bus";
import Driver from "../pages/Driver/Driver";
import Conductor from "../pages/Conductor/Conductor";
import Bustrip from "../pages/Bus/Bustrip";
import Busroute from "../pages/Bus/Busroute";
import BusStop from "../pages/Bus/BusStop";
// import Class from "../pages/Student/Class";
// import Division from "../pages/Division";
// import Medium from "../pages/Student/Medium";
// import AcademicYear from "../pages/Student/AcademicYear";
// import StudentFee from "../pages/Student/StudentFee";
// import StudentSignUp from "../pages/Student/StudentSignUp";
// import SignIn from "../pages/SignIn";
// import DriverSignUp from "../pages/Driver/DriverSignUp";
// import ConductorSignUp from "../pages/Conductor/ConductorSignUp";
// import BusLocation from "../pages/Bus/BusLocation";
// import BusDetail from "../pages/Bus/BusDetail";
// import RouteDetail from "../pages/bus/RouteDetail";
import RouteStop from "../pages/Bus/RouteStop";

//--------Icons-------
import DashboardIcon from '@mui/icons-material/Dashboard';

import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaymentIcon from "@mui/icons-material/Payment";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import PersonIcon from "@mui/icons-material/Person";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ClassIcon from '@mui/icons-material/Class';
import GroupsIcon from "@mui/icons-material/Groups";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


const drawerWidth = 180;
const miniWidth = 70;
const fullWidth = 220;
const FORM_GAP = 20;

export default function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [tab, setTab] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [settingsPage, setSettingsPage] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleTab = (e, val) => {
    setTab(val);
    setSettingsOpen(val === 6);
    setSettingsPage("");
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const openSettingsPage = (page) => {
    setSettingsPage(page);
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  };

  const menuItemStyle = {
    borderRadius: 3,
    py: hoverOpen ? 0.5 : 1.2,
    mx: 1,
    my: 0.5,
    transition: "all 0.3s ease",
    bgcolor: "transparent",
    color: "#fff",
    "& .MuiListItemIcon-root": {
      color: "#fff"
    },
    "&:hover": {
      bgcolor: "#fff",
      color: "#000",
      transform: "translateX(5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      "& .MuiListItemIcon-root": {
        color: "#000"
      }
    }
  };

  const settingsMenuItems = [
   { key: "service", icon: <MiscellaneousServicesIcon />, label: "Service Provider" },
    { key: "bus", icon: <DirectionsBusIcon />, label: "Bus" },
{ key: "driver", icon: <AirlineSeatReclineNormalIcon />, label: "Driver" },
    { key: "conductor", icon: <PersonIcon />, label: "Conductor" },
    { key: "busroute", icon: <AltRouteIcon />, label: "Busroute" },
    { key: "busstop", icon: <TransferWithinAStationIcon />, label: "BusStop" },

    
    
    // { key: "class", icon: <ClassIcon />, label: "Class" },
    // { key: "division", icon: <GroupsIcon />, label: "Division" },
    // { key: "medium", icon: <LanguageIcon />, label: "Medium" },
    // { key: "academic", icon: <CalendarMonthIcon />, label: "Academic Year" },
    // { key: "studentfee", icon: <PaymentIcon />, label: "Student Fee" },
    // { key: "signin", icon: <LoginIcon />, label: "Sign In" },
    // { key: "studentsignup", icon: <PersonAddIcon />, label: "Student Sign Up" },
      // { key: "buslocation",   icon: <LocationOnIcon />, label: "Bus Location" },
    { key: "routestop",  icon: <AltRouteIcon />,label: "Route Stop" },
    // { key: "busdetail", icon: <DirectionsBusIcon />, label: "Bus Detail" },
    // { key: "routedetail",  icon: <RouteIcon />,label: "Route Detail" },
    // { key: "driversignup",  icon: <BadgeIcon />, label: "Driver SignUp" },
    // { key: "conductorsignup", icon: <SupervisorAccountIcon />, label: "Conductor SignUp" },
   
  ];

  // Mobile Drawer
  const MobileDrawer = () => (
    <Drawer
      anchor="left"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 280,
          background: "linear-gradient(180deg, #6495ED 100%, #4169E1 100%)",

          color: "#fff",
          p: 2,
        },
      }}
    >
      <Box sx={{ p: 2, fontWeight: "bold", fontSize: 18 }}>
        <DashboardIcon sx={{ fontSize: 18, mr: 1 }} /> Main Dashboard
      </Box>
      <List>
        <ListItemButton sx={{ borderRadius: 2, mb: 1 }}>
          <ListItemText primary="Bustracking system" />
        </ListItemButton>
      </List>
      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, opacity: 0.7 }}>
        Settings
      </Typography>
      <List>
        {settingsMenuItems.map((item) => (
          <ListItemButton
            key={item.key}
            onClick={() => openSettingsPage(item.key)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            {item.icon}
            <ListItemText sx={{ ml: 2 }} primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* Mobile AppBar */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: 'block', md: 'none' },
          background: "linear-gradient(90deg, #6495ED 100%, #4169E1 100%)",
          zIndex: 1300,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
            BusTracking
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {settingsPage || "Dashboard"}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Desktop Left Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "linear-gradient(180deg, #6495ED 100%, #4169E1 100%)",
            color: "#fff",
            p: 1,
            mt: 0,
          },
        }}
      >
        <Typography sx={{ p: 2, fontWeight: "bold", fontSize: 14 }}>
          <DashboardIcon sx={{ fontSize: 18 }} /> Main Dashboard
        </Typography>
        <List>
          <ListItemButton>
            <ListItemText primary="Bustracking system" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Settings Mini Drawer - Desktop only */}
      {settingsOpen && !isMobile && (
        <Box
          onMouseEnter={() => setHoverOpen(true)}
          onMouseLeave={() => setHoverOpen(false)}
          sx={{
            position: "absolute",
            width: hoverOpen ? fullWidth : miniWidth,
            left: drawerWidth + 25,
            transition: "0.3s",
            background: "linear-gradient(180deg, #6495ED 100%, #4169E1 100%)",
            borderRadius: "30px",
            mt: 15,
            height: "100%",
            overflow: "scroll",
            boxShadow: "4px 0 12px rgba(0,0,0,0.15)",
            zIndex: 1,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <List sx={{ display: "flex", flexDirection: "column", gap: hoverOpen ? 0.3 : 0.3 }}>
            {settingsMenuItems.map((item) => (
              <ListItemButton
                key={item.key}
                sx={menuItemStyle}
                onClick={() => openSettingsPage(item.key)}
              >
                {item.icon}
                {hoverOpen && <ListItemText sx={{ ml: 2 }} primary={item.label} />}
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}

      {/* MAIN CONTENT */}
      <Box sx={{
        flexGrow: 1,
        p: { xs: 1, sm: 2, md: 3 },
        mt: { xs: '56px', md: 0 },
        overflow: 'hidden'
      }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: { xs: 2, sm: 3, md: 5 },
            mb: { xs: 2, sm: 3, md: 3 },
            background: "linear-gradient(90deg, #6495ED 100%, #4169E1 100%)",
            p: { xs: 0.5, sm: 1 },
            overflowX: 'auto',
          }}
        >
          <Tabs
            value={tab}
            onChange={handleTab}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            centered={!isMobile}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              minHeight: { xs: 48, sm: 56 },
              "& .MuiTab-root": {
                mx: { xs: 0.5, sm: 1, md: 7 },
                px: { xs: 1, sm: 1.5, md: 1 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: "20px",
                color: "#ffffff",
                fontWeight: 500,
                textTransform: "none",
                transition: "0.3s",
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
                minWidth: { xs: 'auto', sm: 'auto' },
              },
              "& .MuiTab-root:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
              "& .Mui-selected": {
                bgcolor: "#ffffff !important",
                color: "#000000 !important",
                fontWeight: "bold",
                boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
              },
            }}
          >
            {[
              "Dashboard",
              "Student",
              "Payment",
              "Bustrip",
              "Collection",
              "Feedback",
              "Settings",
            ].map((label, i) => (
              <Tab key={i} label={label} disableRipple />
            ))}
          </Tabs>
        </Paper>

        {!settingsOpen && (
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: { xs: 2, sm: 3, md: 3 },
              p: { xs: 1.5, sm: 2, md: 3 },
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              overflow: 'auto',
            }}
          >
            {/* {tab === 0 && <Dashboard />} */}
            {/* {tab === 1 && <Student />} */}
            {tab === 2 && <Typography>Payment Page</Typography>}
            {tab === 3 && <Bustrip />}
            {tab === 4 && <Typography>Collection Page</Typography>}
            {tab === 5 && <Typography>Feedback Page</Typography>}
          </Box>
        )}

        {settingsOpen && settingsPage && (
          <Box
            sx={{
              position: { xs: 'static', md: 'absolute' },
              top: { md: 130 },
              left: isMobile ? 0 : (settingsOpen ? drawerWidth + (hoverOpen ? fullWidth : miniWidth) + 25 + FORM_GAP : 0),
              right: { xs: 0, md: 20 },
              bottom: { xs: 0, md: 'auto' },
              bgcolor: "#fff",
              borderRadius: { xs: 2, sm: 3, md: 4 },
              p: { xs: 1.5, sm: 2, md: 3 },
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
              zIndex: { xs: 1, md: 2 },
              overflow: "auto",
              maxHeight: { xs: 'calc(100vh - 120px)', md: "80vh" },
              transition: "0.3s",
              width: { xs: '100%', sm: 'calc(100% - 20px)', md: 'auto' },
              mx: { xs: 1, sm: 2, md: 0 },
            }}
          >
            {settingsPage === "bus" && <Bus />}
            {settingsPage === "busroute" && <Busroute />}
            {settingsPage === "busstop" && <BusStop />}
            {settingsPage === "driver" && <Driver />}
            {settingsPage === "conductor" && <Conductor />}
            {settingsPage === "service" && <ServiceProvider />}
            {settingsPage === "class" && <Class />}
            {settingsPage === "division" && <Division />}
            {settingsPage === "medium" && <Medium />}
            {settingsPage === "academic" && <AcademicYear />}
            {settingsPage === "studentfee" && <StudentFee />}
            {settingsPage === "studentsignup" && <StudentSignUp />}
            {settingsPage === "signin" && <SignIn />}
            {settingsPage === "driversignup" && <DriverSignUp />}
            {settingsPage === "conductorsignup" && <ConductorSignUp />}
            {settingsPage === "buslocation" && <BusLocation/>}
            {settingsPage === "busdetail" && <BusDetail/>}
            {settingsPage === "routedetail" && <RouteDetail/>}
            {settingsPage === "routestop" && <RouteStop/>}
          </Box>
        )}
      </Box>
    </Box>
  );
}