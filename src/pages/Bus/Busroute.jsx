// Busroute.jsx - Fully Responsive for All iPhone Models - FIXED VERSION

import React, { useState, useEffect } from "react";
import busRouteApi from "../../api/busRouteApi";
import busStopApi from "../../api/busStopApi";
import {
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Checkbox,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Fade,
  Grow,
  InputAdornment as MuiInputAdornment
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RouteIcon from "@mui/icons-material/Route";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { styled } from "@mui/material/styles";


// ================= STYLED COMPONENTS WITH RESPONSIVENESS =================
const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
  width: "100%",
  overflowX: "hidden",
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  width: "100%",
  maxWidth: "100%",
  overflowX: "hidden",
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(2.5),
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1),
  },
  '@media (max-width: 380px)': {
    padding: theme.spacing(0.75),
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: 0,
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
  overflow: "hidden",
  transition: "all 0.3s ease",
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    borderRadius: "12px",
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: "8px",
  },
  '@media (max-width: 380px)': {
    borderRadius: "6px",
    margin: "0 -2px",
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 400px)",
  minHeight: "300px",
  width: "100%",
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f5f9',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#cbd5e1',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#94a3b8',
    },
  },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: {
    maxHeight: "calc(100vh - 380px)",
    minHeight: "250px",
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: "calc(100vh - 350px)",
    minHeight: "200px",
  },
  [theme.breakpoints.down('xs')]: {
    maxHeight: "calc(100vh - 320px)",
    minHeight: "150px",
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
    },
  },
  '@media (max-width: 380px)': {
    maxHeight: "calc(100vh - 300px)",
    minHeight: "120px",
  }
}));

const GradientHeader = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(135deg, #6495ED 0%, #4169E1 100%)",
  position: "sticky",
  top: 0,
  zIndex: 10,
  '& th': {
    color: "white",
    fontWeight: 600,
    fontSize: "0.7rem",
    letterSpacing: "0.3px",
    padding: "10px 8px",
    whiteSpace: "nowrap",
    borderBottom: "2px solid rgba(255,255,255,0.2)",
    position: "sticky",
    top: 0,
    backgroundColor: "inherit",
    [theme.breakpoints.down('lg')]: {
      fontSize: "0.65rem",
      padding: "8px 6px",
    },
    [theme.breakpoints.down('md')]: {
      fontSize: "0.6rem",
      padding: "6px 5px",
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.55rem",
      padding: "5px 4px",
      letterSpacing: "0.2px",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "0.5rem",
      padding: "4px 3px",
      letterSpacing: "0.1px",
    },
    '@media (max-width: 380px)': {
      fontSize: "0.45rem",
      padding: "3px 2px",
    }
  },
  '& th:first-of-type': {
    paddingLeft: "12px",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "8px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "6px",
    },
  },
  '& th:last-of-type': {
    paddingRight: "12px",
    [theme.breakpoints.down('sm')]: {
      paddingRight: "8px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: "6px",
    },
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease",
  '&:hover': {
    backgroundColor: "#f8fafc",
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#fafbfc",
  },
  '&:nth-of-type(even):hover': {
    backgroundColor: "#f1f5f9",
  },
  '& td': {
    padding: "8px 8px",
    fontSize: "0.75rem",
    borderBottom: "1px solid #f1f5f9",
    [theme.breakpoints.down('lg')]: {
      padding: "7px 6px",
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down('md')]: {
      padding: "6px 5px",
      fontSize: "0.65rem",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "5px 4px",
      fontSize: "0.6rem",
    },
    [theme.breakpoints.down('xs')]: {
      padding: "4px 3px",
      fontSize: "0.55rem",
    },
    '@media (max-width: 380px)': {
      padding: "3px 2px",
      fontSize: "0.5rem",
    }
  },
  '& td:first-of-type': {
    paddingLeft: "12px",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "8px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "6px",
    },
  },
  '& td:last-of-type': {
    paddingRight: "12px",
    [theme.breakpoints.down('sm')]: {
      paddingRight: "8px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: "6px",
    },
  }
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "10px 24px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.95rem",
  backgroundColor: "#6495ED",
  boxShadow: "0 4px 12px rgba(100, 149, 237, 0.3)",
  transition: "all 0.3s ease",
  flexShrink: 0,
  '&:hover': {
    backgroundColor: "#4169E1",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(65, 105, 225, 0.4)",
  },
  [theme.breakpoints.down('md')]: {
    padding: "8px 18px",
    fontSize: "0.85rem",
  },
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    padding: "10px 16px",
    fontSize: "0.85rem",
    justifyContent: "center",
  },
  [theme.breakpoints.down('xs')]: {
    padding: "8px 12px",
    fontSize: "0.8rem",
    borderRadius: "10px",
  },
  '@media (max-width: 380px)': {
    padding: "6px 10px",
    fontSize: "0.75rem",
    borderRadius: "8px",
  }
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  '&:hover': {
    borderColor: "#6495ED",
    boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)",
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1.5),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2),
    borderRadius: "10px",
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1),
    borderRadius: "8px",
  },
  '@media (max-width: 380px)': {
    padding: theme.spacing(0.75),
    borderRadius: "6px",
  }
}));

const MobileCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  width: "100%",
  '&:hover': {
    borderColor: "#6495ED",
    boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)",
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: "10px",
  },
  '@media (max-width: 380px)': {
    borderRadius: "8px",
  }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: "20px",
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      margin: "24px",
      padding: theme.spacing(0.75),
      width: "95%",
    },
    [theme.breakpoints.down('sm')]: {
      margin: "16px",
      width: "100%",
      borderRadius: "16px",
      maxHeight: "95vh",
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      margin: "10px",
      borderRadius: "14px",
      maxHeight: "92vh",
    },
    '@media (max-width: 380px)': {
      margin: "6px",
      borderRadius: "12px",
      maxHeight: "90vh",
      padding: theme.spacing(0.25),
    }
  }
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: "10px",
    '&:hover fieldset': {
      borderColor: "#6495ED",
    },
    '&.Mui-focused fieldset': {
      borderColor: "#6495ED",
      borderWidth: "2px",
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: "8px",
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: "6px",
    }
  },
  '& .MuiInputLabel-root': {
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.85rem",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "0.75rem",
    }
  },
  '& .MuiInputBase-input': {
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.85rem",
      padding: "10px 12px",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "0.75rem",
      padding: "8px 10px",
    }
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: "10px",
    '&:hover fieldset': {
      borderColor: "#6495ED",
    },
    '&.Mui-focused fieldset': {
      borderColor: "#6495ED",
      borderWidth: "2px",
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: "8px",
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: "6px",
    }
  },
  '& .MuiInputLabel-root': {
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.85rem",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "0.75rem",
    }
  },
  '& .MuiInputBase-input': {
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.85rem",
      padding: "10px 12px",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "0.75rem",
      padding: "8px 10px",
    }
  }
}));

// ================= MAIN COMPONENT =================
export default function Busroute() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const emptyRoute = {
    id: null,
    routeName: "",
    startPoint: null,
    startTime: "",
    endPoint: null,
    stopTime: "",
    totalDistanceKm: "",
    estimatedTimeMin: "",
    status: "",
  };

  const [route, setRoute] = useState(emptyRoute);
  const [routeList, setRouteList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);
  const [stopTime, setStopTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const statusOptions = ["ACTIVE", "INACTIVE", "SUSPENDED"];

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      // ✅ FIXED: Using busRouteApi directly instead of api.routes
      const routesData = await busRouteApi.getAll();
      setRouteList(routesData);
      
      try {
        const stops = [];
        routesData.forEach(route => {
          if (route.startPoint && !stops.find(s => s.stopName === route.startPoint)) {
            stops.push({ id: stops.length + 1, stopName: route.startPoint });
          }
          if (route.endPoint && !stops.find(s => s.stopName === route.endPoint)) {
            stops.push({ id: stops.length + 1, stopName: route.endPoint });
          }
          if (route.busStop && !stops.find(s => s.stopName === route.busStop)) {
            stops.push({ id: stops.length + 1, stopName: route.busStop });
          }
        });
        setLocations(stops);
      } catch (error) {
        console.warn('Could not fetch stops, using route data only');
      }
    } catch (error) {
      console.error("Error loading data:", error);
      showSnackbar("Failed to load routes", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setRoute(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ================= HANDLE OPEN ADD =================
  const handleOpenAdd = () => {
    setRoute(emptyRoute);
    setSelectedStop(null);
    setStopTime("");
    setOpen(true);
  };

  // ================= HANDLE CLOSE DIALOG =================
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedStop(null);
    setStopTime("");
    setSubmitting(false);
  };

  // ================= HANDLE SAVE =================
  const handleSave = async () => {
    if (!route.routeName.trim()) {
      showSnackbar("Route Name is required", "warning");
      return;
    }
    if (!route.startPoint) {
      showSnackbar("Start Point is required", "warning");
      return;
    }
    if (!route.endPoint) {
      showSnackbar("End Point is required", "warning");
      return;
    }
    if (!route.status) {
      showSnackbar("Status is required", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        routeName: route.routeName,
        startTime: route.startTime || "00:00",
        stopTime: route.stopTime || "00:00",
        startPoint: route.startPoint?.stopName || route.startPoint,
        endPoint: route.endPoint?.stopName || route.endPoint,
        totalDistanceKm: Number(route.totalDistanceKm) || 0,
        estimatedTimeMin: Number(route.estimatedTimeMin) || 0,
        status: route.status
      };

      // ✅ FIXED: Using busRouteApi directly instead of api.routes
      const savedRoute = await busRouteApi.create(payload);
      
      if (selectedStop && stopTime) {
        // await api.routeStops.create({
        //   routeId: savedRoute.id,
        //   stopName: selectedStop.stopName,
        //   stopTime: stopTime
        // });
      }
      
      showSnackbar("Route saved successfully!", "success");
      handleCloseDialog();
      loadData();
    } catch (error) {
      console.error("Error saving route:", error);
      showSnackbar(error.message || "Error saving route", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HANDLE DELETE =================
  const handleDeleteClick = (route) => {
    setSelectedRoute(route);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      // ✅ FIXED: Using busRouteApi directly instead of api.routes
      await busRouteApi.delete(selectedRoute.id);
      showSnackbar("Route deleted successfully!", "success");
      setDeleteDialogOpen(false);
      setSelectedRoute(null);
      loadData();
    } catch (error) {
      console.error("Error deleting route:", error);
      showSnackbar(error.message || "Error deleting route", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HELPERS =================
  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return { bg: '#dcfce7', color: '#16a34a' };
      case 'INACTIVE': return { bg: '#fef3c7', color: '#d97706' };
      case 'SUSPENDED': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "60vh",
            flexDirection: "column",
            gap: 2
          }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? '0.75rem' : '0.875rem' }}>
              Loading routes...
            </Typography>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

  // ================= RENDER =================
  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          {/* Header Section */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 1.5, sm: 2, md: 3 },
            mb: { xs: 2, sm: 2.5, md: 4 }
          }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography 
                variant="h5" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem", lg: "1.75rem" },
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 1.5 },
                  flexWrap: "wrap",
                }}
              >
                <RouteIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <span>Bus Routes</span>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Manage bus routes and schedules
              </Typography>
            </Box>

            <AddButton
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              onClick={handleOpenAdd}
            >
              Add Route
            </AddButton>
          </Box>

          {/* Statistics Cards */}
          <Box sx={{ 
            display: "grid",
            gridTemplateColumns: { 
              xs: "1fr 1fr", 
              sm: "repeat(4, 1fr)" 
            },
            gap: { xs: 1, sm: 1.5, md: 2 },
            mb: { xs: 2, sm: 2.5, md: 3 }
          }}>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Total Routes
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>
                {routeList.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Active Routes
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>
                {routeList.filter(r => r.status === 'ACTIVE').length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Inactive
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#d97706" }}>
                {routeList.filter(r => r.status === 'INACTIVE').length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Suspended
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#dc2626" }}>
                {routeList.filter(r => r.status === 'SUSPENDED').length}
              </Typography>
            </StatsCard>
          </Box>

          {/* Table/List View */}
          <StyledPaper>
            {isDesktop ? (
              // Desktop Table View
              <StyledTableContainer>
                <Table stickyHeader size={isExtraSmall ? "small" : "medium"}>
                  <GradientHeader>
                    <TableRow>
                      <TableCell sx={{ minWidth: { xs: "30px", sm: "40px", md: "50px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          ID
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "80px", sm: "110px", md: "140px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Route Name
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "70px", sm: "90px", md: "110px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Start
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Start Time
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "70px", sm: "90px", md: "110px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          End
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          End Time
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "50px", sm: "70px", md: "90px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Distance
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "50px", sm: "70px", md: "90px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Est Time
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "50px", sm: "60px", md: "80px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {routeList.length > 0 ? (
                      routeList.map((r) => (
                        <StyledTableRow key={r.id}>
                          <TableCell sx={{ fontWeight: 600 }}>{r.id}</TableCell>
                          <TableCell>
                            <Typography 
                              sx={{ 
                                color: "#6495ED", 
                                fontWeight: 600,
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' },
                                wordBreak: 'break-word'
                              }}
                            >
                              {r.routeName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationOnIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                                {r.startPoint || '-'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTimeIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                                {r.startTime || '-'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationOnIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                                {r.endPoint || '-'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTimeIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                                {r.stopTime || '-'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                              {r.totalDistanceKm} km
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                              {r.estimatedTimeMin} min
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={r.status}
                              size="small"
                              sx={{
                                backgroundColor: getStatusColor(r.status).bg,
                                color: getStatusColor(r.status).color,
                                fontWeight: 600,
                                fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" },
                                borderRadius: "6px",
                                height: { xs: "18px", sm: "20px", md: "24px" },
                                minWidth: { xs: "50px", sm: "60px", md: "70px" }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Delete">
                              <IconButton 
                                size={isExtraSmall ? "small" : "medium"}
                                onClick={() => handleDeleteClick(r)}
                                sx={{ 
                                  color: '#ef4444',
                                  padding: { xs: "4px", sm: "6px", md: "8px" }
                                }}
                              >
                                <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <RouteIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            No routes added yet
                          </Typography>
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleOpenAdd}
                            sx={{ 
                              mt: 2,
                              borderRadius: "10px",
                              textTransform: "none",
                              borderColor: "#6495ED",
                              color: "#6495ED",
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                          >
                            Add your first route
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              // Mobile/Tablet Card View
              <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
                <Stack spacing={1.5}>
                  {routeList.length > 0 ? (
                    routeList.map((r, index) => (
                      <Grow in key={r.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard>
                          <CardContent sx={{ 
                            p: { xs: 1.5, sm: 2, md: 2.5 },
                            '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } }
                          }}>
                            <Box sx={{ 
                              display: "flex", 
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              flexWrap: "wrap",
                              gap: 0.5
                            }}>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" }, fontWeight: 500, letterSpacing: "0.5px" }}
                                >
                                  Route #{r.id}
                                </Typography>
                                <Typography 
                                  variant="h6" 
                                  sx={{ 
                                    fontWeight: 600,
                                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                                    mt: 0.25,
                                    color: "#6495ED",
                                    wordBreak: 'break-word'
                                  }}
                                >
                                  {r.routeName}
                                </Typography>
                              </Box>
                              <Chip 
                                label={r.status}
                                size="small"
                                sx={{
                                  backgroundColor: getStatusColor(r.status).bg,
                                  color: getStatusColor(r.status).color,
                                  fontWeight: 600,
                                  fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
                                  borderRadius: "6px",
                                  height: { xs: "20px", sm: "22px", md: "24px" },
                                  flexShrink: 0
                                }}
                              />
                            </Box>

                            <Box sx={{ 
                              display: "grid",
                              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" },
                              gap: { xs: 1, sm: 1.5 },
                              mt: 1.5,
                              pt: 1.5,
                              borderTop: "1px solid #f1f5f9"
                            }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Start
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  {r.startPoint || '-'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  {r.startTime || '-'}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  End
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  {r.endPoint || '-'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  {r.stopTime || '-'}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Details
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  {r.totalDistanceKm} km · {r.estimatedTimeMin} min
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ 
                              display: "flex",
                              justifyContent: "flex-end",
                              mt: 1,
                              pt: 1,
                              borderTop: "1px solid #f1f5f9"
                            }}>
                              <Tooltip title="Delete">
                                <IconButton 
                                  size={isExtraSmall ? "small" : "medium"}
                                  onClick={() => handleDeleteClick(r)}
                                  sx={{ 
                                    color: '#ef4444',
                                    padding: { xs: "4px", sm: "6px" }
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </CardContent>
                        </MobileCard>
                      </Grow>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <RouteIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        No routes added yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAdd}
                        sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        Add first route
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

      {/* Add Route Dialog */}
      <StyledDialog 
        open={open} 
        onClose={handleCloseDialog} 
        fullWidth 
        maxWidth="md"
      >
        <DialogTitle sx={{ 
          fontWeight: 700,
          fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
          color: "#1e293b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 0.5,
          p: { xs: 1.5, sm: 2, md: 2.5 }
        }}>
          Add New Route
          <IconButton onClick={handleCloseDialog} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
            <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2}>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                fullWidth
                label="Route Name"
                name="routeName"
                value={route.routeName}
                onChange={handleChange}
                disabled={submitting}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledAutocomplete
                fullWidth
                options={locations}
                getOptionLabel={(o) => o.stopName || ""}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                value={route.startPoint}
                onChange={(e, v) =>
                  setRoute(prev => ({ ...prev, startPoint: v }))
                }
                disabled={submitting}
                renderInput={(params) =>
                  <TextField 
                    {...params} 
                    label="Start Point" 
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                  />
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                type="time"
                label="Start Time"
                name="startTime"
                value={route.startTime}
                onChange={handleChange}
                fullWidth
                disabled={submitting}
                InputLabelProps={{ shrink: true }}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledAutocomplete
                fullWidth
                options={locations}
                getOptionLabel={(o) => o.stopName || ""}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                value={selectedStop}
                onChange={(e, value) => {
                  setSelectedStop(value);
                  setStopTime("");
                }}
                disabled={submitting}
                renderOption={(props, option) => {
                  const isSelected =
                    selectedStop?.stopName === option.stopName;

                  return (
                    <li {...props}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                        flexWrap="wrap"
                        gap={1}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Checkbox
                            checked={isSelected}
                            size={isExtraSmall ? "small" : "medium"}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isSelected) {
                                setSelectedStop(null);
                                setStopTime("");
                              } else {
                                setSelectedStop(option);
                                setStopTime("");
                              }
                            }}
                          />
                          <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {option.stopName}
                          </Typography>
                        </Box>

                        {isSelected && (
                          <TextField
                            type="time"
                            size={isExtraSmall ? "small" : "medium"}
                            value={stopTime}
                            disabled={submitting}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setStopTime(e.target.value)}
                            sx={{ 
                              width: { xs: 100, sm: 130 },
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: "#6495ED",
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: "#6495ED",
                                  borderWidth: "2px",
                                }
                              }
                            }}
                            InputLabelProps={{ shrink: true }}
                          />
                        )}
                      </Box>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Bus Stop (Optional)" 
                    fullWidth
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledAutocomplete
                fullWidth
                options={locations}
                getOptionLabel={(o) => o.stopName || ""}
                value={route.endPoint}
                onChange={(e, v) =>
                  setRoute(prev => ({ ...prev, endPoint: v }))
                }
                disabled={submitting}
                renderInput={(params) =>
                  <TextField 
                    {...params} 
                    label="End Point"
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                  />
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                type="time"
                label="End Time"
                name="stopTime"
                value={route.stopTime}
                onChange={handleChange}
                fullWidth
                disabled={submitting}
                InputLabelProps={{ shrink: true }}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <StyledTextField
                type="number"
                label="Distance (KM)"
                name="totalDistanceKm"
                value={route.totalDistanceKm}
                onChange={handleChange}
                fullWidth
                disabled={submitting}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                InputProps={{
                  endAdornment: (
                    <MuiInputAdornment position="end" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      km
                    </MuiInputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <StyledTextField
                type="number"
                label="Estimated Time"
                name="estimatedTimeMin"
                value={route.estimatedTimeMin}
                onChange={handleChange}
                fullWidth
                disabled={submitting}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                InputProps={{
                  endAdornment: (
                    <MuiInputAdornment position="end" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      min
                    </MuiInputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <StyledTextField
                select
                label="Status"
                name="status"
                value={route.status}
                onChange={handleChange}
                fullWidth
                disabled={submitting}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              >
                <MenuItem value="">Select Status</MenuItem>
                {statusOptions.map((s) => (
                  <MenuItem key={s} value={s} sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    {s}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2, md: 2.5 }, 
          pt: { xs: 0.5, sm: 0.75, md: 1 }, 
          gap: 0.5, 
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={handleCloseDialog}
            disabled={submitting}
            fullWidth={isExtraSmall}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              color: "#64748b",
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': {
                backgroundColor: "#f1f5f9"
              },
              flex: { xs: 1, sm: 0 },
              order: { xs: 2, sm: 1 }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={submitting}
            fullWidth={isExtraSmall}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              backgroundColor: "#6495ED",
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              flex: { xs: 1, sm: 0 },
              order: { xs: 1, sm: 2 },
              '&:hover': {
                backgroundColor: "#4169E1"
              }
            }}
          >
            {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Save Route"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Delete Confirmation Dialog */}
      <StyledDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ 
          fontWeight: 700,
          color: "#dc2626",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          p: { xs: 1.5, sm: 2, md: 2.5 }
        }}>
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography sx={{ 
            color: "#64748b",
            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } 
          }}>
            Are you sure you want to delete the route "{selectedRoute?.routeName}"? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2, md: 2.5 }, 
          gap: 0.5,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            disabled={submitting}
            fullWidth={isExtraSmall}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              color: "#64748b",
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': {
                backgroundColor: "#f1f5f9"
              },
              order: { xs: 2, sm: 1 }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={submitting}
            fullWidth={isExtraSmall}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              order: { xs: 1, sm: 2 }
            }}
          >
            {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          '& .MuiSnackbarContent-root': {
            [theme.breakpoints.down('xs')]: {
              minWidth: 'auto',
              width: '95%',
            }
          }
        }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            '& .MuiAlert-icon': {
              fontSize: { xs: '18px', sm: '22px' }
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}