// RouteDetail.jsx - Fully Responsive for All iPhone Models

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Route as RouteIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  DirectionsBus as DirectionsBusIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { api } from "../services/api";

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

const StopItem = styled(ListItem)(({ theme }) => ({
  borderRadius: "10px",
  marginBottom: theme.spacing(1),
  transition: "all 0.2s ease",
  border: "1px solid #f1f5f9",
  flexWrap: "wrap",
  '&:hover': {
    backgroundColor: "#f8fafc",
    borderColor: "#6495ED",
    transform: { md: "translateX(4px)" },
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: "8px",
    padding: "8px 12px",
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: "6px",
    padding: "6px 10px",
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

// ================= MAIN COMPONENT =================
export default function RouteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ================= LOAD ROUTE DETAIL =================
  const loadRouteDetail = async () => {
    setLoading(true);
    try {
      const routeData = await api.routes.getById(Number(id));
      setRoute(routeData);
    } catch (error) {
      console.error("Error loading route details:", error);
      showSnackbar("Failed to load route details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadRouteDetail();
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
    navigate(`/busroutes/${id}/edit`);
  };

  // ================= DELETE =================
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await api.routes.delete(Number(id));
      showSnackbar("Route deleted successfully!", "success");
      setDeleteDialogOpen(false);
      setTimeout(() => navigate("/busroutes"), 1500);
    } catch (error) {
      console.error("Error deleting route:", error);
      showSnackbar(error.message || "Failed to delete route", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HELPERS =================
  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return { bg: '#dcfce7', color: '#16a34a', label: 'Active' };
      case 'INACTIVE': return { bg: '#fef3c7', color: '#d97706', label: 'Inactive' };
      case 'SUSPENDED': return { bg: '#fee2e2', color: '#dc2626', label: 'Suspended' };
      default: return { bg: '#f1f5f9', color: '#64748b', label: status || 'Unknown' };
    }
  };

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
              Loading route details...
            </Typography>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

  if (!route) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ textAlign: "center", py: { xs: 4, sm: 6, md: 8 } }}>
            <RouteIcon sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: "#94a3b8", mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}>
              Route not found
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

  const statusInfo = getStatusColor(route.status);

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
                <RouteIcon sx={{ 
                  color: "#6495ED", 
                  fontSize: { xs: 18, sm: 20, md: 24, lg: 28 } 
                }} />
                <span className="truncate">{route.routeName}</span>
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 0.5, sm: 1, md: 1.5 }, 
              flexWrap: 'wrap',
              flexShrink: 0
            }}>
              <Tooltip title="Edit Route">
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
              <Tooltip title="Delete Route">
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

          {/* Route Info Cards */}
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
                    Start Point
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 }, 
                    mt: 0.5,
                    wordBreak: 'break-word'
                  }}>
                    <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                    {route.startPoint || 'N/A'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    mt: 0.5,
                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" }
                  }}>
                    <AccessTimeIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />
                    {formatTime(route.startTime)}
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
                    End Point
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 }, 
                    mt: 0.5,
                    wordBreak: 'break-word'
                  }}>
                    <LocationOnIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#ef4444" }} />
                    {route.endPoint || 'N/A'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    mt: 0.5,
                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" }
                  }}>
                    <AccessTimeIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />
                    {formatTime(route.stopTime)}
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
                    Distance & Time
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, 
                    mt: 0.5 
                  }}>
                    {route.totalDistanceKm || 0} km
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 0.5, 
                    mt: 0.5,
                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" }
                  }}>
                    <ScheduleIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />
                    {route.estimatedTimeMin || 0} minutes
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
                    Bus Assignment
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 0.5, sm: 1 }, 
                    mt: 0.5,
                    wordBreak: 'break-word'
                  }}>
                    <DirectionsBusIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                    {route.bus?.busNumber || 'Not Assigned'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    display: 'block', 
                    mt: 0.5,
                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" }
                  }}>
                    Capacity: {route.bus?.capacity || 'N/A'}
                  </Typography>
                </CardContent>
              </InfoCard>
            </Grid>
          </Grid>

          {/* Stops List */}
          <DetailCard sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              color: "#1e293b", 
              mb: { xs: 2, sm: 2.5, md: 3 }, 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, sm: 1 },
              flexWrap: 'wrap',
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }
            }}>
              <LocationOnIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} />
              Route Stops
              <Chip 
                label={`${route.stops?.length || 0} stops`}
                size="small"
                sx={{ 
                  ml: { xs: 0, sm: 1 }, 
                  backgroundColor: "#dbeafe", 
                  color: "#6495ED",
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                  height: { xs: "20px", sm: "24px", md: "28px" }
                }}
              />
            </Typography>

            <List sx={{ p: 0 }}>
              {route.stops && route.stops.length > 0 ? (
                route.stops.map((stop, index) => (
                  <StopItem key={stop.id || index}>
                    <ListItemIcon sx={{ minWidth: { xs: "32px", sm: "36px", md: "40px" } }}>
                      <Box
                        sx={{
                          width: { xs: 22, sm: 24, md: 28 },
                          height: { xs: 22, sm: 24, md: 28 },
                          borderRadius: "50%",
                          backgroundColor: index === 0 ? "#6495ED" : index === route.stops.length - 1 ? "#ef4444" : "#e2e8f0",
                          color: index === 0 || index === route.stops.length - 1 ? "white" : "#64748b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" },
                          fontWeight: 600,
                          flexShrink: 0
                        }}
                      >
                        {index + 1}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ 
                          fontWeight: 500,
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          wordBreak: 'break-word'
                        }}>
                          {stop.stopName}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary" sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 0.5,
                          fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.75rem" }
                        }}>
                          <AccessTimeIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 } }} />
                          Arrival: {formatTime(stop.arrivalTime)}
                        </Typography>
                      }
                    />
                    {index === 0 && (
                      <Chip 
                        label="Start" 
                        size="small" 
                        sx={{ 
                          backgroundColor: "#dbeafe", 
                          color: "#6495ED", 
                          fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" },
                          height: { xs: "18px", sm: "20px", md: "24px" },
                          ml: { xs: 0.5, sm: 1 }
                        }}
                      />
                    )}
                    {index === route.stops.length - 1 && index !== 0 && (
                      <Chip 
                        label="End" 
                        size="small" 
                        sx={{ 
                          backgroundColor: "#fee2e2", 
                          color: "#dc2626", 
                          fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" },
                          height: { xs: "18px", sm: "20px", md: "24px" },
                          ml: { xs: 0.5, sm: 1 }
                        }}
                      />
                    )}
                  </StopItem>
                ))
              ) : (
                <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    No stops added for this route
                  </Typography>
                </Box>
              )}
            </List>
          </DetailCard>

          {/* Driver & Conductor Info */}
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
                  <PersonIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} />
                  Driver
                </Typography>
                {route.driver ? (
                  <Box>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 500,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      wordBreak: 'break-word'
                    }}>
                      {route.driver.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" } 
                    }}>
                      Employee ID: {route.driver.employeeId || 'N/A'}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    No driver assigned
                  </Typography>
                )}
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
                  <PersonIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} />
                  Conductor
                </Typography>
                {route.conductor ? (
                  <Box>
                    <Typography variant="body1" sx={{ 
                      fontWeight: 500,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      wordBreak: 'break-word'
                    }}>
                      {route.conductor.name || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" } 
                    }}>
                      Employee ID: {route.conductor.employeeId || 'N/A'}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    No conductor assigned
                  </Typography>
                )}
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
              Route ID: #{route.id}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.7rem" } 
            }}>
              {route.createdAt && `Created: ${new Date(route.createdAt).toLocaleDateString()}`}
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
            Are you sure you want to delete the route "{route?.routeName}"? 
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