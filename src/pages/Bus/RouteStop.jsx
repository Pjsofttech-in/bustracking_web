// RouteStop.jsx - Fully Responsive for All iPhone Models - COMPLETE FIXED VERSION

import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    IconButton,
    Tooltip,
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
    Grow,
    Grid,
    InputAdornment,
    TableContainer as MuiTableContainer
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import RouteIcon from "@mui/icons-material/Route";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { styled } from "@mui/material/styles";

// ✅ FIXED: Direct imports - NO 'api' object
import routeStopApi from "../../api/routeStopApi";
import { busRouteApi } from "../../api/Index";

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

const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
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
export default function RouteStop() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const isExtraSmall = useMediaQuery('(max-width: 380px)');

    const [routeStops, setRouteStops] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedStop, setSelectedStop] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [formData, setFormData] = useState({
        stopName: "",
        arrivalTime: ""
    });

    // ================= LOAD DATA =================
    const loadData = async () => {
        setLoading(true);
        try {
            // ✅ FIXED: Using direct imports - NO 'api' object
            const [stopsData, routesData] = await Promise.all([
                routeStopApi.getAll(),
                busRouteApi.getAll()
            ]);
            setRouteStops(stopsData);
            setRoutes(routesData);
        } catch (error) {
            console.error("Error loading data:", error);
            showSnackbar("Failed to load route stops", "error");
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ================= HANDLE ADD OPEN =================
    const handleAddOpen = () => {
        setFormData({ stopName: "", arrivalTime: "" });
        setEditMode(false);
        setSelectedStop(null);
        setOpen(true);
    };

    // ================= HANDLE EDIT =================
    const handleEdit = (stop) => {
        setFormData({
            stopName: stop.stopName || "",
            arrivalTime: stop.arrivalTime || ""
        });
        setEditMode(true);
        setSelectedStop(stop);
        setOpen(true);
    };

    // ================= HANDLE CLOSE DIALOG =================
    const handleCloseDialog = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedStop(null);
        setFormData({ stopName: "", arrivalTime: "" });
        setSubmitting(false);
    };

    // ================= HANDLE SAVE =================
    const handleSave = async () => {
        if (!formData.stopName || !formData.arrivalTime) {
            showSnackbar("Please fill in all fields", "warning");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                stopName: formData.stopName.trim(),
                arrivalTime: formData.arrivalTime
            };

            if (editMode && selectedStop) {
                // ✅ FIXED: Using direct import
                await routeStopApi.update(selectedStop.id, payload);
                showSnackbar("Stop updated successfully!", "success");
            } else {
                if (routes.length === 0) {
                    showSnackbar("No routes available. Please create a route first.", "warning");
                    return;
                }

                const routeId = routes[0].id;
                // ✅ FIXED: Using direct import
                const newStop = await routeStopApi.create(routeId, payload);
                setRouteStops([...routeStops, newStop]);
                showSnackbar("Stop added successfully!", "success");
            }

            handleCloseDialog();
            await loadData();
        } catch (error) {
            console.error("Error saving stop:", error);
            showSnackbar(error.message || "Failed to save stop", "error");
        } finally {
            setSubmitting(false);
        }
    };

    // ================= HANDLE DELETE =================
    const handleDeleteClick = (stop) => {
        setDeleteTarget(stop);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        setSubmitting(true);
        try {
            // ✅ FIXED: Using direct import
            await routeStopApi.delete(deleteTarget.id);
            setRouteStops(routeStops.filter(s => s.id !== deleteTarget.id));
            showSnackbar("Stop deleted successfully!", "success");
            setDeleteDialogOpen(false);
            setDeleteTarget(null);
        } catch (error) {
            console.error("Error deleting stop:", error);
            showSnackbar(error.message || "Failed to delete stop", "error");
        } finally {
            setSubmitting(false);
        }
    };

    // ================= GET ROUTE NAME =================
    const getRouteName = (routeId) => {
        const route = routes.find(r => r.id === routeId);
        return route ? route.routeName : `Route ${routeId}`;
    };

    // ================= FORMAT TIME =================
    const formatTime = (timeString) => {
        if (!timeString) return "-";
        try {
            const [hours, minutes] = timeString.split(":");
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes));
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return timeString;
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
                            Loading route stops...
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
                                <span>Route Stops</span>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 0.25,
                                    fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                                }}
                            >
                                Manage stops for bus routes
                            </Typography>
                        </Box>

                        <AddButton
                            variant="contained"
                            startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                            onClick={handleAddOpen}
                        >
                            Add Stop
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
                                Total Stops
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>
                                {routeStops.length}
                            </Typography>
                        </StatsCard>
                        <StatsCard>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                Total Routes
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#6495ED" }}>
                                {routes.length}
                            </Typography>
                        </StatsCard>
                        <StatsCard>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                Avg Stops per Route
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>
                                {routes.length > 0 ? Math.round(routeStops.length / routes.length) : 0}
                            </Typography>
                        </StatsCard>
                        <StatsCard>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                Active Stops
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#d97706" }}>
                                {routeStops.length}
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
                                            <TableCell sx={{ minWidth: { xs: "30px", sm: "40px", md: "60px" } }}>
                                                <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                                    ID
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ minWidth: { xs: "100px", sm: "130px", md: "180px" } }}>
                                                <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                                    Stop Name
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ minWidth: { xs: "100px", sm: "130px", md: "180px" } }}>
                                                <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                                    Route
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ minWidth: { xs: "100px", sm: "130px", md: "160px" } }}>
                                                <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                                    Arrival Time
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "140px" } }} align="center">
                                                <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                                                    Actions
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </GradientHeader>
                                    <TableBody>
                                        {routeStops.length > 0 ? (
                                            routeStops.map((stop) => (
                                                <StyledTableRow key={stop.id}>
                                                    <TableCell sx={{ fontWeight: 600 }}>{stop.id}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                                                            <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                                                            <Typography sx={{ 
                                                                fontWeight: 500, 
                                                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                                                                wordBreak: 'break-word'
                                                            }}>
                                                                {stop.stopName}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={getRouteName(stop.routeId)}
                                                            size="small"
                                                            sx={{
                                                                backgroundColor: "#dbeafe",
                                                                color: "#6495ED",
                                                                fontWeight: 600,
                                                                fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.75rem" },
                                                                borderRadius: "6px",
                                                                height: { xs: "18px", sm: "20px", md: "24px" },
                                                                maxWidth: { xs: "80px", sm: "120px", md: "180px" }
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <AccessTimeIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: '#94a3b8' }} />
                                                            <Typography variant="body2" sx={{ 
                                                                fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.8rem' } 
                                                            }}>
                                                                {formatTime(stop.arrivalTime)}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                                                            <Tooltip title="Edit">
                                                                <IconButton
                                                                    size={isExtraSmall ? "small" : "medium"}
                                                                    onClick={() => handleEdit(stop)}
                                                                    sx={{ 
                                                                        color: '#6495ED',
                                                                        padding: { xs: "2px", sm: "4px", md: "6px" }
                                                                    }}
                                                                >
                                                                    <EditIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    size={isExtraSmall ? "small" : "medium"}
                                                                    onClick={() => handleDeleteClick(stop)}
                                                                    sx={{ 
                                                                        color: '#ef4444',
                                                                        padding: { xs: "2px", sm: "4px", md: "6px" }
                                                                    }}
                                                                >
                                                                    <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Box>
                                                    </TableCell>
                                                </StyledTableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                                                    <Typography variant="body1" color="text.secondary">
                                                        <RouteIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                                                        No route stops added yet
                                                    </Typography>
                                                    <Button
                                                        variant="outlined"
                                                        startIcon={<AddIcon />}
                                                        onClick={handleAddOpen}
                                                        sx={{
                                                            mt: 2,
                                                            borderRadius: "10px",
                                                            textTransform: "none",
                                                            borderColor: "#6495ED",
                                                            color: "#6495ED",
                                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                        }}
                                                    >
                                                        Add your first stop
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
                                    {routeStops.length > 0 ? (
                                        routeStops.map((stop, index) => (
                                            <Grow in key={stop.id} timeout={300 * (index + 1) * 0.1}>
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
                                                                    Stop #{stop.id}
                                                                </Typography>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        fontWeight: 600,
                                                                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                                                                        mt: 0.25,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 0.5,
                                                                        wordBreak: 'break-word'
                                                                    }}
                                                                >
                                                                    <LocationOnIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                                                                    {stop.stopName}
                                                                </Typography>
                                                            </Box>
                                                            <Chip
                                                                label={getRouteName(stop.routeId)}
                                                                size="small"
                                                                sx={{
                                                                    backgroundColor: "#dbeafe",
                                                                    color: "#6495ED",
                                                                    fontWeight: 600,
                                                                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" },
                                                                    borderRadius: "6px",
                                                                    height: { xs: "18px", sm: "20px", md: "24px" },
                                                                    flexShrink: 0,
                                                                    maxWidth: { xs: "80px", sm: "120px" }
                                                                }}
                                                            />
                                                        </Box>

                                                        <Box sx={{
                                                            display: "grid",
                                                            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
                                                            gap: { xs: 1, sm: 1.5 },
                                                            mt: 1.5,
                                                            pt: 1.5,
                                                            borderTop: "1px solid #f1f5f9"
                                                        }}>
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                                                    Arrival Time
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ 
                                                                    fontWeight: 500, 
                                                                    fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, 
                                                                    display: 'flex', 
                                                                    alignItems: 'center', 
                                                                    gap: 0.5 
                                                                }}>
                                                                    <AccessTimeIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                                                    {formatTime(stop.arrivalTime)}
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                                                    Route ID
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ 
                                                                    fontWeight: 500, 
                                                                    fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } 
                                                                }}>
                                                                    #{stop.routeId}
                                                                </Typography>
                                                            </Box>
                                                        </Box>

                                                        <Box sx={{
                                                            display: "flex",
                                                            justifyContent: "flex-end",
                                                            gap: 0.5,
                                                            mt: 1.5,
                                                            pt: 1.5,
                                                            borderTop: "1px solid #f1f5f9"
                                                        }}>
                                                            <Tooltip title="Edit">
                                                                <IconButton
                                                                    size={isExtraSmall ? "small" : "medium"}
                                                                    onClick={() => handleEdit(stop)}
                                                                    sx={{ 
                                                                        color: '#6495ED',
                                                                        padding: { xs: "2px", sm: "4px", md: "6px" }
                                                                    }}
                                                                >
                                                                    <EditIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    size={isExtraSmall ? "small" : "medium"}
                                                                    onClick={() => handleDeleteClick(stop)}
                                                                    sx={{ 
                                                                        color: '#ef4444',
                                                                        padding: { xs: "2px", sm: "4px", md: "6px" }
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
                                                No route stops added yet
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                startIcon={<AddIcon />}
                                                onClick={handleAddOpen}
                                                sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                                            >
                                                Add first stop
                                            </Button>
                                        </Box>
                                    )}
                                </Stack>
                            </Box>
                        )}
                    </StyledPaper>
                </ContentWrapper>
            </MainContent>

            {/* Add/Edit Dialog */}
            <StyledDialog
                open={open}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
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
                    {editMode ? "Edit Route Stop" : "Add New Stop"}
                    <IconButton onClick={handleCloseDialog} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
                        <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ 
                            mb: 2,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                            {editMode ? "Update the stop details" : "Add a new stop to a route"}
                        </Typography>
                    </Box>

                    <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2}>
                        <Grid item xs={12}>
                            <StyledTextField
                                label="Stop Name"
                                name="stopName"
                                placeholder="e.g., Main Street Station"
                                value={formData.stopName}
                                onChange={handleChange}
                                fullWidth
                                disabled={submitting}
                                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <StyledTextField
                                label="Arrival Time"
                                name="arrivalTime"
                                type="time"
                                value={formData.arrivalTime}
                                onChange={handleChange}
                                fullWidth
                                disabled={submitting}
                                InputLabelProps={{ shrink: true }}
                                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccessTimeIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>

                        {!editMode && routes.length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="caption" color="text.secondary" sx={{ 
                                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}>
                                    <span>📍 This stop will be added to the route: <strong>{routes[0]?.routeName}</strong></span>
                                </Typography>
                            </Grid>
                        )}
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
                        {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : (editMode ? "Update Stop" : "Add Stop")}
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
                        Are you sure you want to delete the stop "{deleteTarget?.stopName}"?
                        This action cannot be undone.
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