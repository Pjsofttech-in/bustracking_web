// src/pages/Bus/BusLocation.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  DirectionsBus as DirectionsBusIcon,
  History as HistoryIcon,
  MyLocation as MyLocationIcon,
  Speed as SpeedIcon,
  Explore as CompassIcon,
  LocationOn as LocationOnIcon,
  PlayArrow as PlayArrowIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import busApi from "../../api/busApi";
import busLocationApi from "../../api/busLocationApi";

// Fix Leaflet default icon paths
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
  padding: theme.spacing(3),
  width: "100%",
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(2), borderRadius: "12px" },
  [theme.breakpoints.down('xs')]: { padding: theme.spacing(1.5), borderRadius: "10px" },
  '@media (max-width: 380px)': { padding: theme.spacing(1), borderRadius: "8px" }
}));

const MapWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e2e8f0",
  position: "relative",
  [theme.breakpoints.down('lg')]: { height: "450px" },
  [theme.breakpoints.down('md')]: { height: "400px" },
  [theme.breakpoints.down('sm')]: { height: "300px", borderRadius: "10px" },
  [theme.breakpoints.down('xs')]: { height: "250px", borderRadius: "8px" },
  '@media (max-width: 380px)': { height: "200px", borderRadius: "6px" },
  "& .leaflet-container": {
    width: "100%",
    height: "100%",
  },
  // Hide zoom controls on mobile
  "& .leaflet-control-zoom": {
    [theme.breakpoints.down('sm')]: {
      display: "none",
    },
  }
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  width: "100%",
  '&:hover': { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)" },
  [theme.breakpoints.down('md')]: { padding: theme.spacing(1.5) },
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.2), borderRadius: "10px" },
  [theme.breakpoints.down('xs')]: { padding: theme.spacing(1), borderRadius: "8px" },
  '@media (max-width: 380px)': { padding: theme.spacing(0.75), borderRadius: "6px" }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: { fontSize: "0.65rem", padding: "6px 4px" },
  [theme.breakpoints.down('xs')]: { fontSize: "0.55rem", padding: "4px 3px" }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': { backgroundColor: "#f8fafc" },
  '& td': {
    [theme.breakpoints.down('sm')]: { fontSize: "0.6rem", padding: "4px 3px" },
    [theme.breakpoints.down('xs')]: { fontSize: "0.5rem", padding: "3px 2px" }
  }
}));

// ================= MAP COMPONENT =================
function BusMap({ position, busNumber, status }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 15, { duration: 1 });
    }
  }, [position, map]);

  if (!position) return null;

  const busIcon = L.divIcon({
    className: "custom-bus-marker",
    html: `<div style="
      background: #6495ED;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: 2px solid white;
      font-size: 16px;
    ">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
      </svg>
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: pulse 2s infinite;
        border: 2px solid rgba(100,149,237,0.3);
      "/>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20],
  });

  return (
    <Marker position={[position.lat, position.lng]} icon={busIcon}>
      <Popup>
        <Box sx={{ minWidth: 150 }}>
          <Typography variant="subtitle2" fontWeight={600}>Bus {busNumber}</Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </Typography>
          <Chip label={status || "Unknown"} size="small" sx={{ mt: 0.5, fontSize: "0.6rem" }} />
        </Box>
      </Popup>
    </Marker>
  );
}

// ================= MAIN COMPONENT =================
export default function BusLocation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  // State
  const [selectedBus, setSelectedBus] = useState("");
  const [buses, setBuses] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Default map center (Pune)
  const defaultCenter = { lat: 18.5204, lng: 73.8567 };

  // Bus colors
  const busColors = {
    1: "#6495ED",
    2: "#22c55e",
    3: "#f59e0b",
    4: "#ef4444",
    5: "#8b5cf6",
    6: "#ec4899",
    7: "#14b8a6",
    8: "#f97316"
  };

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const busesData = await busApi.getAll();
      setBuses(busesData);
      if (busesData && busesData.length > 0) {
        const firstBus = busesData[0];
        setSelectedBus(firstBus.id.toString());
        await loadLocation(firstBus.id);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      showSnackbar("Failed to load buses", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadLocation = async (busId) => {
    try {
      const latest = await busLocationApi.getLatest(busId);
      setCurrentLocation(latest);
      const history = await busLocationApi.getHistory(busId, 20);
      setLocationHistory(history || []);
    } catch (error) {
      console.error("Error loading location:", error);
      // Fallback to mock if no data
      const mockLoc = {
        id: 1,
        busId: busId,
        latitude: 18.5204 + (Math.random() - 0.5) * 0.01,
        longitude: 73.8567 + (Math.random() - 0.5) * 0.01,
        speed: Math.floor(Math.random() * 60) + 10,
        heading: Math.floor(Math.random() * 360),
        directionName: ["North","South","East","West"][Math.floor(Math.random()*4)],
        status: "ON_ROUTE",
        timestamp: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      setCurrentLocation(mockLoc);
      const mockHistory = [];
      for (let i = 0; i < 10; i++) {
        mockHistory.push({
          ...mockLoc,
          id: i,
          latitude: mockLoc.latitude + (Math.random() - 0.5) * 0.02,
          longitude: mockLoc.longitude + (Math.random() - 0.5) * 0.02,
          timestamp: new Date(Date.now() - i * 300000).toISOString(),
          createdAt: new Date(Date.now() - i * 300000).toISOString()
        });
      }
      setLocationHistory(mockHistory);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      if (selectedBus) refreshLocation();
    }, 30000);
    return () => clearInterval(interval);
  }, [selectedBus]);

  // ================= REFRESH =================
  const refreshLocation = async () => {
    if (!selectedBus) return;
    setRefreshing(true);
    try {
      await loadLocation(Number(selectedBus));
      showSnackbar("Location updated!", "success");
    } catch (error) {
      showSnackbar("Failed to refresh location", "error");
    } finally {
      setRefreshing(false);
    }
  };

  // ================= SIMULATE MOVEMENT =================
  const simulateMovement = async () => {
    if (!selectedBus) return;
    setSimulating(true);
    const busId = Number(selectedBus);
    // Generate a new random location within ~500m radius
    const lat = 18.5204 + (Math.random() - 0.5) * 0.01;
    const lng = 73.8567 + (Math.random() - 0.5) * 0.01;
    const speed = Math.floor(Math.random() * 60) + 10;
    const heading = Math.floor(Math.random() * 360);
    const directionId = Math.floor(heading / 45) + 1; // crude mapping

    try {
      await busLocationApi.save({
        busId,
        latitude: lat,
        longitude: lng,
        speed,
        heading,
        directionId,
        status: "ON_ROUTE"
      });
      await loadLocation(busId);
      showSnackbar("Simulated movement sent!", "success");
    } catch (error) {
      console.error("Simulation error:", error);
      showSnackbar("Simulation failed", "error");
    } finally {
      setSimulating(false);
    }
  };

  const handleBusChange = async (e) => {
    const busId = e.target.value;
    setSelectedBus(busId);
    await loadLocation(Number(busId));
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    } catch { return dateString; }
  };

  const getStatusColor = (status) => {
    if (status === 'ON_ROUTE' || status === 'ACTIVE') return { bg: '#dcfce7', color: '#16a34a' };
    if (status === 'STOPPED') return { bg: '#fef3c7', color: '#d97706' };
    if (status === 'OFFLINE' || status === 'BREAKDOWN') return { bg: '#fee2e2', color: '#dc2626' };
    return { bg: '#f1f5f9', color: '#64748b' };
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: '#6495ED' }} />
            <Typography variant="body2" color="text.secondary">Loading bus locations...</Typography>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

  const mapPosition = currentLocation ? { lat: currentLocation.latitude, lng: currentLocation.longitude } : null;

  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 2.5, md: 3 }, gap: 1 }}>
            <MyLocationIcon sx={{ color: '#6495ED', fontSize: { xs: 24, sm: 28, md: 32 } }} />
            <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' } }}>
              Bus Locations
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
              Real-time tracking
            </Typography>
          </Box>

          {/* Controls */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: { xs: 2, sm: 2.5, md: 3 } }}>
            <FormControl sx={{ minWidth: { xs: '100%', sm: 250 } }}>
              <InputLabel>Select Bus</InputLabel>
              <Select value={selectedBus} onChange={handleBusChange} label="Select Bus" sx={{ borderRadius: 2 }}>
                {buses.map((bus) => (
                  <MenuItem key={bus.id} value={bus.id.toString()}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DirectionsBusIcon sx={{ fontSize: 18, color: busColors[bus.id] || '#6495ED' }} />
                      <Typography>{bus.busNumber} ({bus.busType})</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={refreshLocation}
              disabled={refreshing}
              sx={{ borderRadius: 2, backgroundColor: '#6495ED', fontWeight: 600, textTransform: 'none', fontSize: '0.85rem', px: 3, '&:hover': { backgroundColor: '#4169E1' }, width: { xs: '100%', sm: 'auto' } }}
            >
              {refreshing ? <CircularProgress size={24} color="inherit" /> : 'Refresh'}
            </Button>

            <Button
              variant="outlined"
              startIcon={<PlayArrowIcon />}
              onClick={simulateMovement}
              disabled={simulating}
              sx={{ borderRadius: 2, borderColor: '#22c55e', color: '#22c55e', fontWeight: 600, textTransform: 'none', fontSize: '0.85rem', px: 3, '&:hover': { borderColor: '#16a34a', backgroundColor: 'rgba(34,197,94,0.08)' }, width: { xs: '100%', sm: 'auto' } }}
            >
              {simulating ? <CircularProgress size={20} color="inherit" /> : 'Simulate Movement'}
            </Button>
          </Box>

          {/* Map */}
          <StyledPaper sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                <DirectionsBusIcon sx={{ fontSize: 20, color: '#6495ED', mr: 1 }} />
                Live Location
              </Typography>
              <Chip
                label={currentLocation?.status || 'Offline'}
                size="small"
                sx={{
                  bgcolor: currentLocation ? getStatusColor(currentLocation.status).bg : '#fee2e2',
                  color: currentLocation ? getStatusColor(currentLocation.status).color : '#dc2626',
                  fontWeight: 600,
                  fontSize: '0.65rem'
                }}
              />
            </Box>
            <MapWrapper>
              <MapContainer
                center={[defaultCenter.lat, defaultCenter.lng]}
                zoom={13}
                zoomControl={!isMobile}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapPosition && (
                  <BusMap 
                    position={mapPosition} 
                    busNumber={selectedBus} 
                    status={currentLocation?.status} 
                  />
                )}
              </MapContainer>
            </MapWrapper>
          </StyledPaper>

          {/* Stats */}
          {currentLocation && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4,1fr)' }, gap: 2, mb: { xs: 2, sm: 2.5, md: 3 } }}>
              <StatsCard>
                <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={0.5}><LocationOnIcon sx={{ fontSize: 14 }} /> Latitude</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{currentLocation.latitude?.toFixed(6) || '-'}</Typography>
              </StatsCard>
              <StatsCard>
                <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={0.5}><LocationOnIcon sx={{ fontSize: 14 }} /> Longitude</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{currentLocation.longitude?.toFixed(6) || '-'}</Typography>
              </StatsCard>
              <StatsCard>
                <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={0.5}><SpeedIcon sx={{ fontSize: 14 }} /> Speed</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: '0.9rem' }}>{currentLocation.speed || 0} km/h</Typography>
              </StatsCard>
              <StatsCard>
                <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={0.5}><CompassIcon sx={{ fontSize: 14 }} /> Direction</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: '0.9rem' }}>{currentLocation.directionName || (currentLocation.heading !== undefined ? `${currentLocation.heading}°` : '-')}</Typography>
              </StatsCard>
            </Box>
          )}

          {/* History */}
          {locationHistory.length > 0 && (
            <StyledPaper>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}><HistoryIcon sx={{ fontSize: 20, color: '#6495ED', mr: 1 }} /> Location History</Typography>
                <Chip label={`${locationHistory.length} records`} size="small" sx={{ bgcolor: '#dbeafe', color: '#6495ED', fontWeight: 600 }} />
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f8fafc' }}>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell>Latitude</StyledTableCell>
                      <StyledTableCell>Longitude</StyledTableCell>
                      <StyledTableCell>Speed</StyledTableCell>
                      <StyledTableCell>Direction</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Timestamp</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {locationHistory.slice(0, 10).map((loc, idx) => (
                      <StyledTableRow key={idx} hover>
                        <StyledTableCell>{idx + 1}</StyledTableCell>
                        <StyledTableCell sx={{ fontFamily: 'monospace' }}>{loc.latitude?.toFixed(6)}</StyledTableCell>
                        <StyledTableCell sx={{ fontFamily: 'monospace' }}>{loc.longitude?.toFixed(6)}</StyledTableCell>
                        <StyledTableCell>{loc.speed || 0} km/h</StyledTableCell>
                        <StyledTableCell>{loc.directionName || '-'}</StyledTableCell>
                        <StyledTableCell>
                          <Chip label={loc.status || 'UNKNOWN'} size="small" sx={{ bgcolor: getStatusColor(loc.status).bg, color: getStatusColor(loc.status).color, fontSize: '0.5rem', height: 18 }} />
                        </StyledTableCell>
                        <StyledTableCell>{formatDate(loc.timestamp || loc.createdAt)}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {locationHistory.length > 10 && (
                      <StyledTableRow><StyledTableCell colSpan={7} align="center" sx={{ color: '#94a3b8', py: 1 }}>+ {locationHistory.length - 10} more records</StyledTableCell></StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          )}
        </ContentWrapper>
      </MainContent>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </PageContainer>
  );
}