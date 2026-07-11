// StudentSignUp.jsx - Fully Responsive for All iPhone Models

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
  FormHelperText,
  Switch,
  FormControlLabel,
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  Groups as GroupsIcon,
  Language as LanguageIcon,
  CalendarMonth as CalendarMonthIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  PersonAdd as PersonAddIcon,
  Close as CloseIcon,
  Bloodtype as BloodtypeIcon,
  Badge as BadgeIcon
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
function StudentSignUp() {
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
    rollNumber: '',
    age: '',
    studentClass: '',
    division: '',
    medium: '',
    admission: '',
    academicYear: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    bloodGroup: '',
    status: 'ACTIVE',
    present: false,
    inBus: false,
    qrImageUrl: ''
  });

  // Dropdown options from API
  const [options, setOptions] = useState({
    divisions: [],
    mediums: [],
    classes: [],
    bloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    academicYears: []
  });

  // Load dropdown options
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const divisionsData = await api.divisions.getAll();
        setOptions(prev => ({
          ...prev,
          divisions: divisionsData.map(d => d.divisionName)
        }));

        const mediumsData = await api.mediums.getAll();
        setOptions(prev => ({
          ...prev,
          mediums: mediumsData.map(m => m.mediumName)
        }));

        const classesData = await api.classes.getAll();
        setOptions(prev => ({
          ...prev,
          classes: classesData.map(c => c.name)
        }));

        const academicYearsData = await api.academicYears.getAll();
        setOptions(prev => ({
          ...prev,
          academicYears: academicYearsData.map(y => y.yearName)
        }));

      } catch (error) {
        console.error('Error loading dropdown options:', error);
        setOptions(prev => ({
          ...prev,
          divisions: ['North', 'South', 'East', 'West'],
          mediums: ['English', 'Spanish', 'Bilingual', 'Hindi', 'Urdu'],
          classes: ['Class 9 - Science', 'Class 9 - Arts', 'Class 10 - Science', 'Class 10 - Arts', 
                    'Class 11 - Science', 'Class 11 - Commerce', 'Class 12 - Science', 'Class 12 - Commerce'],
          academicYears: ['2025-2026', '2024-2025', '2023-2024']
        }));
      }
    };

    loadOptions();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const requiredFields = ['name', 'rollNumber', 'studentClass', 'division', 'medium', 'parentName', 'parentPhone'];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
      if (formData.parentPhone && !phonePattern.test(formData.parentPhone)) {
        throw new Error('Phone number must be in format XXX-XXX-XXXX');
      }

      const studentData = {
        name: formData.name.trim(),
        rollNumber: formData.rollNumber.trim(),
        age: formData.age ? parseInt(formData.age) : null,
        studentClass: formData.studentClass,
        division: formData.division,
        medium: formData.medium,
        admission: formData.admission || null,
        academicYear: formData.academicYear || null,
        parentName: formData.parentName.trim(),
        parentEmail: formData.parentEmail?.trim() || '',
        parentPhone: formData.parentPhone.trim(),
        bloodGroup: formData.bloodGroup || '',
        status: formData.status || 'ACTIVE',
        present: formData.present || false,
        inBus: formData.inBus || false,
        qrImageUrl: formData.qrImageUrl || ''
      };

      const response = await api.students.create(studentData);

      setSuccess('Student registered successfully!');
      
      setFormData({
        name: '',
        rollNumber: '',
        age: '',
        studentClass: '',
        division: '',
        medium: '',
        admission: '',
        academicYear: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        bloodGroup: '',
        status: 'ACTIVE',
        present: false,
        inBus: false,
        qrImageUrl: ''
      });

      setTimeout(() => {
        navigate('/students');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Failed to register student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      rollNumber: '',
      age: '',
      studentClass: '',
      division: '',
      medium: '',
      admission: '',
      academicYear: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      bloodGroup: '',
      status: 'ACTIVE',
      present: false,
      inBus: false,
      qrImageUrl: ''
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
                <span>Student Registration</span>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Register a new student in the bus tracking system
              </Typography>
            </Box>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon sx={{ fontSize: { xs: 16, sm: 18, md: 20 } }} />}
              onClick={() => navigate('/students')}
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
              <span className="hidden xs:inline">Back to Students</span>
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
                      placeholder="Enter student's full name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Roll Number"
                      name="rollNumber"
                      value={formData.rollNumber}
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
                      placeholder="Enter roll number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      placeholder="Enter age"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SchoolIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        ),
                        inputProps: { min: 1, max: 25 }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                      <InputLabel id="blood-group-label">Blood Group</InputLabel>
                      <StyledSelect
                        labelId="blood-group-label"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        disabled={loading}
                        label="Blood Group"
                        sx={{
                          borderRadius: "10px",
                          '& .MuiSelect-select': {
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }
                          }
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <BloodtypeIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">Select Blood Group</MenuItem>
                        {options.bloodGroups.map(bg => (
                          <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Academic Information */}
              <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <SectionHeader variant="h6" sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <SchoolIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 22 } }} />
                  Academic Information
                </SectionHeader>

                <Grid container spacing={isExtraSmall ? 1.5 : isMobile ? 2 : 2.5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} required>
                      <InputLabel id="class-label">Class *</InputLabel>
                      <StyledSelect
                        labelId="class-label"
                        name="studentClass"
                        value={formData.studentClass}
                        onChange={handleChange}
                        disabled={loading}
                        label="Class *"
                        sx={{
                          borderRadius: "10px",
                          '& .MuiSelect-select': {
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }
                          }
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <ClassIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">Select Class</MenuItem>
                        {options.classes.map(cls => (
                          <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} required>
                      <InputLabel id="division-label">Division *</InputLabel>
                      <StyledSelect
                        labelId="division-label"
                        name="division"
                        value={formData.division}
                        onChange={handleChange}
                        disabled={loading}
                        label="Division *"
                        sx={{
                          borderRadius: "10px",
                          '& .MuiSelect-select': {
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }
                          }
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <GroupsIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">Select Division</MenuItem>
                        {options.divisions.map(div => (
                          <MenuItem key={div} value={div}>{div}</MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"} required>
                      <InputLabel id="medium-label">Medium *</InputLabel>
                      <StyledSelect
                        labelId="medium-label"
                        name="medium"
                        value={formData.medium}
                        onChange={handleChange}
                        disabled={loading}
                        label="Medium *"
                        sx={{
                          borderRadius: "10px",
                          '& .MuiSelect-select': {
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }
                          }
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <LanguageIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">Select Medium</MenuItem>
                        {options.mediums.map(med => (
                          <MenuItem key={med} value={med}>{med}</MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Admission Number"
                      name="admission"
                      value={formData.admission}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BadgeIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="Enter admission number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}>
                      <InputLabel id="academic-year-label">Academic Year</InputLabel>
                      <StyledSelect
                        labelId="academic-year-label"
                        name="academicYear"
                        value={formData.academicYear}
                        onChange={handleChange}
                        disabled={loading}
                        label="Academic Year"
                        sx={{
                          borderRadius: "10px",
                          '& .MuiSelect-select': {
                            fontSize: { xs: '0.85rem', sm: '0.875rem' }
                          }
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <CalendarMonthIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        }
                      >
                        <MenuItem value="">Select Academic Year</MenuItem>
                        {options.academicYears.map(year => (
                          <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                      </StyledSelect>
                    </FormControl>
                  </Grid>
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
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                      </StyledSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Parent/Guardian Information */}
              <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <SectionHeader variant="h6" sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <PersonIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 22 } }} />
                  Parent/Guardian Information
                </SectionHeader>

                <Grid container spacing={isExtraSmall ? 1.5 : isMobile ? 2 : 2.5}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Parent/Guardian Name"
                      name="parentName"
                      value={formData.parentName}
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
                      placeholder="Enter parent's full name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Phone Number"
                      name="parentPhone"
                      value={formData.parentPhone}
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
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Email Address"
                      name="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                          </InputAdornment>
                        )
                      }}
                      placeholder="Enter email address"
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Bus Information */}
              <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <SectionHeader variant="h6" sx={{ mb: { xs: 2, sm: 2.5 } }}>
                  <SchoolIcon sx={{ color: "#6495ED", fontSize: { xs: 18, sm: 20, md: 22 } }} />
                  Bus Information
                </SectionHeader>

                <Grid container spacing={isExtraSmall ? 1.5 : isMobile ? 2 : 2.5}>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.inBus || false}
                          onChange={handleChange}
                          name="inBus"
                          disabled={loading}
                          size={isExtraSmall ? "small" : "medium"}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#6495ED',
                              '&:hover': {
                                backgroundColor: 'rgba(100, 149, 237, 0.08)',
                              },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#6495ED',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                          Currently on Bus
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.present || false}
                          onChange={handleChange}
                          name="present"
                          disabled={loading}
                          size={isExtraSmall ? "small" : "medium"}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#22c55e',
                              '&:hover': {
                                backgroundColor: 'rgba(34, 197, 94, 0.08)',
                              },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#22c55e',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                          Present Today
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="QR Image URL"
                      name="qrImageUrl"
                      type="url"
                      value={formData.qrImageUrl}
                      onChange={handleChange}
                      disabled={loading}
                      size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                      placeholder="Enter QR code image URL (optional)"
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
                  onClick={() => navigate('/students')}
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
                        Register Student
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

export default StudentSignUp;