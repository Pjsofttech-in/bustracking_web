// BusLocation.jsx - Fully Responsive for All iPhone Models

import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    IconButton,
    Tooltip,
    TextField,
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
    Stack,
    Fade,
    Grow,
    Divider,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {
    LocationOn as LocationOnIcon,
    Speed as SpeedIcon,
    Explore as CompassIcon,
    Refresh as RefreshIcon,
    DirectionsBus as DirectionsBusIcon,
    History as HistoryIcon,
    MyLocation as MyLocationIcon,
    Timeline as TimelineIcon
} from "@mui/icons-material";

import styled from "@emotion/styled";

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
    padding: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        borderRadius: "12px",
    },
    [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1.5),
        borderRadius: "10px",
    },
    '@media (max-width: 380px)': {
        padding: theme.spacing(1),
        borderRadius: "8px",
    }
}));

const MapContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "500px",
    backgroundColor: "#eef2f6",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    [theme.breakpoints.down('lg')]: {
        height: "450px",
    },
    [theme.breakpoints.down('md')]: {
        height: "400px",
    },
    [theme.breakpoints.down('sm')]: {
        height: "300px",
        borderRadius: "10px",
    },
    [theme.breakpoints.down('xs')]: {
        height: "250px",
        borderRadius: "8px",
    },
    '@media (max-width: 380px)': {
        height: "200px",
        borderRadius: "6px",
    }
}));

const StatsCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: "12px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    transition: "all 0.2s ease",
    width: "100%",
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

const BusMarker = styled(Box)(({ theme, color }) => ({
    position: "absolute",
    width: { xs: "32px", sm: "36px", md: "40px" },
    height: { xs: "32px", sm: "36px", md: "40px" },
    background: color || "#6495ED",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transform: "translate(-50%, -50%)",
    transition: "all 0.5s ease",
    zIndex: 10,
    '&:hover': {
        transform: "translate(-50%, -50%) scale(1.1)",
    },
    '& .pulse': {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "pulse 2s infinite",
        border: "2px solid rgba(100, 149, 237, 0.3)",
    },
    '@keyframes pulse': {
        '0%': {
            transform: "scale(1)",
            opacity: 1,
        },
        '100%': {
            transform: "scale(1.5)",
            opacity: 0,
        },
    },
    [theme.breakpoints.down('sm')]: {
        width: "28px",
        height: "28px",
        '& .pulse': {
            border: "1.5px solid rgba(100, 149, 237, 0.3)",
        },
    },
    [theme.breakpoints.down('xs')]: {
        width: "24px",
        height: "24px",
        '& .pulse': {
            border: "1px solid rgba(100, 149, 237, 0.3)",
        },
    }
}));

const InfoCard = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    transition: "all 0.2s ease",
    width: "100%",
    '&:hover': {
        borderColor: "#6495ED",
        boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)",
    },
    [theme.breakpoints.down('sm')]: {
        borderRadius: "10px",
    },
    [theme.breakpoints.down('xs')]: {
        borderRadius: "8px",
    }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        fontSize: "0.65rem",
        padding: "6px 4px",
    },
    [theme.breakpoints.down('xs')]: {
        fontSize: "0.55rem",
        padding: "4px 3px",
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: "#f8fafc",
    },
    '& td': {
        [theme.breakpoints.down('sm')]: {
            fontSize: "0.6rem",
            padding: "4px 3px",
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "0.5rem",
            padding: "3px 2px",
        }
    }
}));

export default function BusLocation() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isExtraSmall = useMediaQuery('(max-width: 380px)');

    const [selectedBus, setSelectedBus] = useState("");
    const [buses, setBuses] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [locationHistory, setLocationHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    // Map reference for animated bus movement
    const mapRef = useRef(null);
    const busMarkerRef = useRef(null);

    // Bus colors for different buses
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
            const busesData = await api.buses.getAll();
            setBuses(busesData);

            if (busesData && busesData.length > 0) {
                const firstBus = busesData[0];
                setSelectedBus(firstBus.id.toString());
                await loadLocation(firstBus.id);
            }
        } catch (error) {
            console.error("Error loading data:", error);
            showSnackbar("Failed to load data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();

        const interval = setInterval(() => {
            if (selectedBus) {
                refreshLocation();
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [selectedBus]);

    // ================= LOAD LOCATION =================
    const loadLocation = async (busId) => {
        try {
            const latest = await api.busLocations.getLatest(busId);
            if (latest) {
                setCurrentLocation(latest);
            }

            const history = await api.busLocations.getHistory(busId);
            setLocationHistory(history || []);
        } catch (error) {
            console.error("Error loading location:", error);
            // Mock data for demonstration
            setCurrentLocation({
                id: 1,
                busId: busId,
                latitude: 40.7128 + (Math.random() - 0.5) * 0.01,
                longitude: -74.0060 + (Math.random() - 0.5) * 0.01,
                speedKmph: Math.floor(Math.random() * 60) + 10,
                direction: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
                recordedAt: new Date().toISOString()
            });

            const mockHistory = [];
            for (let i = 0; i < 10; i++) {
                mockHistory.push({
                    id: i,
                    busId: busId,
                    latitude: 40.7128 + (Math.random() - 0.5) * 0.02,
                    longitude: -74.0060 + (Math.random() - 0.5) * 0.02,
                    speedKmph: Math.floor(Math.random() * 50) + 5,
                    direction: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
                    recordedAt: new Date(Date.now() - i * 300000).toISOString()
                });
            }
            setLocationHistory(mockHistory);
        }
    };

    // ================= REFRESH LOCATION =================
    const refreshLocation = async () => {
        if (!selectedBus) return;
        setRefreshing(true);
        try {
            await loadLocation(Number(selectedBus));
            showSnackbar("Location updated!", "success");
        } catch (error) {
            console.error("Error refreshing location:", error);
            showSnackbar("Failed to refresh location", "error");
        } finally {
            setRefreshing(false);
        }
    };

    // ================= HANDLE BUS CHANGE =================
    const handleBusChange = async (event) => {
        const busId = event.target.value;
        setSelectedBus(busId);
        await loadLocation(Number(busId));
    };

    // ================= SHOW SNACKBAR =================
    const showSnackbar = (message, severity = "success") => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    // ================= FORMAT DATE =================
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        try {
            const date = new Date(dateString);
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    // ================= GET STATUS COLOR =================
    const getStatusColor = (status) => {
        if (status === 'ACTIVE') return { bg: '#dcfce7', color: '#16a34a' };
        if (status === 'BREAKDOWN') return { bg: '#fee2e2', color: '#dc2626' };
        return { bg: '#f1f5f9', color: '#64748b' };
    };

    // ================= RENDER MAP =================
    const renderMap = () => {
        if (!currentLocation) {
            return (
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    flexDirection: "column",
                    gap: { xs: 1, sm: 2 },
                    color: "#94a3b8",
                    p: 2
                }}>
                    <MyLocationIcon sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, opacity: 0.3 }} />
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        No location data available
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                        Select a bus to view its location
                    </Typography>
                </Box>
            );
        }

        const bgStyle = {
            backgroundImage: `
                linear-gradient(rgba(100, 149, 237, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 149, 237, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: { xs: '20px 20px', sm: '30px 30px', md: '40px 40px' },
        };

        const roadStyle = {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent ${isExtraSmall ? '10px' : isMobile ? '15px' : '20px'},
                    rgba(100, 149, 237, 0.1) ${isExtraSmall ? '10px' : isMobile ? '15px' : '20px'},
                    rgba(100, 149, 237, 0.1) ${isExtraSmall ? '11px' : isMobile ? '16px' : '21px'}
                )
            `,
            backgroundSize: isExtraSmall ? '20px 20px' : isMobile ? '30px 30px' : '40px 40px',
        };

        return (
            <Box sx={{ ...bgStyle, position: "relative", width: "100%", height: "100%" }}>
                <Box sx={roadStyle} />

                {/* Bus Marker */}
                <BusMarker
                    ref={busMarkerRef}
                    color={busColors[selectedBus] || "#6495ED"}
                    sx={{
                        left: `${50 + (currentLocation.longitude % 0.02) * 100}%`,
                        top: `${50 + (currentLocation.latitude % 0.02) * 100}%`
                    }}
                >
                    <div className="pulse" />
                    <DirectionsBusIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }} />
                </BusMarker>

                {/* Compass / Direction Indicator */}
                <Box sx={{
                    position: "absolute",
                    bottom: { xs: 8, sm: 12, md: 16 },
                    right: { xs: 8, sm: 12, md: 16 },
                    bgcolor: "white",
                    borderRadius: "50%",
                    width: { xs: 40, sm: 48, md: 56 },
                    height: { xs: 40, sm: 48, md: 56 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    border: "2px solid #e2e8f0"
                }}>
                    <CompassIcon sx={{
                        color: "#6495ED",
                        fontSize: { xs: 18, sm: 22, md: 28 },
                        transform: `rotate(${['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].indexOf(currentLocation.direction || 'N') * 45}deg)`
                    }} />
                </Box>

                {/* Location Info Overlay */}
                <Box sx={{
                    position: "absolute",
                    top: { xs: 8, sm: 12, md: 16 },
                    left: { xs: 8, sm: 12, md: 16 },
                    bgcolor: "rgba(255,255,255,0.9)",
                    borderRadius: { xs: "8px", sm: "10px", md: "12px" },
                    padding: { xs: "8px 10px", sm: "10px 14px", md: "12px 16px" },
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    maxWidth: { xs: "180px", sm: "220px", md: "250px" }
                }}>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                        display: "block", 
                        fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } 
                    }}>
                        Bus {selectedBus}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.85rem" },
                        fontFamily: "monospace"
                    }}>
                        {currentLocation.latitude?.toFixed(6)}, {currentLocation.longitude?.toFixed(6)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                        fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" } 
                    }}>
                        Updated: {formatDate(currentLocation.recordedAt)}
                    </Typography>
                </Box>
            </Box>
        );
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
                            Loading bus locations...
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
                                <MyLocationIcon sx={{ 
                                    color: "#6495ED", 
                                    fontSize: { xs: 20, sm: 24, md: 28 } 
                                }} />
                                <span>Bus Locations</span>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.25,
                                    fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                                }}
                            >
                                Track real-time bus locations
                            </Typography>
                        </Box>
                    </Box>

                    {/* Bus Selector & Controls */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "stretch", sm: "center" },
                        gap: { xs: 1.5, sm: 2 },
                        mb: { xs: 2, sm: 2.5, md: 3 }
                    }}>
                        <FormControl sx={{ 
                            minWidth: { xs: "100%", sm: 250 },
                            '& .MuiInputLabel-root': {
                                fontSize: { xs: '0.8rem', sm: '0.875rem' }
                            },
                            '& .MuiSelect-select': {
                                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                padding: { xs: '8px 12px', sm: '12px 16px' }
                            }
                        }}>
                            <InputLabel>Select Bus</InputLabel>
                            <Select
                                value={selectedBus}
                                onChange={handleBusChange}
                                label="Select Bus"
                                sx={{ 
                                    borderRadius: "10px",
                                    '& .MuiSelect-select': {
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                }}
                            >
                                {buses.map((bus) => (
                                    <MenuItem key={bus.id} value={bus.id.toString()}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DirectionsBusIcon sx={{ 
                                                fontSize: { xs: 14, sm: 16, md: 18 }, 
                                                color: busColors[bus.id] || "#6495ED" 
                                            }} />
                                            <Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                                                {bus.busNumber} ({bus.busType})
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            startIcon={<RefreshIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                            onClick={refreshLocation}
                            disabled={refreshing}
                            size={isExtraSmall ? "small" : "medium"}
                            sx={{
                                borderRadius: "10px",
                                padding: { xs: "8px 16px", sm: "10px 24px" },
                                fontWeight: 600,
                                textTransform: "none",
                                backgroundColor: "#6495ED",
                                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                '&:hover': {
                                    backgroundColor: "#4169E1",
                                },
                                [theme.breakpoints.down('sm')]: {
                                    width: "100%",
                                }
                            }}
                        >
                            {refreshing ? (
                                <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" />
                            ) : (
                                <span className="truncate">Refresh Location</span>
                            )}
                        </Button>
                    </Box>

                    {/* Map Section */}
                    <StyledPaper sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: { xs: 1.5, sm: 2 },
                            flexWrap: "wrap",
                            gap: 1
                        }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <DirectionsBusIcon sx={{ 
                                    fontSize: { xs: 16, sm: 18, md: 20 }, 
                                    color: "#6495ED", 
                                    mr: 1 
                                }} />
                                Live Location
                            </Typography>
                            <Chip
                                label={currentLocation ? "Online" : "Offline"}
                                size="small"
                                sx={{
                                    backgroundColor: currentLocation ? "#dcfce7" : "#fee2e2",
                                    color: currentLocation ? "#16a34a" : "#dc2626",
                                    fontWeight: 600,
                                    fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
                                    height: { xs: "20px", sm: "24px", md: "28px" }
                                }}
                            />
                        </Box>
                        <MapContainer>
                            {renderMap()}
                        </MapContainer>
                    </StyledPaper>

                    {/* Stats Cards */}
                    {currentLocation && (
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
                                <Typography variant="caption" color="text.secondary" sx={{ 
                                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.7rem" },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}>
                                    <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
                                    Latitude
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700, 
                                    fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1.1rem" }, 
                                    fontFamily: "monospace",
                                    wordBreak: 'break-all'
                                }}>
                                    {currentLocation.latitude?.toFixed(6) || "-"}
                                </Typography>
                            </StatsCard>
                            <StatsCard>
                                <Typography variant="caption" color="text.secondary" sx={{ 
                                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.7rem" },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}>
                                    <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
                                    Longitude
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700, 
                                    fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1.1rem" }, 
                                    fontFamily: "monospace",
                                    wordBreak: 'break-all'
                                }}>
                                    {currentLocation.longitude?.toFixed(6) || "-"}
                                </Typography>
                            </StatsCard>
                            <StatsCard>
                                <Typography variant="caption" color="text.secondary" sx={{ 
                                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.7rem" },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}>
                                    <SpeedIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
                                    Speed
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700, 
                                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" } 
                                }}>
                                    {currentLocation.speedKmph || 0} km/h
                                </Typography>
                            </StatsCard>
                            <StatsCard>
                                <Typography variant="caption" color="text.secondary" sx={{ 
                                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.7rem" },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}>
                                    <CompassIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />
                                    Direction
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700, 
                                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" } 
                                }}>
                                    {currentLocation.direction || "-"}
                                </Typography>
                            </StatsCard>
                        </Box>
                    )}

                    {/* Location History */}
                    {locationHistory.length > 0 && (
                        <StyledPaper>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: { xs: 1.5, sm: 2 },
                                flexWrap: "wrap",
                                gap: 1
                            }}>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 600, 
                                    fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <HistoryIcon sx={{ 
                                        fontSize: { xs: 16, sm: 18, md: 20 }, 
                                        color: "#6495ED", 
                                        mr: 1 
                                    }} />
                                    Location History
                                </Typography>
                                <Chip
                                    label={`${locationHistory.length} records`}
                                    size="small"
                                    sx={{
                                        backgroundColor: "#dbeafe",
                                        color: "#6495ED",
                                        fontWeight: 600,
                                        fontSize: { xs: "0.55rem", sm: "0.65rem", md: "0.75rem" },
                                        height: { xs: "18px", sm: "20px", md: "24px" }
                                    }}
                                />
                            </Box>

                            <TableContainer sx={{ 
                                overflowX: 'auto',
                                '&::-webkit-scrollbar': {
                                    height: { xs: '4px', sm: '6px' },
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
                            }}>
                                <Table size={isExtraSmall ? "small" : "medium"}>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "#f8fafc" }}>
                                            <StyledTableCell sx={{ fontWeight: 600 }}>#</StyledTableCell>
                                            <StyledTableCell sx={{ fontWeight: 600 }}>Latitude</StyledTableCell>
                                            <StyledTableCell sx={{ fontWeight: 600 }}>Longitude</StyledTableCell>
                                            <StyledTableCell sx={{ fontWeight: 600 }}>Speed</StyledTableCell>
                                            <StyledTableCell sx={{ fontWeight: 600 }}>Direction</StyledTableCell>
                                            <StyledTableCell sx={{ fontWeight: 600 }}>Timestamp</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {locationHistory.slice(0, 10).map((loc, index) => (
                                            <StyledTableRow key={index} hover>
                                                <StyledTableCell>{index + 1}</StyledTableCell>
                                                <StyledTableCell sx={{ 
                                                    fontFamily: "monospace", 
                                                    fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" },
                                                    wordBreak: 'break-all'
                                                }}>
                                                    {loc.latitude?.toFixed(6)}
                                                </StyledTableCell>
                                                <StyledTableCell sx={{ 
                                                    fontFamily: "monospace", 
                                                    fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" },
                                                    wordBreak: 'break-all'
                                                }}>
                                                    {loc.longitude?.toFixed(6)}
                                                </StyledTableCell>
                                                <StyledTableCell>{loc.speedKmph || 0} km/h</StyledTableCell>
                                                <StyledTableCell>{loc.direction || "-"}</StyledTableCell>
                                                <StyledTableCell sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.75rem" } }}>
                                                    {formatDate(loc.recordedAt)}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        {locationHistory.length > 10 && (
                                            <StyledTableRow>
                                                <StyledTableCell colSpan={6} align="center" sx={{ 
                                                    py: { xs: 1, sm: 2 }, 
                                                    color: "#94a3b8", 
                                                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" } 
                                                }}>
                                                    + {locationHistory.length - 10} more records
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </StyledPaper>
                    )}
                </ContentWrapper>
            </MainContent>

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