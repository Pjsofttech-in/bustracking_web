// ConductorSignUp.jsx - Fully Responsive for All iPhone Models

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarTodayIcon,
  Home as HomeIcon,
  LocationOn as LocationOnIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { api } from '../services/api';

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
  maxWidth: "900px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: 0,
  }
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
  overflow: "hidden",
  transition: "all 0.3s ease",
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    borderRadius: "16px",
  },
  [theme.breakpoints.down('xs')]: {
    borderRadius: "12px",
  },
  '@media (max-width: 380px)': {
    borderRadius: "10px",
  }
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#1e293b",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "0.95rem",
  [theme.breakpoints.down('sm')]: {
    fontSize: "0.85rem",
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: "0.8rem",
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

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "10px",
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: "#6495ED",
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: "#6495ED",
    borderWidth: "2px",
  },
  '& .MuiSelect-select': {
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
function ConductorSignUp() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    employeeId: '',
    status: 'Join',
    joiningDate: '',
    terminateDate: '',
    licenseExpiryDate: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['name', 'phone', 'employeeId', 'joiningDate'];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      // Validate phone format
      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (!phonePattern.test(formData.phone)) {
        throw new Error('Phone number must be in format XXX-XXX-XXXX');
      }

      // Validate license expiry date is in future
      if (formData.licenseExpiryDate && new Date(formData.licenseExpiryDate) < new Date()) {
        throw new Error('License expiry date must be in the future');
      }

      // Validate terminated date if status is Terminated
      if (formData.status === 'Terminated' && !formData.terminateDate) {
        throw new Error('Please enter termination date for terminated status');
      }

      // Prepare data for API
      const conductorData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        employeeId: formData.employeeId.trim(),
        status: formData.status,
        joiningDate: formData.joiningDate,
        terminateDate: formData.terminateDate || null,
        licenseExpiryDate: formData.licenseExpiryDate || null,
        houseNo: formData.houseNo || '',
        street: formData.street || '',
        city: formData.city || '',
        state: formData.state || '',
        pincode: formData.pincode || ''
      };

      // Send to API
      const response = await api.conductors.create(conductorData);

      setSuccess('Conductor registered successfully!');
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        employeeId: '',
        status: 'Join',
        joiningDate: '',
        terminateDate: '',
        licenseExpiryDate: '',
        houseNo: '',
        street: '',
        city: '',
        state: '',
        pincode: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/conductors');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Failed to register conductor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      employeeId: '',
      status: 'Join',
      joiningDate: '',
      terminateDate: '',
      licenseExpiryDate: '',
      houseNo: '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    });
    setError('');
    setSuccess('');
  };

  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          {/* Header */}
          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 1.5, sm: 2, md: 3 },
            mb: { xs: 2, sm: 2.5, md: 3 }
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
                <PersonAddIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <span>Conductor Registration</span>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Register a new conductor in the bus tracking system
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              onClick={() => navigate('/conductors')}
              size={isExtraSmall ? "small" : "medium"}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                borderColor: "#94a3b8",
                color: "#64748b",
                fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                padding: { xs: "4px 12px", sm: "6px 16px", md: "8px 20px" },
                '&:hover': {
                  backgroundColor: "#f1f5f9",
                  borderColor: "#64748b",
                }
              }}
            >
              <span className="hidden xs:inline">Back to Conductors</span>
              <span className="xs:hidden">Back</span>
            </Button>
          </Box>

          {/* Error/Success Messages */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: "12px",
                '& .MuiAlert-icon': {
                  fontSize: { xs: '18px', sm: '22px' }
                },
                '& .MuiAlert-message': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
              icon={<CloseIcon />}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 2,
                borderRadius: "12px",
                '& .MuiAlert-icon': {
                  fontSize: { xs: '18px', sm: '22px' }
                },
                '& .MuiAlert-message': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }
              }}
              onClose={() => setSuccess('')}
            >
              {success}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <FormPaper>
              {/* Personal Information */}
              <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <SectionHeader variant="h6" sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <PersonIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 22 } }} />
                  Personal Information
                </SectionHeader>

                <Grid container spacing={isExtraSmall ? 1.5 : isMobile ? 2 : 2.5}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="Enter conductor's full name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="XXX-XXX-XXXX"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Employee ID"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="e.g., CON-001"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="License Expiry Date"
                      name="licenseExpiryDate"
                      type="date"
                      value={formData.licenseExpiryDate}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Employment Information */}
              <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <SectionHeader variant="h6" sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <BadgeIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 22 } }} />
                  Employment Information
                </SectionHeader>

                <Grid container spacing={isExtraSmall ? 1.5 : isMobile ? 2 : 2.5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                      <InputLabel id="status-label">Status</InputLabel>
                      <StyledSelect
                        labelId="status-label"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={loading}
                        label="Status"
                        sx={{
                          borderRadius: "10px",
                          '& .MuiSelect-select': {
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }
                          }
                        }}
                      >
                        <MenuItem value="Join">Join</MenuItem>
                        <MenuItem value="Terminated">Terminated</MenuItem>
                        <MenuItem value="Suspended">Suspended</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Joining Date"
                      name="joiningDate"
                      type="date"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarTodayIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  {formData.status === 'Terminated' && (
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        fullWidth
                        label="Termination Date"
                        name="terminateDate"
                        type="date"
                        value={formData.terminateDate}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Divider />

              {/* Address Information */}
              <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <SectionHeader variant="h6" sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <HomeIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 22 } }} />
                  Address Information
                </SectionHeader>

                <Grid container spacing={isExtraSmall ? 1.5 : isMobile ? 2 : 2.5}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="House/Apartment No"
                      name="houseNo"
                      value={formData.houseNo}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="e.g., 123, A-101"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="Enter street name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="Enter city"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="Enter state"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="Enter pincode"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Form Actions */}
              <Box sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                bgcolor: "#f8fafc",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "stretch", sm: "center" },
                gap: { xs: 1.5, sm: 2 },
                borderTop: "1px solid #f1f5f9"
              }}>
                <Button
                  variant="text"
                  onClick={() => navigate('/conductors')}
                  disabled={loading}
                  fullWidth={isExtraSmall}
                  sx={{
                    textTransform: "none",
                    borderRadius: "10px",
                    color: "#64748b",
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    padding: { xs: "8px 16px", sm: "10px 20px" },
                    '&:hover': {
                      backgroundColor: "#f1f5f9",
                    },
                    order: { xs: 3, sm: 1 }
                  }}
                >
                  Cancel
                </Button>

                <Box sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                  order: { xs: 1, sm: 2 }
                }}>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    disabled={loading}
                    fullWidth={isExtraSmall}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      borderColor: "#94a3b8",
                      color: "#64748b",
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      padding: { xs: "8px 16px", sm: "10px 20px" },
                      '&:hover': {
                        backgroundColor: "#f1f5f9",
                        borderColor: "#64748b",
                      }
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth={isExtraSmall}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      backgroundColor: "#6495ED",
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' },
                      padding: { xs: "8px 16px", sm: "10px 20px" },
                      '&:hover': {
                        backgroundColor: "#4169E1",
                      },
                      '&:disabled': {
                        opacity: 0.5,
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={isExtraSmall ? 18 : 22} color="inherit" sx={{ mr: 1 }} />
                        Registering...
                      </>
                    ) : (
                      <>
                        <SaveIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, mr: 1 }} />
                        Register Conductor
                      </>
                    )}
                  </Button>
                </Box>
              </Box>
            </FormPaper>
          </Box>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
}

export default ConductorSignUp;