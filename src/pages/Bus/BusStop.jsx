// src/pages/BusStop/BusStop.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  Box, TextField, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Chip,
  Snackbar, Alert, CircularProgress, useTheme, useMediaQuery, Card, CardContent,
  Stack, Fade, Grow, Tooltip, Grid, InputAdornment,
  TableContainer as MuiTableContainer,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PlaceIcon from "@mui/icons-material/Place";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import busStopApi from "../../api/busStopApi";

// ================= FIX LEAFLET DEFAULT ICONS =================
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

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
  maxWidth: "1200px",
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
  maxHeight: "calc(100vh - 280px)",
  minHeight: "400px",
  width: "100%",
  overflowX: "auto",
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '4px', '&:hover': { backgroundColor: '#94a3b8' } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: { maxHeight: "calc(100vh - 260px)", minHeight: "300px" },
  [theme.breakpoints.down('sm')]: { maxHeight: "calc(100vh - 240px)", minHeight: "250px" },
  [theme.breakpoints.down('xs')]: { maxHeight: "calc(100vh - 220px)", minHeight: "200px", '&::-webkit-scrollbar': { width: '4px', height: '4px' } },
  '@media (max-width: 380px)': { maxHeight: "calc(100vh - 200px)", minHeight: "150px" }
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
  cursor: "pointer",
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
  borderRadius: "10px",
  padding: "6px 16px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.8rem",
  backgroundColor: "#6495ED",
  boxShadow: "0 2px 8px rgba(100, 149, 237, 0.25)",
  transition: "all 0.3s ease",
  flexShrink: 0,
  '&:hover': { backgroundColor: "#4169E1", transform: "translateY(-1px)", boxShadow: "0 4px 12px rgba(65, 105, 225, 0.35)" },
  [theme.breakpoints.down('md')]: { padding: "5px 12px", fontSize: "0.75rem" },
  [theme.breakpoints.down('sm')]: { width: "100%", padding: "8px 12px", fontSize: "0.8rem", justifyContent: "center" },
  [theme.breakpoints.down('xs')]: { padding: "6px 10px", fontSize: "0.7rem", borderRadius: "8px" },
  '@media (max-width: 380px)': { padding: "4px 8px", fontSize: "0.65rem", borderRadius: "6px" }
}));

const InlineStats = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
  [theme.breakpoints.down('sm')]: { gap: theme.spacing(1) },
  '& .stat-chip': {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#f1f5f9",
    borderRadius: "20px",
    padding: "4px 14px",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "#1e293b",
    [theme.breakpoints.down('sm')]: { fontSize: "0.7rem", padding: "2px 10px" },
    [theme.breakpoints.down('xs')]: { fontSize: "0.65rem", padding: "2px 8px" },
    '& .num': {
      fontWeight: 700,
      color: "#6495ED",
      marginLeft: "2px",
    },
    '&.pending .num': { color: "#d97706" },
    '&.reached .num': { color: "#16a34a" },
  }
}));

const MobileCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  width: "100%",
  '&:hover': { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)", transform: "translateY(-2px)" },
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

// ================= MAP COMPONENTS =================
function LocationMarker({ position, setForm, form }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setForm({
        ...form,
        latitude: lat,
        longitude: lng
      });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = {
    dragend(e) {
      const { lat, lng } = e.target.getLatLng();
      setForm({
        ...form,
        latitude: lat,
        longitude: lng
      });
    },
  };

  if (position) {
    return <Marker position={position} draggable={true} eventHandlers={eventHandlers} />;
  }
  return null;
}

function GeocoderControl({ setForm, form }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!L.Control.geocoder) {
      console.warn("Leaflet geocoder not loaded");
      return;
    }

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: true,
      collapsed: false,
      position: "topleft",
      placeholder: "Search for a place...",
    })
    .on("markgeocode", function(e) {
      const { lat, lng } = e.geocode.center;
      setForm({
        ...form,
        stopName: e.geocode.name,
        latitude: lat,
        longitude: lng
      });
      map.flyTo([lat, lng], 15);
    })
    .addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map, setForm, form]);

  return null;
}

// ================= MAIN COMPONENT =================
export default function BusStop() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const emptyForm = { 
    stopName: "", 
    latitude: "", 
    longitude: ""
  };

  const [stops, setStops] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editMode, setEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [mapCenter, setMapCenter] = useState({ lat: 19.0760, lng: 72.8777 });

  // ---- FILTER STATE ----
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const sortByIdDesc = (data) => [...data].sort((a, b) => b.id - a.id);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await busStopApi.getAll();
      const sorted = sortByIdDesc(Array.isArray(data) ? data : []);
      setStops(sorted);
    } catch (error) {
      console.error("Error loading data:", error);
      showSnackbar("Failed to load bus stops", "error");
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

  // ================= FILTERED STOPS =================
  const filteredStops = useMemo(() => {
    return stops.filter(stop => {
      const matchesSearch = stop.stopName.toLowerCase().includes(searchQuery.toLowerCase().trim());
      let matchesStatus = true;
      if (statusFilter === 'pending') {
        matchesStatus = !stop.reached;
      } else if (statusFilter === 'reached') {
        matchesStatus = stop.reached;
      }
      return matchesSearch && matchesStatus;
    });
  }, [stops, searchQuery, statusFilter]);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOpen = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setIsAddMode(true);
    setEditMode(true);
    setOpen(true);
    setMapCenter({ lat: 19.0760, lng: 72.8777 });
  };

  const handleRowClick = (row) => {
    setSelectedId(row.id);
    setForm({
      stopName: row.stopName || "",
      latitude: row.latitude || "",
      longitude: row.longitude || ""
    });
    if (row.latitude && row.longitude) {
      setMapCenter({ lat: row.latitude, lng: row.longitude });
    }
    setIsAddMode(false);
    setEditMode(false);
    setOpen(true);
  };

  const handleEnableEdit = () => setEditMode(true);

  const handleCloseDialog = () => {
    setOpen(false);
    setEditMode(false);
    setIsAddMode(false);
    setForm(emptyForm);
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!form.stopName || !form.latitude || !form.longitude) {
      showSnackbar("Please fill all required fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        stopName: form.stopName,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude)
      };

      if (isAddMode) {
        const newStop = await busStopApi.create(payload);
        const updated = sortByIdDesc([...stops, newStop]);
        setStops(updated);
        showSnackbar("Bus stop added successfully!", "success");
      } else {
        const updatedStop = await busStopApi.update(selectedId, payload);
        const updated = sortByIdDesc(stops.map(s => s.id === selectedId ? updatedStop : s));
        setStops(updated);
        showSnackbar("Bus stop updated successfully!", "success");
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving stop:", error);
      showSnackbar(error.message || "Failed to save bus stop", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = () => setConfirmOpen(true);

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await busStopApi.delete(selectedId);
      const updated = sortByIdDesc(stops.filter(s => s.id !== selectedId));
      setStops(updated);
      showSnackbar("Bus stop deleted successfully!", "success");
      setConfirmOpen(false);
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting stop:", error);
      showSnackbar(error.message || "Failed to delete bus stop", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkReached = async (stopId) => {
    try {
      const updatedStop = await busStopApi.markReached(stopId);
      const updated = sortByIdDesc(stops.map(s => s.id === stopId ? updatedStop : s));
      setStops(updated);
      showSnackbar("Stop marked as reached!", "success");
    } catch (error) {
      console.error("Error marking stop as reached:", error);
      showSnackbar(error.message || "Failed to mark stop as reached", "error");
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? '0.75rem' : '0.875rem' }}>
              Loading bus stops...
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
          {/* Header */}
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
                <PlaceIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, color: "#1e293b" }}>
                  Bus Stops
                </Typography>
              </Box>
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{stops.length}</span></span>
                <span className="stat-chip pending">Pending <span className="num">{stops.filter(s => !s.reached).length}</span></span>
                <span className="stat-chip reached">Reached <span className="num">{stops.filter(s => s.reached).length}</span></span>
              </InlineStats>
            </Box>
            <AddButton variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />} onClick={handleAddOpen}>
              Add Stop
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
              placeholder="Search by stop name..."
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
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="reached">Reached</MenuItem>
              </Select>
            </FormControl>

            {(searchQuery || statusFilter !== 'all') && (
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

          {/* Table/Cards */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader sx={{ minWidth: 700 }}>
                  <GradientHeader>
                    <TableRow>
                      <TableCell sx={{ minWidth: '60px' }}>ID</TableCell>
                      <TableCell sx={{ minWidth: '200px' }}>Stop Name</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>Latitude</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>Longitude</TableCell>
                      <TableCell sx={{ minWidth: '100px' }} align="center">Status</TableCell>
                      <TableCell sx={{ minWidth: '120px' }} align="center">Actions</TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {filteredStops.length > 0 ? (
                      filteredStops.map((s) => (
                        <StyledTableRow key={s.id} onClick={() => handleRowClick(s)}>
                          <TableCell sx={{ fontWeight: 600 }}>{s.id}</TableCell>
                          <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><LocationOnIcon sx={{ fontSize: 14, color: "#6495ED" }} /><Typography sx={{ fontWeight: 500, fontSize: '0.85rem' }}>{s.stopName}</Typography></Box></TableCell>
                          <TableCell sx={{ fontFamily: "monospace" }}>{s.latitude}</TableCell>
                          <TableCell sx={{ fontFamily: "monospace" }}>{s.longitude}</TableCell>
                          <TableCell align="center"><Chip label={s.reached ? "Reached" : "Pending"} size="small" sx={{ bgcolor: s.reached ? "#dcfce7" : "#fef3c7", color: s.reached ? "#16a34a" : "#d97706", fontWeight: 600, minWidth: "70px" }} /></TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                              {!s.reached && (
                                <Tooltip title="Mark as Reached">
                                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleMarkReached(s.id); }} sx={{ color: '#22c55e' }}>
                                    <MyLocationIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                              <Tooltip title="Delete">
                                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDeleteClick(); setSelectedId(s.id); }} sx={{ color: '#ef4444' }}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                          <PlaceIcon sx={{ fontSize: 40, opacity: 0.3, display: 'block', margin: '0 auto 8px' }} />
                          <Typography color="text.secondary">
                            {stops.length === 0 ? 'No bus stops added yet' : 'No stops match your filters'}
                          </Typography>
                          {stops.length === 0 && (
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                              Add your first stop
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
                <Stack spacing={1.5}>
                  {filteredStops.length > 0 ? (
                    filteredStops.map(s => (
                      <MobileCard key={s.id} onClick={() => handleRowClick(s)}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box><Typography variant="caption" color="text.secondary">Stop #{s.id}</Typography><Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><LocationOnIcon sx={{ color: "#6495ED" }} />{s.stopName}</Typography></Box>
                            <Chip label={s.reached ? "Reached" : "Pending"} size="small" sx={{ bgcolor: s.reached ? "#dcfce7" : "#fef3c7", color: s.reached ? "#16a34a" : "#d97706" }} />
                          </Box>
                          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1 }}>
                            <Box><Typography variant="caption" color="text.secondary">Latitude</Typography><Typography variant="body2" sx={{ fontFamily: "monospace" }}>{s.latitude}</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">Longitude</Typography><Typography variant="body2" sx={{ fontFamily: "monospace" }}>{s.longitude}</Typography></Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, pt: 1, borderTop: '1px solid #f1f5f9' }}>
                            <Typography variant="caption" color="text.secondary">Click to view details</Typography>
                            {!s.reached && (
                              <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); handleMarkReached(s.id); }} sx={{ borderColor: "#22c55e", color: "#22c55e" }}>
                                <MyLocationIcon sx={{ fontSize: 14, mr: 0.5 }} /> Mark Reached
                              </Button>
                            )}
                          </Box>
                        </CardContent>
                      </MobileCard>
                    ))
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <PlaceIcon sx={{ fontSize: 48, opacity: 0.2, mb: 2 }} />
                      <Typography color="text.secondary">
                        {stops.length === 0 ? 'No bus stops added yet' : 'No stops match your filters'}
                      </Typography>
                      {stops.length === 0 && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                          Add first stop
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

      {/* ================= DIALOG ================= */}
      <StyledDialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
          <span>{isAddMode ? "Add Bus Stop" : "Bus Stop Details"}</span>
          <Box>
            {!isAddMode && (
              <>
                <Tooltip title="Edit"><IconButton onClick={handleEnableEdit}><EditIcon sx={{ color: "#6495ED" }} /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton onClick={handleDeleteClick}><DeleteIcon sx={{ color: "#ef4444" }} /></IconButton></Tooltip>
              </>
            )}
            <IconButton onClick={handleCloseDialog}><CloseIcon /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <StyledTextField
                label="Stop Name"
                name="stopName"
                value={form.stopName}
                onChange={handleChange}
                disabled={!editMode || submitting}
                fullWidth
                placeholder="Enter stop name"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{ color: '#94a3b8' }} /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Latitude"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                disabled={!editMode || submitting}
                fullWidth
                type="number"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><MyLocationIcon sx={{ color: '#94a3b8' }} /></InputAdornment>
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StyledTextField
                label="Longitude"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                disabled={!editMode || submitting}
                fullWidth
                type="number"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start"><MyLocationIcon sx={{ color: '#94a3b8' }} /></InputAdornment>
                }}
              />
            </Grid>
            {editMode && (
              <Grid item xs={12}>
                <Box sx={{ height: 350, width: '100%', mt: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <MapContainer
                    center={[mapCenter.lat, mapCenter.lng]}
                    zoom={14}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={!isMobile}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker
                      position={form.latitude && form.longitude ? [Number(form.latitude), Number(form.longitude)] : null}
                      setForm={setForm}
                      form={form}
                    />
                    <GeocoderControl setForm={setForm} form={form} />
                  </MapContainer>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  🔍 Search for a place, click on the map to set location, or drag the marker to adjust.
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitting}>Close</Button>
          {editMode && (
            <Button variant="contained" onClick={handleSubmit} disabled={submitting} sx={{ bgcolor: "#6495ED", '&:hover': { bgcolor: "#4169E1" } }}>
              {submitting ? <CircularProgress size={24} /> : (isAddMode ? "Save" : "Update")}
            </Button>
          )}
        </DialogActions>
      </StyledDialog>

      {/* Delete Confirmation */}
      <StyledDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: "#dc2626" }}>Confirm Delete</DialogTitle>
        <DialogContent><Typography>Are you sure you want to delete this bus stop?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={submitting}>
            {submitting ? <CircularProgress size={24} /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}