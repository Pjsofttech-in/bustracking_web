// src/pages/Bus/BusTrip.jsx
import React, { useState, useEffect } from "react";
import busTripApi from "../../api/busTripApi";
import busApi from "../../api/busApi";
import busRouteApi from "../../api/busRouteApi";
import driverApi from "../../api/driverApi";
import conductorApi from "../../api/conductorApi";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Autocomplete,
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
  InputAdornment,
  TableContainer as MuiTableContainer
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouteIcon from "@mui/icons-material/Route";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { styled } from "@mui/material/styles";

// ================= STYLED COMPONENTS =================
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
  [theme.breakpoints.down('lg')]: { padding: theme.spacing(2.5) },
  [theme.breakpoints.down('md')]: { padding: theme.spacing(2) },
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.5) },
  [theme.breakpoints.down('xs')]: { padding: theme.spacing(1) },
  '@media (max-width: 380px)': { padding: theme.spacing(0.75) }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(0, 0.5) },
  [theme.breakpoints.down('xs')]: { padding: 0 }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
  overflow: "hidden",
  transition: "all 0.3s ease",
  width: "100%",
  [theme.breakpoints.down('sm')]: { borderRadius: "12px" },
  [theme.breakpoints.down('xs')]: { borderRadius: "8px" },
  '@media (max-width: 380px)': { borderRadius: "6px", margin: "0 -2px" }
}));

const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 400px)",
  minHeight: "300px",
  width: "100%",
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '4px', '&:hover': { backgroundColor: '#94a3b8' } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: { maxHeight: "calc(100vh - 380px)", minHeight: "250px" },
  [theme.breakpoints.down('sm')]: { maxHeight: "calc(100vh - 350px)", minHeight: "200px" },
  [theme.breakpoints.down('xs')]: { maxHeight: "calc(100vh - 320px)", minHeight: "150px", '&::-webkit-scrollbar': { width: '4px', height: '4px' } },
  '@media (max-width: 380px)': { maxHeight: "calc(100vh - 300px)", minHeight: "120px" }
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
    [theme.breakpoints.down('lg')]: { fontSize: "0.65rem", padding: "8px 6px" },
    [theme.breakpoints.down('md')]: { fontSize: "0.6rem", padding: "6px 5px" },
    [theme.breakpoints.down('sm')]: { fontSize: "0.55rem", padding: "5px 4px", letterSpacing: "0.2px" },
    [theme.breakpoints.down('xs')]: { fontSize: "0.5rem", padding: "4px 3px", letterSpacing: "0.1px" },
    '@media (max-width: 380px)': { fontSize: "0.45rem", padding: "3px 2px" }
  },
  '& th:first-of-type': { paddingLeft: "12px", [theme.breakpoints.down('sm')]: { paddingLeft: "8px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "6px" } },
  '& th:last-of-type': { paddingRight: "12px", [theme.breakpoints.down('sm')]: { paddingRight: "8px" }, [theme.breakpoints.down('xs')]: { paddingRight: "6px" } }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease",
  '&:hover': { backgroundColor: "#f8fafc" },
  '&:nth-of-type(even)': { backgroundColor: "#fafbfc" },
  '&:nth-of-type(even):hover': { backgroundColor: "#f1f5f9" },
  '& td': {
    padding: "8px 8px",
    fontSize: "0.75rem",
    borderBottom: "1px solid #f1f5f9",
    [theme.breakpoints.down('lg')]: { padding: "7px 6px", fontSize: "0.7rem" },
    [theme.breakpoints.down('md')]: { padding: "6px 5px", fontSize: "0.65rem" },
    [theme.breakpoints.down('sm')]: { padding: "5px 4px", fontSize: "0.6rem" },
    [theme.breakpoints.down('xs')]: { padding: "4px 3px", fontSize: "0.55rem" },
    '@media (max-width: 380px)': { padding: "3px 2px", fontSize: "0.5rem" }
  },
  '& td:first-of-type': { paddingLeft: "12px", [theme.breakpoints.down('sm')]: { paddingLeft: "8px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "6px" } },
  '& td:last-of-type': { paddingRight: "12px", [theme.breakpoints.down('sm')]: { paddingRight: "8px" }, [theme.breakpoints.down('xs')]: { paddingRight: "6px" } }
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
  '&:hover': { backgroundColor: "#4169E1", transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(65, 105, 225, 0.4)" },
  [theme.breakpoints.down('md')]: { padding: "8px 18px", fontSize: "0.85rem" },
  [theme.breakpoints.down('sm')]: { width: "100%", padding: "10px 16px", fontSize: "0.85rem", justifyContent: "center" },
  [theme.breakpoints.down('xs')]: { padding: "8px 12px", fontSize: "0.8rem", borderRadius: "10px" },
  '@media (max-width: 380px)': { padding: "6px 10px", fontSize: "0.75rem", borderRadius: "8px" }
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  '&:hover': { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)" },
  [theme.breakpoints.down('md')]: { padding: theme.spacing(1.5) },
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.2), borderRadius: "10px" },
  [theme.breakpoints.down('xs')]: { padding: theme.spacing(1), borderRadius: "8px" },
  '@media (max-width: 380px)': { padding: theme.spacing(0.75), borderRadius: "6px" }
}));

const MobileCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  width: "100%",
  '&:hover': { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)" },
  [theme.breakpoints.down('xs')]: { borderRadius: "10px" },
  '@media (max-width: 380px)': { borderRadius: "8px" }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: "20px",
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: { margin: "24px", padding: theme.spacing(0.75) },
    [theme.breakpoints.down('sm')]: { margin: "16px", width: "100%", borderRadius: "16px", maxHeight: "95vh", padding: theme.spacing(0.5) },
    [theme.breakpoints.down('xs')]: { margin: "10px", borderRadius: "14px", maxHeight: "92vh" },
    '@media (max-width: 380px)': { margin: "6px", borderRadius: "12px", maxHeight: "90vh", padding: theme.spacing(0.25) }
  }
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: "10px",
    '&:hover fieldset': { borderColor: "#6495ED" },
    '&.Mui-focused fieldset': { borderColor: "#6495ED", borderWidth: "2px" },
    [theme.breakpoints.down('sm')]: { borderRadius: "8px" },
    [theme.breakpoints.down('xs')]: { borderRadius: "6px" }
  },
  '& .MuiInputLabel-root': { [theme.breakpoints.down('sm')]: { fontSize: "0.85rem" }, [theme.breakpoints.down('xs')]: { fontSize: "0.75rem" } },
  '& .MuiInputBase-input': { [theme.breakpoints.down('sm')]: { fontSize: "0.85rem", padding: "10px 12px" }, [theme.breakpoints.down('xs')]: { fontSize: "0.75rem", padding: "8px 10px" } }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: "10px",
    '&:hover fieldset': { borderColor: "#6495ED" },
    '&.Mui-focused fieldset': { borderColor: "#6495ED", borderWidth: "2px" },
    [theme.breakpoints.down('sm')]: { borderRadius: "8px" },
    [theme.breakpoints.down('xs')]: { borderRadius: "6px" }
  },
  '& .MuiInputLabel-root': { [theme.breakpoints.down('sm')]: { fontSize: "0.85rem" }, [theme.breakpoints.down('xs')]: { fontSize: "0.75rem" } },
  '& .MuiInputBase-input': { [theme.breakpoints.down('sm')]: { fontSize: "0.85rem", padding: "10px 12px" }, [theme.breakpoints.down('xs')]: { fontSize: "0.75rem", padding: "8px 10px" } }
}));

// ================= MAIN COMPONENT =================
export default function BusTrip() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [drivers, setDrivers] = useState([]);
  const [conductors, setConductors] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [formData, setFormData] = useState({
    busId: "",
    routeId: "",
    driverId: "",
    conductorId: "",
    startTime: "",
    endTime: "",
    tripStatus: "",
  });

  const statusOptions = ["SCHEDULED", "ONGOING", "COMPLETED", "CANCELLED"];

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const [tripsData, busesData, routesData, driversData, conductorsData] = await Promise.all([
        busTripApi.getAll(),
        busApi.getAll(),
        busRouteApi.getAll(),
        driverApi.getAllDrivers().catch(() => []),
        conductorApi.getAllConductors().catch(() => [])
      ]);
      setTrips(tripsData);
      setBuses(busesData);
      setRoutes(routesData);
      setDrivers(driversData);
      setConductors(conductorsData);
    } catch (error) {
      console.error("Error loading data:", error);
      showSnackbar("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async () => {
    if (!formData.busId || !formData.routeId || !formData.driverId ||
        !formData.conductorId || !formData.startTime || !formData.tripStatus) {
      showSnackbar("Please fill in all required fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        busId: Number(formData.busId),
        routeId: Number(formData.routeId),
        driverId: Number(formData.driverId),
        conductorId: Number(formData.conductorId),
        startTime: formData.startTime,
        endTime: formData.endTime || null,
        tripStatus: formData.tripStatus,
      };

      const newTrip = await busTripApi.create(payload);
      setTrips([...trips, newTrip]);
      showSnackbar("Trip Added Successfully ✅", "success");
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving trip:", error);
      showSnackbar(error.message || "Error saving trip", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= DELETE =================
  const handleDeleteClick = (trip) => {
    setSelectedTrip(trip);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await busTripApi.delete(selectedTrip.id);
      setTrips(trips.filter(t => t.id !== selectedTrip.id));
      showSnackbar("Trip deleted successfully!", "success");
      setDeleteDialogOpen(false);
      setSelectedTrip(null);
    } catch (error) {
      console.error("Error deleting trip:", error);
      showSnackbar(error.message || "Error deleting trip", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= DIALOG HANDLERS =================
  const handleCloseDialog = () => {
    setOpen(false);
    setFormData({
      busId: "",
      routeId: "",
      driverId: "",
      conductorId: "",
      startTime: "",
      endTime: "",
      tripStatus: "",
    });
    setSubmitting(false);
  };

  const handleOpenDialog = () => {
    setFormData({
      busId: "",
      routeId: "",
      driverId: "",
      conductorId: "",
      startTime: "",
      endTime: "",
      tripStatus: "",
    });
    setOpen(true);
  };

  // ================= HELPERS =================
  const getStatusColor = (status) => {
    switch(status) {
      case 'SCHEDULED': return { bg: '#dbeafe', color: '#6495ED' };
      case 'ONGOING': return { bg: '#dcfce7', color: '#16a34a' };
      case 'COMPLETED': return { bg: '#fef3c7', color: '#d97706' };
      case 'CANCELLED': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? '0.75rem' : '0.875rem' }}>
              Loading trips...
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
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, gap: { xs: 1.5, sm: 2, md: 3 }, mb: { xs: 2, sm: 2.5, md: 4 } }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem", lg: "1.75rem" }, color: "#1e293b", display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, flexWrap: "wrap" }}>
                <ScheduleIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <span>Bus Trips</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" } }}>
                Manage bus trip schedules
              </Typography>
            </Box>
            <AddButton variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />} onClick={handleOpenDialog}>
              Add Trip
            </AddButton>
          </Box>

          {/* Statistics Cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" }, gap: { xs: 1, sm: 1.5, md: 2 }, mb: { xs: 2, sm: 2.5, md: 3 } }}>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>Total Trips</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>{trips.length}</Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>Ongoing</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>{trips.filter(t => t.tripStatus === 'ONGOING').length}</Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>Scheduled</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#6495ED" }}>{trips.filter(t => t.tripStatus === 'SCHEDULED').length}</Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>Completed</Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#d97706" }}>{trips.filter(t => t.tripStatus === 'COMPLETED').length}</Typography>
            </StatsCard>
          </Box>

          {/* Table/List View */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader size={isExtraSmall ? "small" : "medium"}>
                  <GradientHeader>
                    <TableRow>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>Bus</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>Route</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>Driver</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>Conductor</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>Start Time</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>End Time</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>Status</Typography></TableCell>
                      <TableCell><Typography variant="caption" sx={{ fontWeight: 700 }}>Actions</Typography></TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {trips.length > 0 ? (
                      trips.map((trip) => (
                        <StyledTableRow key={trip.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <DirectionsBusIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                              <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' }, wordBreak: 'break-word' }}>
                                {trip.bus?.busNumber || `ID: ${trip.busId}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <RouteIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.8rem' }, wordBreak: 'break-word' }}>
                                {trip.route?.routeName || `ID: ${trip.routeId}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <PersonIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.8rem' }, wordBreak: 'break-word' }}>
                                {trip.driver?.name || `ID: ${trip.driverId}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <PersonIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.8rem' }, wordBreak: 'break-word' }}>
                                {trip.conductor?.name || `ID: ${trip.conductorId}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell><Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.8rem' }, wordBreak: 'break-word' }}>{formatDate(trip.startTime)}</Typography></TableCell>
                          <TableCell><Typography variant="body2" sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.8rem' }, wordBreak: 'break-word' }}>{formatDate(trip.endTime) || '-'}</Typography></TableCell>
                          <TableCell>
                            <Chip label={trip.tripStatus} size="small" sx={{ bgcolor: getStatusColor(trip.tripStatus).bg, color: getStatusColor(trip.tripStatus).color, fontWeight: 600, fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.7rem" }, borderRadius: "6px", height: { xs: "16px", sm: "18px", md: "24px" }, minWidth: { xs: "50px", sm: "60px", md: "80px" } }} />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Delete">
                              <IconButton size={isExtraSmall ? "small" : "medium"} onClick={() => handleDeleteClick(trip)} sx={{ color: '#ef4444', padding: { xs: "2px", sm: "4px", md: "6px" } }}>
                                <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <ScheduleIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            No trips added yet
                          </Typography>
                          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ mt: 2, borderRadius: "10px", textTransform: "none", borderColor: "#6495ED", color: "#6495ED", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            Add your first trip
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
                <Stack spacing={1.5}>
                  {trips.length > 0 ? (
                    trips.map((trip, index) => (
                      <Grow in key={trip.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard>
                          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 0.5 }}>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" }, fontWeight: 500, letterSpacing: "0.5px" }}>Trip #{trip.id}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, mt: 0.25, display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}>
                                  <DirectionsBusIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                                  {trip.bus?.busNumber || `ID: ${trip.busId}`}
                                </Typography>
                              </Box>
                              <Chip label={trip.tripStatus} size="small" sx={{ bgcolor: getStatusColor(trip.tripStatus).bg, color: getStatusColor(trip.tripStatus).color, fontWeight: 600, fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" }, borderRadius: "6px", height: { xs: "20px", sm: "22px", md: "24px" }, flexShrink: 0 }} />
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: { xs: 1, sm: 1.5 }, mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>Route</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}>
                                  <RouteIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {trip.route?.routeName || `ID: ${trip.routeId}`}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>Driver</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}>
                                  <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {trip.driver?.name || `ID: ${trip.driverId}`}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>Conductor</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}>
                                  <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {trip.conductor?.name || `ID: ${trip.conductorId}`}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>Time</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" }, wordBreak: 'break-word' }}>
                                  {formatDate(trip.startTime)}
                                  {trip.endTime && ` → ${formatDate(trip.endTime)}`}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, pt: 1, borderTop: "1px solid #f1f5f9" }}>
                              <Tooltip title="Delete">
                                <IconButton size={isExtraSmall ? "small" : "medium"} onClick={() => handleDeleteClick(trip)} sx={{ color: '#ef4444', padding: { xs: "2px", sm: "4px", md: "6px" } }}>
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
                      <ScheduleIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>No trips added yet</Typography>
                      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpenDialog} sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Add first trip</Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

      {/* Add Trip Dialog */}
      <StyledDialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }, color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", pr: 0.5, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          Add New Trip
          <IconButton onClick={handleCloseDialog} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
            <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <StyledAutocomplete
                options={buses || []}
                getOptionLabel={(b) => b?.busNumber || ""}
                onChange={(e, v) => setFormData({ ...formData, busId: v?.id || "" })}
                disabled={submitting}
                renderInput={(params) => <StyledTextField {...params} label="Bus Number" fullWidth required size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledAutocomplete
                options={routes || []}
                getOptionLabel={(r) => r?.routeName || String(r.id)}
                onChange={(e, v) => setFormData({ ...formData, routeId: v?.id || "" })}
                disabled={submitting}
                renderInput={(params) => <StyledTextField {...params} label="Route" fullWidth required size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledAutocomplete
                options={drivers || []}
                getOptionLabel={(d) => d?.empId ? `${d.empId} - ${d.name}` : d?.name || ""}
                onChange={(e, v) => setFormData({ ...formData, driverId: v?.id || "" })}
                disabled={submitting}
                renderInput={(params) => <StyledTextField {...params} label="Driver" fullWidth required size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledAutocomplete
                options={conductors || []}
                getOptionLabel={(c) => c?.empId ? `${c.empId} - ${c.name}` : c?.name || ""}
                onChange={(e, v) => setFormData({ ...formData, conductorId: v?.id || "" })}
                disabled={submitting}
                renderInput={(params) => <StyledTextField {...params} label="Conductor" fullWidth required size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField fullWidth type="datetime-local" label="Start Time" required InputLabelProps={{ shrink: true }} value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} disabled={submitting} size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField fullWidth type="datetime-local" label="End Time (Optional)" InputLabelProps={{ shrink: true }} value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} disabled={submitting} size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField select fullWidth label="Trip Status" required value={formData.tripStatus} onChange={(e) => setFormData({ ...formData, tripStatus: e.target.value })} disabled={submitting} size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <MenuItem value="">Select Status</MenuItem>
                {statusOptions.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
              </StyledTextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, pt: { xs: 0.5, sm: 0.75, md: 1 }, gap: 0.5, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button onClick={handleCloseDialog} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#f1f5f9" }, flex: { xs: 1, sm: 0 }, order: { xs: 2, sm: 1 } }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", backgroundColor: "#6495ED", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, flex: { xs: 1, sm: 0 }, order: { xs: 1, sm: 2 }, '&:hover': { backgroundColor: "#4169E1" } }}>
            {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Save Trip"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Delete Confirmation Dialog */}
      <StyledDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: "#dc2626", fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, p: { xs: 1.5, sm: 2, md: 2.5 } }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography sx={{ color: "#64748b", fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>Are you sure you want to delete this trip? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, gap: 0.5, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#f1f5f9" }, order: { xs: 2, sm: 1 } }}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, order: { xs: 1, sm: 2 } }}>
            {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: { xs: '0.75rem', sm: '0.875rem' }, '& .MuiAlert-icon': { fontSize: { xs: '18px', sm: '22px' } } }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}