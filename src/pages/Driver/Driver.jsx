// Driver.jsx - Fully Responsive for All iPhone Models

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
  Grow,
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
import DescriptionIcon from "@mui/icons-material/Description";
import { styled } from "@mui/material/styles";
import { driverApi } from "../../api/driverApi";

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
export default function Driver() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  // License Type Options
  const licenseTypeOptions = [
    { value: 'LMV', label: 'LMV - Light Motor Vehicle (private cars, jeeps, SUVs, small vans)' },
    { value: 'LMV-TR', label: 'LMV-TR - Light Motor Vehicle – Transport (commercial light vehicles)' },
    { value: 'HMV', label: 'HMV - Heavy Motor Vehicle (trucks, buses)' },
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
    employeeId: "",
    licenseNumber: "",
    licenseType: "",
    licensePhoto: null,
    licensePhotoUrl: "",
    driverPhoto: null,
    driverPhotoUrl: "",
    licenseExpiryDate: "",
    experienceYears: "",
    status: "",
    joiningDate: "",
    terminatedDate: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  };

  const [drivers, setDrivers] = useState([]);
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

  // ================= LOAD DRIVERS =================
  const loadDrivers = async () => {
    setLoading(true);
    try {
      const data = await driverApi.getAllDrivers();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      showSnackbar(error.message || "Failed to load drivers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
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

  // ================= HANDLE FILE UPLOAD =================
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ 
        ...form, 
        [field]: file,
        [`${field}Url`]: URL.createObjectURL(file) 
      });
    }
  };

  // ================= HANDLE ADD OPEN =================
  const handleAddOpen = () => {
    setForm(emptyForm);
    setSelectedId(null);
    setIsAddMode(true);
    setEditMode(true);
    setOpen(true);
  };

  // ================= ROW CLICK =================
  const handleRowClick = async (driver) => {
    try {
      const driverData = await driverApi.getDriverById(driver.id);
      setSelectedId(driver.id);
      setForm({
        ...driverData,
        password: "",
        licensePhoto: null,
        driverPhoto: null,
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
        licensePhoto: null,
        driverPhoto: null,
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

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.employeeId || !form.status) {
      showSnackbar("Please fill in all required fields", "warning");
      return;
    }

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(form.phone)) {
      showSnackbar("Phone must be in format XXX-XXX-XXXX", "warning");
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

    if (form.status === "Terminated" && !form.terminatedDate) {
      showSnackbar("Please select terminated date for terminated status", "warning");
      return;
    }

    setSubmitting(true);

    try {
      // In a real application, you would upload files to a server here
      // For now, we'll just send the data without the file objects
      const formDataToSend = {
        ...form,
        licensePhoto: null,
        driverPhoto: null,
      };

      let result;
      if (isAddMode) {
        result = await driverApi.createDriver(formDataToSend);
        setDrivers(prevDrivers => [...prevDrivers, result]);
        showSnackbar("Driver added successfully!", "success");
      } else {
        result = await driverApi.updateDriver(selectedId, formDataToSend);
        setDrivers(prevDrivers => prevDrivers.map(d => 
          d.id === selectedId ? result : d
        ));
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

  // ================= HANDLE DELETE =================
  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await driverApi.deleteDriver(selectedId);
      setDrivers(drivers.filter(d => d.id !== selectedId));
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

  // ================= HELPERS =================
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
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // ================= RENDER FORM =================
  const renderForm = () => (
    <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2} sx={{ mt: 0 }}>
      {Object.keys(emptyForm)
        .filter((k) => k !== "id" && k !== "licensePhoto" && k !== "driverPhoto" && k !== "licensePhotoUrl" && k !== "driverPhotoUrl")
        .map((k) => {
          const label = k.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
          const isDate = k === "joiningDate" || k === "terminatedDate" || k === "licenseExpiryDate";
          const isSelect = k === "status" || k === "licenseType";
          const isPassword = k === "password";
          const isEmail = k === "email";
          
          if (isPassword && !isAddMode && !editMode) {
            return null;
          }

          const getIcon = () => {
            if (k === 'name') return <PersonIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'phone') return <PhoneIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'email') return <EmailIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'employeeId') return <BadgeIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'licenseNumber') return <DriveEtaIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (isDate) return <CalendarTodayIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />;
            if (k === 'houseNo' || k === 'street' || k === 'city' || k === 'state' || k === 'pincode') {
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
                  {options.map((option) => (
                    <MenuItem 
                      key={typeof option === 'string' ? option : option.value} 
                      value={typeof option === 'string' ? option : option.value}
                    >
                      {typeof option === 'string' ? option : option.label}
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
                type={
                  isPassword ? "password" :
                  isDate ? "date" : 
                  isEmail ? "email" : "text"
                }
                value={form[k] || ""}
                onChange={handleChange}
                disabled={!editMode || submitting}
                fullWidth
                required={k === 'name' || k === 'phone' || k === 'employeeId' || k === 'licenseNumber' || k === 'joiningDate'}
                InputLabelProps={isDate ? { shrink: true } : {}}
                InputProps={{
                  startAdornment: getIcon() ? (
                    <InputAdornment position="start">
                      {getIcon()}
                    </InputAdornment>
                  ) : null
                }}
                placeholder={!isDate && !isPassword ? `Enter ${label.toLowerCase()}` : ""}
                size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              />
            </Grid>
          );
        })}
      
      {/* License Photo Upload */}
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            License Photo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              component="label"
              disabled={!editMode || submitting}
              startIcon={<PhotoCameraIcon />}
              size={isExtraSmall ? "small" : "medium"}
              sx={{ borderRadius: "10px", textTransform: "none" }}
            >
              Upload License
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'licensePhoto')}
              />
            </Button>
            {form.licensePhotoUrl && (
              <Avatar 
                src={form.licensePhotoUrl} 
                variant="rounded"
                sx={{ width: 50, height: 50, border: '1px solid #e2e8f0' }}
              />
            )}
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
            <Button
              variant="outlined"
              component="label"
              disabled={!editMode || submitting}
              startIcon={<PhotoCameraIcon />}
              size={isExtraSmall ? "small" : "medium"}
              sx={{ borderRadius: "10px", textTransform: "none" }}
            >
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'driverPhoto')}
              />
            </Button>
            {form.driverPhotoUrl && (
              <Avatar 
                src={form.driverPhotoUrl} 
                sx={{ width: 50, height: 50, border: '1px solid #e2e8f0' }}
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

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
                <PersonIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <span>Drivers</span>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Manage bus drivers and their details
              </Typography>
            </Box>

            <AddButton
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              onClick={handleAddOpen}
            >
              Add Driver
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
                Total Drivers
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>
                {drivers.length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Active
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>
                {drivers.filter(d => d.status === 'Join').length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Suspended
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#d97706" }}>
                {drivers.filter(d => d.status === 'Suspended').length}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Terminated
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#dc2626" }}>
                {drivers.filter(d => d.status === 'Terminated').length}
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
                      <TableCell sx={{ minWidth: { xs: "40px", sm: "50px", md: "60px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          ID
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "80px", sm: "110px", md: "150px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "70px", sm: "100px", md: "130px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Phone
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "70px", sm: "100px", md: "130px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Emp ID
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "70px", sm: "90px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          License #
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "70px", sm: "90px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          License Type
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "70px", sm: "90px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          License Exp
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "35px", sm: "45px", md: "60px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Exp
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }} align="center">
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Joining
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "80px", md: "100px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          Terminated
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "60px", sm: "90px", md: "120px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          City
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: { xs: "50px", sm: "70px", md: "100px" } }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                          State
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </GradientHeader>
                  <TableBody>
                    {drivers.length > 0 ? (
                      drivers.map((d) => (
                        <StyledTableRow key={d.id} onClick={() => handleRowClick(d)}>
                          <TableCell sx={{ fontWeight: 600 }}>{d.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                              <PersonIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 }, color: "#6495ED" }} />
                              <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' } }}>
                                {d.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>{d.phone}</TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                            {d.email || '-'}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={d.employeeId}
                              size="small"
                              sx={{
                                backgroundColor: "#dbeafe",
                                color: "#6495ED",
                                fontWeight: 600,
                                fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.6rem" },
                                borderRadius: "6px",
                                height: { xs: "16px", sm: "18px", md: "20px" }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={d.licenseNumber}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: "#e2e8f0",
                                color: "#475569",
                                fontWeight: 500,
                                fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.6rem" },
                                borderRadius: "6px",
                                height: { xs: "16px", sm: "18px", md: "20px" }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            {d.licenseType && (
                              <Chip 
                                label={d.licenseType}
                                size="small"
                                sx={{
                                  backgroundColor: "#fef3c7",
                                  color: "#d97706",
                                  fontWeight: 600,
                                  fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.55rem" },
                                  borderRadius: "6px",
                                  height: { xs: "16px", sm: "18px", md: "20px" }
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                            {formatDate(d.licenseExpiryDate)}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={`${d.experienceYears}y`}
                              size="small"
                              sx={{
                                backgroundColor: "#f1f5f9",
                                color: "#475569",
                                fontWeight: 500,
                                fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.6rem" },
                                borderRadius: "6px",
                                height: { xs: "16px", sm: "18px", md: "20px" }
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={d.status}
                              size="small"
                              sx={{
                                backgroundColor: getStatusColor(d.status).bg,
                                color: getStatusColor(d.status).color,
                                fontWeight: 600,
                                fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.65rem" },
                                borderRadius: "6px",
                                height: { xs: "18px", sm: "20px", md: "24px" },
                                minWidth: { xs: "50px", sm: "60px", md: "70px" }
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                            {formatDate(d.joiningDate)}
                          </TableCell>
                          <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                            {formatDate(d.terminateDate) || '-'}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocationOnIcon sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, color: "#94a3b8" }} />
                              <Typography sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                                {d.city}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={d.state}
                              size="small"
                              sx={{
                                backgroundColor: "#f1f5f9",
                                color: "#475569",
                                fontWeight: 500,
                                fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.6rem" },
                                borderRadius: "6px",
                                height: { xs: "16px", sm: "18px", md: "20px" }
                              }}
                            />
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={14} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                          <Typography variant="body1" color="text.secondary">
                            <PersonIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            No drivers added yet
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
                            Add your first driver
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
                  {drivers.length > 0 ? (
                    drivers.map((d, index) => (
                      <Fade in key={d.id} timeout={300 * (index + 1) * 0.1}>
                        <MobileCard onClick={() => handleRowClick(d)}>
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
                                  Driver #{d.id}
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
                                  {d.name}
                                </Typography>
                              </Box>
                              <Chip 
                                label={d.status}
                                size="small"
                                sx={{
                                  backgroundColor: getStatusColor(d.status).bg,
                                  color: getStatusColor(d.status).color,
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
                                  Employee ID
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  <BadgeIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />
                                  {d.employeeId}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Phone
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  <PhoneIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />
                                  {d.phone}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Email
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  <EmailIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />
                                  {d.email || 'N/A'}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  License
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  <DriveEtaIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />
                                  {d.licenseNumber}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  License Type
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  {d.licenseType || 'N/A'}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  License Expiry
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  <CalendarTodayIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b", mr: 0.5 }} />
                                  {formatDate(d.licenseExpiryDate)}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Experience
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" } }}>
                                  {d.experienceYears} years
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                  Location
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.8rem" }, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: "#64748b" }} />
                                  {d.city}, {d.state}
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
                      </Fade>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                      <PersonIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                      <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        No drivers added yet
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleAddOpen}
                        sx={{ mt: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        Add first driver
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            )}
          </StyledPaper>
        </ContentWrapper>
      </MainContent>

      {/* Add/Edit Dialog */}
      <StyledDialog 
        open={open} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
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
          <span>{isAddMode ? "Add New Driver" : "Driver Details"}</span>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {!isAddMode && !editMode && (
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
          {renderForm()}
        </DialogContent>

        {editMode && (
          <DialogActions sx={{ 
            p: { xs: 1.5, sm: 2, md: 2.5 }, 
            pt: { xs: 0.5, sm: 0.75, md: 1 }, 
            gap: 0.5, 
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
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
              {submitting ? (
                <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" />
              ) : (
                isAddMode ? "Save Driver" : "Update Driver"
              )}
            </Button>
          </DialogActions>
        )}
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
            Are you sure you want to delete this driver? This action cannot be undone.
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