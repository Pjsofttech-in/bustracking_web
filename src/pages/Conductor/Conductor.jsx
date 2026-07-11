import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Grid,
  InputAdornment,
  Tooltip,
  Card,
  CardContent,
  Stack,
  Fade,
  Grow,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarTodayIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import conductorApi from '../../api/conductorApi';

// ================= STYLED COMPONENTS =================
const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
  width: '100%',
  overflowX: 'hidden',
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
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1600px',
  margin: '0 auto',
  width: '100%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
  overflow: 'hidden',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    borderRadius: '12px',
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: '10px',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  overflowX: 'auto',
  '& .MuiTable-root': {
    minWidth: '1300px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '1000px',
    },
  },
  '&::-webkit-scrollbar': {
    height: '8px',
    width: '8px',
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
}));

const GradientHeader = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6495ED 0%, #4169E1 100%)',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  '& th': {
    color: 'white',
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.5px',
    padding: '14px 12px',
    whiteSpace: 'nowrap',
    borderBottom: '2px solid rgba(255,255,255,0.2)',
    position: 'sticky',
    top: 0,
    backgroundColor: 'inherit',
    textTransform: 'uppercase',
    [theme.breakpoints.down('lg')]: {
      fontSize: '0.7rem',
      padding: '12px 10px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '0.65rem',
      padding: '10px 8px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.6rem',
      padding: '8px 6px',
      letterSpacing: '0.3px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.55rem',
      padding: '6px 4px',
      letterSpacing: '0.2px',
    },
  },
  '& th:first-of-type': {
    paddingLeft: '16px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '8px',
    },
  },
  '& th:last-of-type': {
    paddingRight: '16px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: '8px',
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#f8fafc',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#fafbfc',
  },
  '&:nth-of-type(even):hover': {
    backgroundColor: '#f1f5f9',
  },
  '& td': {
    padding: '10px 12px',
    fontSize: '0.8rem',
    borderBottom: '1px solid #f1f5f9',
    [theme.breakpoints.down('lg')]: {
      padding: '8px 10px',
      fontSize: '0.75rem',
    },
    [theme.breakpoints.down('md')]: {
      padding: '7px 8px',
      fontSize: '0.7rem',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px 6px',
      fontSize: '0.65rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '5px 4px',
      fontSize: '0.6rem',
    },
  },
  '& td:first-of-type': {
    paddingLeft: '16px',
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: '8px',
    },
  },
  '& td:last-of-type': {
    paddingRight: '16px',
    [theme.breakpoints.down('sm')]: {
      paddingRight: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingRight: '8px',
    },
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: '1px solid #f1f5f9',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#6495ED',
    boxShadow: '0 4px 12px rgba(100, 149, 237, 0.08)',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: '10px',
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: '8px',
  },
}));

const MobileCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  border: '1px solid #f1f5f9',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  width: '100%',
  '&:hover': {
    borderColor: '#6495ED',
    boxShadow: '0 4px 12px rgba(100, 149, 237, 0.08)',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: '10px',
  },
}));

const HeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: '#1e293b',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontSize: '1.75rem',
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.35rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: '#64748b',
  fontSize: '0.875rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    textAlign: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.7rem',
  },
}));

const AddConductorButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '10px 24px',
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '0.95rem',
  backgroundColor: '#6495ED',
  boxShadow: '0 4px 12px rgba(100, 149, 237, 0.3)',
  transition: 'all 0.3s ease',
  flexShrink: 0,
  '&:hover': {
    backgroundColor: '#4169E1',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(65, 105, 225, 0.4)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '8px 18px',
    fontSize: '0.85rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '10px 16px',
    fontSize: '0.85rem',
    justifyContent: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '8px 12px',
    fontSize: '0.8rem',
    borderRadius: '10px',
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#fff',
    '&:hover fieldset': {
      borderColor: '#6495ED',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6495ED',
      borderWidth: '2px',
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: '8px',
    },
    [theme.breakpoints.down('xs')]: {
      borderRadius: '6px',
    },
  },
  '& .MuiInputBase-input': {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85rem',
      padding: '10px 12px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
      padding: '8px 10px',
    },
  },
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1),
  },
}));

const StatNumber = styled(Typography)(({ theme, color }) => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  color: color || '#1e293b',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.85rem',
  },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: '#64748b',
  fontSize: '0.7rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.6rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.55rem',
  },
}));

// ================= MAIN COMPONENT =================
const Conductor = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width:400px)');

  // State
  const [conductors, setConductors] = useState([]);
  const [filteredConductors, setFilteredConductors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Form state - Added new fields
  const emptyForm = {
    id: null,
    name: '',
    phone: '',
    email: '',
    employeeId: '',
    status: '',
    joiningDate: '',
    terminateDate: '',
    licenseExpiryDate: '',
    licensePhoto: null,
    licensePhotoUrl: '',
    conductorPhoto: null,
    conductorPhotoUrl: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  };
  const [form, setForm] = useState(emptyForm);

  const statusOptions = ['Join', 'Terminated', 'Suspended'];

  // ================= LOAD DATA =================
  const loadConductors = async () => {
    setLoading(true);
    try {
      const data = await conductorApi.getAll();
      setConductors(data);
      setFilteredConductors(data);
    } catch (error) {
      showSnackbar(error.message || 'Failed to load conductors', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConductors();
  }, []);

  // ================= SEARCH =================
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredConductors(conductors);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = conductors.filter(c =>
        c.name?.toLowerCase().includes(term) ||
        c.employeeId?.toLowerCase().includes(term) ||
        c.phone?.includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.city?.toLowerCase().includes(term) ||
        c.status?.toLowerCase().includes(term)
      );
      setFilteredConductors(filtered);
    }
  }, [searchTerm, conductors]);

  // ================= SNACKBAR =================
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= FORM HANDLING =================
  const handleChange = (e) => {
    if (e.target.name === 'phone') {
      const value = e.target.value.replace(/\D/g, '');
      if (value.length <= 10) {
        setForm({ ...form, phone: value });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // ================= FILE UPLOAD HANDLING =================
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

  const resetForm = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setSelectedId(null);
  };

  // ================= DIALOG HANDLING =================
  const handleAddOpen = () => {
    resetForm();
    setOpenDialog(true);
  };

  const handleEditOpen = (conductor) => {
    setForm({
      ...conductor,
      licensePhoto: null,
      conductorPhoto: null,
      licensePhotoUrl: conductor.licensePhoto || '',
      conductorPhotoUrl: conductor.conductorPhoto || ''
    });
    setIsEdit(true);
    setSelectedId(conductor.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  // ================= CRUD OPERATIONS =================
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.employeeId || !form.status) {
      showSnackbar('Please fill in all required fields', 'warning');
      return;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(form.phone)) {
      showSnackbar('Phone must be exactly 10 digits', 'warning');
      return;
    }

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      showSnackbar('Please enter a valid email address', 'warning');
      return;
    }

    if (form.status === 'Terminated' && !form.terminateDate) {
      showSnackbar('Terminate date is required for terminated status', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email?.trim() || '',
        employeeId: form.employeeId.trim(),
        status: form.status,
        joiningDate: form.joiningDate || null,
        terminateDate: form.terminateDate || null,
        licenseExpiryDate: form.licenseExpiryDate || null,
        licensePhoto: form.licensePhoto || null,
        conductorPhoto: form.conductorPhoto || null,
        houseNo: form.houseNo || '',
        street: form.street || '',
        city: form.city || '',
        state: form.state || '',
        pincode: form.pincode || ''
      };

      if (isEdit) {
        const updated = await conductorApi.update(selectedId, payload);
        setConductors(conductors.map(c => c.id === selectedId ? updated : c));
        showSnackbar('Conductor updated successfully!', 'success');
      } else {
        const created = await conductorApi.create(payload);
        setConductors([...conductors, created]);
        showSnackbar('Conductor added successfully!', 'success');
      }

      handleCloseDialog();
    } catch (error) {
      showSnackbar(error.message || 'Failed to save conductor', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setSubmitting(true);
    try {
      await conductorApi.delete(selectedId);
      setConductors(conductors.filter(c => c.id !== selectedId));
      showSnackbar('Conductor deleted successfully!', 'success');
      setDeleteDialogOpen(false);
      resetForm();
    } catch (error) {
      showSnackbar(error.message || 'Failed to delete conductor', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HELPERS =================
  const getStatusColor = (status) => {
    switch (status) {
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

  const formatPhone = (phone) => {
    if (!phone) return '-';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  // Stats
  const totalConductors = conductors.length;
  const activeCount = conductors.filter(c => c.status === 'Join').length;
  const suspendedCount = conductors.filter(c => c.status === 'Suspended').length;
  const terminatedCount = conductors.filter(c => c.status === 'Terminated').length;
  const withEmail = conductors.filter(c => c.email).length;

  // ================= RENDER =================
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress size={40} sx={{ color: '#6495ED' }} />
      </Box>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header */}
        <HeaderWrapper>
          <TitleWrapper>
            <HeaderTitle variant="h5">
              <PersonIcon sx={{ color: '#6495ED', fontSize: { xs: 24, sm: 28 } }} />
              Conductors
            </HeaderTitle>
            <HeaderSubtitle variant="body2">
              Manage bus conductors and their details
            </HeaderSubtitle>
          </TitleWrapper>
          <AddConductorButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOpen}
          >
            Add Conductor
          </AddConductorButton>
        </HeaderWrapper>

        {/* Stats Cards */}
        <StatsGrid>
          <StatsCard>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <StatLabel variant="caption">Total Conductors</StatLabel>
              <StatNumber>{totalConductors}</StatNumber>
            </CardContent>
          </StatsCard>
          <StatsCard>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <StatLabel variant="caption">Active</StatLabel>
              <StatNumber color="#22c55e">{activeCount}</StatNumber>
            </CardContent>
          </StatsCard>
          <StatsCard>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <StatLabel variant="caption">With Email</StatLabel>
              <StatNumber color="#6495ED">{withEmail}</StatNumber>
            </CardContent>
          </StatsCard>
          <StatsCard>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <StatLabel variant="caption">Terminated</StatLabel>
              <StatNumber color="#dc2626">{terminatedCount}</StatNumber>
            </CardContent>
          </StatsCard>
        </StatsGrid>

        {/* Search */}
        <SearchField
          fullWidth
          placeholder="Search conductors by name, employee ID, phone, email, city, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm('')}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* Table */}
        <StyledPaper>
          {isDesktop ? (
            <StyledTableContainer>
              <Table stickyHeader>
                <GradientHeader>
                  <TableRow>
                    <TableCell align="center" sx={{ minWidth: '60px' }}>ID</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Name</TableCell>
                    <TableCell sx={{ minWidth: '130px' }}>Phone</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Email</TableCell>
                    <TableCell sx={{ minWidth: '120px' }}>Emp ID</TableCell>
                    <TableCell align="center" sx={{ minWidth: '100px' }}>Status</TableCell>
                    <TableCell sx={{ minWidth: '120px' }}>Joining Date</TableCell>
                    <TableCell sx={{ minWidth: '120px' }}>Terminate Date</TableCell>
                    <TableCell sx={{ minWidth: '130px' }}>License Expiry</TableCell>
                    <TableCell sx={{ minWidth: '150px' }}>Address</TableCell>
                    <TableCell align="center" sx={{ minWidth: '120px' }}>Actions</TableCell>
                  </TableRow>
                </GradientHeader>
                <TableBody>
                  {filteredConductors.length > 0 ? (
                    filteredConductors.map((c) => (
                      <StyledTableRow key={c.id}>
                        <TableCell align="center">{c.id}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: '#6495ED' }} />
                            <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                              {c.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{formatPhone(c.phone)}</TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.55rem', sm: '0.65rem', md: '0.75rem' } }}>
                          {c.email || '-'}
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={c.employeeId} 
                            size="small" 
                            sx={{ 
                              bgcolor: '#dbeafe', 
                              color: '#6495ED',
                              fontWeight: 600,
                              fontSize: { xs: '0.6rem', sm: '0.7rem' },
                              height: { xs: '20px', sm: '24px' }
                            }} 
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={c.status}
                            size="small"
                            sx={{
                              bgcolor: getStatusColor(c.status).bg,
                              color: getStatusColor(c.status).color,
                              fontWeight: 600,
                              fontSize: { xs: '0.6rem', sm: '0.7rem' },
                              height: { xs: '20px', sm: '24px' },
                              minWidth: { xs: '60px', sm: '70px' }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                          {formatDate(c.joiningDate)}
                        </TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                          {formatDate(c.terminateDate) || '-'}
                        </TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                          {formatDate(c.licenseExpiryDate)}
                        </TableCell>
                        <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#94a3b8' }} />
                            {c.city}, {c.state}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit">
                              <IconButton 
                                size="small" 
                                onClick={() => handleEditOpen(c)} 
                                sx={{ 
                                  color: '#f59e0b',
                                  padding: { xs: '4px', sm: '6px' }
                                }}
                              >
                                <EditIcon fontSize={isExtraSmall ? 'small' : 'small'} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setSelectedId(c.id);
                                  setDeleteDialogOpen(true);
                                }}
                                sx={{ 
                                  color: '#ef4444',
                                  padding: { xs: '4px', sm: '6px' }
                                }}
                              >
                                <DeleteIcon fontSize={isExtraSmall ? 'small' : 'small'} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={11} align="center" sx={{ py: 6 }}>
                        <Typography color="text.secondary">
                          {searchTerm ? `No conductors found matching "${searchTerm}"` : 'No conductors added yet'}
                        </Typography>
                        {!searchTerm && (
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddOpen}
                            sx={{ mt: 2 }}
                          >
                            Add your first conductor
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
                {filteredConductors.length > 0 ? (
                  filteredConductors.map((c, index) => (
                    <Grow in key={c.id} timeout={300 * (index + 1) * 0.1}>
                      <MobileCard>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
                                Conductor #{c.id}
                              </Typography>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 0.5,
                                mt: 0.25
                              }}>
                                <PersonIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: '#6495ED' }} />
                                <span style={{ wordBreak: 'break-word' }}>{c.name}</span>
                              </Typography>
                            </Box>
                            <Chip
                              label={c.status}
                              size="small"
                              sx={{
                                bgcolor: getStatusColor(c.status).bg,
                                color: getStatusColor(c.status).color,
                                fontWeight: 600,
                                fontSize: { xs: '0.55rem', sm: '0.6rem' },
                                height: { xs: '20px', sm: '24px' },
                                ml: 1,
                                flexShrink: 0
                              }}
                            />
                          </Box>

                          <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, 
                            gap: { xs: 0.5, sm: 1 }, 
                            mt: 1.5,
                            pt: 1.5,
                            borderTop: '1px solid #f1f5f9'
                          }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                Employee ID
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                <BadgeIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#64748b', mr: 0.5 }} />
                                {c.employeeId}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                Phone
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                <PhoneIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#64748b', mr: 0.5 }} />
                                {formatPhone(c.phone)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                Email
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                <EmailIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#64748b', mr: 0.5 }} />
                                {c.email || 'N/A'}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                License Expiry                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                <CalendarTodayIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#64748b', mr: 0.5 }} />
                                {formatDate(c.licenseExpiryDate)}
                              </Typography>
                            </Box>
                            <Box sx={{ gridColumn: { xs: '1/3', sm: 'auto' } }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                Address
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                fontWeight: 500, 
                                fontSize: { xs: '0.6rem', sm: '0.7rem' },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                wordBreak: 'break-word'
                              }}>
                                <LocationOnIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#64748b' }} />
                                {c.city}, {c.state}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            gap: 1, 
                            mt: 1.5, 
                            pt: 1.5, 
                            borderTop: '1px solid #f1f5f9' 
                          }}>
                            <Button 
                              size="small" 
                              startIcon={<EditIcon />} 
                              onClick={() => handleEditOpen(c)}
                              sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                setSelectedId(c.id);
                                setDeleteDialogOpen(true);
                              }}
                              sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </CardContent>
                      </MobileCard>
                    </Grow>
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <PersonIcon sx={{ fontSize: 48, opacity: 0.2, mb: 2 }} />
                    <Typography color="text.secondary">
                      {searchTerm ? `No conductors found matching "${searchTerm}"` : 'No conductors added yet'}
                    </Typography>
                    {!searchTerm && (
                      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                        Add first conductor
                      </Button>
                    )}
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </StyledPaper>

        {/* ================= ADD/EDIT DIALOG ================= */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{ 
            sx: { 
              borderRadius: { xs: '16px', sm: '20px' }, 
              p: { xs: 0.5, sm: 1 },
              margin: { xs: '10px', sm: '16px' }
            } 
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 700, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            p: { xs: 1.5, sm: 2 }
          }}>
            {isEdit ? 'Edit Conductor' : 'Add New Conductor'}
            <IconButton onClick={handleCloseDialog} disabled={submitting} size={isExtraSmall ? 'small' : 'medium'}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2}>
              {Object.keys(emptyForm)
                .filter((k) => k !== 'id' && k !== 'licensePhoto' && k !== 'conductorPhoto' && k !== 'licensePhotoUrl' && k !== 'conductorPhotoUrl')
                .map((k) => {
                  const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                  const isDate = ['joiningDate', 'terminateDate', 'licenseExpiryDate'].includes(k);
                  const isSelect = k === 'status';
                  const isPhone = k === 'phone';
                  const isEmail = k === 'email';

                  const getIcon = () => {
                    if (k === 'name') return <PersonIcon sx={{ color: '#94a3b8' }} />;
                    if (k === 'phone') return <PhoneIcon sx={{ color: '#94a3b8' }} />;
                    if (k === 'email') return <EmailIcon sx={{ color: '#94a3b8' }} />;
                    if (k === 'employeeId') return <BadgeIcon sx={{ color: '#94a3b8' }} />;
                    if (isDate) return <CalendarTodayIcon sx={{ color: '#94a3b8' }} />;
                    if (['houseNo', 'street', 'city', 'state', 'pincode'].includes(k)) {
                      return <LocationOnIcon sx={{ color: '#94a3b8' }} />;
                    }
                    return null;
                  };

                  if (isSelect) {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={k}>
                        <TextField
                          select
                          label="Status"
                          name="status"
                          value={form.status || ''}
                          onChange={handleChange}
                          disabled={submitting}
                          fullWidth
                          required
                          size={isExtraSmall ? 'small' : 'medium'}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                        >
                          <MenuItem value="">Select Status</MenuItem>
                          {statusOptions.map((s) => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    );
                  }

                  return (
                    <Grid item xs={12} sm={6} md={4} key={k}>
                      <TextField
                        label={label}
                        name={k}
                        type={isDate ? 'date' : isPhone ? 'tel' : isEmail ? 'email' : 'text'}
                        value={form[k] || ''}
                        onChange={handleChange}
                        disabled={submitting}
                        fullWidth
                        required={['name', 'phone', 'employeeId'].includes(k)}
                        InputLabelProps={isDate ? { shrink: true } : {}}
                        size={isExtraSmall ? 'small' : 'medium'}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                        InputProps={{
                          startAdornment: getIcon() ? (
                            <InputAdornment position="start">{getIcon()}</InputAdornment>
                          ) : null,
                          ...(isPhone && {
                            inputProps: {
                              maxLength: 10,
                              pattern: '[0-9]*',
                            }
                          })
                        }}
                        placeholder={isPhone ? 'Enter 10-digit number' : !isDate ? `Enter ${label.toLowerCase()}` : ''}
                        helperText={isPhone ? 'Format: 1234567890 (10 digits)' : isEmail ? 'Enter valid email address' : ''}
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
                      disabled={submitting}
                      startIcon={<PhotoCameraIcon />}
                      size={isExtraSmall ? 'small' : 'medium'}
                      sx={{ borderRadius: '10px', textTransform: 'none' }}
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

              {/* Conductor Photo Upload */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Conductor Photo
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      disabled={submitting}
                      startIcon={<PhotoCameraIcon />}
                      size={isExtraSmall ? 'small' : 'medium'}
                      sx={{ borderRadius: '10px', textTransform: 'none' }}
                    >
                      Upload Photo
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'conductorPhoto')}
                      />
                    </Button>
                    {form.conductorPhotoUrl && (
                      <Avatar 
                        src={form.conductorPhotoUrl} 
                        sx={{ width: 50, height: 50, border: '1px solid #e2e8f0' }}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ 
            p: { xs: 1.5, sm: 2.5 }, 
            pt: { xs: 0.5, sm: 1 }, 
            gap: 1, 
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button 
              onClick={handleCloseDialog} 
              disabled={submitting} 
              sx={{ 
                color: '#64748b',
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 2, sm: 1 }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{
                borderRadius: '10px',
                backgroundColor: '#6495ED',
                fontWeight: 600,
                px: 3,
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 1, sm: 2 },
                '&:hover': { backgroundColor: '#4169E1' },
              }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : (isEdit ? 'Update' : 'Save')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ================= DELETE DIALOG ================= */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{ 
            sx: { 
              borderRadius: { xs: '16px', sm: '20px' }, 
              p: { xs: 0.5, sm: 1 },
              margin: { xs: '10px', sm: '16px' }
            } 
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 700, 
            color: '#dc2626',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            p: { xs: 1.5, sm: 2 }
          }}>
            Confirm Delete
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 1.5, sm: 2 } }}>
            <Typography sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}>
              Are you sure you want to delete this conductor? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ 
            p: { xs: 1.5, sm: 2.5 }, 
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button 
              onClick={() => setDeleteDialogOpen(false)} 
              disabled={submitting} 
              sx={{ 
                color: '#64748b',
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 2, sm: 1 }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={submitting}
              sx={{ 
                borderRadius: '10px', 
                fontWeight: 600, 
                px: 3,
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 1, sm: 2 }
              }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : 'Yes, Delete'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* ================= SNACKBAR ================= */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
              borderRadius: '12px', 
              width: '100%',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              '& .MuiAlert-icon': {
                fontSize: { xs: '18px', sm: '22px' }
              }
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Conductor;