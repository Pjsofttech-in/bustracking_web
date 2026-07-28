// src/pages/AcademicYear/AcademicYear.jsx
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
  IconButton,
  Paper,
  Typography,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Tooltip,
  TableContainer as MuiTableContainer,
  InputAdornment
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

import academicYearApi from "../../api/academicYearApi";

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

// ---- Table container with horizontal scroll ----
const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 400px)",
  minHeight: "300px",
  width: "100%",
  overflowX: "auto",
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '4px', '&:hover': { backgroundColor: '#94a3b8' } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: { maxHeight: "calc(100vh - 380px)", minHeight: "250px" },
  [theme.breakpoints.down('sm')]: { maxHeight: "calc(100vh - 350px)", minHeight: "200px" },
  [theme.breakpoints.down('xs')]: { maxHeight: "calc(100vh - 320px)", minHeight: "150px", '&::-webkit-scrollbar': { width: '4px', height: '4px' } },
  '@media (max-width: 380px)': { maxHeight: "calc(100vh - 300px)", minHeight: "120px" }
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

// ---- Smaller Add Button ----
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

// ---- Inline Stats (adjustable size) ----
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
    '& .latest': {
      color: "#6495ED",
      fontWeight: 600,
    }
  }
}));

// ---- Filter input (white background, tiny) ----
const FilterInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    color: '#1e293b',
    '& fieldset': { borderColor: 'rgba(0,0,0,0.15)' },
    '&:hover fieldset': { borderColor: '#6495ED' },
    '&.Mui-focused fieldset': { borderColor: '#6495ED', borderWidth: '2px' },
    '& input': {
      padding: '2px 6px',
      fontSize: '0.6rem',
      [theme.breakpoints.down('md')]: { fontSize: '0.55rem', padding: '2px 5px' },
      [theme.breakpoints.down('sm')]: { fontSize: '0.5rem', padding: '1px 4px' },
      '&::placeholder': {
        color: 'rgba(0,0,0,0.4)',
        opacity: 1
      }
    }
  },
  '& .MuiInputAdornment-root': {
    marginRight: '2px',
    '& svg': {
      fontSize: '0.7rem',
      color: '#94a3b8'
    }
  },
  width: '100%',
  minWidth: '40px',
}));

// ---- Mobile search field ----
const MobileSearchField = styled(TextField)(({ theme }) => ({
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
  width: "100%",
  '&:hover': { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)" },
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
export default function AcademicYear() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [form, setForm] = useState({ yearName: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedYearName, setSelectedYearName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ---- Per‑column filters (desktop) ----
  const [filters, setFilters] = useState({
    id: "",
    yearName: "",
  });
  // ---- Mobile global search ----
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");

  // ================= SORTING HELPER (descending ID) =================
  const sortByIdDesc = (arr) => [...arr].sort((a, b) => b.id - a.id);

  // ================= LOAD ACADEMIC YEARS =================
  const loadData = async () => {
    setLoading(true);
    try {
      const response = await academicYearApi.getAll();
      const sorted = sortByIdDesc(Array.isArray(response) ? response : []);
      setData(sorted);
      setFilteredData(sorted);
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar("Failed to load academic years", "error");
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= FILTERING LOGIC =================
  useEffect(() => {
    let filtered = data;

    const matches = (val, filter) => {
      if (!filter) return true;
      if (val == null) return false;
      return String(val).toLowerCase().includes(filter.toLowerCase());
    };

    filtered = filtered.filter((item) =>
      matches(item.id, filters.id) &&
      matches(item.yearName, filters.yearName)
    );

    // Mobile global search
    if (isMobile && mobileSearchTerm.trim()) {
      const term = mobileSearchTerm.toLowerCase().trim();
      filtered = filtered.filter((item) =>
        matches(item.id, term) ||
        matches(item.yearName, term)
      );
    }

    setFilteredData(filtered);
  }, [data, filters, mobileSearchTerm, isMobile]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= FILTER HANDLERS =================
  const handleFilterChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleMobileSearchChange = (e) => {
    setMobileSearchTerm(e.target.value);
  };

  // ================= HANDLE SUBMIT (ADD) =================
  const handleSubmit = async () => {
    if (!form.yearName.trim()) {
      showSnackbar("Academic Year is required", "warning");
      return;
    }

    const yearPattern = /^\d{4}-\d{4}$/;
    if (!yearPattern.test(form.yearName.trim())) {
      showSnackbar("Please use format YYYY-YYYY (e.g., 2024-2025)", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const yearData = { yearName: form.yearName.trim() };
      const newYear = await academicYearApi.create(yearData);
      const updated = sortByIdDesc([...data, newYear]);
      setData(updated);
      setFilteredData(updated);
      showSnackbar("Academic Year Added Successfully", "success");
      setForm({ yearName: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      showSnackbar("Failed to add academic year", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HANDLE DELETE =================
  const handleDeleteClick = (id, yearName) => {
    setSelectedId(id);
    setSelectedYearName(yearName);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await academicYearApi.delete(selectedId);
      const updated = sortByIdDesc(data.filter((item) => item.id !== selectedId));
      setData(updated);
      setFilteredData(updated);
      showSnackbar("Academic Year Deleted Successfully", "success");
      setDeleteDialogOpen(false);
      setSelectedId(null);
      setSelectedYearName("");
    } catch (error) {
      console.error("Error deleting data:", error);
      showSnackbar("Failed to delete academic year", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setForm({ yearName: "" });
    setSubmitting(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
    setSelectedYearName("");
    setSubmitting(false);
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? '0.75rem' : '0.875rem' }}>
              Loading academic years...
            </Typography>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

  const latestYear = data.length > 0 ? data[0].yearName : "None"; // after sorting descending, first is latest

  // ================= RENDER =================
  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          {/* Header with inline stats and smaller Add button */}
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
                <CalendarTodayIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, color: "#1e293b" }}>
                  Academic Years
                </Typography>
              </Box>
              {/* Inline stats */}
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{data.length}</span></span>
                <span className="stat-chip">Latest <span className="latest">{latestYear}</span></span>
              </InlineStats>
            </Box>
            <AddButton variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />} onClick={() => setOpen(true)}>
              Add Year
            </AddButton>
          </Box>

          {/* Table/List View */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader sx={{ minWidth: 600 }}>
                  <GradientHeader>
                    {/* Header row */}
                    <TableRow>
                      <TableCell sx={{ minWidth: '60px' }}>ID</TableCell>
                      <TableCell sx={{ minWidth: '200px' }}>Academic Year</TableCell>
                      <TableCell sx={{ minWidth: '100px' }} align="center">Actions</TableCell>
                    </TableRow>
                    {/* Filter row */}
                    <TableRow>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter ID" value={filters.id} onChange={handleFilterChange('id')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Year" value={filters.yearName} onChange={handleFilterChange('yearName')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        {/* Actions – empty */}
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((row) => (
                        <StyledTableRow key={row.id}>
                          <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                          <TableCell sx={{ fontWeight: 500, wordBreak: 'break-word' }}>{row.yearName}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                              <Tooltip title="Delete">
                                <IconButton
                                  color="error"
                                  onClick={() => handleDeleteClick(row.id, row.yearName)}
                                  size={isExtraSmall ? "small" : "medium"}
                                  sx={{ borderRadius: "10px", padding: "8px", transition: "all 0.2s ease", '&:hover': { backgroundColor: "#fee2e2", transform: "scale(1.05)" } }}
                                >
                                  <DeleteIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <CalendarTodayIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            {Object.values(filters).some(f => f) ? "No academic years match your filters" : "No academic years added yet"}
                          </Typography>
                          {!Object.values(filters).some(f => f) && (
                            <Button
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={() => setOpen(true)}
                              sx={{ mt: 2, borderRadius: "10px", textTransform: "none", borderColor: "#6495ED", color: "#6495ED", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                            >
                              Add your first academic year
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              // Mobile/Tablet Card View with global search
              <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
                <MobileSearchField
                  fullWidth
                  placeholder="Search all fields..."
                  value={mobileSearchTerm}
                  onChange={handleMobileSearchChange}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                    endAdornment: mobileSearchTerm && (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setMobileSearchTerm('')}><CloseIcon fontSize="small" /></IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Stack spacing={1.5}>
                  {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <Grow in key={row.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard>
                          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 0.5 }}>
                              <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" }, fontWeight: 500, letterSpacing: "0.5px" }}>
                                  Academic Year #{row.id}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, mt: 0.25, wordBreak: 'break-word' }}>
                                  {row.yearName}
                                </Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Tooltip title="Delete">
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDeleteClick(row.id, row.yearName)}
                                    size={isExtraSmall ? "small" : "medium"}
                                    sx={{ borderRadius: "10px", padding: "8px", transition: "all 0.2s ease", '&:hover': { backgroundColor: "#fee2e2", transform: "scale(1.05)" } }}
                                  >
                                    <DeleteIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </CardContent>
                        </MobileCard>
                      </Grow>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <CalendarTodayIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        {mobileSearchTerm ? `No academic years found matching "${mobileSearchTerm}"` : "No academic years added yet"}
                      </Typography>
                      {!mobileSearchTerm && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          Add first year
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

      {/* Add Academic Year Dialog */}
      <StyledDialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }, color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", pr: 0.5, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          Add New Academic Year
          <IconButton onClick={handleCloseDialog} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
            <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              Enter the academic year in the format YYYY-YYYY
            </Typography>
          </Box>
          <StyledTextField
            label="Academic Year"
            name="yearName"
            placeholder="e.g., 2024-2025"
            value={form.yearName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            autoFocus
            disabled={submitting}
            helperText="Format: YYYY-YYYY (e.g., 2024-2025)"
            size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                </InputAdornment>
              )
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !submitting) {
                handleSubmit();
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, pt: { xs: 0.5, sm: 0.75, md: 1 }, gap: 0.5, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button onClick={handleCloseDialog} disabled={submitting} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#f1f5f9" }, flex: { xs: 1, sm: 0 }, order: { xs: 2, sm: 1 } }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={submitting} sx={{ textTransform: "none", borderRadius: "10px", backgroundColor: "#6495ED", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, flex: { xs: 1, sm: 0 }, order: { xs: 1, sm: 2 }, '&:hover': { backgroundColor: "#4169E1" } }}>
            {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Save Year"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Delete Confirmation Dialog */}
      <StyledDialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: "#dc2626", fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography sx={{ color: "#64748b", fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>
            Are you sure you want to delete academic year "{selectedYearName}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, gap: 0.5, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button onClick={handleCloseDeleteDialog} disabled={submitting} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#f1f5f9" }, order: { xs: 2, sm: 1 } }}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={submitting} sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, order: { xs: 1, sm: 2 } }}>
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
        sx={{ '& .MuiSnackbarContent-root': { [theme.breakpoints.down('xs')]: { minWidth: 'auto', width: '95%' } } }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: { xs: '0.75rem', sm: '0.875rem' }, '& .MuiAlert-icon': { fontSize: { xs: '18px', sm: '22px' } } }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}