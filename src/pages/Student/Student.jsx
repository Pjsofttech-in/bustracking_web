// src/pages/Student/Student.jsx
import React, { useState, useEffect, useMemo } from "react";
import studentApi from "../../api/studentApi";
import classApi from "../../api/classApi";
import divisionApi from "../../api/divisionApi";
import mediumApi from "../../api/mediumApi";
import academicYearApi from "../../api/academicYearApi";
import busRouteApi from "../../api/busRouteApi";  // ✅ import
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
  Grid,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
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
import ClearIcon from "@mui/icons-material/Clear";
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
    inBus: false,
    routeId: "",   // ✅ added
  };

  const [students, setStudents] = useState([]);
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
  const [routes, setRoutes] = useState([]);   // ✅ added

  // ---- FILTER STATE ----
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterDivision, setFilterDivision] = useState('');
  const [filterMedium, setFilterMedium] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  // ✅ new route filters
  const [filterRouteId, setFilterRouteId] = useState('');
  const [filterRouteName, setFilterRouteName] = useState('');

  // ================= SORTING HELPER =================
  const sortByIdDesc = (data) => [...data].sort((a, b) => b.id - a.id);

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const data = await studentApi.getAll();
      const sorted = sortByIdDesc(Array.isArray(data) ? data : []);
      setStudents(sorted);
    } catch (error) {
      console.error("Error loading students:", error);
      showSnackbar("Failed to load students", "error");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD DROPDOWNS =================
  const loadDropdowns = async () => {
    try {
      const [classesData, divisionsData, mediumsData, academicYearsData, routesData] = await Promise.all([
        classApi.getAll().catch(() => []),
        divisionApi.getAll().catch(() => []),
        mediumApi.getAll().catch(() => []),
        academicYearApi.getAll().catch(() => []),
        busRouteApi.getAll().catch(() => [])   // ✅ load routes
      ]);
      setClasses(Array.isArray(classesData) ? classesData : []);
      setDivisions(Array.isArray(divisionsData) ? divisionsData : []);
      setMediums(Array.isArray(mediumsData) ? mediumsData : []);
      setAcademicYears(Array.isArray(academicYearsData) ? academicYearsData : []);
      setRoutes(Array.isArray(routesData) ? routesData : []);
    } catch (error) {
      console.error("Error loading dropdowns:", error);
      setClasses([]);
      setDivisions([]);
      setMediums([]);
      setAcademicYears([]);
      setRoutes([]);
    }
  };

  useEffect(() => {
    loadData();
    loadDropdowns();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= FILTER OPTIONS =================
  const classOptions = useMemo(() => {
    const unique = new Set(students.map(s => s.studentClass).filter(Boolean));
    return Array.from(unique).sort();
  }, [students]);

  const divisionOptions = useMemo(() => {
    const unique = new Set(students.map(s => s.division).filter(Boolean));
    return Array.from(unique).sort();
  }, [students]);

  const mediumOptions = useMemo(() => {
    const unique = new Set(students.map(s => s.medium).filter(Boolean));
    return Array.from(unique).sort();
  }, [students]);

  const statusOptions = ['ACTIVE', 'INACTIVE'];

  // ================= FILTERED STUDENTS =================
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.parentPhone.includes(searchQuery) ||
        student.parentEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClass = filterClass === '' || student.studentClass === filterClass;
      const matchesDivision = filterDivision === '' || student.division === filterDivision;
      const matchesMedium = filterMedium === '' || student.medium === filterMedium;
      const matchesStatus = filterStatus === '' || student.status === filterStatus;
      // ✅ route filters
      const matchesRouteId = filterRouteId === '' || String(student.routeId).includes(filterRouteId);
      const matchesRouteName = filterRouteName === '' || (student.routeName && student.routeName.toLowerCase().includes(filterRouteName.toLowerCase()));

      return matchesSearch && matchesClass && matchesDivision && matchesMedium && matchesStatus && matchesRouteId && matchesRouteName;
    });
  }, [students, searchQuery, filterClass, filterDivision, filterMedium, filterStatus, filterRouteId, filterRouteName]);

  // ================= CLEAR FILTERS =================
  const clearFilters = () => {
    setSearchQuery('');
    setFilterClass('');
    setFilterDivision('');
    setFilterMedium('');
    setFilterStatus('');
    setFilterRouteId('');      // ✅
    setFilterRouteName('');    // ✅
  };

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
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
        inBus: form.inBus || false,
        routeId: form.routeId ? Number(form.routeId) : null   // ✅ convert to number
      };

      if (selectedId) {
        const updatedStudent = await studentApi.update(selectedId, payload);
        const updatedList = sortByIdDesc(students.map(s => s.id === selectedId ? updatedStudent : s));
        setStudents(updatedList);
        showSnackbar("Student updated successfully!", "success");
      } else {
        const newStudent = await studentApi.create(payload);
        const updatedList = sortByIdDesc([...students, newStudent]);
        setStudents(updatedList);
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
          {/* ----- HEADER with stats, search, add button ----- */}
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 1.5, sm: 2 },
            mb: { xs: 2, sm: 2.5 }
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              flexWrap: "wrap",
              gap: { xs: 1, sm: 2 },
              flex: 1
            }}>
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{students.length}</span></span>
                <span className="stat-chip active">Active <span className="num">{students.filter(s => s.status === 'ACTIVE').length}</span></span>
                <span className="stat-chip present">Present <span className="num">{students.filter(s => s.present).length}</span></span>
                <span className="stat-chip bus">In Bus <span className="num">{students.filter(s => s.inBus).length}</span></span>
              </InlineStats>
              <TextField
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{
                  minWidth: { xs: '100%', sm: '200px' },
                  maxWidth: { xs: '100%', sm: '260px' },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: 'white',
                    '& fieldset': { borderColor: '#e2e8f0' },
                    '&:hover fieldset': { borderColor: '#6495ED' },
                    '&.Mui-focused fieldset': { borderColor: '#6495ED' }
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} /></InputAdornment>,
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchQuery('')} sx={{ p: 0.5 }}>
                        <ClearIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <AddButton variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />} onClick={handleAdd}>
              Add Student
            </AddButton>
          </Box>

          {/* ----- FILTER BAR – added route filters ----- */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 2,
            p: { xs: 1, sm: 1.5 },
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap'
          }}>
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '140px' }, flex: 1 }}>
              <InputLabel>Class</InputLabel>
              <Select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} input={<OutlinedInput label="Class" />}>
                <MenuItem value="">All Classes</MenuItem>
                {classOptions.map(cls => <MenuItem key={cls} value={cls}>{cls}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '140px' }, flex: 1 }}>
              <InputLabel>Division</InputLabel>
              <Select value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)} input={<OutlinedInput label="Division" />}>
                <MenuItem value="">All Divisions</MenuItem>
                {divisionOptions.map(div => <MenuItem key={div} value={div}>{div}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '140px' }, flex: 1 }}>
              <InputLabel>Medium</InputLabel>
              <Select value={filterMedium} onChange={(e) => setFilterMedium(e.target.value)} input={<OutlinedInput label="Medium" />}>
                <MenuItem value="">All Mediums</MenuItem>
                {mediumOptions.map(med => <MenuItem key={med} value={med}>{med}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '140px' }, flex: 1 }}>
              <InputLabel>Status</InputLabel>
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} input={<OutlinedInput label="Status" />}>
                <MenuItem value="">All Statuses</MenuItem>
                {statusOptions.map(status => <MenuItem key={status} value={status}>{status}</MenuItem>)}
              </Select>
            </FormControl>
            {/* ✅ New route filters */}
            <TextField
              size="small"
              label="Route ID"
              value={filterRouteId}
              onChange={(e) => setFilterRouteId(e.target.value)}
              sx={{ minWidth: { xs: '100%', sm: '120px' }, flex: 1 }}
              InputProps={{ type: 'number' }}
            />
            <TextField
              size="small"
              label="Route Name"
              value={filterRouteName}
              onChange={(e) => setFilterRouteName(e.target.value)}
              sx={{ minWidth: { xs: '100%', sm: '140px' }, flex: 1 }}
            />
            <Button
              variant="text" onClick={clearFilters} size="small"
              sx={{ color: '#64748b', textTransform: 'none', fontWeight: 500, '&:hover': { backgroundColor: 'transparent', color: '#1e293b' } }}
              startIcon={<ClearIcon sx={{ fontSize: 18 }} />}
            >
              Clear
            </Button>
          </Box>

          {/* ----- TABLE / CARDS ----- */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader size={isExtraSmall ? "small" : "medium"} sx={{ minWidth: 1400 }}>
                  <GradientHeader>
                    <TableRow>
                      <TableCell sx={{ minWidth: '60px' }}>ID</TableCell>
                      <TableCell sx={{ minWidth: '200px' }}>Name</TableCell>
                      <TableCell sx={{ minWidth: '80px' }}>Route ID</TableCell>
                      <TableCell sx={{ minWidth: '140px' }}>Route Name</TableCell>
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
                          <TableCell>{s.routeId || '-'}</TableCell>
                          <TableCell>{s.routeName || '-'}</TableCell>
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
                        <TableCell colSpan={18} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <PersonIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            {students.length === 0 ? "No students added yet" : "No students match your filters"}
                          </Typography>
                          <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAdd} sx={{ mt: 2, borderRadius: "10px", textTransform: "none", borderColor: "#6495ED", color: "#6495ED", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                            {students.length === 0 ? "Add your first student" : "Add a new student"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
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
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                                  <Typography variant="caption" sx={{ fontSize: '0.55rem', color: '#64748b' }}>Route ID: {s.routeId || '-'}</Typography>
                                  <Typography variant="caption" sx={{ fontSize: '0.55rem', color: '#64748b', ml: 1 }}>Route: {s.routeName || '-'}</Typography>
                                </Box>
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
                        {students.length === 0 ? "No students added yet" : "No students match your filters"}
                      </Typography>
                      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAdd} sx={{ mt: 2 }}>
                        {students.length === 0 ? "Add first student" : "Add new student"}
                      </Button>
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
              <StyledTextField label="Admission Date" name="admission" type="date" value={form.admission || ""} onChange={handleChange} disabled={!isEdit || submitting} fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} slotProps={{ inputLabel: { shrink: true } }} />
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
            {/* ✅ Route selection dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <StyledTextField
                select
                label="Route"
                name="routeId"
                value={form.routeId || ""}
                onChange={handleChange}
                disabled={!isEdit || submitting}
                fullWidth
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              >
                <MenuItem value="">None</MenuItem>
                {routes.map(r => (
                  <MenuItem key={r.id} value={r.id}>{r.routeName}</MenuItem>
                ))}
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