import React, { useState } from "react";
import { lazy, Suspense } from "react";
import {
  Box, Paper, Tabs, Tab, Drawer,
  List, ListItemButton, ListItemText, Typography,
  useTheme, useMediaQuery, IconButton, AppBar, Toolbar,
  Collapse, ListSubheader
} from "@mui/material";

// Lazy imports
const ServiceProvider = lazy(() => import("../pages/ServiceProvider/Serviceprovider"));
const Bus = lazy(() => import("../pages/Bus/Bus"));
const Driver = lazy(() => import("../pages/Driver/Driver"));
const Conductor = lazy(() => import("../pages/Conductor/Conductor"));
const BusStop = lazy(() => import("../pages/Bus/BusStop"));
const BusRoute = lazy(() => import("../pages/Bus/BusRoute"));
const BusLocation = lazy(() => import("../pages/Bus/BusLocation"));
const Student = lazy(() => import("../pages/Student/Student"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const BusTrip = lazy(() => import("../pages/Bus/BusTrip"));
const Class = lazy(() => import("../pages/Student/Class"));
const AcademicYear = lazy(() => import("../pages/Student/AcademicYear"));
const Medium = lazy(() => import("../pages/Student/Medium"));
const Division = lazy(() => import("../pages/Student/Division"));
const Scan = lazy(() => import("../pages/Student/Scan"));
const StudentFeePayment = lazy(() => import("../pages/Student/StudentFeePayment"));

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import PersonIcon from "@mui/icons-material/Person";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ClassIcon from '@mui/icons-material/Class';
import GroupsIcon from "@mui/icons-material/Groups";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentIcon from "@mui/icons-material/Payment";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { keyframes } from "@mui/system";

const drawerWidth = 180;
const miniWidth = 70;
const fullWidth = 220;
const FORM_GAP = 20;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

export default function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [tab, setTab] = useState(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [settingsPage, setSettingsPage] = useState("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  const handleTab = (e, val) => {
    setTab(val);
    setSettingsOpen(val === 6);
    setSettingsPage("");
    if (isMobile) setMobileDrawerOpen(false);
  };

  const openSettingsPage = (page) => {
    setSettingsPage(page);
    if (isMobile) setMobileDrawerOpen(false);
  };

  const toggleSection = (heading) => {
    setExpandedSections(prev => ({ ...prev, [heading]: !prev[heading] }));
  };

  const showArrowHint = (isMobile || isTablet) && settingsOpen;

  const menuItemStyle = {
    borderRadius: 3,
    py: hoverOpen ? 0.5 : 1.2,
    mx: 1,
    my: 0.5,
    transition: "all 0.3s ease",
    bgcolor: "transparent",
    color: "#fff",
    "& .MuiListItemIcon-root": { color: "#fff" },
    "&:hover": {
      bgcolor: "#fff",
      color: "#000",
      transform: "translateX(5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      "& .MuiListItemIcon-root": { color: "#000" }
    }
  };

  // ---------- Settings structure ----------
  const settingsSections = [
    {
      heading: "Bus",
      icon: <DirectionsBusIcon />,
      items: [
        { key: "bus", icon: <DirectionsBusIcon />, label: "Bus" },
        { key: "busstop", icon: <TransferWithinAStationIcon />, label: "Bus Stop" },
        { key: "busroute", icon: <AltRouteIcon />, label: "Bus Route" },
        { key: "buslocation", icon: <LocationOnIcon />, label: "Bus Location" },
      ]
    },
    {
      heading: "Student",
      icon: <PersonIcon />,
      items: [
        { key: "academic", icon: <CalendarMonthIcon />, label: "Academic Year" },
        { key: "class", icon: <ClassIcon />, label: "Class" },
        { key: "medium", icon: <LanguageIcon />, label: "Medium" },
        { key: "division", icon: <GroupsIcon />, label: "Division" },
        { key: "studentfeepayment", icon: <PaymentIcon />, label: "Student Fee" },
        { key: "scan", icon: <QrCodeScannerIcon />, label: "QR Scan" },
      ]
    }
  ];

  const topLevelItems = [
    { key: "service", icon: <MiscellaneousServicesIcon />, label: "Service Provider" },
    { key: "driver", icon: <AirlineSeatReclineNormalIcon />, label: "Driver" },
    { key: "conductor", icon: <PersonIcon />, label: "Conductor" },
  ];

  // Helper to render a list of items (used in both mobile and desktop)
  const renderItems = (items, isNested = false) =>
    items.map(item => (
      <ListItemButton
        key={item.key}
        onClick={() => openSettingsPage(item.key)}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          pl: isNested ? 4 : 2,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
          ...(isNested && { ml: 2 }),
        }}
      >
        {item.icon}
        <ListItemText sx={{ ml: 2 }} primary={item.label} />
      </ListItemButton>
    ));

  // ---------- Mobile Drawer ----------
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
        {/* Top-level items */}
        {topLevelItems.map(item => (
          <ListItemButton
            key={item.key}
            onClick={() => openSettingsPage(item.key)}
            sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            {item.icon}
            <ListItemText sx={{ ml: 2 }} primary={item.label} />
          </ListItemButton>
        ))}
        {/* Sections with expand/collapse */}
        {settingsSections.map(section => {
          const isExpanded = expandedSections[section.heading] || false;
          return (
            <React.Fragment key={section.heading}>
              <ListItemButton
                onClick={() => toggleSection(section.heading)}
                sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                {section.icon}
                <ListItemText sx={{ ml: 2 }} primary={section.heading} />
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {section.items.map(item => (
                    <ListItemButton
                      key={item.key}
                      onClick={() => openSettingsPage(item.key)}
                      sx={{
                        pl: 4,
                        borderRadius: 2,
                        mb: 0.5,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' },
                      }}
                    >
                      {item.icon}
                      <ListItemText sx={{ ml: 2 }} primary={item.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );

  // ---------- Desktop mini-drawer ----------
  const SettingsMiniDrawer = () => (
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
        p: hoverOpen ? 1 : 0.5,
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: hoverOpen ? 0.3 : 0.3 }}>
        {/* Top-level items */}
        {topLevelItems.map(item => (
          <ListItemButton
            key={item.key}
            sx={menuItemStyle}
            onClick={() => openSettingsPage(item.key)}
          >
            {item.icon}
            {hoverOpen && <ListItemText sx={{ ml: 2 }} primary={item.label} />}
          </ListItemButton>
        ))}
        {/* Sections */}
        {settingsSections.map(section => {
          const isExpanded = expandedSections[section.heading] || false;
          return (
            <React.Fragment key={section.heading}>
              <ListItemButton
                sx={menuItemStyle}
                onClick={() => toggleSection(section.heading)}
              >
                {section.icon}
                {hoverOpen && (
                  <>
                    <ListItemText sx={{ ml: 2 }} primary={section.heading} />
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </>
                )}
              </ListItemButton>
              {hoverOpen && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {section.items.map(item => (
                      <ListItemButton
                        key={item.key}
                        sx={{
                          ...menuItemStyle,
                          pl: 3,
                          py: 0.8,
                        }}
                        onClick={() => openSettingsPage(item.key)}
                      >
                        {item.icon}
                        <ListItemText sx={{ ml: 2 }} primary={item.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );

  // ---------- Main render ----------
  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      {/* AppBar for mobile/tablet */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: 'block', md: 'none' },
          background: "linear-gradient(90deg, #6495ED 100%, #4169E1 100%)",
          zIndex: 1300,
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileDrawerOpen(true)}>
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
      {settingsOpen && !isMobile && <SettingsMiniDrawer />}

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
            sx={{
              '& .MuiTabs-indicator': { display: 'none' },
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
              "& .MuiTab-root:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              "& .Mui-selected": {
                bgcolor: "#ffffff !important",
                color: "#000000 !important",
                fontWeight: "bold",
                boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
              },
            }}
          >
            {["Dashboard", "Student", "Payment", "Bustrip", "Collection", "Feedback", "Settings"].map((label, i) => (
              <Tab key={i} label={label} disableRipple />
            ))}
          </Tabs>
        </Paper>

        {!settingsOpen && (
          <Box sx={{
            bgcolor: "#fff",
            borderRadius: { xs: 2, sm: 3, md: 3 },
            p: { xs: 1.5, sm: 2, md: 3 },
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: 'auto',
          }}>
            {tab === 0 && <Dashboard/>}
            {tab === 1 && <Student/>}
            {tab === 2 && <Typography>Payment Page</Typography>}
            {tab === 3 && <BusTrip/>}
            {tab === 4 && <Typography>Collection Page</Typography>}
            {tab === 5 && <Typography>Feedback Page</Typography>}
          </Box>
        )}

        {settingsOpen && settingsPage && (
          <Box sx={{
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
          }}>
            {settingsPage === "service" && <ServiceProvider />}
            {settingsPage === "bus" && <Bus />}
            {settingsPage === "driver" && <Driver />}
            {settingsPage === "conductor" && <Conductor />}
            {settingsPage === "busstop" && <BusStop />}
            {settingsPage === "busroute" && <BusRoute />}
            {settingsPage === "buslocation" && <BusLocation />}
            {settingsPage === "class" && <Class/>}
            {settingsPage === "academic" && <AcademicYear/>}
            {settingsPage === "division" && <Division/>}
            {settingsPage === "medium" && <Medium/>}
            {settingsPage === "scan" && <Scan/>}
            {settingsPage === "studentfeepayment" && <StudentFeePayment/>}
          </Box>
        )}

        {/* Arrow hint for mobile/tablet */}
        {showArrowHint && (
          <Box
            sx={{
              position: 'fixed',
              top: 60,
              left: 10,
              zIndex: 1400,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              animation: `${pulse} 1.5s ease-in-out infinite`,
              cursor: 'pointer',
            }}
            onClick={() => setMobileDrawerOpen(true)}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 24, color: '#f59e0b', transform: 'rotate(180deg)' }} />
            <Typography variant="caption" sx={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: '#fff',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '0.7rem',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(4px)',
            }}>
              Tap ☰ to choose
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}