// BusSupplier.jsx - Fully Responsive for All iPhone Models

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  TableContainer as MuiTableContainer
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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

const FormPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  padding: theme.spacing(4),
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

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
  padding: "4px 12px",
  fontSize: "0.7rem",
  [theme.breakpoints.down('sm')]: {
    padding: "3px 8px",
    fontSize: "0.6rem",
    minWidth: "50px",
  },
  [theme.breakpoints.down('xs')]: {
    padding: "2px 6px",
    fontSize: "0.55rem",
    minWidth: "40px",
  }
}));

// ================= MAIN COMPONENT =================
export default function BusSupplier() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [form, setForm] = useState({
    supplierName: "",
    companyName: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [suppliers, setSuppliers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ================= GET ALL =================
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await api.busSuppliers.getAll();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      showSnackbar("Failed to load suppliers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.supplierName || !form.companyName || !form.mobile || !form.email) {
      showSnackbar("Please fill in all required fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        supplierName: form.supplierName,
        companyName: form.companyName,
        mobile: form.mobile,
        email: form.email,
        address: form.address || ""
      };

      if (editId) {
        const updatedSupplier = await api.busSuppliers.update(editId, payload);
        setSuppliers(suppliers.map(s => s.id === editId ? updatedSupplier : s));
        showSnackbar("Supplier Updated Successfully!", "success");
      } else {
        const newSupplier = await api.busSuppliers.create(payload);
        setSuppliers([...suppliers, newSupplier]);
        showSnackbar("Supplier Added Successfully!", "success");
      }

      setForm({
        supplierName: "",
        companyName: "",
        mobile: "",
        email: "",
        address: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error saving supplier:", error);
      showSnackbar(error.message || "Error saving supplier", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= DELETE =================
  const handleDeleteClick = (supplier) => {
    setSelectedSupplier(supplier);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await api.busSuppliers.delete(selectedSupplier.id);
      setSuppliers(suppliers.filter(s => s.id !== selectedSupplier.id));
      showSnackbar("Supplier Deleted Successfully!", "success");
      setDeleteDialogOpen(false);
      setSelectedSupplier(null);
    } catch (error) {
      console.error("Error deleting supplier:", error);
      showSnackbar(error.message || "Error deleting supplier", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (supplier) => {
    setForm({
      supplierName: supplier.supplierName,
      companyName: supplier.companyName,
      mobile: supplier.mobile,
      email: supplier.email,
      address: supplier.address || "",
    });
    setEditId(supplier.id);
    document.getElementById('supplier-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setForm({
      supplierName: "",
      companyName: "",
      mobile: "",
      email: "",
      address: "",
    });
    setEditId(null);
  };

  // Loading state
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
              Loading suppliers...
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
                <span>Bus Suppliers</span>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Manage bus service providers and suppliers
              </Typography>
            </Box>
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
                Total Suppliers
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>
                {suppliers.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Active Contracts
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>
                {suppliers.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Service Areas
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#6495ED" }}>
                {Math.round(suppliers.length * 2.5)}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Coverage
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" }, color: "#64748b" }}>
                {suppliers.length > 0 ? "Active" : "No Data"}
              </Typography>
            </StatsCard>
          </Box>

          {/* Form Section */}
          <FormPaper id="supplier-form">
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between",
              alignItems: "center",
              mb: { xs: 2, sm: 2.5, md: 3 },
              flexWrap: "wrap",
              gap: 1
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600, 
                color: "#1e293b",
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }
              }}>
                {editId ? "Edit Supplier" : "Add New Supplier"}
              </Typography>
              {editId && (
                <Button
                  variant="outlined"
                  size={isExtraSmall ? "small" : "medium"}
                  onClick={handleCancelEdit}
                  disabled={submitting}
                  sx={{
                    borderRadius: "8px",
                    textTransform: "none",
                    borderColor: "#94a3b8",
                    color: "#64748b",
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                    padding: { xs: "2px 10px", sm: "4px 14px", md: "6px 16px" }
                  }}
                >
                  Cancel Edit
                </Button>
              )}
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={isExtraSmall ? 1.5 : isMobile ? 2 : 3}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Supplier Name"
                    name="supplierName"
                    value={form.supplierName}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BusinessIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={submitting}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    multiline
                    rows={isExtraSmall ? 2 : isMobile ? 2 : 3}
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={submitting}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                          <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting}
                    fullWidth={isMobile}
                    size={isExtraSmall ? "small" : "medium"}
                    sx={{
                      backgroundColor: "#6495ED",
                      borderRadius: "10px",
                      px: { xs: 3, sm: 4, md: 5 },
                      py: { xs: 1, sm: 1.2 },
                      fontWeight: 600,
                      textTransform: "none",
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.95rem' },
                      boxShadow: "0 4px 12px rgba(100, 149, 237, 0.3)",
                      '&:hover': {
                        backgroundColor: "#4169E1",
                        transform: { md: "translateY(-2px)" },
                        boxShadow: "0 6px 20px rgba(65, 105, 225, 0.4)",
                      },
                    }}
                  >
                    {submitting ? (
                      <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" />
                    ) : (
                      editId ? "Update Supplier" : "Save Supplier"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </FormPaper>

          {/* Table/List View */}
          <StyledPaper sx={{ mt: { xs: 2, sm: 2.5, md: 3 } }}>
            {isDesktop ? (
              // Desktop Table View
              <StyledTableContainer>
                <Table stickyHeader size={isExtraSmall ? "small" : "medium"}>
                  <GradientHeader>
                    <TableRow>
                      <TableCell sx={{ minWidth: { xs: "100px", sm: "130px", md: "160px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Supplier Name
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "90px", sm: "120px", md: "150px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Company
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
                      <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Address
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "100px", sm: "130px", md: "160px" } }} align="center">
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {suppliers.length > 0 ? (
                      suppliers.map((supplier) => (
                        <StyledTableRow key={supplier.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <PersonIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                              <Typography sx={{ 
                                fontWeight: 500, 
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                                wordBreak: 'break-word'
                              }}>
                                {supplier.supplierName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <BusinessIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#64748b" }} />
                              <Typography sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' } }}>
                                {supplier.companyName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={supplier.mobile}
                              size="small"
                              sx={{
                                backgroundColor: "#f1f5f9",
                                color: "#1e293b",
                                fontWeight: 500,
                                fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.75rem" },
                                borderRadius: "6px",
                                height: { xs: "18px", sm: "20px", md: "24px" }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ 
                              color: "#6495ED",
                              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                              wordBreak: 'break-word'
                            }}>
                              {supplier.email}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ 
                                maxWidth: { xs: 60, sm: 80, md: 120 }, 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap',
                                fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' }
                              }}>
                                {supplier.address || '-'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, justifyContent: 'center', flexWrap: 'wrap' }}>
                              <Tooltip title="Edit">
                                <ActionButton
                                  variant="contained"
                                  sx={{ 
                                    backgroundColor: "#f59e0b", 
                                    '&:hover': { backgroundColor: "#d97706" },
                                    fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
                                    padding: { xs: "2px 8px", sm: "4px 12px" }
                                  }}
                                  onClick={() => handleEdit(supplier)}
                                >
                                  <EditIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, mr: { xs: 0.2, sm: 0.5 } }} />
                                  <span className="hidden xs:inline">Edit</span>
                                </ActionButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <ActionButton
                                  variant="contained"
                                  sx={{ 
                                    backgroundColor: "#ef4444", 
                                    '&:hover': { backgroundColor: "#dc2626" },
                                    fontSize: { xs: '0.55rem', sm: '0.6rem', md: '0.7rem' },
                                    padding: { xs: "2px 8px", sm: "4px 12px" }
                                  }}
                                  onClick={() => handleDeleteClick(supplier)}
                                >
                                  <DeleteIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, mr: { xs: 0.2, sm: 0.5 } }} />
                                  <span className="hidden xs:inline">Delete</span>
                                </ActionButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <BusinessIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            No suppliers added yet
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            Use the form above to add your first supplier
                          </Typography>
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
                  {suppliers.length > 0 ? (
                    suppliers.map((supplier, index) => (
                      <Grow in key={supplier.id} timeout={300 * (index + 1) * 0.1}>
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
                                  Supplier #{supplier.id}
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
                                  <PersonIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                                  {supplier.supplierName}
                                </Typography>
                              </Box>
                              <Chip 
                                label="Active"
                                size="small"
                                sx={{
                                  backgroundColor: "#dcfce7",
                                  color: "#16a34a",
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
                                  Company
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  fontWeight: 500, 
                                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 0.5,
                                  wordBreak: 'break-word'
                                }}>
                                  <BusinessIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {supplier.companyName}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Mobile
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  <PhoneIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />
                                  {supplier.mobile}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Email
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  fontWeight: 500, 
                                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, 
                                  color: "#6495ED",
                                  wordBreak: 'break-word'
                                }}>
                                  <EmailIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />
                                  {supplier.email}
                                </Typography>
                              </Box>
                              {supplier.address && (
                                <Box sx={{ gridColumn: "1/3" }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                    Address
                                  </Typography>
                                  <Typography variant="body2" sx={{ 
                                    fontWeight: 500, 
                                    fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, 
                                    display: 'flex', 
                                    alignItems: 'flex-start', 
                                    gap: 0.5,
                                    wordBreak: 'break-word'
                                  }}>
                                    <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mt: 0.2 }} />
                                    {supplier.address}
                                  </Typography>
                                </Box>
                              )}
                            </Box>

                            <Box sx={{ 
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 0.5,
                              mt: 1.5,
                              pt: 1.5,
                              borderTop: "1px solid #f1f5f9",
                              flexWrap: "wrap"
                            }}>
                              <ActionButton
                                variant="contained"
                                sx={{ 
                                  backgroundColor: "#f59e0b", 
                                  '&:hover': { backgroundColor: "#d97706" },
                                  fontSize: { xs: '0.55rem', sm: '0.65rem' },
                                  padding: { xs: "2px 8px", sm: "4px 12px" }
                                }}
                                onClick={() => handleEdit(supplier)}
                                size={isExtraSmall ? "small" : "medium"}
                              >
                                <EditIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                                Edit
                              </ActionButton>
                              <ActionButton
                                variant="contained"
                                sx={{ 
                                  backgroundColor: "#ef4444", 
                                  '&:hover': { backgroundColor: "#dc2626" },
                                  fontSize: { xs: '0.55rem', sm: '0.65rem' },
                                  padding: { xs: "2px 8px", sm: "4px 12px" }
                                }}
                                onClick={() => handleDeleteClick(supplier)}
                                size={isExtraSmall ? "small" : "medium"}
                              >
                                <DeleteIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                                Delete
                              </ActionButton>
                            </Box>
                          </CardContent>
                        </MobileCard>
                      </Grow>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <BusinessIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        No suppliers added yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                        Use the form above to add your first supplier
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

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
            Are you sure you want to delete the supplier "{selectedSupplier?.supplierName}"? 
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