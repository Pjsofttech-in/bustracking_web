// src/pages/ServiceProvider.jsx
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
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import serviceProviderApi from "../../api/serviceProviderApi";

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
  maxHeight: "calc(100vh - 300px)", // adjusted for compact header+search bar row
  minHeight: "400px",
  width: "100%",
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '4px', '&:hover': { backgroundColor: '#94a3b8' } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: { maxHeight: "calc(100vh - 280px)", minHeight: "300px" },
  [theme.breakpoints.down('sm')]: { maxHeight: "calc(100vh - 260px)", minHeight: "250px" },
  [theme.breakpoints.down('xs')]: { maxHeight: "calc(100vh - 240px)", minHeight: "200px", '&::-webkit-scrollbar': { width: '4px', height: '4px' } },
  '@media (max-width: 380px)': { maxHeight: "calc(100vh - 220px)", minHeight: "150px" }
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
    [theme.breakpoints.down('lg')]: { fontSize: "0.7rem", padding: "10px 8px" },
    [theme.breakpoints.down('md')]: { fontSize: "0.65rem", padding: "8px 6px" },
    [theme.breakpoints.down('sm')]: { fontSize: "0.6rem", padding: "6px 5px", letterSpacing: "0.2px" },
    [theme.breakpoints.down('xs')]: { fontSize: "0.55rem", padding: "5px 4px", letterSpacing: "0.1px" },
    '@media (max-width: 380px)': { fontSize: "0.5rem", padding: "4px 3px" }
  },
  '& th:first-of-type': { paddingLeft: "16px", [theme.breakpoints.down('sm')]: { paddingLeft: "10px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "8px" } },
  '& th:last-of-type': { paddingRight: "16px", [theme.breakpoints.down('sm')]: { paddingRight: "10px" }, [theme.breakpoints.down('xs')]: { paddingRight: "8px" } }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  '&:hover': { backgroundColor: "#f8fafc" },
  '&:nth-of-type(even)': { backgroundColor: "#fafbfc" },
  '&:nth-of-type(even):hover': { backgroundColor: "#f1f5f9" },
  '& td': {
    padding: "10px 12px",
    fontSize: "0.85rem",
    borderBottom: "1px solid #f1f5f9",
    [theme.breakpoints.down('lg')]: { padding: "8px 8px", fontSize: "0.8rem" },
    [theme.breakpoints.down('md')]: { padding: "7px 6px", fontSize: "0.75rem" },
    [theme.breakpoints.down('sm')]: { padding: "6px 5px", fontSize: "0.7rem" },
    [theme.breakpoints.down('xs')]: { padding: "5px 4px", fontSize: "0.65rem" },
    '@media (max-width: 380px)': { padding: "4px 3px", fontSize: "0.6rem" }
  },
  '& td:first-of-type': { paddingLeft: "16px", [theme.breakpoints.down('sm')]: { paddingLeft: "10px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "8px" } },
  '& td:last-of-type': { paddingRight: "16px", [theme.breakpoints.down('sm')]: { paddingRight: "10px" }, [theme.breakpoints.down('xs')]: { paddingRight: "8px" } }
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "8px 18px", // slightly smaller padding to reduce height
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.85rem",
  backgroundColor: "#6495ED",
  boxShadow: "0 4px 12px rgba(100, 149, 237, 0.3)",
  transition: "all 0.3s ease",
  flexShrink: 0,
  whiteSpace: "nowrap",
  '&:hover': { backgroundColor: "#4169E1", transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(65, 105, 225, 0.4)" },
  [theme.breakpoints.down('sm')]: { width: "100%", padding: "10px 16px", fontSize: "0.85rem", justifyContent: "center" },
  [theme.breakpoints.down('xs')]: { padding: "8px 12px", fontSize: "0.8rem", borderRadius: "10px" },
  '@media (max-width: 380px)': { padding: "6px 10px", fontSize: "0.75rem", borderRadius: "8px" }
}));

const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: "10px",
    backgroundColor: "#fff",
    '&:hover fieldset': { borderColor: "#6495ED" },
    '&.Mui-focused fieldset': { borderColor: "#6495ED", borderWidth: "2px" },
    [theme.breakpoints.down('sm')]: { borderRadius: "8px" },
    [theme.breakpoints.down('xs')]: { borderRadius: "6px" },
  },
  '& .MuiInputBase-input': {
    [theme.breakpoints.down('sm')]: { fontSize: "0.85rem", padding: "10px 12px" },
    [theme.breakpoints.down('xs')]: { fontSize: "0.75rem", padding: "8px 10px" },
  },
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

// ================= MAIN COMPONENT =================
export default function ServiceProviderPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const emptyForm = {
    serviceprovidername: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
  };

  const labelMap = {
    serviceprovidername: "Company Name",
    email: "Email",
    mobile: "Mobile",
    city: "City",
    state: "State",
    pincode: "Pin Code",
  };

  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const loadProviders = async () => {
    setLoading(true);
    try {
      const data = await serviceProviderApi.getAll();
      setProviders(Array.isArray(data) ? data : []);
      setFilteredProviders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading providers:", error);
      showSnackbar("Failed to load providers: " + error.message, "error");
      setProviders([]);
      setFilteredProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProviders();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProviders(providers);
      return;
    }
    const term = searchTerm.toLowerCase().trim();
    const filtered = providers.filter(p =>
      p.serviceprovidername?.toLowerCase().includes(term) ||
      p.email?.toLowerCase().includes(term) ||
      p.mobile?.includes(term) ||
      p.city?.toLowerCase().includes(term) ||
      p.state?.toLowerCase().includes(term) ||
      p.pincode?.includes(term)
    );
    setFilteredProviders(filtered);
  }, [searchTerm, providers]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
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
  };

  const handleRowClick = (provider) => {
    setSelectedId(provider.id);
    setForm({
      serviceprovidername: provider.serviceprovidername || "",
      email: provider.email || "",
      mobile: provider.mobile || "",
      city: provider.city || "",
      state: provider.state || "",
      pincode: provider.pincode || "",
    });
    setIsAddMode(false);
    setEditMode(false);
    setOpen(true);
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

  const handleSubmit = async () => {
    if (!form.serviceprovidername || !form.mobile) {
      showSnackbar("Company Name and Mobile are required", "warning");
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
        serviceprovidername: form.serviceprovidername.trim(),
        email: form.email?.trim() || "",
        mobile: cleanMobile,
        city: form.city?.trim() || "",
        state: form.state?.trim() || "",
        pincode: form.pincode?.trim() || "",
      };

      if (isAddMode) {
        const newProvider = await serviceProviderApi.create(payload);
        const updatedProviders = [...providers, newProvider];
        setProviders(updatedProviders);
        setFilteredProviders(updatedProviders);
        showSnackbar("Service Provider Added Successfully!", "success");
      } else {
        const updated = await serviceProviderApi.update(selectedId, payload);
        const updatedProviders = providers.map(p => p.id === selectedId ? updated : p);
        setProviders(updatedProviders);
        setFilteredProviders(updatedProviders);
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

  const handleDeleteClick = (e) => {
    if (e) e.stopPropagation();
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await serviceProviderApi.delete(selectedId);
      const updatedProviders = providers.filter(p => p.id !== selectedId);
      setProviders(updatedProviders);
      setFilteredProviders(updatedProviders);
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

  const getIconForField = (key) => {
    switch(key) {
      case 'serviceprovidername': return <BusinessIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      case 'email': return <EmailIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      case 'mobile': return <PhoneIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      case 'city':
      case 'state':
      case 'pincode': return <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress sx={{ color: '#6495ED' }} />
      </Box>
    );
  }

  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          {/* Compact Header */}
          <Box sx={{ 
            display: "flex",
            alignItems: "center",
            mb: 0.5, // reduced margin
            gap: 1,
          }}>
            <BusinessIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 22, md: 26 } }} />
            <Typography 
              variant="h6" 
              component="h1"
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.25rem" },
                color: "#1e293b",
                lineHeight: 1.2,
              }}
            >
              Service Providers
            </Typography>
          </Box>

          {/* Search Bar + Add Button in one row */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2, 
            mb: 1.5,
            [theme.breakpoints.down('sm')]: { flexDirection: "column", alignItems: "stretch" }
          }}>
            <SearchField
              fullWidth
              placeholder="Search by company name, email, mobile, city, state, pincode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}><CloseIcon fontSize="small" /></IconButton>
                  </InputAdornment>
                )
              }}
            />
            <AddButton
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              onClick={handleAddOpen}
              sx={{ 
                flexShrink: 0,
                minWidth: { xs: '100%', sm: 'auto' },
                [theme.breakpoints.down('sm')]: { width: '100%' }
              }}
            >
              Add Provider
            </AddButton>
          </Box>

          {/* Table/List View */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader size={isExtraSmall ? "small" : "medium"}>
                  <GradientHeader>
                    <TableRow>
                      <TableCell sx={{ minWidth: { xs: "100px", sm: "140px", md: "180px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Company Name
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "120px", sm: "170px", md: "200px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "90px", sm: "110px", md: "130px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Mobile
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
                    {filteredProviders.length > 0 ? (
                      filteredProviders.map((p) => (
                        <StyledTableRow key={p.id} onClick={() => handleRowClick(p)}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <BusinessIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                              <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' }, wordBreak: 'break-word' }}>
                                {p.serviceprovidername || '-'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: "#6495ED", fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' }, wordBreak: 'break-word' }}>
                              {p.email || "—"}
                            </Typography>
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
                        <TableCell colSpan={6} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <BusinessIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            {searchTerm ? `No providers found matching "${searchTerm}"` : "No service providers added yet"}
                          </Typography>
                          {!searchTerm && (
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
                          )}
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
                  {filteredProviders.length > 0 ? (
                    filteredProviders.map((p, index) => (
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
                                  {p.serviceprovidername || '-'}
                                </Typography>
                              </Box>
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
                                  Email
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5, color: "#6495ED", wordBreak: 'break-word' }}>
                                  <EmailIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {p.email || "—"}
                                </Typography>
                              </Box>
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
                                  City
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {p.city}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  State
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  {p.state}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Pin Code
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  {p.pincode}
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
                        {searchTerm ? `No providers found matching "${searchTerm}"` : "No service providers added yet"}
                      </Typography>
                      {!searchTerm && (
                        <Button
                          variant="outlined"
                          startIcon={<AddIcon />}
                          onClick={handleAddOpen}
                          sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        >
                          Add first provider
                        </Button>
                      )}
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
          {/* Add Button below table is removed */}
        </ContentWrapper>
      </MainContent>

      {/* ================= DIALOG (Add/Edit/View) ================= */}
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
              <CloseIcon />
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
                  required={key === 'serviceprovidername' || key === 'mobile'}
                  placeholder={key === 'mobile' ? "Enter 10-digit mobile number" : key === 'email' ? "provider@example.com" : ""}
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

      {/* ================= DELETE CONFIRMATION ================= */}
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
          <Typography sx={{ color: "#64748b", fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" } }}>
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
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              color: "#64748b",
              width: { xs: '100%', sm: 'auto' },
              order: { xs: 2, sm: 1 },
              '&:hover': {
                backgroundColor: "#f1f5f9"
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleConfirmDelete}
            disabled={submitting}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 600,
              px: 3,
              width: { xs: '100%', sm: 'auto' },
              order: { xs: 1, sm: 2 }
            }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* ================= SNACKBAR ================= */}
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