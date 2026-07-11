// ServiceProvider.jsx - Fully Responsive for All iPhone Models - COMPLETE FIXED VERSION

import React, { useState, useEffect } from "react";
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
  Grow,
  Tooltip,
  InputAdornment,
  TableContainer as MuiTableContainer
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { styled } from "@mui/material/styles";
import serviceProviderApi from "../api/serviceProviderApi";
import busApi from "../api/busApi";


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
    fontSize: "0.75rem",
    letterSpacing: "0.3px",
    padding: "12px 12px",
    whiteSpace: "nowrap",
    borderBottom: "2px solid rgba(255,255,255,0.2)",
    position: "sticky",
    top: 0,
    backgroundColor: "inherit",
    [theme.breakpoints.down('lg')]: {
      fontSize: "0.7rem",
      padding: "10px 8px",
    },
    [theme.breakpoints.down('md')]: {
      fontSize: "0.65rem",
      padding: "8px 6px",
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: "0.6rem",
      padding: "6px 5px",
      letterSpacing: "0.2px",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "0.55rem",
      padding: "5px 4px",
      letterSpacing: "0.1px",
    },
    '@media (max-width: 380px)': {
      fontSize: "0.5rem",
      padding: "4px 3px",
    }
  },
  '& th:first-of-type': {
    paddingLeft: "16px",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "10px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "8px",
    },
  },
  '& th:last-of-type': {
    paddingRight: "16px",
    [theme.breakpoints.down('sm')]: {
      paddingRight: "10px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: "8px",
    },
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
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
    padding: "10px 12px",
    fontSize: "0.85rem",
    borderBottom: "1px solid #f1f5f9",
    [theme.breakpoints.down('lg')]: {
      padding: "8px 8px",
      fontSize: "0.8rem",
    },
    [theme.breakpoints.down('md')]: {
      padding: "7px 6px",
      fontSize: "0.75rem",
    },
    [theme.breakpoints.down('sm')]: {
      padding: "6px 5px",
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down('xs')]: {
      padding: "5px 4px",
      fontSize: "0.65rem",
    },
    '@media (max-width: 380px)': {
      padding: "4px 3px",
      fontSize: "0.6rem",
    }
  },
  '& td:first-of-type': {
    paddingLeft: "16px",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: "10px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: "8px",
    },
  },
  '& td:last-of-type': {
    paddingRight: "16px",
    [theme.breakpoints.down('sm')]: {
      paddingRight: "10px",
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: "8px",
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
  cursor: "pointer",
  width: "100%",
  '&:hover': {
    borderColor: "#6495ED",
    boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)",
    transform: "translateY(-2px)",
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
export default function ServiceProviderPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const emptyForm = {
    name: "",
    mobile: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
    busNumber: "",
  };

  const labelMap = {
    name: "Company Name",
    mobile: "Mobile",
    email: "Email",
    city: "City",
    state: "State",
    pincode: "Pin Code",
    busNumber: "Bus Number",
  };

  // State
  const [providers, setProviders] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ================= LOAD DATA =================
  const loadProviders = async () => {
    setLoading(true);
    try {
      console.log("🔄 Loading service providers...");
      const data = await serviceProviderApi.getAll();
      console.log("📦 Data received:", data);
      
      if (Array.isArray(data)) {
        setProviders(data);
      } else if (data && typeof data === 'object') {
        setProviders(data.data || []);
      } else {
        console.warn("Unexpected data format:", data);
        setProviders([]);
      }
    } catch (error) {
      console.error("❌ Error loading providers:", error);
      showSnackbar(error.message || "Failed to load providers", "error");
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProviders();
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= ADD =================
  const handleAddOpen = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setIsAddMode(true);
    setEditMode(true);
    setOpen(true);
  };

  // ================= VIEW =================
  const handleRowClick = async (provider) => {
    try {
      const providerData = await serviceProviderApi.getById(provider.id);
      setSelectedId(providerData.id);
      setForm({
        name: providerData.name || "",
        mobile: providerData.mobile || "",
        email: providerData.email || "",
        city: providerData.city || "",
        state: providerData.state || "",
        pincode: providerData.pincode || "",
        busNumber: providerData.busNumber || "",
      });
      setIsAddMode(false);
      setEditMode(false);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching provider details:", error);
      setSelectedId(provider.id);
      setForm({
        name: provider.name || "",
        mobile: provider.mobile || "",
        email: provider.email || "",
        city: provider.city || "",
        state: provider.state || "",
        pincode: provider.pincode || "",
        busNumber: provider.busNumber || "",
      });
      setIsAddMode(false);
      setEditMode(false);
      setOpen(true);
      showSnackbar("Using cached data", "info");
    }
  };

  const handleEnableEdit = (e) => {
    if (e) e.stopPropagation();
    setEditMode(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditMode(false);
    setIsAddMode(false);
    setForm(emptyForm);
    setSelectedId(null);
    setSubmitting(false);
  };

  // ================= SAVE =================
  const handleSubmit = async () => {
    if (!form.name || !form.mobile) {
      showSnackbar("Name and Mobile are required", "warning");
      return;
    }

    const cleanMobile = form.mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      showSnackbar("Mobile number must be exactly 10 digits", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        mobile: cleanMobile,
        email: form.email?.trim() || "",
        city: form.city?.trim() || "",
        state: form.state?.trim() || "",
        pincode: form.pincode?.trim() || "",
        busNumber: form.busNumber?.trim() || "",
      };

      if (isAddMode) {
        const newProvider = await serviceProviderApi.create(payload);
        setProviders([...providers, newProvider]);
        showSnackbar("Service Provider Added Successfully!", "success");
      } else {
        const updatedProvider = await serviceProviderApi.update(selectedId, payload);
        setProviders(providers.map(p => p.id === selectedId ? updatedProvider : p));
        showSnackbar("Service Provider Updated Successfully!", "success");
      }

      handleCloseDialog();
    } catch (error) {
      console.error("Error saving provider:", error);
      showSnackbar(error.message || "Failed to save provider", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= DELETE =================
  const handleDeleteClick = (e) => {
    if (e) e.stopPropagation();
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await serviceProviderApi.delete(selectedId);
      setProviders(providers.filter(p => p.id !== selectedId));
      showSnackbar("Service Provider Deleted Successfully!", "success");
      setConfirmOpen(false);
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting provider:", error);
      showSnackbar(error.message || "Failed to delete provider", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HELPERS =================
  const getIconForField = (key) => {
    switch(key) {
      case 'name': return <BusinessIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      case 'mobile': return <PhoneIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      case 'email': return <EmailIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      case 'busNumber': return <DirectionsBusIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      case 'city':
      case 'state':
      case 'pincode': return <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      default: return null;
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
              Loading service providers...
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
                <BusinessIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <span>Service Providers</span>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Manage service providers and their bus assignments
              </Typography>
            </Box>

            <AddButton
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              onClick={handleAddOpen}
            >
              Add Provider
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
                Total Providers
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>
                {providers.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                With Bus Number
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#6495ED" }}>
                {providers.filter(p => p.busNumber).length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Service Areas
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>
                {new Set(providers.map(p => p.city)).size}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Active
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#d97706" }}>
                {providers.length}
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
                      <TableCell sx={{ minWidth: { xs: "100px", sm: "140px", md: "180px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Company Name
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "90px", sm: "110px", md: "130px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Mobile
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "100px", sm: "140px", md: "180px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "100px", sm: "130px", md: "150px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Bus Number
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          City
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          State
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Pin Code
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {providers.length > 0 ? (
                      providers.map((p) => (
                        <StyledTableRow key={p.id} onClick={() => handleRowClick(p)}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <BusinessIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                              <Typography sx={{ 
                                fontWeight: 500, 
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                                wordBreak: 'break-word'
                              }}>
                                {p.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={p.mobile}
                              size="small"
                              sx={{
                                backgroundColor: "#f1f5f9",
                                color: "#1e293b",
                                fontWeight: 500,
                                fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.75rem" },
                                borderRadius: "6px",
                                height: { xs: "20px", sm: "22px", md: "24px" }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ 
                              color: "#6495ED",
                              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                              wordBreak: 'break-word'
                            }}>
                              {p.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {p.busNumber ? (
                              <Chip 
                                label={p.busNumber}
                                size="small"
                                sx={{
                                  backgroundColor: "#dbeafe",
                                  color: "#6495ED",
                                  fontWeight: 600,
                                  fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.75rem" },
                                  borderRadius: "6px",
                                  height: { xs: "20px", sm: "22px", md: "24px" }
                                }}
                              />
                            ) : (
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.7rem' } }}>
                                Not assigned
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' } }}>
                            {p.city}
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' } }}>
                            {p.state}
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' } }}>
                            {p.pincode}
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <BusinessIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            No service providers added yet
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
                            Add your first provider
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
                  {providers.length > 0 ? (
                    providers.map((p, index) => (
                      <Grow in key={p.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard onClick={() => handleRowClick(p)}>
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
                                  variant="h6" 
                                  sx={{ 
                                    fontWeight: 600,
                                    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    wordBreak: 'break-word'
                                  }}
                                >
                                  <BusinessIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                                  {p.name}
                                </Typography>
                              </Box>
                              <Chip 
                                label={p.busNumber || "No Bus"}
                                size="small"
                                sx={{
                                  backgroundColor: p.busNumber ? "#dbeafe" : "#f1f5f9",
                                  color: p.busNumber ? "#6495ED" : "#94a3b8",
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
                                  Mobile
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <PhoneIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {p.mobile}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Bus Number
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5, color: p.busNumber ? "#6495ED" : "#94a3b8" }}>
                                  <DirectionsBusIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: p.busNumber ? "#6495ED" : "#94a3b8" }} />
                                  {p.busNumber || "Not assigned"}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Location
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {p.city}, {p.state}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Email
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, color: "#6495ED", display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}>
                                  <EmailIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {p.email}
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
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                Click to view details
                              </Typography>
                            </Box>
                          </CardContent>
                        </MobileCard>
                      </Grow>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <BusinessIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        No service providers added yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddOpen}
                        sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        Add first provider
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

      {/* Main Popup Dialog */}
      <StyledDialog 
        open={open} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle sx={{ 
          fontWeight: 700,
          fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
          color: "#1e293b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 0.5,
          pr: 0.5,
          p: { xs: 1.5, sm: 2, md: 2.5 }
        }}>
          <span>{isAddMode ? "Add Service Provider" : "Provider Details"}</span>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {!isAddMode && (
              <>
                <Tooltip title="Edit">
                  <IconButton onClick={handleEnableEdit} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
                    <EditIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={handleDeleteClick} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
                    <DeleteIcon sx={{ color: "#ef4444", fontSize: { xs: 18, sm: 20, md: 24 } }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <IconButton onClick={handleCloseDialog} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
              <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2} sx={{ mt: 0 }}>
            {Object.keys(emptyForm).map((key) => (
              <Grid item xs={12} md={6} key={key}>
                <StyledTextField
                  fullWidth
                  label={labelMap[key]}
                  name={key}
                  value={form[key] || ""}
                  onChange={handleChange}
                  disabled={!editMode || submitting}
                  required={key === 'name' || key === 'mobile'}
                  placeholder={key === 'mobile' ? "Enter 10-digit mobile number" : 
                              key === 'busNumber' ? "e.g., BUS-001" : ""}
                  size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {getIconForField(key)}
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2, md: 2.5 }, 
          pt: { xs: 0.5, sm: 0.75, md: 1 }, 
          gap: 0.5, 
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          {editMode && (
            <Button
              variant="contained"
              onClick={handleSubmit}
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
                order: { xs: 1, sm: 1 },
                '&:hover': {
                  backgroundColor: "#4169E1"
                }
              }}
            >
              {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : (isAddMode ? "Add" : "Save")}
            </Button>
          )}
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
              order: { xs: editMode ? 2 : 1, sm: 2 }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Delete Confirmation Dialog */}
      <StyledDialog 
        open={confirmOpen} 
        onClose={() => setConfirmOpen(false)} 
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
          <Typography sx={{ color: "#64748b", fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>
            Are you sure you want to delete this service provider? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2, md: 2.5 }, 
          gap: 0.5,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={() => setConfirmOpen(false)}
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