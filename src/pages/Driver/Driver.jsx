// src/pages/Driver/Driver.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
  MenuItem,
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
  Grid,
  InputAdornment,
  TableContainer as MuiTableContainer,
  Avatar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EmailIcon from "@mui/icons-material/Email";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SearchIcon from "@mui/icons-material/Search";          // <-- added
import { styled } from "@mui/material/styles";
import driverApi from "../../api/driverApi";

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
const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 280px)",
  minHeight: "400px",
  width: "100%",
  overflowX: "auto",
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '4px', '&:hover': { backgroundColor: '#94a3b8' } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: { maxHeight: "calc(100vh - 260px)", minHeight: "300px" },
  [theme.breakpoints.down('sm')]: { maxHeight: "calc(100vh - 240px)", minHeight: "250px" },
  [theme.breakpoints.down('xs')]: { maxHeight: "calc(100vh - 220px)", minHeight: "200px", '&::-webkit-scrollbar': { width: '4px', height: '4px' } },
  '@media (max-width: 380px)': { maxHeight: "calc(100vh - 200px)", minHeight: "150px" }
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
    '&.active .num': { color: "#22c55e" },
    '&.suspended .num': { color: "#d97706" },
    '&.terminated .num': { color: "#dc2626" },
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
export default function Driver() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  // License Type Options
  const licenseTypeOptions = [
    { value: 'LMV', label: 'LMV - Light Motor Vehicle' },
    { value: 'LMV-TR', label: 'LMV-TR - Light Motor Vehicle – Transport' },
    { value: 'HMV', label: 'HMV - Heavy Motor Vehicle' },
    { value: 'HGMV', label: 'HGMV - Heavy Goods Motor Vehicle' },
    { value: 'HPMV', label: 'HPMV - Heavy Passenger Motor Vehicle' },
    { value: 'MGV', label: 'MGV - Medium Goods Vehicle' },
    { value: 'MPV', label: 'MPV - Medium Passenger Vehicle' }
  ];

  const emptyForm = {
    id: null,
    name: "",
    phone: "",
    email: "",
    password: "",
    licenseNumber: "",
    idCard: null,
    idCardUrl: "",
    licenseType: "",
    licensePhoto: null,
    licensePhotoUrl: "",
    driverPhoto: null,
    driverPhotoUrl: "",
    licenseExpiryDate: "",
    experienceYears: "",
    status: "",
    joiningDate: "",
    terminateDate: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  // ---- Per‑column filters (desktop) ----
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    licenseNumber: "",
    licenseType: "",
    licenseExpiryDate: "",
    experienceYears: "",
    status: "",
    joiningDate: "",
    terminateDate: "",
    city: "",
    state: ""
  });
  // ---- Mobile global search ----
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editMode, setEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // ================= SORTING HELPER (descending ID) =================
  const sortByIdDesc = (data) => [...data].sort((a, b) => b.id - a.id);

  // ================= LOAD DRIVERS =================
  const loadDrivers = async () => {
    setLoading(true);
    try {
      const data = await driverApi.getAllDrivers();
      const sorted = sortByIdDesc(Array.isArray(data) ? data : []);
      setDrivers(sorted);
      setFilteredDrivers(sorted);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      showSnackbar(error.message || "Failed to load drivers", "error");
      setDrivers([]);
      setFilteredDrivers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  // ================= FILTERING LOGIC =================
  useEffect(() => {
    let filtered = drivers;

    const matches = (val, filter) => {
      if (!filter) return true;
      if (val == null) return false;
      return String(val).toLowerCase().includes(filter.toLowerCase());
    };

    filtered = filtered.filter(d =>
      matches(d.id, filters.id) &&
      matches(d.name, filters.name) &&
      matches(d.phone, filters.phone) &&
      matches(d.email, filters.email) &&
      matches(d.licenseNumber, filters.licenseNumber) &&
      matches(d.licenseType, filters.licenseType) &&
      matches(d.licenseExpiryDate, filters.licenseExpiryDate) &&
      matches(d.experienceYears, filters.experienceYears) &&
      matches(d.status, filters.status) &&
      matches(d.joiningDate, filters.joiningDate) &&
      matches(d.terminateDate, filters.terminateDate) &&
      matches(d.city, filters.city) &&
      matches(d.state, filters.state)
    );

    // Mobile global search (extra)
    if (isMobile && mobileSearchTerm.trim()) {
      const term = mobileSearchTerm.toLowerCase().trim();
      filtered = filtered.filter(d =>
        matches(d.id, term) ||
        matches(d.name, term) ||
        matches(d.phone, term) ||
        matches(d.email, term) ||
        matches(d.licenseNumber, term) ||
        matches(d.licenseType, term) ||
        matches(d.licenseExpiryDate, term) ||
        matches(d.experienceYears, term) ||
        matches(d.status, term) ||
        matches(d.joiningDate, term) ||
        matches(d.terminateDate, term) ||
        matches(d.city, term) ||
        matches(d.state, term)
      );
    }

    setFilteredDrivers(filtered);
  }, [drivers, filters, mobileSearchTerm, isMobile]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setForm({
        ...form,
        [field]: base64String,
        [`${field}Url`]: base64String,
      });
    };
    reader.readAsDataURL(file);
  };

  // Filter handlers
  const handleFilterChange = (field) => (e) => {
    setFilters(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleMobileSearchChange = (e) => {
    setMobileSearchTerm(e.target.value);
  };

  const handleAddOpen = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setIsAddMode(true);
    setEditMode(true);
    setOpen(true);
  };

  const handleRowClick = async (driver) => {
    try {
      const data = await driverApi.getDriverById(driver.id);
      setSelectedId(driver.id);
      setForm({
        ...data,
        password: "",
        idCard: null,
        licensePhoto: null,
        driverPhoto: null,
        idCardUrl: data.idCard || "",
        licensePhotoUrl: data.licensePhoto || "",
        driverPhotoUrl: data.driverPhoto || "",
      });
      setIsAddMode(false);
      setEditMode(false);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching driver details:', error);
      setSelectedId(driver.id);
      setForm({
        ...driver,
        password: "",
        idCard: null,
        licensePhoto: null,
        driverPhoto: null,
        idCardUrl: driver.idCard || "",
        licensePhotoUrl: driver.licensePhoto || "",
        driverPhotoUrl: driver.driverPhoto || "",
      });
      setIsAddMode(false);
      setEditMode(false);
      setOpen(true);
      showSnackbar("Could not load full details, showing available data", "warning");
    }
  };

  const handleEnableEdit = () => {
    setEditMode(true);
    setForm(prev => ({ ...prev, password: "" }));
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
    if (!form.name || !form.phone || !form.status) {
      showSnackbar("Please fill in all required fields", "warning");
      return;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(form.phone)) {
      showSnackbar("Phone must be exactly 10 digits", "warning");
      return;
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      showSnackbar("Please enter a valid email address", "warning");
      return;
    }

    if (!form.licenseNumber) {
      showSnackbar("License number is required", "warning");
      return;
    }

    if (form.licenseExpiryDate && new Date(form.licenseExpiryDate) < new Date()) {
      showSnackbar("License expiry date must be in the future", "warning");
      return;
    }

    if (!form.joiningDate) {
      showSnackbar("Joining date is required", "warning");
      return;
    }

    if (form.status === "Terminated" && !form.terminateDate) {
      showSnackbar("Please select terminated date for terminated status", "warning");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...form,
        idCard: form.idCard || null,
        licensePhoto: form.licensePhoto || null,
        driverPhoto: form.driverPhoto || null,
      };
      delete payload.id;
      delete payload.idCardUrl;
      delete payload.licensePhotoUrl;
      delete payload.driverPhotoUrl;

      let result;
      if (isAddMode) {
        result = await driverApi.createDriver(payload);
        const updated = sortByIdDesc([...drivers, result]);
        setDrivers(updated);
        setFilteredDrivers(updated);
        showSnackbar("Driver added successfully!", "success");
      } else {
        result = await driverApi.updateDriver(selectedId, payload);
        const updated = sortByIdDesc(drivers.map(d => d.id === selectedId ? result : d));
        setDrivers(updated);
        setFilteredDrivers(updated);
        showSnackbar("Driver updated successfully!", "success");
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving driver:', error);
      showSnackbar(error.message || "Error saving driver", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = () => setConfirmOpen(true);

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await driverApi.deleteDriver(selectedId);
      const updated = sortByIdDesc(drivers.filter(d => d.id !== selectedId));
      setDrivers(updated);
      setFilteredDrivers(updated);
      showSnackbar("Driver deleted successfully!", "success");
      setConfirmOpen(false);
      handleCloseDialog();
    } catch (error) {
      console.error('Error deleting driver:', error);
      showSnackbar(error.message || "Error deleting driver", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Join': return { bg: '#dcfce7', color: '#16a34a' };
      case 'Terminated': return { bg: '#fee2e2', color: '#dc2626' };
      case 'Suspended': return { bg: '#fef3c7', color: '#d97706' };
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

  // ================= RENDER FORM =================
  const renderForm = () => (
    <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2} sx={{ mt: 0 }}>
      {Object.keys(emptyForm)
        .filter(k => !["id", "idCard", "idCardUrl", "licensePhoto", "driverPhoto", "licensePhotoUrl", "driverPhotoUrl"].includes(k))
        .map((k) => {
          const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
          const isDate = k === "joiningDate" || k === "terminateDate" || k === "licenseExpiryDate";
          const isSelect = k === "status" || k === "licenseType";
          const isPassword = k === "password";
          const isEmail = k === "email";
          
          if (isPassword && !isAddMode && !editMode) return null;

          const getIcon = () => {
            if (k === 'name') return <PersonIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'phone') return <PhoneIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'email') return <EmailIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'licenseNumber') return <DriveEtaIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (isDate) return <CalendarTodayIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (['houseNo','street','city','state','pincode'].includes(k)) {
              return <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            }
            return null;
          };

          if (isSelect) {
            const options = k === "status" 
              ? ['Join', 'Terminated', 'Suspended']
              : licenseTypeOptions;
            return (
              <Grid item xs={12} sm={6} md={k === "licenseType" ? 6 : 4} key={k}>
                <StyledTextField
                  select
                  label={k === "licenseType" ? "License Type" : label}
                  name={k}
                  value={form[k] || ""}
                  onChange={handleChange}
                  disabled={!editMode || submitting}
                  fullWidth
                  required={k === "status"}
                  size={isExtraSmall ? "small" : "medium"}
                >
                  <MenuItem value="">Select {k === "licenseType" ? "License Type" : label}</MenuItem>
                  {options.map((opt) => (
                    <MenuItem key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
                      {typeof opt === 'string' ? opt : opt.label}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
            );
          }

          return (
            <Grid item xs={12} sm={6} md={k === "email" ? 6 : 4} key={k}>
              <StyledTextField
                label={label}
                name={k}
                type={isPassword ? "password" : isDate ? "date" : isEmail ? "email" : "text"}
                value={form[k] || ""}
                onChange={handleChange}
                disabled={!editMode || submitting}
                fullWidth
                required={['name','phone','licenseNumber','joiningDate'].includes(k)}
                InputLabelProps={isDate ? { shrink: true } : {}}
                InputProps={{
                  startAdornment: getIcon() ? (
                    <InputAdornment position="start">{getIcon()}</InputAdornment>
                  ) : null
                }}
                placeholder={!isDate && !isPassword ? `Enter ${label.toLowerCase()}` : ""}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              />
            </Grid>
          );
        })}

      {/* ID Card Upload */}
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            ID Card
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" component="label" disabled={!editMode || submitting} startIcon={<PhotoCameraIcon />} size={isExtraSmall ? "small" : "medium"} sx={{ borderRadius: "10px", textTransform: "none" }}>
              Upload ID Card
              <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, 'idCard')} />
            </Button>
            {form.idCardUrl && <Avatar src={form.idCardUrl} variant="rounded" sx={{ width: 50, height: 50, border: '1px solid #e2e8f0' }} />}
          </Box>
        </Box>
      </Grid>

      {/* License Photo Upload */}
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            License Photo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" component="label" disabled={!editMode || submitting} startIcon={<PhotoCameraIcon />} size={isExtraSmall ? "small" : "medium"} sx={{ borderRadius: "10px", textTransform: "none" }}>
              Upload License
              <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, 'licensePhoto')} />
            </Button>
            {form.licensePhotoUrl && <Avatar src={form.licensePhotoUrl} variant="rounded" sx={{ width: 50, height: 50, border: '1px solid #e2e8f0' }} />}
          </Box>
        </Box>
      </Grid>

      {/* Driver Photo Upload */}
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Driver Photo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" component="label" disabled={!editMode || submitting} startIcon={<PhotoCameraIcon />} size={isExtraSmall ? "small" : "medium"} sx={{ borderRadius: "10px", textTransform: "none" }}>
              Upload Photo
              <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, 'driverPhoto')} />
            </Button>
            {form.driverPhotoUrl && <Avatar src={form.driverPhotoUrl} sx={{ width: 50, height: 50, border: '1px solid #e2e8f0' }} />}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  // ================= LOADING =================
  if (loading) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: isExtraSmall ? '0.75rem' : '0.875rem' }}>
              Loading drivers...
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
                <PersonIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <Typography variant="h6" component="h1" sx={{ fontWeight: 700, fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" }, color: "#1e293b" }}>
                  Drivers
                </Typography>
              </Box>
              {/* Inline stats */}
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{drivers.length}</span></span>
                <span className="stat-chip active">Active <span className="num">{drivers.filter(d => d.status === 'Join').length}</span></span>
                <span className="stat-chip suspended">Suspended <span className="num">{drivers.filter(d => d.status === 'Suspended').length}</span></span>
                <span className="stat-chip terminated">Terminated <span className="num">{drivers.filter(d => d.status === 'Terminated').length}</span></span>
              </InlineStats>
            </Box>
            <AddButton variant="contained" startIcon={<AddIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />} onClick={handleAddOpen}>
              Add Driver
            </AddButton>
          </Box>

          {/* Table/List View */}
          <StyledPaper>
            {isDesktop ? (
              <StyledTableContainer>
                <Table stickyHeader sx={{ minWidth: 1400 }}>  {/* force horizontal scroll */}
                  <GradientHeader>
                    {/* Header row */}
                    <TableRow>
                      <TableCell sx={{ minWidth: '60px' }}>ID</TableCell>
                      <TableCell sx={{ minWidth: '150px' }}>Name</TableCell>
                      <TableCell sx={{ minWidth: '110px' }}>Phone</TableCell>
                      <TableCell sx={{ minWidth: '160px' }}>Email</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>License #</TableCell>
                      <TableCell sx={{ minWidth: '130px' }}>License Type</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>License Exp</TableCell>
                      <TableCell sx={{ minWidth: '80px' }}>Exp</TableCell>
                      <TableCell sx={{ minWidth: '90px' }} align="center">Status</TableCell>
                      <TableCell sx={{ minWidth: '110px' }}>Joining</TableCell>
                      <TableCell sx={{ minWidth: '110px' }}>Terminated</TableCell>
                      <TableCell sx={{ minWidth: '120px' }}>City</TableCell>
                      <TableCell sx={{ minWidth: '100px' }}>State</TableCell>
                    </TableRow>
                    {/* Filter row */}
                    <TableRow>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter" value={filters.id} onChange={handleFilterChange('id')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Name" value={filters.name} onChange={handleFilterChange('name')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Phone" value={filters.phone} onChange={handleFilterChange('phone')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Email" value={filters.email} onChange={handleFilterChange('email')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter License" value={filters.licenseNumber} onChange={handleFilterChange('licenseNumber')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Type" value={filters.licenseType} onChange={handleFilterChange('licenseType')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Exp" value={filters.licenseExpiryDate} onChange={handleFilterChange('licenseExpiryDate')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Exp" value={filters.experienceYears} onChange={handleFilterChange('experienceYears')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Status" value={filters.status} onChange={handleFilterChange('status')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Joining" value={filters.joiningDate} onChange={handleFilterChange('joiningDate')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter Term" value={filters.terminateDate} onChange={handleFilterChange('terminateDate')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter City" value={filters.city} onChange={handleFilterChange('city')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                      <TableCell sx={{ padding: '2px 4px', backgroundColor: 'rgba(255,255,255,0.06)' }}>
                        <FilterInput size="small" placeholder="Filter State" value={filters.state} onChange={handleFilterChange('state')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: '0.7rem', color: '#94a3b8' }} /></InputAdornment> }} />
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {filteredDrivers.length > 0 ? (
                      filteredDrivers.map(d => (
                        <StyledTableRow key={d.id} onClick={() => handleRowClick(d)}>
                          <TableCell sx={{ fontWeight: 600 }}>{d.id}</TableCell>
                          <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PersonIcon sx={{ fontSize: 14, color: "#6495ED" }} />{d.name}</Box></TableCell>
                          <TableCell>{d.phone}</TableCell>
                          <TableCell>{d.email || '-'}</TableCell>
                          <TableCell><Chip label={d.licenseNumber} size="small" variant="outlined" sx={{ borderColor: "#e2e8f0", color: "#475569", fontSize: "0.6rem" }} /></TableCell>
                          <TableCell>{d.licenseType && <Chip label={d.licenseType} size="small" sx={{ bgcolor: "#fef3c7", color: "#d97706", fontSize: "0.5rem" }} />}</TableCell>
                          <TableCell>{formatDate(d.licenseExpiryDate)}</TableCell>
                          <TableCell><Chip label={`${d.experienceYears}y`} size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontSize: "0.5rem" }} /></TableCell>
                          <TableCell align="center"><Chip label={d.status} size="small" sx={{ bgcolor: getStatusColor(d.status).bg, color: getStatusColor(d.status).color, fontWeight: 600, fontSize: "0.6rem", minWidth: "60px" }} /></TableCell>
                          <TableCell>{formatDate(d.joiningDate)}</TableCell>
                          <TableCell>{formatDate(d.terminateDate) || '-'}</TableCell>
                          <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><LocationOnIcon sx={{ fontSize: 12, color: "#94a3b8" }} />{d.city}</Box></TableCell>
                          <TableCell><Chip label={d.state} size="small" sx={{ bgcolor: "#f1f5f9", color: "#475569", fontSize: "0.5rem" }} /></TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={13} align="center" sx={{ py: 4 }}>
                          <Typography variant="body1" color="text.secondary">
                            <PersonIcon sx={{ fontSize: 40, display: 'block', margin: '0 auto 8px', opacity: 0.3 }} />
                            {Object.values(filters).some(f => f) ? "No drivers match your filters" : "No drivers added yet"}
                          </Typography>
                          {!Object.values(filters).some(f => f) && (
                            <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2, borderRadius: "10px", textTransform: "none" }}>
                              Add your first driver
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              // Mobile Card View with global search
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
                  {filteredDrivers.length > 0 ? (
                    filteredDrivers.map(d => (
                      <MobileCard key={d.id} onClick={() => handleRowClick(d)}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box><Typography variant="caption" color="text.secondary">Driver #{d.id}</Typography><Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><PersonIcon sx={{ color: "#6495ED" }} />{d.name}</Typography></Box>
                            <Chip label={d.status} size="small" sx={{ bgcolor: getStatusColor(d.status).bg, color: getStatusColor(d.status).color, fontWeight: 600 }} />
                          </Box>
                          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 1 }}>
                            <Box><Typography variant="caption" color="text.secondary">Phone</Typography><Typography variant="body2">{d.phone}</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">Email</Typography><Typography variant="body2">{d.email || 'N/A'}</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">License</Typography><Typography variant="body2">{d.licenseNumber}</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">License Exp</Typography><Typography variant="body2">{formatDate(d.licenseExpiryDate)}</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">Experience</Typography><Typography variant="body2">{d.experienceYears} years</Typography></Box>
                            <Box><Typography variant="caption" color="text.secondary">Location</Typography><Typography variant="body2">{d.city}, {d.state}</Typography></Box>
                          </Box>
                          <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid #f1f5f9', textAlign: 'right' }}>
                            <Typography variant="caption" color="text.secondary">Click to view details</Typography>
                          </Box>
                        </CardContent>
                      </MobileCard>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <PersonIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary">
                        {mobileSearchTerm ? `No drivers found matching "${mobileSearchTerm}"` : "No drivers added yet"}
                      </Typography>
                      {!mobileSearchTerm && (
                        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                          Add first driver
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

      {/* ================= DIALOG ================= */}
      <StyledDialog open={open} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
          <span>{isAddMode ? "Add New Driver" : "Driver Details"}</span>
          <Box>
            {!isAddMode && !editMode && (
              <>
                <Tooltip title="Edit"><IconButton onClick={handleEnableEdit}><EditIcon sx={{ color: "#6495ED" }} /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton onClick={handleDeleteClick}><DeleteIcon sx={{ color: "#ef4444" }} /></IconButton></Tooltip>
              </>
            )}
            <IconButton onClick={handleCloseDialog}><CloseIcon /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>{renderForm()}</DialogContent>
        {editMode && (
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={submitting} sx={{ bgcolor: "#6495ED", '&:hover': { bgcolor: "#4169E1" } }}>
              {submitting ? <CircularProgress size={24} /> : (isAddMode ? "Save Driver" : "Update Driver")}
            </Button>
          </DialogActions>
        )}
      </StyledDialog>

      {/* Delete Confirmation */}
      <StyledDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ color: "#dc2626" }}>Confirm Delete</DialogTitle>
        <DialogContent><Typography>Are you sure you want to delete this driver?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={submitting}>
            {submitting ? <CircularProgress size={24} /> : "Yes, Delete"}
          </Button>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ borderRadius: "12px" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}