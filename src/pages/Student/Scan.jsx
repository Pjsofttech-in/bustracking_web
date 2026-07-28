// src/pages/Student/Scan.jsx
import React, { useState, useEffect } from "react";
import studentScanApi from "../../api/studentScanApi";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Fade,
  Grow,
  Tooltip,
  Grid
} from "@mui/material";
import {
  QrCodeScanner as QrCodeScannerIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  DirectionsBus as DirectionsBusIcon,
  CalendarToday as CalendarTodayIcon,
  School as SchoolIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

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

// ---- Table container with horizontal scroll ----
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
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
    fontSize: "0.7rem",
    letterSpacing: "0.3px",
    padding: "10px 8px",
    whiteSpace: "nowrap",
    borderBottom: "2px solid rgba(255,255,255,0.2)",
    position: "sticky",
    top: 0,
    backgroundColor: "inherit",
    [theme.breakpoints.down('lg')]: { fontSize: "0.65rem", padding: "8px 6px" },
    [theme.breakpoints.down('md')]: { fontSize: "0.6rem", padding: "6px 5px" },
    [theme.breakpoints.down('sm')]: { fontSize: "0.55rem", padding: "5px 4px", letterSpacing: "0.2px" },
    [theme.breakpoints.down('xs')]: { fontSize: "0.5rem", padding: "4px 3px", letterSpacing: "0.1px" },
    '@media (max-width: 380px)': { fontSize: "0.45rem", padding: "3px 2px" }
  },
  '& th:first-of-type': { paddingLeft: "12px", [theme.breakpoints.down('sm')]: { paddingLeft: "8px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "6px" } },
  '& th:last-of-type': { paddingRight: "12px", [theme.breakpoints.down('sm')]: { paddingRight: "8px" }, [theme.breakpoints.down('xs')]: { paddingRight: "6px" } }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  '&:hover': { backgroundColor: "#f8fafc" },
  '&:nth-of-type(even)': { backgroundColor: "#fafbfc" },
  '&:nth-of-type(even):hover': { backgroundColor: "#f1f5f9" },
  '& td': {
    padding: "8px 8px",
    fontSize: "0.75rem",
    borderBottom: "1px solid #f1f5f9",
    [theme.breakpoints.down('lg')]: { padding: "7px 6px", fontSize: "0.7rem" },
    [theme.breakpoints.down('md')]: { padding: "6px 5px", fontSize: "0.65rem" },
    [theme.breakpoints.down('sm')]: { padding: "5px 4px", fontSize: "0.6rem" },
    [theme.breakpoints.down('xs')]: { padding: "4px 3px", fontSize: "0.55rem" },
    '@media (max-width: 380px)': { padding: "3px 2px", fontSize: "0.5rem" }
  },
  '& td:first-of-type': { paddingLeft: "12px", [theme.breakpoints.down('sm')]: { paddingLeft: "8px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "6px" } },
  '& td:last-of-type': { paddingRight: "12px", [theme.breakpoints.down('sm')]: { paddingRight: "8px" }, [theme.breakpoints.down('xs')]: { paddingRight: "6px" } }
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
    '&.today .num': { color: "#22c55e" },
    '&.students .num': { color: "#6495ED" },
    '&.buses .num': { color: "#d97706" },
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

// ---- Smaller Refresh Button ----
const RefreshButton = styled(Button)(({ theme }) => ({
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
  cursor: "pointer",
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

// ================= MAIN COMPONENT =================
export default function Scan() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBus, setFilterBus] = useState("all");
  const [selectedScan, setSelectedScan] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ---- Per‑column filters (desktop) ----
  const [filters, setFilters] = useState({
    id: "",
    studentName: "",
    studentRollNumber: "",
    busNumber: "",
    scannedAt: "",
  });
  // ---- Mobile global search ----
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");

  // ================= SORTING HELPER (descending ID) =================
  const sortByIdDesc = (data) => [...data].sort((a, b) => b.id - a.id);

  // ================= LOAD SCANS =================
  const loadScans = async () => {
    setLoading(true);
    try {
      const data = await studentScanApi.getAll();
      const sorted = sortByIdDesc(Array.isArray(data) ? data : []);
      setScans(sorted);
      setFilteredScans(sorted);
    } catch (error) {
      console.error("Error loading scans:", error);
      showSnackbar("Failed to load scans", "error");
      setScans([]);
      setFilteredScans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScans();
  }, []);

  // ================= FILTERING LOGIC =================
  useEffect(() => {
    let filtered = scans;

    const matches = (val, filter) => {
      if (!filter) return true;
      if (val == null) return false;
      return String(val).toLowerCase().includes(filter.toLowerCase());
    };

    // Apply per‑column filters
    filtered = filtered.filter((s) =>
      matches(s.id, filters.id) &&
      matches(s.studentName, filters.studentName) &&
      matches(s.studentRollNumber, filters.studentRollNumber) &&
      matches(s.busNumber, filters.busNumber) &&
      matches(s.scannedAt, filters.scannedAt)
    );

    // Additional bus filter (dropdown)
    if (filterBus !== "all") {
      filtered = filtered.filter((s) => s.busNumber === filterBus);
    }

    // Additional search (legacy)
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((s) =>
        matches(s.studentName, term) ||
        matches(s.studentRollNumber, term) ||
        matches(s.busNumber, term)
      );
    }

    // Mobile global search (extra)
    if (isMobile && mobileSearchTerm.trim()) {
      const term = mobileSearchTerm.toLowerCase().trim();
      filtered = filtered.filter((s) =>
        matches(s.id, term) ||
        matches(s.studentName, term) ||
        matches(s.studentRollNumber, term) ||
        matches(s.busNumber, term) ||
        matches(s.scannedAt, term)
      );
    }

    setFilteredScans(filtered);
  }, [scans, filters, filterBus, searchTerm, mobileSearchTerm, isMobile]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= HANDLERS =================
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBus(event.target.value);
  };

  const handleFilterInputChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleMobileSearchChange = (e) => {
    setMobileSearchTerm(e.target.value);
  };

  // ================= GET UNIQUE BUSES =================
  const getUniqueBuses = () => {
    const busNumbers = scans.map((scan) => scan.busNumber);
    return [...new Set(busNumbers)];
  };

  // ================= FORMAT DATE =================
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch { return dateString; }
  };

  const uniqueBuses = getUniqueBuses();

  // Stats
  const totalScans = scans.length;
  const todayScans = scans.filter(
    (s) => new Date(s.scannedAt).toDateString() === new Date().toDateString()
  ).length;
  const uniqueStudents = new Set(scans.map((s) => s.studentId)).size;
  const activeBuses = uniqueBuses.length;

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary">Loading scans...</Typography>
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
          {/* Header with inline stats and smaller Refresh button */}
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
                <QrCodeScannerIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, color: "#1e293b" }}>
                  Scan Records
                </Typography>
              </Box>
              {/* Inline stats */}
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{totalScans}</span></span>
                <span className="stat-chip today">Today <span className="num">{todayScans}</span></span>
                <span className="stat-chip students">Students <span className="num">{uniqueStudents}</span></span>
                <span className="stat-chip buses">Buses <span className="num">{activeBuses}</span></span>
              </InlineStats>
            </Box>
            <RefreshButton variant="contained" startIcon={<RefreshIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />} onClick={loadScans}>
              Refresh
            </RefreshButton>
          </Box>

          {/* Search and Filter (desktop) – now combined with per‑column filters, but we keep the search and bus filter for convenience */}
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1.5, sm: 2 }, mb: { xs: 2, sm: 2 } }}>
            <TextField
              placeholder="Search by student name, roll number or bus..."
              value={searchTerm}
              onChange={handleSearch}
              sx={{ flex: 1 }}
              size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} /></InputAdornment>,
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size={isExtraSmall ? "small" : "medium"} onClick={() => setSearchTerm("")}>
                      <CloseIcon sx={{ fontSize: isExtraSmall ? 16 : 20 }} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }} size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
              <InputLabel>Filter by Bus</InputLabel>
              <Select value={filterBus} onChange={handleFilterChange} label="Filter by Bus" sx={{ borderRadius: "10px" }}>
                <MenuItem value="all">All Buses</MenuItem>
                {uniqueBuses.map((bus) => (
                  <MenuItem key={bus} value={bus}>{bus}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Table/List View */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader sx={{ minWidth: 800 }}>
                  <GradientHeader>
                    {/* Header row */}
                    <TableRow>
                      <TableCell sx={{ minWidth: '60px' }}>ID</TableCell>
                      <TableCell sx={{ minWidth: '150px' }}>Student</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>Roll Number</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>Bus</TableCell>
                      <TableCell sx={{ minWidth: '200px' }}>Scanned At</TableCell>
                      <TableCell sx={{ minWidth: '100px' }} align="center">Status</TableCell>
                    </TableRow>
                    {/* Filter row */}
                    <TableRow>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter ID" value={filters.id} onChange={handleFilterInputChange('id')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Student" value={filters.studentName} onChange={handleFilterInputChange('studentName')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Roll" value={filters.studentRollNumber} onChange={handleFilterInputChange('studentRollNumber')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Bus" value={filters.busNumber} onChange={handleFilterInputChange('busNumber')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Date" value={filters.scannedAt} onChange={handleFilterInputChange('scannedAt')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        {/* Status filter – no filter needed */} 
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {filteredScans.length > 0 ? (
                      filteredScans.map((scan) => (
                        <StyledTableRow key={scan.id} onClick={() => { setSelectedScan(scan); setDetailsOpen(true); }}>
                          <TableCell>{scan.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <PersonIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: "#6495ED" }} />
                              <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' }, wordBreak: 'break-word' }}>{scan.studentName}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell><Chip label={scan.studentRollNumber} size="small" sx={{ backgroundColor: "#dbeafe", color: "#6495ED", fontWeight: 600, fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.7rem" }, borderRadius: "6px", height: { xs: "16px", sm: "18px", md: "24px" } }} /></TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <DirectionsBusIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: "#64748b" }} />
                              <Typography sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' } }}>{scan.busNumber}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <CalendarTodayIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, color: '#94a3b8' }} />
                              <Typography variant="body2" sx={{ fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.8rem' }, wordBreak: 'break-word' }}>{formatDate(scan.scannedAt)}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Chip label="Success" size="small" sx={{ backgroundColor: "#dcfce7", color: "#16a34a", fontWeight: 600, fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.7rem" }, borderRadius: "6px", height: { xs: "16px", sm: "18px", md: "24px" }, minWidth: { xs: "45px", sm: "55px", md: "70px" } }} />
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <QrCodeScannerIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                          <Typography variant="body1" color="text.secondary">No scan records found</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Try adjusting your search or filter</Typography>
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
                  {filteredScans.length > 0 ? (
                    filteredScans.map((scan, index) => (
                      <Grow in key={scan.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard onClick={() => { setSelectedScan(scan); setDetailsOpen(true); }}>
                          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 0.5 }}>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" }, fontWeight: 500, letterSpacing: "0.5px" }}>Scan #{scan.id}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, mt: 0.25, display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}>
                                  <PersonIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                                  {scan.studentName}
                                </Typography>
                              </Box>
                              <Chip label="Success" size="small" sx={{ backgroundColor: "#dcfce7", color: "#16a34a", fontWeight: 600, fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" }, borderRadius: "6px", height: { xs: "20px", sm: "22px", md: "24px" }, flexShrink: 0 }} />
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: { xs: 1, sm: 1.5 }, mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
                              <Box><Typography variant="caption" color="text.secondary">Roll Number</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>{scan.studentRollNumber}</Typography></Box>
                              <Box><Typography variant="caption" color="text.secondary">Bus</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5 }}><DirectionsBusIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />{scan.busNumber}</Typography></Box>
                              <Box sx={{ gridColumn: { xs: "1/3", sm: "auto" } }}><Typography variant="caption" color="text.secondary">Scanned At</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" }, display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}><CalendarTodayIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />{formatDate(scan.scannedAt)}</Typography></Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, pt: 1, borderTop: "1px solid #f1f5f9" }}>
                              <Typography variant="caption" color="text.secondary">Click to view details</Typography>
                            </Box>
                          </CardContent>
                        </MobileCard>
                      </Grow>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <QrCodeScannerIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        {mobileSearchTerm ? `No scans found matching "${mobileSearchTerm}"` : "No scan records found"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Try adjusting your search or filter</Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

      {/* Scan Details Dialog */}
      <StyledDialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }, color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          Scan Details
          <IconButton onClick={() => setDetailsOpen(false)} size={isExtraSmall ? "small" : "medium"}><CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          {selectedScan && (
            <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2}>
              <Grid item xs={12}><Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "#f8fafc", borderRadius: "12px", [theme.breakpoints.down('xs')]: { borderRadius: "8px", p: 1.5 } }}><Typography variant="caption" color="text.secondary">Scan ID</Typography><Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" } }}>#{selectedScan.id}</Typography></Box></Grid>
              <Grid item xs={12}><Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "#f8fafc", borderRadius: "12px", [theme.breakpoints.down('xs')]: { borderRadius: "8px", p: 1.5 } }}><Typography variant="caption" color="text.secondary">Student</Typography><Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" }, display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, wordBreak: 'break-word' }}><PersonIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />{selectedScan.studentName}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Roll Number: {selectedScan.studentRollNumber}</Typography></Box></Grid>
              <Grid item xs={12}><Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "#f8fafc", borderRadius: "12px", [theme.breakpoints.down('xs')]: { borderRadius: "8px", p: 1.5 } }}><Typography variant="caption" color="text.secondary">Bus</Typography><Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" }, display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, wordBreak: 'break-word' }}><DirectionsBusIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#64748b" }} />{selectedScan.busNumber}</Typography></Box></Grid>
              <Grid item xs={12}><Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "#f8fafc", borderRadius: "12px", [theme.breakpoints.down('xs')]: { borderRadius: "8px", p: 1.5 } }}><Typography variant="caption" color="text.secondary">Scanned At</Typography><Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" }, display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, wordBreak: 'break-word' }}><CalendarTodayIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#94a3b8" }} />{formatDate(selectedScan.scannedAt)}</Typography></Box></Grid>
              <Grid item xs={12}><Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: "#f8fafc", borderRadius: "12px", [theme.breakpoints.down('xs')]: { borderRadius: "8px", p: 1.5 } }}><Typography variant="caption" color="text.secondary">Status</Typography><Chip label="Success" sx={{ backgroundColor: "#dcfce7", color: "#16a34a", fontWeight: 600, fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" }, borderRadius: "6px", mt: 0.5, height: { xs: "24px", sm: "28px", md: "32px" } }} /></Box></Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, pt: { xs: 0.5, sm: 0.75, md: 1 } }}>
          <Button onClick={() => setDetailsOpen(false)} variant="contained" fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", backgroundColor: "#6495ED", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#4169E1" } }}>Close</Button>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: { xs: '0.75rem', sm: '0.875rem' }, '& .MuiAlert-icon': { fontSize: { xs: '18px', sm: '22px' } } }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}