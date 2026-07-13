// SignIn.jsx - Fully Responsive for All iPhone Models

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
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
  FormControlLabel,
  Checkbox,
  Chip
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// ================= STYLED COMPONENTS WITH RESPONSIVENESS =================
const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
  width: "100%",
  overflowX: "hidden",
  background: "linear-gradient(135deg, #dbeafe 0%, #f8fafc 50%, #e0e7ff 100%)",
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  width: "100%",
  maxWidth: "100%",
  overflowX: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
  maxWidth: "420px",
  margin: "0 auto",
  width: "100%",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0, 0.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: 0,
  }
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.05)",
  overflow: "hidden",
  transition: "all 0.3s ease",
  width: "100%",
  border: "1px solid rgba(255,255,255,0.5)",
  backdropFilter: "blur(10px)",
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

const LoginHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5),
    paddingBottom: theme.spacing(1),
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: "64px",
  height: "64px",
  background: "linear-gradient(135deg, #6495ED 0%, #4169E1 100%)",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  boxShadow: "0 8px 24px rgba(100, 149, 237, 0.3)",
  [theme.breakpoints.down('sm')]: {
    width: "56px",
    height: "56px",
    marginBottom: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    width: "48px",
    height: "48px",
    marginBottom: theme.spacing(1),
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: "10px",
    backgroundColor: "rgba(255,255,255,0.8)",
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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "12px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.95rem",
  backgroundColor: "#6495ED",
  boxShadow: "0 4px 16px rgba(100, 149, 237, 0.3)",
  transition: "all 0.3s ease",
  '&:hover': {
    backgroundColor: "#4169E1",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(65, 105, 225, 0.4)",
  },
  '&:disabled': {
    opacity: 0.6,
  },
  [theme.breakpoints.down('sm')]: {
    padding: "10px",
    fontSize: "0.85rem",
  },
  [theme.breakpoints.down('xs')]: {
    padding: "8px",
    fontSize: "0.8rem",
  }
}));

const DemoCredentials = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f8fafc",
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  textAlign: "center",
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1),
  }
}));

const FormSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: 0,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(1.5),
    paddingTop: 0,
  }
}));

// ================= MAIN COMPONENT =================
function SignIn() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [userData, setUserData] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    if (token) {
      api.auth.verifyToken(token)
        .then(() => {
          navigate('/dashboard');
        })
        .catch(() => {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminData');
          sessionStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminData');
        });
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!formData.email) {
        throw new Error('Please enter your email address');
      }
      if (!formData.password) {
        throw new Error('Please enter your password');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      const loginData = {
        email: formData.email,
        password: formData.password
      };

      const response = await api.auth.adminLogin(loginData);
      
      if (response && response.success) {
        setUserData(response.user);
        setSuccess('Login successful! Welcome back!');
        
        if (formData.rememberMe) {
          localStorage.setItem('adminToken', response.token);
          localStorage.setItem('adminData', JSON.stringify(response.user));
        } else {
          sessionStorage.setItem('adminToken', response.token);
          sessionStorage.setItem('adminData', JSON.stringify(response.user));
        }

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        throw new Error(response.message || 'Invalid credentials');
      }

    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@bus.com',
      password: 'admin123',
      rememberMe: false
    });
  };

  return (
    <PageContainer>
      <MainContent>
        <ContentWrapper>
          {/* Mobile Header */}
          <Box sx={{
            display: { xs: 'block', sm: 'none' },
            mb: 2,
            textAlign: 'center'
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1
              }}
            >
              <Box sx={{
                bgcolor: "#6495ED",
                color: "white",
                width: 32,
                height: 32,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem"
              }}>
                <i className="fas fa-bus"></i>
              </Box>
              BusTracking
            </Typography>
          </Box>

          <LoginCard>
            {/* Header */}
            <LoginHeader>
              <LogoContainer>
                <i className="fas fa-bus" style={{ color: 'white', fontSize: isExtraSmall ? '1.5rem' : '2rem' }}></i>
              </LogoContainer>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1e293b",
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Sign in to your admin account to manage the bus tracking system
              </Typography>
            </LoginHeader>

            {/* Error/Success Messages */}
            {error && (
              <Box sx={{ px: { xs: 2, sm: 3 }, pb: 2 }}>
                <Alert
                  severity="error"
                  sx={{
                    borderRadius: "12px",
                    '& .MuiAlert-icon': {
                      fontSize: { xs: '18px', sm: '22px' }
                    },
                    '& .MuiAlert-message': {
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }
                  }}
                  icon={<InfoIcon />}
                  onClose={() => setError('')}
                >
                  {error}
                </Alert>
              </Box>
            )}
            {success && (
              <Box sx={{ px: { xs: 2, sm: 3 }, pb: 2 }}>
                <Alert
                  severity="success"
                  sx={{
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
              </Box>
            )}

            {/* Form */}
            <FormSection>
              <Box component="form" onSubmit={handleSubmit}>
                {/* Email */}
                <Box sx={{ mb: 2.5 }}>
                  <StyledTextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    disabled={loading}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    placeholder="admin@bus.com"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>

                {/* Password */}
                <Box sx={{ mb: 2 }}>
                  <StyledTextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                    disabled={loading}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    placeholder="Enter your password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePassword}
                            edge="end"
                            size={isExtraSmall ? "small" : "medium"}
                            disabled={loading}
                          >
                            {showPassword ? (
                              <VisibilityOffIcon sx={{ fontSize: isExtraSmall ? 16 : 20 }} />
                            ) : (
                              <VisibilityIcon sx={{ fontSize: isExtraSmall ? 16 : 20 }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>

                {/* Remember Me & Forgot Password */}
                <Box sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  mb: 3
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        disabled={loading}
                        size={isExtraSmall ? "small" : "medium"}
                        sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: isExtraSmall ? 18 : 20
                          }
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        color: '#64748b'
                      }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Link 
                    to="/forgot-password" 
                    style={{ 
                      textDecoration: 'none',
                      fontSize: isExtraSmall ? '0.7rem' : isMobile ? '0.75rem' : '0.875rem',
                      fontWeight: 600,
                      color: '#6495ED'
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                {/* Submit Button */}
                <StyledButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  startIcon={!loading && <LoginIcon sx={{ fontSize: isExtraSmall ? 16 : 20 }} />}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={isExtraSmall ? 18 : 22} color="inherit" sx={{ mr: 1 }} />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </StyledButton>

                {/* Demo Credentials */}
                <Box sx={{ mt: 2.5 }}>
                  <DemoCredentials>
                    <Typography variant="caption" color="text.secondary" sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      gap: 0.5,
                      fontSize: { xs: '0.65rem', sm: '0.7rem' }
                    }}>
                      <InfoIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />
                      Demo Credentials
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 500,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      color: '#475569'
                    }}>
                      Email: <span style={{ color: '#6495ED' }}>admin@bus.com</span> | 
                      Password: <span style={{ color: '#6495ED' }}>admin123</span>
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      onClick={handleDemoLogin}
                      sx={{
                        mt: 0.5,
                        textTransform: 'none',
                        color: '#6495ED',
                        fontSize: { xs: '0.65rem', sm: '0.7rem' },
                        '&:hover': {
                          backgroundColor: 'rgba(100, 149, 237, 0.08)'
                        }
                      }}
                    >
                      <i className="fas fa-arrow-right" style={{ marginRight: '4px' }}></i>
                      Auto-fill demo credentials
                    </Button>
                  </DemoCredentials>
                </Box>

                {/* Additional Links */}
                <Box sx={{ textAlign: 'center', mt: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      style={{ 
                        textDecoration: 'none',
                        fontWeight: 600,
                        color: '#6495ED'
                      }}
                    >
                      Register Now
                    </Link>
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                  <Link 
                    to="/student/signin" 
                    style={{ 
                      textDecoration: 'none',
                      fontSize: isExtraSmall ? '0.7rem' : isMobile ? '0.75rem' : '0.875rem',
                      color: '#94a3b8'
                    }}
                  >
                    <PersonIcon sx={{ fontSize: { xs: 14, sm: 16 }, mr: 0.5, verticalAlign: 'middle' }} />
                    Student Login
                  </Link>
                </Box>
              </Box>
            </FormSection>
          </LoginCard>

          {/* Footer */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ 
              fontSize: { xs: '0.6rem', sm: '0.7rem' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5
            }}>
              <i className="fas fa-shield-alt"></i>
              Secure login · Powered by BusTracking System
            </Typography>
          </Box>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
}

export default SignIn;