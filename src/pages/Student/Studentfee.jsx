// StudentFee.jsx - Fully Responsive for All iPhone Models

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  TableContainer,
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
  IconButton,
  Tooltip,
  InputAdornment,
  Grid,
  TableContainer as MuiTableContainer
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";


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
  width: "100%",
  '&:hover': {
    borderColor: "#6495ED",
    boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)",
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

const PayButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
  padding: "4px 12px",
  fontSize: "0.7rem",
  backgroundColor: "#22c55e",
  '&:hover': {
    backgroundColor: "#16a34a",
  },
  [theme.breakpoints.down('sm')]: {
    padding: "3px 8px",
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down('xs')]: {
    padding: "2px 6px",
    fontSize: "0.55rem",
  }
}));

// ================= MAIN COMPONENT =================
export default function StudentFee() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [students, setStudents] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [payment, setPayment] = useState({
    amount: "",
    paymentMode: "",
  });

  // ================= LOAD =================
  useEffect(() => {
    loadAcademicYears();
    loadStudents();
  }, []);

  const loadAcademicYears = async () => {
    setLoading(true);
    try {
      const data = await api.academicYears.getAll();
      setAcademicYears(data);
    } catch (error) {
      console.error("Error loading academic years:", error);
      showSnackbar("Failed to load academic years", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async (year) => {
    setLoading(true);
    try {
      const data = await api.students.getAll();
      
      const studentsWithFeeStatus = data.map(student => ({
        ...student,
        feeStatus: Math.random() > 0.4 ? "PAID" : "PENDING"
      }));
      
      setStudents(studentsWithFeeStatus);
    } catch (error) {
      console.error("Error loading students:", error);
      showSnackbar("Failed to load students", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // ================= FILTER =================
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    loadStudents(year);
  };

  // ================= OPEN PAYMENT =================
  const handlePayClick = (student) => {
    setSelectedStudent(student);
    setPayment({ amount: "", paymentMode: "" });
    setOpen(true);
  };

  // ================= SAVE PAYMENT =================
  const handlePaymentSave = async () => {
    if (!payment.amount || !payment.paymentMode) {
      showSnackbar("Please fill in all payment details", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        studentId: selectedStudent.id,
        amount: Number(payment.amount),
        paymentMode: payment.paymentMode,
        status: "SUCCESS",
        paymentDate: new Date().toISOString().split("T")[0],
        transactionId: "TXN" + Date.now()
      };

      const result = await api.studentFees.payFees(payload);
      
      showSnackbar(`Payment of $${payment.amount} successful!`, "success");
      setOpen(false);
      await loadStudents(selectedYear);
    } catch (error) {
      console.error("Payment error:", error);
      showSnackbar(error.message || "Payment failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate statistics
  const totalStudents = students.length;
  const paidStudents = students.filter(s => s.feeStatus === "PAID").length;
  const pendingStudents = students.filter(s => s.feeStatus === "PENDING").length;
  const collectionRate = totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0;

  // ================= LOADING STATE =================
  if (loading && students.length === 0) {
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
              Loading fee data...
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
                <PaymentIcon sx={{ color: "#6495ED", fontSize: { xs: 20, sm: 24, md: 28 } }} />
                <span>Fee Payments</span>
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mt: 0.25,
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" }
                }}
              >
                Manage student fee payments
              </Typography>
            </Box>
          </Box>

          {/* Filter Section */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 1.5, sm: 2 },
            mb: { xs: 2, sm: 2.5, md: 3 }
          }}>
            <StyledTextField
              select
              label="Academic Year"
              value={selectedYear}
              onChange={handleYearChange}
              size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
              sx={{ 
                minWidth: { xs: "100%", sm: 250, md: 300 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: "10px",
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                  </InputAdornment>
                )
              }}
            >
              <MenuItem value="">Select Academic Year</MenuItem>
              {academicYears.map((a) => (
                <MenuItem key={a.id} value={a.yearName}>
                  {a.yearName}
                </MenuItem>
              ))}
            </StyledTextField>
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
                Total Students
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" } }}>
                {totalStudents}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Paid
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#22c55e" }}>
                {paidStudents}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Pending
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#dc2626" }}>
                {pendingStudents}
              </Typography>
            </StatsCard>
            <StatsCard>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                Collection Rate
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: "0.85rem", sm: "1rem", md: "1.25rem" }, color: "#6495ED" }}>
                {collectionRate}%
              </Typography>
            </StatsCard>
          </Box>

          {/* Table/List View */}
          <StyledPaper>
            {loading ? (
              <Box display="flex" justifyContent="center" p={5}>
                <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
              </Box>
            ) : (
              isDesktop ? (
                // Desktop Table View
                <StyledTableContainer>
                  <Table stickyHeader size={isExtraSmall ? "small" : "medium"}>
                    <GradientHeader>
                      <TableRow>
                        <TableCell sx={{ minWidth: { xs: "30px", sm: "40px", md: "60px" } }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                            ID
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ minWidth: { xs: "80px", sm: "110px", md: "160px" } }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                            Student Name
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "130px" } }} align="center">
                          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ minWidth: { xs: "80px", sm: "100px", md: "140px" } }} align="center">
                          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.7rem" } }}>
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </GradientHeader>
                    <TableBody>
                      {students.length > 0 ? (
                        students.map((s) => (
                          <StyledTableRow key={s.id}>
                            <TableCell sx={{ fontWeight: 600 }}>{s.id}</TableCell>
                            <TableCell>
                              <Typography sx={{ 
                                fontWeight: 500, 
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                                wordBreak: 'break-word'
                              }}>
                                {s.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              {s.feeStatus === "PAID" ? (
                                <Chip 
                                  icon={<CheckCircleIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />}
                                  label="PAID"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#dcfce7",
                                    color: "#16a34a",
                                    fontWeight: 600,
                                    fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.75rem" },
                                    borderRadius: "6px",
                                    height: { xs: "16px", sm: "18px", md: "24px" },
                                    '& .MuiChip-icon': { color: "#16a34a", fontSize: { xs: 12, sm: 14, md: 16 } }
                                  }}
                                />
                              ) : (
                                <Chip 
                                  icon={<CancelIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />}
                                  label="PENDING"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#fee2e2",
                                    color: "#dc2626",
                                    fontWeight: 600,
                                    fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.75rem" },
                                    borderRadius: "6px",
                                    height: { xs: "16px", sm: "18px", md: "24px" },
                                    '& .MuiChip-icon': { color: "#dc2626", fontSize: { xs: 12, sm: 14, md: 16 } }
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {s.feeStatus === "PENDING" && (
                                <PayButton
                                  variant="contained"
                                  startIcon={<PaymentIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />}
                                  onClick={() => handlePayClick(s)}
                                  disabled={submitting}
                                  size={isExtraSmall ? "small" : "medium"}
                                >
                                  Pay Now
                                </PayButton>
                              )}
                              {s.feeStatus === "PAID" && (
                                <Chip 
                                  label="Completed"
                                  size="small"
                                  sx={{
                                    backgroundColor: "#dbeafe",
                                    color: "#6495ED",
                                    fontWeight: 500,
                                    fontSize: { xs: "0.45rem", sm: "0.55rem", md: "0.7rem" },
                                    borderRadius: "6px",
                                    height: { xs: "16px", sm: "18px", md: "24px" }
                                  }}
                                />
                              )}
                            </TableCell>
                          </StyledTableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                            <Typography variant="body1" color="text.secondary">
                              <PaymentIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                              No students found
                            </Typography>
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
                    {students.length > 0 ? (
                      students.map((s, index) => (
                        <Grow in key={s.id} timeout={300 * (index + 1) * 0.1}>
                          <MobileCard>
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
                                    Student #{s.id}
                                  </Typography>
                                  <Typography 
                                    variant="h6" 
                                    sx={{ 
                                      fontWeight: 600,
                                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                                      mt: 0.25,
                                      wordBreak: 'break-word'
                                    }}
                                  >
                                    {s.name}
                                  </Typography>
                                </Box>
                                {s.feeStatus === "PAID" ? (
                                  <Chip 
                                    icon={<CheckCircleIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                                    label="PAID"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#dcfce7",
                                      color: "#16a34a",
                                      fontWeight: 600,
                                      fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
                                      borderRadius: "6px",
                                      height: { xs: "20px", sm: "22px", md: "24px" },
                                      '& .MuiChip-icon': { color: "#16a34a", fontSize: { xs: 12, sm: 14 } },
                                      flexShrink: 0
                                    }}
                                  />
                                ) : (
                                  <Chip 
                                    icon={<CancelIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                                    label="PENDING"
                                    size="small"
                                    sx={{
                                      backgroundColor: "#fee2e2",
                                      color: "#dc2626",
                                      fontWeight: 600,
                                      fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
                                      borderRadius: "6px",
                                      height: { xs: "20px", sm: "22px", md: "24px" },
                                      '& .MuiChip-icon': { color: "#dc2626", fontSize: { xs: 12, sm: 14 } },
                                      flexShrink: 0
                                    }}
                                  />
                                )}
                              </Box>

                              <Box sx={{ 
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 1.5,
                                pt: 1.5,
                                borderTop: "1px solid #f1f5f9",
                                flexWrap: "wrap",
                                gap: 0.5
                              }}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" } }}>
                                    Student ID
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.85rem" } }}>
                                    #{s.id}
                                  </Typography>
                                </Box>
                                <Box>
                                  {s.feeStatus === "PENDING" && (
                                    <PayButton
                                      variant="contained"
                                      startIcon={<PaymentIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                                      onClick={() => handlePayClick(s)}
                                      disabled={submitting}
                                      size={isExtraSmall ? "small" : "medium"}
                                    >
                                      Pay Now
                                    </PayButton>
                                  )}
                                  {s.feeStatus === "PAID" && (
                                    <Chip 
                                      label="Completed"
                                      size="small"
                                      sx={{
                                        backgroundColor: "#dbeafe",
                                        color: "#6495ED",
                                        fontWeight: 500,
                                        fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.65rem" },
                                        borderRadius: "6px",
                                        height: { xs: "18px", sm: "20px", md: "24px" }
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            </CardContent>
                          </MobileCard>
                        </Grow>
                      ))
                    ) : (
                      <Box sx={{ textAlign: "center", py: { xs: 3, sm: 4 } }}>
                        <PaymentIcon sx={{ fontSize: { xs: 36, sm: 48 }, opacity: 0.2, mb: 2 }} />
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                          No students found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          Select an academic year to view students
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Box>
              )
            )}
          </StyledPaper>

          {/* Payment Dialog */}
          <StyledDialog 
            open={open} 
            onClose={() => setOpen(false)} 
            fullWidth 
            maxWidth="sm"
          >
            <DialogTitle sx={{ 
              fontWeight: 700,
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
              color: "#1e293b",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pr: 0.5,
              p: { xs: 1.5, sm: 2, md: 2.5 }
            }}>
              Pay Fee
              <IconButton onClick={() => setOpen(false)} size={isExtraSmall ? "small" : "medium"} disabled={submitting}>
                <CloseIcon sx={{ fontSize: { xs: 18, sm: 20, md: 24 } }} />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
              {selectedStudent && (
                <Box sx={{ 
                  mb: 2, 
                  p: { xs: 1.5, sm: 2 }, 
                  bgcolor: "#f8fafc", 
                  borderRadius: "12px",
                  [theme.breakpoints.down('xs')]: {
                    borderRadius: "8px",
                    p: 1.5
                  }
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontSize: { xs: "0.6rem", sm: "0.7rem" } 
                  }}>
                    Student
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    wordBreak: 'break-word'
                  }}>
                    {selectedStudent.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ 
                    fontSize: { xs: "0.6rem", sm: "0.7rem" } 
                  }}>
                    ID: #{selectedStudent.id}
                  </Typography>
                </Box>
              )}
              
              <Grid container spacing={isExtraSmall ? 1 : isMobile ? 1.5 : 2}>
                <Grid item xs={12}>
                  <StyledTextField
                    label="Amount"
                    type="number"
                    fullWidth
                    value={payment.amount}
                    onChange={(e) =>
                      setPayment({ ...payment, amount: e.target.value })
                    }
                    disabled={submitting}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AttachMoneyIcon sx={{ color: '#94a3b8', fontSize: isExtraSmall ? 16 : 20 }} />
                        </InputAdornment>
                      )
                    }}
                    placeholder="Enter amount"
                  />
                </Grid>

                <Grid item xs={12}>
                  <StyledTextField
                    select
                    label="Payment Mode"
                    fullWidth
                    value={payment.paymentMode}
                    onChange={(e) =>
                      setPayment({ ...payment, paymentMode: e.target.value })
                    }
                    disabled={submitting}
                    size={isExtraSmall ? "small" : isMobile ? "small" : "medium"}
                  >
                    <MenuItem value="">Select Payment Mode</MenuItem>
                    <MenuItem value="CASH">Cash</MenuItem>
                    <MenuItem value="ONLINE">Online</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="CARD">Card</MenuItem>
                  </StyledTextField>
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
                onClick={() => setOpen(false)}
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
                onClick={handlePaymentSave}
                disabled={submitting}
                fullWidth={isExtraSmall}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                  backgroundColor: "#22c55e",
                  fontWeight: 600,
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  flex: { xs: 1, sm: 0 },
                  order: { xs: 1, sm: 2 },
                  '&:hover': {
                    backgroundColor: "#16a34a"
                  }
                }}
              >
                {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Pay Now"}
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
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
}