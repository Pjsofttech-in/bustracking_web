// src/pages/Bus/BusRoute.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Fade,
  Tooltip,
  InputAdornment,
  TableContainer as MuiTableContainer,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Route as RouteIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import busRouteApi from "../../api/busRouteApi";
import busStopApi from "../../api/busStopApi";

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
  [theme.breakpoints.down("lg")]: { padding: theme.spacing(2.5) },
  [theme.breakpoints.down("md")]: { padding: theme.spacing(2) },
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(1.5) },
  [theme.breakpoints.down("xs")]: { padding: theme.spacing(1) },
  "@media (max-width: 380px)": { padding: theme.spacing(0.75) },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(0, 0.5) },
  [theme.breakpoints.down("xs")]: { padding: 0 },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
  overflow: "hidden",
  width: "100%",
  [theme.breakpoints.down("sm")]: { borderRadius: "12px" },
  [theme.breakpoints.down("xs")]: { borderRadius: "8px" },
  "@media (max-width: 380px)": { borderRadius: "6px", margin: "0 -2px" },
}));

const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 280px)",
  minHeight: "400px",
  width: "100%",
  overflowX: "auto",
  "&::-webkit-scrollbar": { width: "6px", height: "6px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#f1f5f9", borderRadius: "4px" },
  "&::-webkit-scrollbar-thumb": { backgroundColor: "#cbd5e1", borderRadius: "4px", "&:hover": { backgroundColor: "#94a3b8" } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down("md")]: { maxHeight: "calc(100vh - 260px)", minHeight: "300px" },
  [theme.breakpoints.down("sm")]: { maxHeight: "calc(100vh - 240px)", minHeight: "250px" },
  [theme.breakpoints.down("xs")]: { maxHeight: "calc(100vh - 220px)", minHeight: "200px", "&::-webkit-scrollbar": { width: "4px", height: "4px" } },
  "@media (max-width: 380px)": { maxHeight: "calc(100vh - 200px)", minHeight: "150px" },
}));

const GradientHeader = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(135deg, #6495ED 0%, #4169E1 100%)",
  position: "sticky",
  top: 0,
  zIndex: 10,
  "& th": {
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
    [theme.breakpoints.down("lg")]: { fontSize: "0.65rem", padding: "8px 6px" },
    [theme.breakpoints.down("md")]: { fontSize: "0.6rem", padding: "6px 5px" },
    [theme.breakpoints.down("sm")]: { fontSize: "0.55rem", padding: "5px 4px", letterSpacing: "0.2px" },
    [theme.breakpoints.down("xs")]: { fontSize: "0.5rem", padding: "4px 3px", letterSpacing: "0.1px" },
    "@media (max-width: 380px)": { fontSize: "0.45rem", padding: "3px 2px" },
  },
  "& th:first-of-type": { paddingLeft: "12px", [theme.breakpoints.down("sm")]: { paddingLeft: "8px" }, [theme.breakpoints.down("xs")]: { paddingLeft: "6px" } },
  "& th:last-of-type": { paddingRight: "12px", [theme.breakpoints.down("sm")]: { paddingRight: "8px" }, [theme.breakpoints.down("xs")]: { paddingRight: "6px" } },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease",
  "&:hover": { backgroundColor: "#f8fafc" },
  "&:nth-of-type(even)": { backgroundColor: "#fafbfc" },
  "&:nth-of-type(even):hover": { backgroundColor: "#f1f5f9" },
  "& td": {
    padding: "8px 8px",
    fontSize: "0.75rem",
    borderBottom: "1px solid #f1f5f9",
    [theme.breakpoints.down("lg")]: { padding: "7px 6px", fontSize: "0.7rem" },
    [theme.breakpoints.down("md")]: { padding: "6px 5px", fontSize: "0.65rem" },
    [theme.breakpoints.down("sm")]: { padding: "5px 4px", fontSize: "0.6rem" },
    [theme.breakpoints.down("xs")]: { padding: "4px 3px", fontSize: "0.55rem" },
    "@media (max-width: 380px)": { padding: "3px 2px", fontSize: "0.5rem" },
  },
  "& td:first-of-type": { paddingLeft: "12px", [theme.breakpoints.down("sm")]: { paddingLeft: "8px" }, [theme.breakpoints.down("xs")]: { paddingLeft: "6px" } },
  "& td:last-of-type": { paddingRight: "12px", [theme.breakpoints.down("sm")]: { paddingRight: "8px" }, [theme.breakpoints.down("xs")]: { paddingRight: "6px" } },
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "6px 16px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.8rem",
  backgroundColor: "#6495ED",
  boxShadow: "0 2px 8px rgba(100, 149, 237, 0.25)",
  transition: "all 0.3s ease",
  flexShrink: 0,
  "&:hover": { backgroundColor: "#4169E1", transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(65, 105, 225, 0.35)" },
  [theme.breakpoints.down("md")]: { padding: "5px 12px", fontSize: "0.75rem" },
  [theme.breakpoints.down("sm")]: { width: "100%", padding: "8px 12px", fontSize: "0.8rem", justifyContent: "center" },
  [theme.breakpoints.down("xs")]: { padding: "6px 10px", fontSize: "0.7rem", borderRadius: "8px" },
  "@media (max-width: 380px)": { padding: "4px 8px", fontSize: "0.65rem", borderRadius: "6px" },
}));

const InlineStats = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: { gap: theme.spacing(1) },
  "& .stat-chip": {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#f1f5f9",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#1e293b",
    [theme.breakpoints.down("sm")]: { fontSize: "0.7rem", padding: "2px 10px" },
    [theme.breakpoints.down("xs")]: { fontSize: "0.65rem", padding: "2px 8px" },
    "& .num": {
      fontWeight: 700,
      color: "#6495ED",
      marginLeft: "2px",
    },
    "&.active .num": { color: "#16a34a" },
    "&.inactive .num": { color: "#d97706" },
    "&.completed .num": { color: "#2563eb" },
  },
}));

const MobileCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  width: "100%",
  "&:hover": { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)", transform: "translateY(-2px)" },
  [theme.breakpoints.down("xs")]: { borderRadius: "10px" },
  "@media (max-width: 380px)": { borderRadius: "8px" },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: { margin: "24px", padding: theme.spacing(0.75), width: "95%" },
    [theme.breakpoints.down("sm")]: { margin: "16px", width: "100%", borderRadius: "16px", maxHeight: "95vh", padding: theme.spacing(0.5) },
    [theme.breakpoints.down("xs")]: { margin: "10px", borderRadius: "14px", maxHeight: "92vh" },
    "@media (max-width: 380px)": { margin: "6px", borderRadius: "12px", maxHeight: "90vh", padding: theme.spacing(0.25) },
  },
}));

// ================= MAIN COMPONENT =================
export default function BusRoute() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isExtraSmall = useMediaQuery("(max-width: 380px)");

  // Data state
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // ---- FILTER STATE ----
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const emptyForm = {
    routeName: "",
    description: "",
    startStopId: "",
    endStopId: "",
    startTime: "",
    endTime: "",
    totalDistanceKm: "",
    estimatedTimeMin: "",
    status: "",
    stopIds: [],
  };
  const [form, setForm] = useState(emptyForm);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const sortByIdDesc = (data) => [...data].sort((a, b) => b.id - a.id);

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const [routesData, stopsData] = await Promise.all([
        busRouteApi.getAll(),
        busStopApi.getAll(),
      ]);
      const sorted = sortByIdDesc(Array.isArray(routesData) ? routesData : []);
      setRoutes(sorted);
      setStops(Array.isArray(stopsData) ? stopsData : []);
    } catch (error) {
      console.error("Error loading data:", error);
      showSnackbar("Failed to load data: " + error.message, "error");
      setRoutes([]);
      setStops([]);
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

  // ================= FILTERED ROUTES =================
  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const matchesSearch =
        route.routeName.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (route.description && route.description.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      const matchesStatus = statusFilter === "" || route.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [routes, searchQuery, statusFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
  };

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStopOrderChange = (index, direction) => {
    const newStopIds = [...form.stopIds];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newStopIds.length) return;
    [newStopIds[index], newStopIds[swapIndex]] = [newStopIds[swapIndex], newStopIds[index]];
    setForm({ ...form, stopIds: newStopIds });
  };

  const handleAddStop = (stopId) => {
    if (!stopId) return;
    if (form.stopIds.includes(stopId)) {
      showSnackbar("Stop already added", "warning");
      return;
    }
    setForm({ ...form, stopIds: [...form.stopIds, stopId] });
  };

  const handleRemoveStop = (stopId) => {
    setForm({ ...form, stopIds: form.stopIds.filter((id) => id !== stopId) });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setSelectedId(null);
  };

  const handleAddOpen = () => {
    resetForm();
    setOpenDialog(true);
  };

  const handleEditOpen = (route) => {
    setForm({
      routeName: route.routeName || "",
      description: route.description || "",
      startStopId: route.startStopId || "",
      endStopId: route.endStopId || "",
      startTime: route.startTime || "",
      endTime: route.endTime || "",
      totalDistanceKm: route.totalDistanceKm || "",
      estimatedTimeMin: route.estimatedTimeMin || "",
      status: route.status || "",
      stopIds: route.stops ? route.stops.map((s) => s.stopId) : [],
    });
    setIsEdit(true);
    setSelectedId(route.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const handleSubmit = async () => {
    const { routeName, stopIds } = form;
    if (!routeName || stopIds.length === 0) {
      showSnackbar("Route name and at least one stop are required", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        routeName: routeName.trim(),
        description: form.description?.trim() || "",
        startStopId: form.startStopId ? Number(form.startStopId) : null,
        endStopId: form.endStopId ? Number(form.endStopId) : null,
        startTime: form.startTime || null,
        endTime: form.endTime || null,
        totalDistanceKm: form.totalDistanceKm ? Number(form.totalDistanceKm) : null,
        estimatedTimeMin: form.estimatedTimeMin ? Number(form.estimatedTimeMin) : null,
        status: form.status || null,
        stopIds: stopIds.map(Number),
      };

      let result;
      if (isEdit) {
        result = await busRouteApi.update(selectedId, payload);
        const updated = sortByIdDesc(routes.map((r) => (r.id === selectedId ? result : r)));
        setRoutes(updated);
        showSnackbar("Route updated successfully!", "success");
      } else {
        result = await busRouteApi.create(payload);
        const updated = sortByIdDesc([...routes, result]);
        setRoutes(updated);
        showSnackbar("Route added successfully!", "success");
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving route:", error);
      showSnackbar(error.message || "Failed to save route", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await busRouteApi.delete(selectedId);
      const updated = sortByIdDesc(routes.filter((r) => r.id !== selectedId));
      setRoutes(updated);
      showSnackbar("Route deleted successfully!", "success");
      setDeleteDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error deleting route:", error);
      showSnackbar(error.message || "Failed to delete route", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE": return { bg: "#dcfce7", color: "#16a34a" };
      case "INACTIVE": return { bg: "#fef3c7", color: "#d97706" };
      case "COMPLETED": return { bg: "#dbeafe", color: "#2563eb" };
      default: return { bg: "#f1f5f9", color: "#64748b" };
    }
  };

  const getStopName = (id) => {
    const stop = stops.find((s) => s.id === id);
    return stop ? stop.stopName : "Unknown";
  };

  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? "0.75rem" : "0.875rem" }}>
              Loading routes...
            </Typography>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          {/* Header with inline stats and Add button */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" }, 
            justifyContent: "space-between", 
            alignItems: { xs: "stretch", sm: "center" }, 
            gap: { xs: 1, sm: 2 }, 
            mb: { xs: 2, sm: 2 } 
          }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <RouteIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, color: "#1e293b" }}>
                  Bus Routes
                </Typography>
              </Box>
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{routes.length}</span></span>
                <span className="stat-chip active">Active <span className="num">{routes.filter(r => r.status === 'ACTIVE').length}</span></span>
                <span className="stat-chip inactive">Inactive <span className="num">{routes.filter(r => r.status === 'INACTIVE').length}</span></span>
                <span className="stat-chip completed">Completed <span className="num">{routes.filter(r => r.status === 'COMPLETED').length}</span></span>
              </InlineStats>
            </Box>
            <AddButton variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />} onClick={handleAddOpen}>
              Add Route
            </AddButton>
          </Box>

          {/* ===== FILTER BAR ===== */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: { xs: 'stretch', sm: 'center' }, 
            gap: 2, 
            mb: 2,
            p: { xs: 1, sm: 1.5 },
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap'
          }}>
            <TextField
              placeholder="Search routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                minWidth: { xs: '100%', sm: '200px' },
                maxWidth: { xs: '100%', sm: '260px' },
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  '& fieldset': { borderColor: '#e2e8f0' },
                  '&:hover fieldset': { borderColor: '#6495ED' },
                  '&.Mui-focused fieldset': { borderColor: '#6495ED' }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.5 }}>
                      <ClearIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '140px' }, flex: 1 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
              </Select>
            </FormControl>

            {(searchQuery || statusFilter) && (
              <Button 
                variant="text" 
                onClick={clearFilters} 
                size="small" 
                sx={{ 
                  color: '#64748b', 
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { backgroundColor: 'transparent', color: '#1e293b' }
                }}
                startIcon={<ClearIcon sx={{ fontSize: 18 }} />}
              >
                Clear
              </Button>
            )}
          </Box>

          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader sx={{ minWidth: 1200 }}>
                  <GradientHeader>
                    <TableRow>
                      <TableCell sx={{ minWidth: '60px' }}>ID</TableCell>
                      <TableCell sx={{ minWidth: '150px' }}>Route Name</TableCell>
                      <TableCell sx={{ minWidth: '140px' }}>Description</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>Start</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>End</TableCell>
                      <TableCell sx={{ minWidth: '130px' }}>Time</TableCell>
                      <TableCell sx={{ minWidth: '100px' }}>Distance</TableCell>
                      <TableCell sx={{ minWidth: '100px' }}>Est. Time</TableCell>
                      <TableCell sx={{ minWidth: '70px' }} align="center">Stops</TableCell>
                      <TableCell sx={{ minWidth: '100px' }} align="center">Status</TableCell>
                      <TableCell sx={{ minWidth: '100px' }} align="center">Actions</TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {filteredRoutes.length > 0 ? (
                      filteredRoutes.map((r) => (
                        <StyledTableRow key={r.id} onClick={() => handleEditOpen(r)}>
                          <TableCell sx={{ fontWeight: 600 }}>{r.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <RouteIcon sx={{ fontSize: 14, color: "#6495ED" }} />
                              <Typography sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>{r.routeName}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ maxWidth: 120, wordBreak: "break-word", fontSize: { xs: "0.6rem", sm: "0.7rem" } }}>{r.description || "-"}</TableCell>
                          <TableCell>{r.startStopName || "-"}</TableCell>
                          <TableCell>{r.endStopName || "-"}</TableCell>
                          <TableCell>{r.startTime && r.endTime ? `${r.startTime} - ${r.endTime}` : "-"}</TableCell>
                          <TableCell>{r.totalDistanceKm ? `${r.totalDistanceKm} km` : "-"}</TableCell>
                          <TableCell>{r.estimatedTimeMin ? `${r.estimatedTimeMin} min` : "-"}</TableCell>
                          <TableCell align="center">
                            <Chip label={r.stops ? r.stops.length : 0} size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontWeight: 600 }} />
                          </TableCell>
                          <TableCell align="center">
                            <Chip label={r.status} size="small" sx={{ bgcolor: getStatusColor(r.status).bg, color: getStatusColor(r.status).color, fontWeight: 600, minWidth: "60px" }} />
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                              <Tooltip title="Edit">
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleEditOpen(r); }} sx={{ color: "#f59e0b" }}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); setSelectedId(r.id); setDeleteDialogOpen(true); }} sx={{ color: "#ef4444" }}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={11} align="center" sx={{ py: 6 }}>
                          <RouteIcon sx={{ fontSize: 40, opacity: 0.3, display: "block", margin: "0 auto 8px" }} />
                          <Typography color="text.secondary">
                            {routes.length === 0 ? "No bus routes added yet" : "No routes match your filters"}
                          </Typography>
                          {routes.length === 0 && (
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                              Add your first route
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
                <Stack spacing={1.5}>
                  {filteredRoutes.length > 0 ? (
                    filteredRoutes.map((r, index) => (
                      <Fade in key={r.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard onClick={() => handleEditOpen(r)}>
                          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" } }}>Route #{r.id}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" }, display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <RouteIcon sx={{ color: "#6495ED", fontSize: 18 }} />
                                  <span style={{ wordBreak: "break-word" }}>{r.routeName}</span>
                                </Typography>
                              </Box>
                              <Chip label={r.status} size="small" sx={{ bgcolor: getStatusColor(r.status).bg, color: getStatusColor(r.status).color, fontWeight: 600, fontSize: { xs: "0.55rem", sm: "0.6rem" }, height: { xs: "20px", sm: "24px" }, ml: 1, flexShrink: 0 }} />
                            </Box>

                            {r.description && (
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>{r.description}</Typography>
                            )}

                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: { xs: 0.5, sm: 1 }, mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem" } }}>Start</Typography>
                                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" }, display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#94a3b8" }} />
                                  {r.startStopName || "-"}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem" } }}>End</Typography>
                                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" }, display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#94a3b8" }} />
                                  {r.endStopName || "-"}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem" } }}>Time</Typography>
                                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>
                                  {r.startTime && r.endTime ? `${r.startTime} - ${r.endTime}` : "-"}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem" } }}>Distance</Typography>
                                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>{r.totalDistanceKm ? `${r.totalDistanceKm} km` : "-"}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem" } }}>Est. Time</Typography>
                                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>{r.estimatedTimeMin ? `${r.estimatedTimeMin} min` : "-"}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem" } }}>Stops</Typography>
                                <Typography variant="body2" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>{r.stops ? r.stops.length : 0}</Typography>
                              </Box>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
                              <Button size="small" startIcon={<EditIcon />} onClick={(e) => { e.stopPropagation(); handleEditOpen(r); }}>Edit</Button>
                              <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={(e) => { e.stopPropagation(); setSelectedId(r.id); setDeleteDialogOpen(true); }}>Delete</Button>
                            </Box>
                          </CardContent>
                        </MobileCard>
                      </Fade>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <RouteIcon sx={{ fontSize: 48, opacity: 0.2, mb: 2 }} />
                      <Typography color="text.secondary">
                        {routes.length === 0 ? "No bus routes added yet" : "No routes match your filters"}
                      </Typography>
                      {routes.length === 0 && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                          Add first route
                        </Button>
                      )}
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

      {/* ================= ADD/EDIT DIALOG ================= */}
      <StyledDialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", pr: 0.5, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <span>{isEdit ? "Edit Route" : "Add New Route"}</span>
          <IconButton onClick={handleCloseDialog} disabled={submitting} size={isExtraSmall ? "small" : "medium"}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Route Name"
                name="routeName"
                value={form.routeName}
                onChange={handleChange}
                disabled={submitting}
                required
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><RouteIcon sx={{ color: "#94a3b8" }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={form.description}
                onChange={handleChange}
                disabled={submitting}
                multiline
                rows={2}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={submitting} size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <InputLabel>Start Stop</InputLabel>
                <Select
                  name="startStopId"
                  value={form.startStopId}
                  onChange={handleChange}
                  label="Start Stop"
                >
                  <MenuItem value="">None</MenuItem>
                  {Array.isArray(stops) && stops.map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.stopName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled={submitting} size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <InputLabel>End Stop</InputLabel>
                <Select
                  name="endStopId"
                  value={form.endStopId}
                  onChange={handleChange}
                  label="End Stop"
                >
                  <MenuItem value="">None</MenuItem>
                  {Array.isArray(stops) && stops.map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.stopName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Time"
                name="startTime"
                type="time"
                value={form.startTime}
                onChange={handleChange}
                disabled={submitting}
                InputLabelProps={{ shrink: true }}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccessTimeIcon sx={{ color: "#94a3b8" }} /></InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Time"
                name="endTime"
                type="time"
                value={form.endTime}
                onChange={handleChange}
                disabled={submitting}
                InputLabelProps={{ shrink: true }}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccessTimeIcon sx={{ color: "#94a3b8" }} /></InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Distance (km)"
                name="totalDistanceKm"
                type="number"
                value={form.totalDistanceKm}
                onChange={handleChange}
                disabled={submitting}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                InputProps={{
                  inputProps: { step: "0.01", min: 0 },
                  endAdornment: <InputAdornment position="end">km</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Time (min)"
                name="estimatedTimeMin"
                type="number"
                value={form.estimatedTimeMin}
                onChange={handleChange}
                disabled={submitting}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: <InputAdornment position="end">min</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth disabled={submitting} size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="ACTIVE">Active</MenuItem>
                  <MenuItem value="INACTIVE">Inactive</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Stop Selection & Ordering */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Stops (ordered)</Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                <FormControl fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} sx={{ flex: 1, minWidth: "150px" }}>
                  <InputLabel>Add Stop</InputLabel>
                  <Select
                    value=""
                    onChange={(e) => handleAddStop(e.target.value)}
                    label="Add Stop"
                  >
                    <MenuItem value="">Select a stop</MenuItem>
                    {Array.isArray(stops) && stops.map((s) => (
                      <MenuItem key={s.id} value={s.id} disabled={form.stopIds.includes(s.id)}>
                        {s.stopName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="outlined" onClick={() => {}} sx={{ flexShrink: 0 }}>Add</Button>
              </Box>

              {form.stopIds.length > 0 ? (
                <List dense sx={{ border: "1px solid #e2e8f0", borderRadius: "10px", p: 0 }}>
                  {form.stopIds.map((id, index) => (
                    <ListItem key={id} divider={index < form.stopIds.length - 1} sx={{ "&:hover": { backgroundColor: "#f8fafc" } }}>
                      <ListItemText primary={`${index + 1}. ${getStopName(id)}`} primaryTypographyProps={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }} />
                      <ListItemSecondaryAction>
                        <IconButton size="small" onClick={() => handleStopOrderChange(index, "up")} disabled={index === 0} sx={{ color: "#64748b" }}>
                          <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleStopOrderChange(index, "down")} disabled={index === form.stopIds.length - 1} sx={{ color: "#64748b" }}>
                          <ArrowDownwardIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleRemoveStop(id)} sx={{ color: "#ef4444" }}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                  No stops added. Select a stop above and click Add.
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, pt: { xs: 0.5, sm: 0.75, md: 1 }, gap: 0.5, flexWrap: "wrap", flexDirection: { xs: "column", sm: "row" } }}>
          <Button onClick={handleCloseDialog} disabled={submitting} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", width: { xs: "100%", sm: "auto" }, order: { xs: 2, sm: 1 }, "&:hover": { backgroundColor: "#f1f5f9" } }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{ textTransform: "none", borderRadius: "10px", backgroundColor: "#6495ED", fontWeight: 600, px: 3, width: { xs: "100%", sm: "auto" }, order: { xs: 1, sm: 2 }, "&:hover": { backgroundColor: "#4169E1" } }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : isEdit ? "Update Route" : "Save Route"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* ================= DELETE CONFIRMATION ================= */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: { xs: "16px", sm: "20px" }, p: { xs: 0.5, sm: 1 } } }}>
        <DialogTitle sx={{ fontWeight: 700, color: "#dc2626", fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography sx={{ color: "#64748b", fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" } }}>
            Are you sure you want to delete this route? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, gap: 0.5, flexDirection: { xs: "column", sm: "row" } }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={submitting} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", width: { xs: "100%", sm: "auto" }, order: { xs: 2, sm: 1 }, "&:hover": { backgroundColor: "#f1f5f9" } }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={submitting} sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, px: 3, width: { xs: "100%", sm: "auto" }, order: { xs: 1, sm: 2 } }}>
            {submitting ? <CircularProgress size={24} color="inherit" /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= SNACKBAR ================= */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ "& .MuiSnackbarContent-root": { [theme.breakpoints.down("xs")]: { minWidth: "auto", width: "95%" } } }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}