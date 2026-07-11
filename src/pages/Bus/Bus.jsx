import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Chip, Typography, CircularProgress, Snackbar, Alert, MenuItem, Grid,
  InputAdornment, Tooltip, Card, CardContent, Stack, Fade, Grow,
  useTheme, useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon,
  Search as SearchIcon, DirectionsBus as DirectionsBusIcon, Group as GroupIcon,
  CalendarToday as CalendarTodayIcon, Business as BusinessIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import busApi from '../../api/busApi';
import serviceProviderApi from '../../api/serviceProviderApi';

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
    minWidth: '1100px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '900px',
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

const AddBusButton = styled(Button)(({ theme }) => ({
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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '20px',
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      margin: '24px',
      padding: theme.spacing(0.75),
    },
    [theme.breakpoints.down('sm')]: {
      margin: '16px',
      width: '100%',
      borderRadius: '16px',
      maxHeight: '95vh',
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      margin: '10px',
      borderRadius: '14px',
      maxHeight: '92vh',
    },
  },
}));

// ================= MAIN COMPONENT =================
const Bus = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width:400px)');

  // State
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
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

  // Form state
  const emptyForm = {
    id: null,
    busNumber: '',
    busType: '',
    mfgYear: '',
    capacity: '',
    status: '',
    serviceProviderId: ''
  };
  const [form, setForm] = useState(emptyForm);

  const busTypeOptions = ['STANDARD', 'MINI', 'LUXURY', 'ELECTRIC', 'HYBRID'];
  const statusOptions = ['ACTIVE', 'BREAKDOWN', 'TERMINATED'];

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const [busesData, providersData] = await Promise.all([
        busApi.getAll(),
        serviceProviderApi.getAll()
      ]);
      setBuses(busesData);
      setFilteredBuses(busesData);
      setServiceProviders(providersData);
    } catch (error) {
      showSnackbar(error.message || 'Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= SEARCH =================
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBuses(buses);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = buses.filter(b =>
        b.busNumber?.toLowerCase().includes(term) ||
        b.busType?.toLowerCase().includes(term) ||
        b.status?.toLowerCase().includes(term) ||
        b.serviceProviderName?.toLowerCase().includes(term) ||
        b.serviceProviderBusNumber?.toLowerCase().includes(term) ||
        String(b.mfgYear)?.includes(term) ||
        String(b.capacity)?.includes(term)
      );
      setFilteredBuses(filtered);
    }
  }, [searchTerm, buses]);

  // ================= SNACKBAR =================
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= FORM HANDLING =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleEditOpen = (bus) => {
    setForm({
      busNumber: bus.busNumber || '',
      busType: bus.busType || '',
      mfgYear: bus.mfgYear || '',
      capacity: bus.capacity || '',
      status: bus.status || '',
      serviceProviderId: bus.serviceProviderId || ''
    });
    setIsEdit(true);
    setSelectedId(bus.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  // ================= CRUD OPERATIONS =================
  const handleSubmit = async () => {
    if (!form.busNumber || !form.busType || !form.mfgYear || !form.capacity || !form.status) {
      showSnackbar('Please fill in all required fields', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        busNumber: form.busNumber.trim(),
        busType: form.busType,
        mfgYear: Number(form.mfgYear),
        capacity: Number(form.capacity),
        status: form.status,
        serviceProviderId: form.serviceProviderId || null
      };

      if (isEdit) {
        const updated = await busApi.update(selectedId, payload);
        setBuses(buses.map(b => b.id === selectedId ? updated : b));
        showSnackbar('Bus updated successfully!', 'success');
      } else {
        const created = await busApi.create(payload);
        setBuses([...buses, created]);
        showSnackbar('Bus added successfully!', 'success');
      }

      handleCloseDialog();
    } catch (error) {
      showSnackbar(error.message || 'Failed to save bus', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setSubmitting(true);
    try {
      await busApi.delete(selectedId);
      setBuses(buses.filter(b => b.id !== selectedId));
      showSnackbar('Bus deleted successfully!', 'success');
      setDeleteDialogOpen(false);
      resetForm();
    } catch (error) {
      showSnackbar(error.message || 'Failed to delete bus', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // ================= HELPERS =================
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return { bg: '#dcfce7', color: '#16a34a' };
      case 'BREAKDOWN': return { bg: '#fee2e2', color: '#dc2626' };
      case 'TERMINATED': return { bg: '#f1f5f9', color: '#64748b' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const getBusTypeColor = (type) => {
    switch (type) {
      case 'STANDARD': return { bg: '#dbeafe', color: '#6495ED' };
      case 'MINI': return { bg: '#fef3c7', color: '#d97706' };
      case 'LUXURY': return { bg: '#fce7f3', color: '#db2777' };
      case 'ELECTRIC': return { bg: '#d1fae5', color: '#059669' };
      case 'HYBRID': return { bg: '#e0e7ff', color: '#4f46e5' };
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

  // Stats
  const totalBuses = buses.length;
  const activeCount = buses.filter(b => b.status === 'ACTIVE').length;
  const breakdownCount = buses.filter(b => b.status === 'BREAKDOWN').length;
  const terminatedCount = buses.filter(b => b.status === 'TERMINATED').length;
  const assignedToProvider = buses.filter(b => b.serviceProviderId).length;

  // ================= RENDER =================
  if (loading) {
    return (
      <PageContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress size={40} sx={{ color: '#6495ED' }} />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header */}
        <HeaderWrapper>
          <TitleWrapper>
            <HeaderTitle variant="h5">
              <DirectionsBusIcon sx={{ color: '#6495ED', fontSize: { xs: 24, sm: 28 } }} />
              Buses
            </HeaderTitle>
            <HeaderSubtitle variant="body2">
              Manage bus fleet with service provider details
            </HeaderSubtitle>
          </TitleWrapper>
          <AddBusButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOpen}
          >
            Add Bus
          </AddBusButton>
        </HeaderWrapper>

        {/* Stats Cards */}
        <StatsGrid>
          <StatsCard>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <StatLabel variant="caption">Total Buses</StatLabel>
              <StatNumber>{totalBuses}</StatNumber>
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
              <StatLabel variant="caption">Assigned to Provider</StatLabel>
              <StatNumber color="#6495ED">{assignedToProvider}</StatNumber>
            </CardContent>
          </StatsCard>
          <StatsCard>
            <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
              <StatLabel variant="caption">Service Providers</StatLabel>
              <StatNumber color="#8b5cf6">{serviceProviders.length}</StatNumber>
            </CardContent>
          </StatsCard>
        </StatsGrid>

        {/* Search */}
        <SearchField
          fullWidth
          placeholder="Search by bus number, type, status, or service provider..."
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
                    <TableCell sx={{ minWidth: '140px' }}>Bus Number</TableCell>
                    <TableCell sx={{ minWidth: '110px' }}>Type</TableCell>
                    <TableCell align="center" sx={{ minWidth: '100px' }}>MFG Year</TableCell>
                    <TableCell align="center" sx={{ minWidth: '80px' }}>Capacity</TableCell>
                    <TableCell sx={{ minWidth: '180px' }}>Service Provider</TableCell>
                    <TableCell sx={{ minWidth: '120px' }}>Created</TableCell>
                    <TableCell align="center" sx={{ minWidth: '110px' }}>Status</TableCell>
                    <TableCell align="center" sx={{ minWidth: '120px' }}>Actions</TableCell>
                  </TableRow>
                </GradientHeader>
                <TableBody>
                  {filteredBuses.length > 0 ? (
                    filteredBuses.map((b) => (
                      <StyledTableRow key={b.id}>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>{b.id}</TableCell>
                        
                        <TableCell>
                          {b.busNumber ? (
                            <Chip
                              label={b.busNumber}
                              size="small"
                              sx={{
                                bgcolor: '#dbeafe',
                                color: '#6495ED',
                                fontWeight: 600,
                                fontSize: { xs: '0.55rem', sm: '0.7rem' },
                                height: { xs: '20px', sm: '24px' }
                              }}
                            />
                          ) : (
                            <Typography sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' }, color: '#94a3b8' }}>
                              N/A
                            </Typography>
                          )}
                        </TableCell>

                        <TableCell>
                          <Chip
                            label={b.busType}
                            size="small"
                            sx={{
                              bgcolor: getBusTypeColor(b.busType).bg,
                              color: getBusTypeColor(b.busType).color,
                              fontWeight: 600,
                              fontSize: { xs: '0.55rem', sm: '0.7rem' },
                              height: { xs: '18px', sm: '24px' }
                            }}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                            {b.mfgYear || '-'}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <GroupIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#94a3b8' }} />
                            <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                              {b.capacity}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          {b.serviceProviderId ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <BusinessIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#6495ED' }} />
                              <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                {b.serviceProviderName || 'N/A'}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' }, color: '#94a3b8' }}>
                              Not Assigned
                            </Typography>
                          )}
                        </TableCell>

                        <TableCell sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                          {formatDate(b.createdAt)}
                        </TableCell>

                        <TableCell align="center">
                          <Chip
                            label={b.status}
                            size="small"
                            sx={{
                              bgcolor: getStatusColor(b.status).bg,
                              color: getStatusColor(b.status).color,
                              fontWeight: 600,
                              fontSize: { xs: '0.55rem', sm: '0.7rem' },
                              height: { xs: '20px', sm: '24px' },
                              minWidth: { xs: '60px', sm: '70px' }
                            }}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => handleEditOpen(b)}
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
                                  setSelectedId(b.id);
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
                      <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                        <Typography color="text.secondary">
                          {searchTerm ? `No buses found matching "${searchTerm}"` : 'No buses added yet'}
                        </Typography>
                        {!searchTerm && (
                          <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddOpen}
                            sx={{ mt: 2 }}
                          >
                            Add your first bus
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
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((b, index) => (
                    <Grow in key={b.id} timeout={300 * (index + 1) * 0.1}>
                      <MobileCard>
                        <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                          {/* Header with ID and Status */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
                                Bus #{b.id}
                              </Typography>
                              <Typography variant="h6" sx={{
                                fontWeight: 600,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                mt: 0.25
                              }}>
                                <DirectionsBusIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: '#6495ED' }} />
                                <span style={{ wordBreak: 'break-word' }}>{b.busNumber || 'N/A'}</span>
                              </Typography>
                            </Box>
                            <Chip
                              label={b.status}
                              size="small"
                              sx={{
                                bgcolor: getStatusColor(b.status).bg,
                                color: getStatusColor(b.status).color,
                                fontWeight: 600,
                                fontSize: { xs: '0.55rem', sm: '0.6rem' },
                                height: { xs: '20px', sm: '24px' },
                                ml: 1,
                                flexShrink: 0
                              }}
                            />
                          </Box>

                          {/* Grid Info */}
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
                                Type
                              </Typography>
                              <Chip
                                label={b.busType}
                                size="small"
                                sx={{
                                  bgcolor: getBusTypeColor(b.busType).bg,
                                  color: getBusTypeColor(b.busType).color,
                                  fontWeight: 600,
                                  fontSize: { xs: '0.5rem', sm: '0.65rem' },
                                  height: { xs: '16px', sm: '20px' },
                                  mt: 0.25
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                MFG Year
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                <CalendarTodayIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#64748b', mr: 0.5 }} />
                                {b.mfgYear || '-'}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                Capacity
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                <GroupIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: '#64748b', mr: 0.5 }} />
                                {b.capacity}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                Service Provider
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                                {b.serviceProviderName || 'Not Assigned'}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.5rem', sm: '0.55rem' } }}>
                                Created
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.6rem', sm: '0.7rem' }, color: '#64748b' }}>
                                {formatDate(b.createdAt)}
                              </Typography>
                            </Box>
                          </Box>

                          {/* Actions */}
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
                              onClick={() => handleEditOpen(b)}
                              sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => {
                                setSelectedId(b.id);
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
                    <DirectionsBusIcon sx={{ fontSize: 48, opacity: 0.2, mb: 2 }} />
                    <Typography color="text.secondary">
                      {searchTerm ? `No buses found matching "${searchTerm}"` : 'No buses added yet'}
                    </Typography>
                    {!searchTerm && (
                      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                        Add first bus
                      </Button>
                    )}
                  </Box>
                )}
              </Stack>
            </Box>
          )}
        </StyledPaper>

        {/* ================= ADD/EDIT DIALOG ================= */}
        <StyledDialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{
            fontWeight: 700,
            fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.25rem' },
            color: '#1e293b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pr: 0.5,
            p: { xs: 1.5, sm: 2, md: 2.5 }
          }}>
            {isEdit ? 'Edit Bus' : 'Add New Bus'}
            <IconButton onClick={handleCloseDialog} size={isExtraSmall ? 'small' : 'medium'} disabled={submitting}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
            <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2}>
              {/* Bus Number Dropdown - Options fetched from serviceProviderApi */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Bus Number"
                  name="busNumber"
                  value={form.busNumber}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  size={isExtraSmall ? 'small' : 'medium'}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DirectionsBusIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value="">Select Bus Number</MenuItem>
                  {serviceProviders
                    .filter(provider => provider.busNumber) // Only show providers with busNumber
                    .map((provider) => (
                      <MenuItem key={provider.id} value={provider.busNumber}>
                        {provider.busNumber} {provider.name ? `- ${provider.name}` : ''}
                      </MenuItem>
                    ))}
                  {serviceProviders.filter(p => p.busNumber).length === 0 && (
                    <MenuItem disabled>No bus numbers available</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Bus Type"
                  name="busType"
                  value={form.busType}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  size={isExtraSmall ? 'small' : 'medium'}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                >
                  <MenuItem value="">Select Type</MenuItem>
                  {busTypeOptions.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="MFG Year"
                  name="mfgYear"
                  type="number"
                  value={form.mfgYear}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  size={isExtraSmall ? 'small' : 'medium'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarTodayIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                    inputProps: {
                      min: 1990,
                      max: new Date().getFullYear() + 1
                    }
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                  helperText="Enter year (e.g., 2020)"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Capacity"
                  name="capacity"
                  type="number"
                  value={form.capacity}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  size={isExtraSmall ? 'small' : 'medium'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                    inputProps: {
                      min: 1,
                      max: 100
                    }
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  size={isExtraSmall ? 'small' : 'medium'}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Service Provider"
                  name="serviceProviderId"
                  value={form.serviceProviderId || ''}
                  onChange={handleChange}
                  disabled={submitting}
                  size={isExtraSmall ? 'small' : 'medium'}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {serviceProviders.map((provider) => (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>

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
              sx={{
                textTransform: 'none',
                borderRadius: '10px',
                color: '#64748b',
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 2, sm: 1 },
                '&:hover': {
                  backgroundColor: '#f1f5f9'
                }
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={submitting}
              sx={{
                textTransform: 'none',
                borderRadius: '10px',
                backgroundColor: '#6495ED',
                fontWeight: 600,
                px: 3,
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 1, sm: 2 },
                '&:hover': {
                  backgroundColor: '#4169E1'
                }
              }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : (isEdit ? 'Update Bus' : 'Save Bus')}
            </Button>
          </DialogActions>
        </StyledDialog>

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
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            p: { xs: 1.5, sm: 2, md: 2.5 }
          }}>
            Confirm Delete
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
            <Typography sx={{
              color: '#64748b',
              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
            }}>
              Are you sure you want to delete this bus? This action cannot be undone.
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
              sx={{
                textTransform: 'none',
                borderRadius: '10px',
                color: '#64748b',
                width: { xs: '100%', sm: 'auto' },
                order: { xs: 2, sm: 1 },
                '&:hover': {
                  backgroundColor: '#f1f5f9'
                }
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
                textTransform: 'none',
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
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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

export default Bus;