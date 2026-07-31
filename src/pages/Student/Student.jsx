// src/pages/Student/Student.jsx
import React, { useState, useEffect } from "react";
import studentApi from "../../api/studentApi";
import classApi from "../../api/classApi";
import divisionApi from "../../api/divisionApi";
import mediumApi from "../../api/mediumApi";
import academicYearApi from "../../api/academicYearApi";
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
  TableContainer as MuiTableContainer,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import GroupsIcon from "@mui/icons-material/Groups";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
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
  maxWidth: "1150px",
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
  maxHeight: "calc(100vh - 180px)",
  minHeight: "500px",
  width: "100%",
  overflowX: "auto",
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '4px', '&:hover': { backgroundColor: '#94a3b8' } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: { maxHeight: "calc(100vh - 160px)", minHeight: "400px" },
  [theme.breakpoints.down('sm')]: { maxHeight: "calc(100vh - 140px)", minHeight: "300px" },
  [theme.breakpoints.down('xs')]: { maxHeight: "calc(100vh - 120px)", minHeight: "250px", '&::-webkit-scrollbar': { width: '4px', height: '4px' } },
  '@media (max-width: 380px)': { maxHeight: "calc(100vh - 100px)", minHeight: "200px" }
}));

const GradientHeader = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(135deg, #6495ED 0%, #4169E1 100%)",
  position: "sticky",
  top: 0,
  zIndex: 10,
  '& th': {
    color: "white",
    fontWeight: 600,
    fontSize: "0.65rem",
    letterSpacing: "0.2px",
    padding: "8px 6px",
    whiteSpace: "nowrap",
    borderBottom: "2px solid rgba(255,255,255,0.2)",
    position: "sticky",
    top: 0,
    backgroundColor: "inherit",
    [theme.breakpoints.down('lg')]: { fontSize: "0.6rem", padding: "7px 5px" },
    [theme.breakpoints.down('md')]: { fontSize: "0.55rem", padding: "6px 4px" },
    [theme.breakpoints.down('sm')]: { fontSize: "0.5rem", padding: "5px 3px", letterSpacing: "0.1px" },
    [theme.breakpoints.down('xs')]: { fontSize: "0.45rem", padding: "4px 3px" },
    '@media (max-width: 380px)': { fontSize: "0.4rem", padding: "3px 2px" }
  },
  '& th:first-of-type': { paddingLeft: "10px", [theme.breakpoints.down('sm')]: { paddingLeft: "6px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "4px" } },
  '& th:last-of-type': { paddingRight: "10px", [theme.breakpoints.down('sm')]: { paddingRight: "6px" }, [theme.breakpoints.down('xs')]: { paddingRight: "4px" } }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  '&:hover': { backgroundColor: "#f8fafc" },
  '&:nth-of-type(even)': { backgroundColor: "#fafbfc" },
  '&:nth-of-type(even):hover': { backgroundColor: "#f1f5f9" },
  '& td': {
    padding: "6px 6px",
    fontSize: "0.7rem",
    borderBottom: "1px solid #f1f5f9",
    [theme.breakpoints.down('lg')]: { padding: "5px 5px", fontSize: "0.65rem" },
    [theme.breakpoints.down('md')]: { padding: "4px 4px", fontSize: "0.6rem" },
    [theme.breakpoints.down('sm')]: { padding: "4px 3px", fontSize: "0.55rem" },
    [theme.breakpoints.down('xs')]: { padding: "3px 2px", fontSize: "0.5rem" },
    '@media (max-width: 380px)': { padding: "2px 2px", fontSize: "0.45rem" }
  },
  '& td:first-of-type': { paddingLeft: "10px", [theme.breakpoints.down('sm')]: { paddingLeft: "6px" }, [theme.breakpoints.down('xs')]: { paddingLeft: "4px" } },
  '& td:last-of-type': { paddingRight: "10px", [theme.breakpoints.down('sm')]: { paddingRight: "6px" }, [theme.breakpoints.down('xs')]: { paddingRight: "4px" } }
}));

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
    '&.active .num': { color: "#22c55e" },
    '&.present .num': { color: "#6495ED" },
    '&.bus .num': { color: "#d97706" },
  }
}));

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
  '&:hover': { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)", transform: "translateY(-2px)" },
  [theme.breakpoints.down('xs')]: { borderRadius: "10px" },
  '@media (max-width: 380px)': { borderRadius: "8px" }
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: "20px",
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: { margin: "24px", padding: theme.spacing(0.75), width: "95%" },
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
export default function Student() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const emptyForm = {
    id: null,
    name: "",
    rollNumber: "",
    admission: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    bloodGroup: "",
    age: "",
    studentClass: "",
    division: "",
    medium: "",
    academicYear: "",
    status: "",
    present: false,
    inBus: false
  };

  // ---- Data ----
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  // ---- Per‑column filters (desktop) ----
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    rollNumber: "",
    admission: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    bloodGroup: "",
    age: "",
    studentClass: "",
    division: "",
    medium: "",
    academicYear: "",
    status: "",
    present: "",
    inBus: ""
  });
  // ---- Mobile global search ----
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [classes, setClasses] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);

  // ================= SORTING HELPER (descending ID) =================
  const sortByIdDesc = (data) => [...data].sort((a, b) => b.id - a.id);

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await studentApi.getAll();
      const sorted = sortByIdDesc(Array.isArray(data) ? data : []);
      setStudents(sorted);
      setFilteredStudents(sorted);
    } catch (error) {
      console.error("Error loading students:", error);
      showSnackbar("Failed to load students", "error");
      setStudents([]);
      setFilteredStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD DROPDOWNS (FIXED) =================
  const loadDropdowns = async () => {
    try {
      const [classesData, divisionsData, mediumsData, academicYearsData] = await Promise.all([
        classApi.getAll().catch(() => []),
        divisionApi.getAll().catch(() => []),
        mediumApi.getAll().catch(() => []),
        academicYearApi.getAll().catch(() => [])
      ]);

      // ✅ Ensure each value is an array – fallback to [] if not
      setClasses(Array.isArray(classesData) ? classesData : []);
      setDivisions(Array.isArray(divisionsData) ? divisionsData : []);
      setMediums(Array.isArray(mediumsData) ? mediumsData : []);
      setAcademicYears(Array.isArray(academicYearsData) ? academicYearsData : []);
    } catch (error) {
      console.error("Error loading dropdowns:", error);
      // Also set to empty arrays on any error
      setClasses([]);
      setDivisions([]);
      setMediums([]);
      setAcademicYears([]);
    }
  };

  useEffect(() => {
    loadData();
    loadDropdowns();
  }, []);

  // ================= FILTERING LOGIC =================
  useEffect(() => {
    let filtered = students;

    const matches = (val, filter) => {
      if (!filter) return true;
      if (val == null) return false;
      return String(val).toLowerCase().includes(filter.toLowerCase());
    };

    // Apply per‑column filters
    filtered = filtered.filter(s =>
      matches(s.id, filters.id) &&
      matches(s.name, filters.name) &&
      matches(s.rollNumber, filters.rollNumber) &&
      matches(s.admission, filters.admission) &&
      matches(s.parentName, filters.parentName) &&
      matches(s.parentPhone, filters.parentPhone) &&
      matches(s.parentEmail, filters.parentEmail) &&
      matches(s.bloodGroup, filters.bloodGroup) &&
      matches(s.age, filters.age) &&
      matches(s.studentClass, filters.studentClass) &&
      matches(s.division, filters.division) &&
      matches(s.medium, filters.medium) &&
      matches(s.academicYear, filters.academicYear) &&
      matches(s.status, filters.status) &&
      matches(s.present ? "yes" : "no", filters.present) &&
      matches(s.inBus ? "yes" : "no", filters.inBus)
    );

    // Mobile global search (extra)
    if (isMobile && mobileSearchTerm.trim()) {
      const term = mobileSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(s =>
        matches(s.id, term) ||
        matches(s.name, term) ||
        matches(s.rollNumber, term) ||
        matches(s.admission, term) ||
        matches(s.parentName, term) ||
        matches(s.parentPhone, term) ||
        matches(s.parentEmail, term) ||
        matches(s.bloodGroup, term) ||
        matches(s.age, term) ||
        matches(s.studentClass, term) ||
        matches(s.division, term) ||
        matches(s.medium, term) ||
        matches(s.academicYear, term) ||
        matches(s.status, term)
      );
    }

    setFilteredStudents(filtered);
  }, [students, filters, mobileSearchTerm, isMobile]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFilterChange = (field) => (e) => {
    setFilters(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleMobileSearchChange = (e) => {
    setMobileSearchTerm(e.target.value);
  };

  const handleAdd = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setIsEdit(true);
    setOpen(true);
  };

  const handleRowClick = async (row) => {
    try {
      const studentData = await studentApi.getById(row.id);
      setForm({ ...studentData });
      setSelectedId(row.id);
      setIsEdit(false);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching student details:", error);
      setForm(row);
      setSelectedId(row.id);
      setIsEdit(false);
      setOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedId(null);
    setForm(emptyForm);
    setSubmitting(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.rollNumber || !form.studentClass) {
      showSnackbar("Please fill in all required fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        rollNumber: form.rollNumber.trim(),
        admission: form.admission || null,
        parentName: form.parentName?.trim() || "",
        parentPhone: form.parentPhone?.trim() || "",
        parentEmail: form.parentEmail?.trim() || "",
        bloodGroup: form.bloodGroup || "",
        age: form.age ? Number(form.age) : null,
        studentClass: form.studentClass,
        division: form.division || "",
        medium: form.medium || "",
        academicYear: form.academicYear || "",
        status: form.status || "ACTIVE",
        present: form.present || false,
        inBus: form.inBus || false
      };

      if (selectedId) {
        const updatedStudent = await studentApi.update(selectedId, payload);
        const updatedList = sortByIdDesc(students.map(s => s.id === selectedId ? updatedStudent : s));
        setStudents(updatedList);
        setFilteredStudents(updatedList);
        showSnackbar("Student updated successfully!", "success");
      } else {
        const newStudent = await studentApi.create(payload);
        const updatedList = sortByIdDesc([...students, newStudent]);
        setStudents(updatedList);
        setFilteredStudents(updatedList);
        showSnackbar("Student added successfully!", "success");
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving student:", error);
      showSnackbar(error.message || "Failed to save student", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = () => setDeleteDialogOpen(true);

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await studentApi.delete(selectedId);
      const updatedList = sortByIdDesc(students.filter(s => s.id !== selectedId));
      setStudents(updatedList);
      setFilteredStudents(updatedList);
      showSnackbar("Student deleted successfully!", "success");
      setDeleteDialogOpen(false);
      handleCloseDialog();
    } catch (error) {
      console.error("Error deleting student:", error);
      showSnackbar(error.message || "Failed to delete student", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'ACTIVE': return { bg: '#dcfce7', color: '#16a34a' };
      case 'INACTIVE': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
    } catch { return dateString; }
  };

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? '0.75rem' : '0.875rem' }}>
              Loading students...
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
          {/* ----- HEADER with inline stats and smaller Add button ----- */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" }, 
            justifyContent: "space-between", 
            alignItems: { xs: "stretch", sm: "center" }, 
            gap: { xs: 1, sm: 2 }, 
            mb: { xs: 2, sm: 2.5 } 
          }}>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, color: "#1e293b" }}>
                  Students
                </Typography>
              </Box>
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{students.length}</span></span>
                <span className="stat-chip active">Active <span className="num">{students.filter(s => s.status === 'ACTIVE').length}</span></span>
                <span className="stat-chip present">Present <span className="num">{students.filter(s => s.present).length}</span></span>
                <span className="stat-chip bus">In Bus <span className="num">{students.filter(s => s.inBus).length}</span></span>
              </InlineStats>
            </Box>
            <AddButton variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />} onClick={handleAdd}>
              Add Student
            </AddButton>
          </Box>

          {/* ----- TABLE / LIST VIEW ----- */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader size={isExtraSmall ? "small" : "medium"} sx={{ minWidth: 1200 }}>
                  <GradientHeader>
                    {/* Header row */}
                    <TableRow>
                      <TableCell sx={{ minWidth: '60px' }}>ID</TableCell>
                      <TableCell sx={{ minWidth: '200px' }}>Name</TableCell>
                      <TableCell sx={{ minWidth: '80px' }}>Roll</TableCell>
                      <TableCell sx={{ minWidth: '100px' }}>Admission</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>Parent Name</TableCell>
                      <TableCell sx={{ minWidth: '110px' }}>Parent Phone</TableCell>
                      <TableCell sx={{ minWidth: '150px' }}>Parent Email</TableCell>
                      <TableCell sx={{ minWidth: '70px' }}>Blood</TableCell>
                      <TableCell sx={{ minWidth: '50px' }}>Age</TableCell>
                      <TableCell sx={{ minWidth: '80px' }}>Class</TableCell>
                      <TableCell sx={{ minWidth: '80px' }}>Division</TableCell>
                      <TableCell sx={{ minWidth: '80px' }}>Medium</TableCell>
                      <TableCell sx={{ minWidth: '110px' }}>Academic Year</TableCell>
                      <TableCell sx={{ minWidth: '80px' }}>Status</TableCell>
                      <TableCell sx={{ minWidth: '70px' }}>Present</TableCell>
                      <TableCell sx={{ minWidth: '70px' }}>In Bus</TableCell>
                    </TableRow>
                    {/* Filter row */}
                    <TableRow>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.id} onChange={handleFilterChange('id')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)', minWidth: '200px' }}>
                        <FilterInput size="small" placeholder="Filter Name" value={filters.name} onChange={handleFilterChange('name')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.rollNumber} onChange={handleFilterChange('rollNumber')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.admission} onChange={handleFilterChange('admission')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.parentName} onChange={handleFilterChange('parentName')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.parentPhone} onChange={handleFilterChange('parentPhone')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.parentEmail} onChange={handleFilterChange('parentEmail')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.bloodGroup} onChange={handleFilterChange('bloodGroup')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.age} onChange={handleFilterChange('age')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.studentClass} onChange={handleFilterChange('studentClass')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.division} onChange={handleFilterChange('division')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.medium} onChange={handleFilterChange('medium')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.academicYear} onChange={handleFilterChange('academicYear')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.status} onChange={handleFilterChange('status')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="yes/no" value={filters.present} onChange={handleFilterChange('present')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="yes/no" value={filters.inBus} onChange={handleFilterChange('inBus')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((s) => (
                        <StyledTableRow key={s.id} onClick={() => handleRowClick(s)}>
                          <TableCell>{s.id}</TableCell>
                          <TableCell sx={{ minWidth: '200px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.3, sm: 0.5 } }}>
                              <PersonIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, color: "#6495ED" }} />
                              <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.8rem' }, wordBreak: 'break-word' }}>
                                {s.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{s.rollNumber}</TableCell>
                          <TableCell>{formatDate(s.admission)}</TableCell>
                          <TableCell>{s.parentName}</TableCell>
                          <TableCell>{s.parentPhone}</TableCell>
                          <TableCell>{s.parentEmail}</TableCell>
                          <TableCell>{s.bloodGroup}</TableCell>
                          <TableCell>{s.age}</TableCell>
                          <TableCell>{s.studentClass}</TableCell>
                          <TableCell>{s.division}</TableCell>
                          <TableCell>{s.medium}</TableCell>
                          <TableCell>{s.academicYear}</TableCell>
                          <TableCell><Chip label={s.status} size="small" sx={{ bgcolor: getStatusColor(s.status).bg, color: getStatusColor(s.status).color, fontWeight: 600, fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" }, borderRadius: "6px", height: { xs: "14px", sm: "16px", md: "20px" }, minWidth: { xs: "35px", sm: "45px", md: "55px" } }} /></TableCell>
                          <TableCell><Chip label={s.present ? "Yes" : "No"} size="small" sx={{ bgcolor: s.present ? "#dcfce7" : "#fee2e2", color: s.present ? "#16a34a" : "#dc2626", fontWeight: 600, fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" }, borderRadius: "6px", height: { xs: "14px", sm: "16px", md: "20px" }, minWidth: { xs: "30px", sm: "40px", md: "50px" } }} /></TableCell>
                          <TableCell><Chip label={s.inBus ? "Yes" : "No"} size="small" sx={{ bgcolor: s.inBus ? "#dbeafe" : "#f1f5f9", color: s.inBus ? "#6495ED" : "#94a3b8", fontWeight: 600, fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" }, borderRadius: "6px", height: { xs: "14px", sm: "16px", md: "20px" }, minWidth: { xs: "30px", sm: "40px", md: "50px" } }} /></TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={16} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <PersonIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            {Object.values(filters).some(f => f) ? "No students match your filters" : "No students added yet"}
                          </Typography>
                          {!Object.values(filters).some(f => f) && (
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAdd} sx={{ mt: 2, borderRadius: "10px", textTransform: "none", borderColor: "#6495ED", color: "#6495ED", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                              Add your first student
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              // ----- MOBILE CARD VIEW with global search -----
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
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((s, index) => (
                      <Grow in key={s.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard onClick={() => handleRowClick(s)}>
                          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } } }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 0.5 }}>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" }, fontWeight: 500, letterSpacing: "0.5px" }}>Student #{s.id}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, mt: 0.25, display: 'flex', alignItems: 'center', gap: 0.5, wordBreak: 'break-word' }}>
                                  <PersonIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, color: "#6495ED" }} />
                                  {s.name}
                                </Typography>
                              </Box>
                              <Chip label={s.status} size="small" sx={{ bgcolor: getStatusColor(s.status).bg, color: getStatusColor(s.status).color, fontWeight: 600, fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" }, borderRadius: "6px", height: { xs: "20px", sm: "22px", md: "24px" }, flexShrink: 0 }} />
                            </Box>
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: { xs: 1, sm: 1.5 }, mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
                              <Box><Typography variant="caption" color="text.secondary">Roll Number</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>{s.rollNumber}</Typography></Box>
                              <Box><Typography variant="caption" color="text.secondary">Class</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}><ClassIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />{s.studentClass}</Typography></Box>
                              <Box><Typography variant="caption" color="text.secondary">Division</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}><GroupsIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />{s.division}</Typography></Box>
                              <Box><Typography variant="caption" color="text.secondary">Medium</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}><LanguageIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />{s.medium}</Typography></Box>
                              <Box><Typography variant="caption" color="text.secondary">Academic Year</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}><CalendarMonthIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />{s.academicYear}</Typography></Box>
                              <Box><Typography variant="caption" color="text.secondary">Status</Typography><Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>Present: {s.present ? "✅" : "❌"} | In Bus: {s.inBus ? "✅" : "❌"}</Typography></Box>
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
                      <PersonIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        {mobileSearchTerm ? `No students found matching "${mobileSearchTerm}"` : "No students added yet"}
                      </Typography>
                      {!mobileSearchTerm && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAdd} sx={{ mt: 2 }}>
                          Add first student
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

      {/* ================= DIALOGS ================= */}
      <StyledDialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="lg">
        <DialogTitle sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" }, color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 0.5, pr: 0.5, p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <span>{selectedId ? "Student Details" : "Add New Student"}</span>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {selectedId && (
              <>
                <Tooltip title="Edit"><IconButton onClick={() => setIsEdit(true)} size={isExtraSmall ? "small" : "medium"} disabled={submitting}><EditIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 24 } }} /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton onClick={handleDeleteClick} size={isExtraSmall ? "small" : "medium"} disabled={submitting}><DeleteIcon sx={{ color: "#ef4444", fontSize: { xs: 18, sm: 20, md: 24 } }} /></IconButton></Tooltip>
              </>
            )}
            <IconButton onClick={handleCloseDialog} size={isExtraSmall ? "small" : "medium"} disabled={submitting}><CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField select label="Academic Year" name="academicYear" value={form.academicYear || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <MenuItem value="">Select</MenuItem>
                {academicYears.map(a => <MenuItem key={a.id} value={a.yearName}>{a.yearName}</MenuItem>)}
              </StyledTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Name" name="name" value={form.name || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth required size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} /></InputAdornment> }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Roll Number" name="rollNumber" value={form.rollNumber || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth required size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Admission Date" name="admission" type="date" value={form.admission || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Parent Name" name="parentName" value={form.parentName || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Parent Phone" name="parentPhone" value={form.parentPhone || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Parent Email" name="parentEmail" type="email" value={form.parentEmail || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Blood Group" name="bloodGroup" value={form.bloodGroup || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField label="Age" name="age" type="number" value={form.age || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField select label="Class" name="studentClass" value={form.studentClass || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth required size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <MenuItem value="">Select</MenuItem>
                {classes.map(c => <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>)}
              </StyledTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField select label="Division" name="division" value={form.division || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <MenuItem value="">Select</MenuItem>
                {divisions.map(d => <MenuItem key={d.divisionId} value={d.divisionName}>{d.divisionName}</MenuItem>)}
              </StyledTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField select label="Medium" name="medium" value={form.medium || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <MenuItem value="">Select</MenuItem>
                {mediums.map(m => <MenuItem key={m.id} value={m.mediumName}>{m.mediumName}</MenuItem>)}
              </StyledTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField select label="Status" name="status" value={form.status || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </StyledTextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1, md: 2 }, mt: 1, flexWrap: 'wrap' }}>
                <FormControlLabel control={<Switch checked={form.present || false} onChange={handleChange} name="present" disabled={!isEdit || submitting} size={isExtraSmall ? "small" : "medium"} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#22c55e', '&:hover': { backgroundColor: 'rgba(34, 197, 94, 0.08)' } }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#22c55e' } }} />} label={<Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>Present</Typography>} />
                <FormControlLabel control={<Switch checked={form.inBus || false} onChange={handleChange} name="inBus" disabled={!isEdit || submitting} size={isExtraSmall ? "small" : "medium"} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6495ED', '&:hover': { backgroundColor: 'rgba(100, 149, 237, 0.08)' } }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#6495ED' } }} />} label={<Typography sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>In Bus</Typography>} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        {isEdit && (
          <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, pt: { xs: 0.5, sm: 0.75, md: 1 }, gap: 0.5, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button onClick={handleCloseDialog} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#f1f5f9" }, flex: { xs: 1, sm: 0 }, order: { xs: 2, sm: 1 } }}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", backgroundColor: "#6495ED", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, flex: { xs: 1, sm: 0 }, order: { xs: 1, sm: 2 }, '&:hover': { backgroundColor: "#4169E1" } }}>
              {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : (selectedId ? "Update Student" : "Save Student")}
            </Button>
          </DialogActions>
        )}
      </StyledDialog>

      <StyledDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: "#dc2626", fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, p: { xs: 1.5, sm: 2, md: 2.5 } }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography sx={{ color: "#64748b", fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>Are you sure you want to delete this student? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, gap: 0.5, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#f1f5f9" }, order: { xs: 2, sm: 1 } }}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, order: { xs: 1, sm: 2 } }}>
            {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </StyledDialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: { xs: '0.75rem', sm: '0.875rem' }, '& .MuiAlert-icon': { fontSize: { xs: '18px', sm: '22px' } } }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}