// BusDetail.jsx - Fully Responsive for All iPhone Models

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Stack,
  Tooltip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  DirectionsBus as DirectionsBusIcon,
  LocationOn as LocationOnIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Route as RouteIcon,
  Person as PersonIcon,
  Speed as SpeedIcon,
  CalendarToday as CalendarTodayIcon
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
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
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: 0,
  }
}));

const DetailCard = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  padding: theme.spacing(3),
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
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

const InfoCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  height: "100%",
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
  },
  '@media (max-width: 380px)': {
    borderRadius: "6px",
  }
}));

const BackButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: 500,
  color: "#64748b",
  padding: "6px 16px",
  fontSize: "0.875rem",
  '&:hover': {
    backgroundColor: "#f1f5f9",
  },
  [theme.breakpoints.down('sm')]: {
    padding: "4px 12px",
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down('xs')]: {
    padding: "3px 10px",
    fontSize: "0.75rem",
  }
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: "8px",
  backgroundColor: "#f8fafc",
  width: "100%",
  '&:hover': {
    backgroundColor: "#f1f5f9",
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(0.75),
  }
}));

// ================= MAIN COMPONENT =================
export default function BusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ================= LOAD BUS DETAIL =================
  const loadBusDetail = async () => {
    setLoading(true);
    try {
      const busData = await api.buses.getById(Number(id));
      setBus(busData);
    } catch (error) {
      console.error("Error loading bus details:", error);
      showSnackbar("Failed to load bus details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadBusDetail();
    }
  }, [id]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // ================= NAVIGATION =================
  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/bus/${id}/edit`);
  };

  // ================= DELETE =================
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await api.buses.delete(Number(id));
      showSnackbar("Bus deleted successfully!", "success");
      setDeleteDialogOpen(false);
      setTimeout(() => navigate("/bus"), 1500);
    } catch (error) {
      console.error("Error deleting bus:", error);
      showSnackbar(error.message || "Failed to delete bus", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HELPERS =================
  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return { bg: '#dcfce7', color: '#16a34a', label: 'Active' };
      case 'BREAKDOWN': return { bg: '#fee2e2', color: '#dc2626', label: 'Breakdown' };
      case 'TERMINATED': return { bg: '#f1f5f9', color: '#64748b', label: 'Terminated' };
      default: return { bg: '#f1f5f9', color: '#64748b', label: status || 'Unknown' };
    }
  };

  const getBusTypeColor = (type) => {
    switch(type) {
      case 'STANDARD': return { bg: '#dbeafe', color: '#6495ED' };
      case 'MINI': return { bg: '#fef3c7', color: '#d97706' };
      case 'LUXURY': return { bg: '#fce7f3', color: '#db2777' };
      case 'ELECTRIC': return { bg: '#d1fae5', color: '#059669' };
      case 'HYBRID': return { bg: '#e0e7ff', color: '#4f46e5' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
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
              Loading bus details...
            </Typography>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

  if (!bus) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ textAlign: "center", py: { xs: 4, sm: 6, md: 8 } }}>
            <DirectionsBusIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: "#94a3b8", mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}>
              Bus not found
            </Typography>
            <Button
              variant="contained"
              onClick={handleBack}
              sx={{ 
                mt: 2,
                backgroundColor: "#6495ED",
                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                '&:hover': {
                  backgroundColor: "#4169E1"
                }
              }}
            >
              Go Back
            </Button>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

  const statusInfo = getStatusColor(bus.status);
  const typeInfo = getBusTypeColor(bus.busType);

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
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 1.5, md: 2 }, 
              flexWrap: 'wrap',
              minWidth: 0
            }}>
              <BackButton
                startIcon={<ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                onClick={handleBack}
              >
                Back
              </BackButton>
              <Typography 
                variant="h5" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.3rem", lg: "1.5rem" },
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0.5, sm: 1, md: 1.5 },
                  wordBreak: 'break-word'
                }}
              >
                <DirectionsBusIcon sx={{ 
                  color: "#6495ED", 
                  fontSize: { xs: 18, sm: 20, md: 24, lg: 28 } 
                }} />
                <span className="truncate">{bus.busNumber}</span>
              </Typography>
              <Chip 
                label={bus.busType}
                sx={{
                  backgroundColor: typeInfo.bg,
                  color: typeInfo.color,
                  fontWeight: 600,
                  fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
                  borderRadius: "6px",
                  height: { xs: "22px", sm: "24px", md: "28px" }
                }}
              />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 0.5, sm: 1, md: 1.5 }, 
              flexWrap: 'wrap',
              flexShrink: 0
            }}>
              <Tooltip title="Edit Bus">
                <Button
                  variant="outlined"
                  startIcon={<EditIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                  onClick={handleEdit}
                  size={isExtraSmall ? "small" : "medium"}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    borderColor: "#f59e0b",
                    color: "#f59e0b",
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                    padding: { xs: "4px 10px", sm: "6px 16px", md: "8px 20px" },
                    '&:hover': {
                      backgroundColor: "#fef3c7",
                      borderColor: "#d97706",
                    }
                  }}
                >
                  <span className="hidden sm:inline">Edit</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              </Tooltip>
              <Tooltip title="Delete Bus">
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                  onClick={handleDeleteClick}
                  size={isExtraSmall ? "small" : "medium"}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    borderColor: "#ef4444",
                    color: "#ef4444",
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                    padding: { xs: "4px 10px", sm: "6px 16px", md: "8px 20px" },
                    '&:hover': {
                      backgroundColor: "#fee2e2",
                      borderColor: "#dc2626",
                    }
                  }}
                >
                  <span className="hidden sm:inline">Delete</span>
                  <span className="sm:hidden">Delete</span>
                </Button>
              </Tooltip>
            </Box>
          </Box>

          {/* Status Banner */}
          <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Chip
              label={`Status: ${statusInfo.label}`}
              sx={{
                backgroundColor: statusInfo.bg,
                color: statusInfo.color,
                fontWeight: 600,
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                padding: { xs: "2px 8px", sm: "4px 12px" },
                borderRadius: "8px",
                height: { xs: "26px", sm: "28px", md: "32px" }
              }}
            />
          </Box>

          {/* Bus Info Cards */}
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Grid item xs={6} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ 
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.7rem" } 
                  }}>
                    Capacity
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 }, 
                    mt: 0.5 
                  }}>
                    <PeopleIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                    {bus.capacity || 0} seats
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ 
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.7rem" } 
                  }}>
                    Route
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 }, 
                    mt: 0.5 
                  }}>
                    <RouteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                    <span className="truncate">{bus.route?.routeName || 'Not Assigned'}</span>
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'block', 
                    mt: 0.5,
                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" }
                  }}>
                    {bus.route?.startPoint || 'N/A'} → {bus.route?.endPoint || 'N/A'}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ 
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.7rem" } 
                  }}>
                    Driver
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 }, 
                    mt: 0.5 
                  }}>
                    <PersonIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                    <span className="truncate">{bus.driver?.name || 'Not Assigned'}</span>
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'block', 
                    mt: 0.5,
                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" }
                  }}>
                    ID: {bus.driver?.employeeId || 'N/A'}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>

            <Grid item xs={6} sm={6} md={3}>
              <InfoCard>
                <CardContent sx={{ 
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.7rem" } 
                  }}>
                    Conductor
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 }, 
                    mt: 0.5 
                  }}>
                    <PersonIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                    <span className="truncate">{bus.conductor?.name || 'Not Assigned'}</span>
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'block', 
                    mt: 0.5,
                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" }
                  }}>
                    ID: {bus.conductor?.employeeId || 'N/A'}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>
          </Grid>

          {/* Statistics Section */}
          <DetailCard sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: "#1e293b", 
              mb: { xs: 2, sm: 2.5, md: 3 }, 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1 },
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }
            }}>
              <SpeedIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} />
              Performance Statistics
            </Typography>

            <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
              <Grid item xs={6} sm={3}>
                <StatItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } 
                    }}>
                      Total Trips
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } 
                    }}>
                      {bus.stats?.totalTrips || 0}
                    </Typography>
                  </Box>
                </StatItem>
              </Grid>

              <Grid item xs={6} sm={3}>
                <StatItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } 
                    }}>
                      On-Time Rate
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, 
                      color: "#22c55e" 
                    }}>
                      {bus.stats?.onTimeRate || 0}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={bus.stats?.onTimeRate || 0} 
                      sx={{ 
                        height: { xs: 3, sm: 4 }, 
                        borderRadius: 2, 
                        mt: 0.5,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: "#6495ED"
                        }
                      }}
                    />
                  </Box>
                </StatItem>
              </Grid>

              <Grid item xs={6} sm={3}>
                <StatItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } 
                    }}>
                      Total Students
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" } 
                    }}>
                      {bus.stats?.totalStudents || 0}
                    </Typography>
                  </Box>
                </StatItem>
              </Grid>

              <Grid item xs={6} sm={3}>
                <StatItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } 
                    }}>
                      Fuel Efficiency
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1.1rem" } 
                    }}>
                      {bus.stats?.fuelEfficiency || 'N/A'}
                    </Typography>
                  </Box>
                </StatItem>
              </Grid>
            </Grid>
          </DetailCard>

          {/* Maintenance Section */}
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6}>
              <DetailCard>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: "#1e293b", 
                  mb: { xs: 1.5, sm: 2 }, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }
                }}>
                  <CalendarTodayIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} />
                  Maintenance
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 1.5 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                      Last Service
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500, 
                      fontSize: { xs: "0.7rem", sm: "0.8rem" } 
                    }}>
                      {formatDate(bus.maintenance?.lastService)}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                      Next Service
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500, 
                      fontSize: { xs: "0.7rem", sm: "0.8rem" }, 
                      color: "#f59e0b" 
                    }}>
                      {formatDate(bus.maintenance?.nextService)}
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" } }}>
                      Status
                    </Typography>
                    <Chip 
                      label={bus.maintenance?.status || 'Unknown'}
                      size="small"
                      sx={{
                        backgroundColor: bus.maintenance?.status === 'Good' ? '#dcfce7' : '#fef3c7',
                        color: bus.maintenance?.status === 'Good' ? '#16a34a' : '#d97706',
                        fontWeight: 500,
                        fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                        height: { xs: "20px", sm: "22px", md: "24px" }
                      }}
                    />
                  </Box>
                </Box>
              </DetailCard>
            </Grid>

            <Grid item xs={12} sm={6}>
              <DetailCard>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: "#1e293b", 
                  mb: { xs: 1.5, sm: 2 }, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }
                }}>
                  <CheckCircleIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} />
                  Quick Actions
                </Typography>
                <Stack spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<RouteIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                    onClick={() => bus.route?.id && navigate(`/route/${bus.route.id}`)}
                    size={isExtraSmall ? "small" : "medium"}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      borderColor: "#6495ED",
                      color: "#6495ED",
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
                      '&:hover': {
                        backgroundColor: "#dbeafe",
                      }
                    }}
                  >
                    View Route Details
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<PersonIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                    size={isExtraSmall ? "small" : "medium"}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      borderColor: "#f59e0b",
                      color: "#f59e0b",
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
                      '&:hover': {
                        backgroundColor: "#fef3c7",
                      }
                    }}
                  >
                    Assign Driver
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<CalendarTodayIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
                    size={isExtraSmall ? "small" : "medium"}
                    sx={{
                      borderRadius: "10px",
                      textTransform: "none",
                      justifyContent: { xs: "center", sm: "flex-start" },
                      borderColor: "#22c55e",
                      color: "#22c55e",
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
                      '&:hover': {
                        backgroundColor: "#dcfce7",
                      }
                    }}
                  >
                    Schedule Maintenance
                  </Button>
                </Stack>
              </DetailCard>
            </Grid>
          </Grid>

          {/* Footer */}
          <Box sx={{ 
            mt: { xs: 3, sm: 4, md: 4 }, 
            pt: { xs: 2, sm: 2.5, md: 3 }, 
            borderTop: "1px solid #f1f5f9", 
            display: 'flex', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: 1 
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.7rem" } 
            }}>
              Bus ID: #{bus.id}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.7rem" } 
            }}>
              {bus.createdAt && `Created: ${formatDate(bus.createdAt)}`}
            </Typography>
          </Box>
        </ContentWrapper>
      </MainContent>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            padding: "8px",
            [theme.breakpoints.down('sm')]: {
              borderRadius: "16px",
              padding: "4px",
              margin: "16px",
            },
            [theme.breakpoints.down('xs')]: {
              borderRadius: "14px",
              padding: "4px",
              margin: "10px",
            }
          }
        }}
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
            Are you sure you want to delete the bus "{bus?.busNumber}"? 
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
      </Dialog>

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