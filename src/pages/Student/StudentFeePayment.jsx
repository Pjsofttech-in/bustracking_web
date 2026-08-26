// src/pages/Student/StudentFeePayment.jsx
import React, { useState, useEffect, useMemo } from "react";
import studentFeePaymentApi from "../../api/studentFeePaymentApi";
import academicYearApi from "../../api/academicYearApi";
import studentApi from "../../api/studentApi";
import busRouteApi from "../../api/busRouteApi";
import feeStructureApi from "../../api/feeStructureApi";
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
  TableContainer as MuiTableContainer,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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

const StyledTableContainer = styled(MuiTableContainer)(({ theme }) => ({
  maxHeight: "calc(100vh - 400px)",
  minHeight: "300px",
  width: "100%",
  '&::-webkit-scrollbar': { width: '6px', height: '6px' },
  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f5f9', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#cbd5e1', borderRadius: '4px', '&:hover': { backgroundColor: '#94a3b8' } },
  scrollBehavior: "smooth",
  [theme.breakpoints.down('md')]: { maxHeight: "calc(100vh - 380px)", minHeight: "250px" },
  [theme.breakpoints.down('sm')]: { maxHeight: "calc(100vh - 350px)", minHeight: "200px" },
  [theme.breakpoints.down('xs')]: { maxHeight: "calc(100vh - 320px)", minHeight: "150px", '&::-webkit-scrollbar': { width: '4px', height: '4px' } },
  '@media (max-width: 380px)': { maxHeight: "calc(100vh - 300px)", minHeight: "120px" }
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

const MobileCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  transition: "all 0.2s ease",
  width: "100%",
  '&:hover': { borderColor: "#6495ED", boxShadow: "0 4px 12px rgba(100, 149, 237, 0.08)" },
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

const PayButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  textTransform: "none",
  fontWeight: 600,
  padding: "4px 12px",
  fontSize: "0.7rem",
  backgroundColor: "#22c55e",
  '&:hover': { backgroundColor: "#16a34a" },
  [theme.breakpoints.down('sm')]: { padding: "3px 8px", fontSize: "0.6rem" },
  [theme.breakpoints.down('xs')]: { padding: "2px 6px", fontSize: "0.55rem" }
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
    '&.paid .num': { color: "#22c55e" },
    '&.pending .num': { color: "#dc2626" },
    '&.rate .num': { color: "#6495ED" },
  }
}));

// ================= MAIN COMPONENT =================
export default function StudentFeePayment() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isExtraSmall = useMediaQuery('(max-width: 380px)');

  const [students, setStudents] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [routes, setRoutes] = useState([]);
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

  // ---- FILTER STATE ----
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterRouteId, setFilterRouteId] = useState('');
  const [filterRouteName, setFilterRouteName] = useState('');

  // ================= LOAD DATA =================
  useEffect(() => {
    loadAcademicYears();
    loadRoutes();
    loadStudents();
  }, []);

  const loadAcademicYears = async () => {
    try {
      const data = await academicYearApi.getAll();
      setAcademicYears(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading academic years:", error);
      showSnackbar("Failed to load academic years", "error");
      setAcademicYears([]);
    }
  };

  const loadRoutes = async () => {
    try {
      const data = await busRouteApi.getAll();
      setRoutes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading routes:", error);
      setRoutes([]);
    }
  };

  const getCurrentAcademicYear = () => {
    const year = new Date().getFullYear();
    return `${year}-${year+1}`;
  };

  const loadStudents = async (year) => {
    setLoading(true);
    try {
      const studentsData = await studentApi.getAll();
      const studentsArray = Array.isArray(studentsData) ? studentsData : [];

      const yearToUse = year || selectedYear || getCurrentAcademicYear();
      let feeStructures = [];
      try {
        const response = await feeStructureApi.getByAcademicYear(yearToUse);
        // Ensure it's an array
        feeStructures = Array.isArray(response) ? response : [];
      } catch (e) {
        console.warn("No fee structures found for year", yearToUse, e);
        feeStructures = [];
      }

      // For each student, compute fee based on route
      const studentsWithFee = studentsArray.map(student => {
        const routeId = student.routeId;
        const feeStructure = feeStructures.find(fs => fs.routeId === routeId);
        const feeAmount = feeStructure ? feeStructure.amount : 0;

        // In production, you would fetch total paid from studentFeePaymentApi
        // For now, we simulate based on random (UI demonstration)
        // Replace with actual API call when backend is ready.
        const totalPaid = Math.random() > 0.6 ? feeAmount : 0;
        const balance = feeAmount - totalPaid;
        const status = balance <= 0 ? "PAID" : "PENDING";

        return {
          ...student,
          routeName: student.routeName || '',
          feeAmount: feeAmount,
          totalPaid: totalPaid,
          balance: balance,
          feeStatus: status,
        };
      });

      setStudents(studentsWithFee);
    } catch (error) {
      console.error("Error loading students:", error);
      showSnackbar("Failed to load students", "error");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= FILTERS =================
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    loadStudents(year);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterStatus('');
    setFilterAction('');
    setFilterRouteId('');
    setFilterRouteName('');
  };

  // ================= FILTERED DATA =================
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === '' || student.feeStatus === filterStatus;
      const matchesAction = filterAction === '' ||
        (filterAction === 'Action Required' && student.feeStatus === 'PENDING') ||
        (filterAction === 'Completed' && student.feeStatus === 'PAID');
      const matchesRouteId = filterRouteId === '' || String(student.routeId).includes(filterRouteId);
      const matchesRouteName = filterRouteName === '' || (student.routeName && student.routeName.toLowerCase().includes(filterRouteName.toLowerCase()));

      return matchesSearch && matchesStatus && matchesAction && matchesRouteId && matchesRouteName;
    });
  }, [students, searchQuery, filterStatus, filterAction, filterRouteId, filterRouteName]);

  // ================= OPEN PAYMENT =================
  const handlePayClick = (student) => {
    setSelectedStudent(student);
    setPayment({
      amount: student.feeAmount || "",
      paymentMode: "",
    });
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

      await studentFeePaymentApi.pay(payload);
      showSnackbar(`Payment of ₹${payment.amount} successful!`, "success");
      setOpen(false);
      await loadStudents(selectedYear);
    } catch (error) {
      console.error("Payment error:", error);
      showSnackbar(error.message || "Payment failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const totalStudents = students.length;
  const paidStudents = students.filter(s => s.feeStatus === "PAID").length;
  const pendingStudents = students.filter(s => s.feeStatus === "PENDING").length;
  const collectionRate = totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0;

  if (loading && students.length === 0) {
    return (
      <PageContainer>
        <MainContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh", flexDirection: "column", gap: 2 }}>
            <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
            <Typography variant="body2" color="text.secondary">Loading fee data...</Typography>
          </Box>
        </MainContent>
      </PageContainer>
    );
  }

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
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexWrap: 'wrap',
              gap: { xs: 1, sm: 2 },
              flex: 1
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
                  sx={{ mt: 0.25, fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.875rem" } }}
                >
                  Manage student fee payments
                </Typography>
              </Box>
              <InlineStats>
                <span className="stat-chip">Total <span className="num">{totalStudents}</span></span>
                <span className="stat-chip paid">Paid <span className="num">{paidStudents}</span></span>
                <span className="stat-chip pending">Pending <span className="num">{pendingStudents}</span></span>
                <span className="stat-chip rate">Rate <span className="num">{collectionRate}%</span></span>
              </InlineStats>
            </Box>
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
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#94a3b8', fontSize: 20 }} />
                  </InputAdornment>
                ),
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

          {/* Filter Bar */}
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
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '150px' }, flex: 1 }}>
              <InputLabel>Academic Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                input={<OutlinedInput label="Academic Year" />}
              >
                <MenuItem value="">All Years</MenuItem>
                {academicYears.map((a) => (
                  <MenuItem key={a.id} value={a.yearName}>{a.yearName}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '130px' }, flex: 1 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                input={<OutlinedInput label="Status" />}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="PAID">Paid</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: '150px' }, flex: 1 }}>
              <InputLabel>Action</InputLabel>
              <Select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                input={<OutlinedInput label="Action" />}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Action Required">Action Required</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>

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
              variant="text"
              onClick={clearFilters}
              size="small"
              sx={{
                color: '#64748b',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': { backgroundColor: 'transparent', color: '#1e293b' }
              }}
              startIcon={<ClearIcon sx={{ fontSize: 18 }} />}
            >
              Clear
            </Button>
          </Box>

          {/* Table/List */}
          <StyledPaper>
            {loading ? (
              <Box display="flex" justifyContent="center" p={5}>
                <CircularProgress size={isExtraSmall ? 30 : 40} sx={{ color: "#6495ED" }} />
              </Box>
            ) : (
              isDesktop ? (
                <StyledTableContainer>
                  <Table stickyHeader size={isExtraSmall ? "small" : "medium"}>
                    <GradientHeader>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Route ID</TableCell>
                        <TableCell>Route Name</TableCell>
                        <TableCell align="right">Fee Amount</TableCell>
                        <TableCell align="right">Paid</TableCell>
                        <TableCell align="right">Balance</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </GradientHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((s) => (
                          <StyledTableRow key={s.id}>
                            <TableCell>{s.id}</TableCell>
                            <TableCell>
                              <Typography sx={{
                                fontWeight: 500,
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                                wordBreak: 'break-word'
                              }}>
                                {s.name}
                              </Typography>
                            </TableCell>
                            <TableCell>{s.routeId || '-'}</TableCell>
                            <TableCell>{s.routeName || '-'}</TableCell>
                            <TableCell align="right">₹{s.feeAmount?.toFixed(2) || '0.00'}</TableCell>
                            <TableCell align="right">₹{s.totalPaid?.toFixed(2) || '0.00'}</TableCell>
                            <TableCell align="right">₹{s.balance?.toFixed(2) || '0.00'}</TableCell>
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
                              {s.feeStatus === "PENDING" ? (
                                <PayButton
                                  variant="contained"
                                  startIcon={<PaymentIcon sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} />}
                                  onClick={() => handlePayClick(s)}
                                  disabled={submitting}
                                  size={isExtraSmall ? "small" : "medium"}
                                >
                                  Pay Now
                                </PayButton>
                              ) : (
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
                          <TableCell colSpan={9} align="center" sx={{ py: { xs: 3, sm: 4, md: 6 } }}>
                            <PaymentIcon sx={{ fontSize: { xs: 30, sm: 40 }, display: "block", margin: "0 auto 8px", opacity: 0.3 }} />
                            <Typography variant="body1" color="text.secondary">
                              {students.length === 0 ? "No students found" : "No students match your filters"}
                            </Typography>
                            {students.length === 0 && (
                              <Typography variant="body2" color="text.secondary">
                                Select an academic year to view students
                              </Typography>
                            )}
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
                          <MobileCard>
                            <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 }, '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } } }}>
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 0.5 }}>
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.6rem", sm: "0.7rem" }, fontWeight: 500, letterSpacing: "0.5px" }}>
                                    Student #{s.id}
                                  </Typography>
                                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" }, mt: 0.25, wordBreak: 'break-word' }}>
                                    {s.name}
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                                    <Typography variant="caption" sx={{ fontSize: '0.55rem', color: '#64748b' }}>
                                      Route: {s.routeName || 'N/A'} (ID: {s.routeId || '-'})
                                    </Typography>
                                  </Box>
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
                              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: { xs: 1, sm: 1.5 }, mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Fee Amount</Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>₹{s.feeAmount?.toFixed(2) || '0.00'}</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Paid</Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>₹{s.totalPaid?.toFixed(2) || '0.00'}</Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Balance</Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>₹{s.balance?.toFixed(2) || '0.00'}</Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9", flexWrap: "wrap", gap: 0.5 }}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Student ID</Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>#{s.id}</Typography>
                                </Box>
                                <Box>
                                  {s.feeStatus === "PENDING" ? (
                                    <PayButton
                                      variant="contained"
                                      startIcon={<PaymentIcon sx={{ fontSize: { xs: 12, sm: 14 } }} />}
                                      onClick={() => handlePayClick(s)}
                                      disabled={submitting}
                                      size={isExtraSmall ? "small" : "medium"}
                                    >
                                      Pay Now
                                    </PayButton>
                                  ) : (
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
                        <Typography variant="body1" color="text.secondary">
                          {students.length === 0 ? "No students found" : "No students match your filters"}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Box>
              )
            )}
          </StyledPaper>

          {/* Payment Dialog */}
          <StyledDialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
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
                <Box sx={{ mb: 2, p: { xs: 1.5, sm: 2 }, bgcolor: "#f8fafc", borderRadius: "12px" }}>
                  <Typography variant="caption" color="text.secondary">Student</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "0.9rem", sm: "1rem" }, wordBreak: 'break-word' }}>
                    {selectedStudent.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Route: {selectedStudent.routeName || 'N/A'} | Fee: ₹{selectedStudent.feeAmount?.toFixed(2) || '0.00'}
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
                    onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
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
                    onChange={(e) => setPayment({ ...payment, paymentMode: e.target.value })}
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
              <Button onClick={() => setOpen(false)} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", color: "#64748b", fontSize: { xs: '0.8rem', sm: '0.875rem' }, '&:hover': { backgroundColor: "#f1f5f9" }, flex: { xs: 1, sm: 0 }, order: { xs: 2, sm: 1 } }}>Cancel</Button>
              <Button variant="contained" onClick={handlePaymentSave} disabled={submitting} fullWidth={isExtraSmall} sx={{ textTransform: "none", borderRadius: "10px", backgroundColor: "#22c55e", fontWeight: 600, px: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' }, flex: { xs: 1, sm: 0 }, order: { xs: 1, sm: 2 }, '&:hover': { backgroundColor: "#16a34a" } }}>
                {submitting ? <CircularProgress size={isExtraSmall ? 20 : 24} color="inherit" /> : "Pay Now"}
              </Button>
            </DialogActions>
          </StyledDialog>

          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
            <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%', borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", fontSize: { xs: '0.75rem', sm: '0.875rem' }, '& .MuiAlert-icon': { fontSize: { xs: '18px', sm: '22px' } } }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
}