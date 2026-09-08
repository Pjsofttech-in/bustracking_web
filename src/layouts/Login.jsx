import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  DirectionsBus as DirectionsBusIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import { styled, keyframes } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { login, setAuthToken } from "../api/authApi";

// ================= ANIMATIONS =================
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const floatCloud = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(20px); }
  100% { transform: translateX(0); }
`;

const driveBus = keyframes`
  0% { transform: translateX(-10px); }
  100% { transform: translateX(10px); }
`;

// ================= STYLED COMPONENTS =================
const LoginContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
  backgroundColor: "#EAF8FC",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const BackgroundLayer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
  pointerEvents: "none",
  overflow: "hidden",
});

const Cloud = styled(Box)(({ top, left, size, duration }) => ({
  position: "absolute",
  top: top || "10%",
  left: left || "5%",
  width: size || 120,
  height: size * 0.5 || 60,
  backgroundColor: "rgba(255,255,255,0.85)",
  borderRadius: "50%",
  boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
  animation: `${floatCloud} ${duration || 8}s ease-in-out infinite alternate`,
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: "50%",
  },
  "&::before": {
    top: "-30%",
    left: "10%",
    width: "60%",
    height: "70%",
  },
  "&::after": {
    top: "-20%",
    right: "10%",
    width: "40%",
    height: "60%",
  },
  "@media (max-width: 480px)": {
    display: "none",
  },
}));

const GrassStrip = styled(Box)({
  position: "absolute",
  bottom: 70,
  left: 0,
  width: "100%",
  height: 30,
  backgroundColor: "#65BE45",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: -8,
    left: 0,
    width: "100%",
    height: 16,
    background:
      "radial-gradient(ellipse at 20% 0%, #65BE45 0%, transparent 70%), radial-gradient(ellipse at 80% 0%, #65BE45 0%, transparent 70%)",
    backgroundSize: "40px 16px, 60px 16px",
    backgroundRepeat: "repeat-x",
  },
  "@media (max-width: 480px)": {
    height: 20,
    bottom: 50,
  },
});

const Road = styled(Box)({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: 70,
  backgroundColor: "#292D32",
  zIndex: 1,
  "&::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: 4,
    background:
      "repeating-linear-gradient(to right, white 0px, white 30px, transparent 30px, transparent 50px)",
    transform: "translateY(-50%)",
  },
  "@media (max-width: 480px)": {
    height: 50,
  },
});

const BusWrapper = styled(Box)({
  position: "absolute",
  bottom: 90,
  left: "15%",
  zIndex: 2,
  animation: `${driveBus} 3s ease-in-out infinite alternate`,
  transform: "translateX(0)",
  "@media (max-width: 600px)": {
    bottom: 70,
    left: "10%",
  },
  "@media (max-width: 480px)": {
    bottom: 55,
    left: "5%",
  },
});

const BusSVG = styled("svg")({
  width: 140,
  height: 80,
  filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.2))",
  "@media (max-width: 600px)": {
    width: 100,
    height: 60,
  },
  "@media (max-width: 480px)": {
    width: 70,
    height: 45,
  },
});

const Header = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  padding: theme.spacing(2, 4),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5, 2),
  },
}));

const LogoWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #F59A3D, #E8852B)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  [theme.breakpoints.down("sm")]: {
    width: 28,
    height: 28,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#5A3424",
  fontSize: "1.2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: "#5A3424",
  fontWeight: 500,
  fontSize: "0.9rem",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: 4,
  "&:hover": {
    color: "#F59A3D",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  zIndex: 5,
  maxWidth: 520,
  width: "100%",
  padding: theme.spacing(3),
  borderRadius: "28px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
  backgroundColor: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(10px)",
  animation: `${fadeInUp} 0.8s ease-out`,
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5),
    borderRadius: "20px",
    maxWidth: "92%",
    marginBottom: 10,
  },
}));

const Badge = styled(Box)(({ theme }) => ({
  backgroundColor: "#FEF3C7",
  color: "#D97706",
  padding: "3px 12px",
  borderRadius: "20px",
  fontSize: "0.65rem",
  fontWeight: 600,
  display: "inline-block",
  marginBottom: theme.spacing(1),
  border: "1px solid #FCD34D",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.55rem",
    padding: "2px 10px",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#F8FAFC",
    "&:hover fieldset": {
      borderColor: "#F59A3D",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F59A3D",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#64748B",
    fontSize: "0.85rem",
    "&.Mui-focused": {
      color: "#F59A3D",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  padding: "12px",
  borderRadius: "14px",
  fontWeight: 700,
  fontSize: "0.95rem",
  textTransform: "none",
  background: "linear-gradient(135deg, #F59A3D, #E8852B)",
  color: "white",
  boxShadow: "0 4px 16px rgba(245,154,61,0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #E8852B, #D9751F)",
    boxShadow: "0 6px 24px rgba(245,154,61,0.4)",
    transform: "translateY(-2px)",
  },
  "&:disabled": {
    background: "#CBD5E1",
    boxShadow: "none",
    transform: "none",
  },
  marginTop: theme.spacing(0.5),
}));

// ================= MAIN COMPONENT =================
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await login({
        username: formData.username,
        password: formData.password,
      });

      const { token, role, roleId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("roleId", roleId);

      setAuthToken(token);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <BackgroundLayer>
        <Cloud top="8%" left="5%" size={140} duration={10} />
        <Cloud top="15%" right="8%" size={110} duration={12} />
        <Cloud top="30%" left="3%" size={80} duration={9} />
        <Cloud top="45%" right="4%" size={100} duration={11} />

        <GrassStrip />
        <Road />

        <BusWrapper>
          <BusSVG viewBox="0 0 200 120" fill="none">
            <rect x="20" y="40" width="160" height="50" rx="10" fill="#FFC83D" stroke="#E8A820" strokeWidth="2" />
            <rect x="20" y="50" width="160" height="35" rx="8" fill="#FFD966" />
            <rect x="30" y="55" width="25" height="20" rx="4" fill="#87CEEB" stroke="#5A3424" strokeWidth="1.5" />
            <rect x="60" y="55" width="25" height="20" rx="4" fill="#87CEEB" stroke="#5A3424" strokeWidth="1.5" />
            <rect x="90" y="55" width="25" height="20" rx="4" fill="#87CEEB" stroke="#5A3424" strokeWidth="1.5" />
            <rect x="120" y="55" width="25" height="20" rx="4" fill="#87CEEB" stroke="#5A3424" strokeWidth="1.5" />
            <rect x="150" y="55" width="25" height="20" rx="4" fill="#87CEEB" stroke="#5A3424" strokeWidth="1.5" />
            <circle cx="50" cy="90" r="12" fill="#292D32" />
            <circle cx="50" cy="90" r="6" fill="#555" />
            <circle cx="150" cy="90" r="12" fill="#292D32" />
            <circle cx="150" cy="90" r="6" fill="#555" />
            <rect x="170" y="55" width="16" height="28" rx="3" fill="#FFC83D" stroke="#E8A820" strokeWidth="1.5" />
            <rect x="14" y="55" width="16" height="28" rx="3" fill="#FFC83D" stroke="#E8A820" strokeWidth="1.5" />
            <text x="100" y="48" fontSize="14" fontWeight="bold" fill="#5A3424" textAnchor="middle">SCHOOL</text>
          </BusSVG>
        </BusWrapper>
      </BackgroundLayer>

      <Header>
        <LogoWrapper>
          <LogoIcon>
            <DirectionsBusIcon sx={{ fontSize: 20 }} />
          </LogoIcon>
          <LogoText variant="h6">SPL BUS</LogoText>
        </LogoWrapper>
        <NavLinks>
          <NavLink href="/" underline="none">
            <HomeIcon sx={{ fontSize: 18 }} /> Home
          </NavLink>
          <NavLink href="/help" underline="none">
            <HelpIcon sx={{ fontSize: 18 }} /> Help
          </NavLink>
        </NavLinks>
      </Header>

      <LoginCard elevation={0}>
        <Badge>School Bus Tracking</Badge>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#5A3424", mb: 0.5 }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", mb: 2 }}>
          Sign in to continue to your Bus Tracking account.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
              {error}
            </Alert>
          )}

          <StyledTextField
            fullWidth
            label="Email or Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Enter your email or username"
          />

          <StyledTextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#94A3B8", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={loading}
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Enter your password"
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  disabled={loading}
                  sx={{
                    color: "#94A3B8",
                    "&.Mui-checked": { color: "#F59A3D" },
                  }}
                />
              }
              label="Remember me"
              sx={{ "& .MuiTypography-root": { fontSize: "0.8rem", color: "#64748B" } }}
            />
            <Link href="#" variant="body2" sx={{ color: "#F59A3D", fontWeight: 500, fontSize: "0.8rem" }}>
              Forgot Password?
            </Link>
          </Box>

          <LoginButton
            type="submit"
            fullWidth
            disabled={loading}
            endIcon={!loading && <ArrowForwardIcon />}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </LoginButton>
        </Box>
      </LoginCard>
    </LoginContainer>
  );
}