// Medium.jsx - Fully Responsive for All iPhone Models

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";
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
export default function Medium() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ mediumName: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMedium, setSelectedMedium] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.mediums.getAll();
      setData(data);
    } catch (error) {
      console.error("Error fetching medium data", error);
      showSnackbar("Failed to load mediums", "error");
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
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async () => {
    if (!form.mediumName.trim()) {
      showSnackbar("Medium name is required", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const mediumData = {
        mediumName: form.mediumName.trim()
      };
      
      const newMedium = await api.mediums.create(mediumData);
      setData([...data, newMedium]);
      showSnackbar("Medium Added Successfully", "success");
      setForm({ mediumName: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error saving medium:", error);
      showSnackbar(error.message || "Error Saving Medium", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HANDLE DELETE =================
  const handleDeleteClick = (medium) => {
    setSelectedMedium(medium);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await api.mediums.delete(selectedMedium.id);
      setData(data.filter(item => item.id !== selectedMedium.id));
      showSnackbar("Medium Deleted Successfully", "success");
      setDeleteDialogOpen(false);
      setSelectedMedium(null);
    } catch (error) {
      console.error("Error deleting medium:", error);
      showSnackbar(error.message || "Error Deleting Medium", "error");
    } finally {
      setSubmitting(false);
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
              Loading mediums...
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
                <TranslateIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <span>Mediums</span>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Manage language mediums
              </Typography>
            </Box>

            <AddButton
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              onClick={() => setOpen(true)}
            >
              Add Medium
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
                Total Mediums
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>
                {data.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Active Mediums
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>
                {data.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Languages
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#6495ED" }}>
                {data.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Last Updated
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" }, color: "#64748b" }}>
                {data.length > 0 ? "Today" : "No Data"}
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
                      <TableCell sx={{ minWidth: { xs: "30px", sm: "40px", md: "80px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          ID
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Medium Name
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "150px" } }} align="center">
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }} align="center">
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {data.length > 0 ? (
                      data.map((row, index) => (
                        <StyledTableRow key={row.id}>
                          <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <LanguageIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: "#6495ED" }} />
                              <Typography sx={{ 
                                fontWeight: 500, 
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                                wordBreak: 'break-word'
                              }}>
                                {row.mediumName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label="Active"
                              size="small"
                              sx={{
                                backgroundColor: "#dcfce7",
                                color: "#16a34a",
                                fontWeight: 600,
                                fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.7rem" },
                                borderRadius: "6px",
                                height: { xs: "16px", sm: "18px", md: "24px" },
                                minWidth: { xs: "45px", sm: "55px", md: "70px" }
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Delete">
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteClick(row)}
                                size={isExtraSmall ? "small" : "medium"}
                                sx={{
                                  borderRadius: "10px",
                                  padding: { xs: "4px", sm: "6px", md: "8px" },
                                  transition: "all 0.2s ease",
                                  '&:hover': {
                                    backgroundColor: "#fee2e2",
                                    transform: "scale(1.05)",
                                  }
                                }}
                              >
                                <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 20 } }} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <TranslateIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            No mediums added yet
                          </Typography>
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => setOpen(true)}
                            sx={{ 
                              mt: 2,
                              borderRadius: "10px",
                              textTransform: "none",
                              borderColor: "#6495ED",
                              color: "#6495ED",
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            }}
                          >
                            Add your first medium
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
                  {data.length > 0 ? (
                    data.map((row, index) => (
                      <Grow in key={row.id} timeout={300 * (index + 1) * 0.1}>
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
                                  Medium #{row.id}
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
                                  <LanguageIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                                  {row.mediumName}
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                gap: 0.5,
                                flexShrink: 0
                              }}>
                                <Chip 
                                  label="Active"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#dcfce7",
                                    color: "#16a34a",
                                    fontWeight: 600,
                                    fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" },
                                    borderRadius: "6px",
                                    height: { xs: "18px", sm: "20px", md: "24px" }
                                  }}
                                />
                                <Tooltip title="Delete">
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDeleteClick(row)}
                                    size={isExtraSmall ? "small" : "medium"}
                                    sx={{
                                      borderRadius: "10px",
                                      padding: { xs: "4px", sm: "6px" },
                                      transition: "all 0.2s ease",
                                      '&:hover': {
                                        backgroundColor: "#fee2e2",
                                      }
                                    }}
                                  >
                                    <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>

                            <Box sx={{ 
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: { xs: 1, sm: 1.5 },
                              mt: 1.5,
                              pt: 1.5,
                              borderTop: "1px solid #f1f5f9"
                            }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Medium ID
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.85rem" } }}>
                                  #{row.id}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Status
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  fontWeight: 500, 
                                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.85rem" }, 
                                  color: "#16a34a" 
                                }}>
                                  Active
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </MobileCard>
                      </Grow>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <TranslateIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        No mediums added yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                        sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        Add first medium
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

      {/* Add Medium Dialog */}
      <StyledDialog 
        open={open} 
        onClose={() => setOpen(false)} 
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
          Add New Medium
          <IconButton onClick={() => setOpen(false)} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
            <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ 
              mb: 2,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
              Enter the medium name (e.g., English, Spanish, French)
            </Typography>
          </Box>
          <StyledTextField
            label="Medium Name"
            name="mediumName"
            placeholder="e.g., English"
            value={form.mediumName}
            onChange={handleChange}
            fullWidth
            disabled={submitting}
            size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                </InputAdornment>
              )
            }}
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !submitting) {
                handleSubmit();
              }
            }}
          />
        </DialogContent>

        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2, md: 2.5 }, 
          pt: { xs: 0.5, sm: 0.75, md: 1 }, 
          gap: 0.5, 
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button 
            onClick={() => setOpen(false)}
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
              order: { xs: 1, sm: 2 },
              '&:hover': {
                backgroundColor: "#4169E1"
              }
            }}
          >
            {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Save Medium"}
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
            Are you sure you want to delete the medium "{selectedMedium?.mediumName}"? 
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