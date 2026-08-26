// src/pages/FeeStructure/FeeStructureManagement.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
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
  IconButton,
  Tooltip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Route as RouteIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import feeStructureApi from "../../api/feeStructureApi";
import busRouteApi from "../../api/busRouteApi";
import academicYearApi from "../../api/academicYearApi";

// ================= STYLED COMPONENTS =================
const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
  width: "100%",
  overflowX: "hidden",
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "1400px",
  margin: "0 auto",
  width: "100%",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
  overflow: "hidden",
}));

const GradientHeader = styled(TableHead)(({ theme }) => ({
  background: "linear-gradient(135deg, #6495ED 0%, #4169E1 100%)",
  '& th': {
    color: "white",
    fontWeight: 600,
    fontSize: "0.7rem",
    letterSpacing: "0.3px",
    padding: "10px 8px",
    whiteSpace: "nowrap",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "background-color 0.2s ease",
  '&:hover': { backgroundColor: "#f8fafc" },
  '&:nth-of-type(even)': { backgroundColor: "#fafbfc" },
  '& td': {
    padding: "8px 10px",
    fontSize: "0.75rem",
    borderBottom: "1px solid #f1f5f9",
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "8px 20px",
  fontWeight: 600,
  textTransform: "none",
  backgroundColor: "#6495ED",
  boxShadow: "0 2px 8px rgba(100, 149, 237, 0.25)",
  '&:hover': { backgroundColor: "#4169E1", transform: "translateY(-1px)" },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: "20px",
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: { margin: "16px", width: "100%", maxHeight: "95vh" },
  },
}));

// ================= MAIN COMPONENT =================
export default function FeeStructureManagement() {
  const [feeStructures, setFeeStructures] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const emptyForm = {
    routeId: "",
    academicYearId: "",
    amountPerMonth: "",
    amountPerYear: "",
    amountPerKm: "",
    dueDate: "",
  };
  const [form, setForm] = useState(emptyForm);

  // ================= LOAD DATA =================
  const loadData = async () => {
    setLoading(true);
    try {
      const [feeData, routesData, yearsData] = await Promise.all([
        feeStructureApi.getAll(),
        busRouteApi.getAll(),
        academicYearApi.getAll(),
      ]);
      setFeeStructures(Array.isArray(feeData) ? feeData : []);
      setRoutes(Array.isArray(routesData) ? routesData : []);
      setAcademicYears(Array.isArray(yearsData) ? yearsData : []);
    } catch (error) {
      console.error("Error loading data:", error);
      showSnackbar("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ================= HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOpen = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setSelectedId(null);
    setOpenDialog(true);
  };

  const handleEditOpen = (fee) => {
    setForm({
      routeId: fee.routeId || "",
      academicYearId: fee.academicYearId || "",
      amountPerMonth: fee.amountPerMonth || "",
      amountPerYear: fee.amountPerYear || "",
      amountPerKm: fee.amountPerKm || "",
      dueDate: fee.dueDate || "",
    });
    setIsEdit(true);
    setSelectedId(fee.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setForm(emptyForm);
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!form.routeId || !form.academicYearId) {
      showSnackbar("Route and Academic Year are required", "warning");
      return;
    }
    if (!form.amountPerMonth && !form.amountPerYear && !form.amountPerKm) {
      showSnackbar("At least one fee amount must be set", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        routeId: Number(form.routeId),
        academicYearId: Number(form.academicYearId),
        amountPerMonth: form.amountPerMonth ? Number(form.amountPerMonth) : null,
        amountPerYear: form.amountPerYear ? Number(form.amountPerYear) : null,
        amountPerKm: form.amountPerKm ? Number(form.amountPerKm) : null,
        dueDate: form.dueDate || null,
      };

      if (isEdit) {
        await feeStructureApi.update(selectedId, payload);
        showSnackbar("Fee structure updated successfully!", "success");
      } else {
        await feeStructureApi.create(payload);
        showSnackbar("Fee structure added successfully!", "success");
      }
      handleCloseDialog();
      await loadData();
    } catch (error) {
      console.error("Error saving fee structure:", error);
      showSnackbar(error.message || "Failed to save", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setSubmitting(true);
    try {
      await feeStructureApi.delete(selectedId);
      showSnackbar("Fee structure deleted successfully!", "success");
      setDeleteDialogOpen(false);
      await loadData();
    } catch (error) {
      console.error("Error deleting fee structure:", error);
      showSnackbar(error.message || "Failed to delete", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getRouteName = (routeId) => {
    const route = routes.find(r => r.id === routeId);
    return route ? route.routeName : "Unknown";
  };

  const getAcademicYearName = (yearId) => {
    const year = academicYears.find(y => y.id === yearId);
    return year ? year.yearName : "Unknown";
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <CircularProgress sx={{ color: "#6495ED" }} />
          </Box>
        </ContentWrapper>
      </PageContainer>
    );
  }

  // ================= RENDER =================
  return (
    <PageContainer>
      <ContentWrapper>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1e293b", display: "flex", alignItems: "center", gap: 1.5 }}>
            <AttachMoneyIcon sx={{ color: "#6495ED", fontSize: 28 }} />
            Fee Structure Management
          </Typography>
          <AddButton variant="contained" startIcon={<AddIcon />} onClick={handleAddOpen}>
            Add Fee Structure
          </AddButton>
        </Box>

        <StyledPaper>
          <TableContainer>
            <Table>
              <GradientHeader>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Route</TableCell>
                  <TableCell>Academic Year</TableCell>
                  <TableCell align="right">Per Month</TableCell>
                  <TableCell align="right">Per Year</TableCell>
                  <TableCell align="right">Per Km</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </GradientHeader>
              <TableBody>
                {feeStructures.length > 0 ? (
                  feeStructures.map((fee) => (
                    <StyledTableRow key={fee.id}>
                      <TableCell>{fee.id}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <RouteIcon sx={{ fontSize: 16, color: "#6495ED" }} />
                          {getRouteName(fee.routeId)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={getAcademicYearName(fee.academicYearId)} size="small" sx={{ bgcolor: "#dbeafe", color: "#6495ED", fontWeight: 500 }} />
                      </TableCell>
                      <TableCell align="right">{fee.amountPerMonth ? `₹${fee.amountPerMonth.toFixed(2)}` : '-'}</TableCell>
                      <TableCell align="right">{fee.amountPerYear ? `₹${fee.amountPerYear.toFixed(2)}` : '-'}</TableCell>
                      <TableCell align="right">{fee.amountPerKm ? `₹${fee.amountPerKm.toFixed(2)}` : '-'}</TableCell>
                      <TableCell>{fee.dueDate ? new Date(fee.dueDate).toLocaleDateString() : '-'}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleEditOpen(fee)} sx={{ color: "#f59e0b" }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => handleDeleteClick(fee.id)} sx={{ color: "#ef4444" }}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">No fee structures added yet</Typography>
                      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddOpen} sx={{ mt: 2 }}>
                        Add your first fee structure
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledPaper>

        {/* Add/Edit Dialog */}
        <StyledDialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {isEdit ? "Edit Fee Structure" : "Add Fee Structure"}
            <IconButton onClick={handleCloseDialog} disabled={submitting}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0 }}>
              <Grid item xs={12}>
                <FormControl fullWidth disabled={submitting}>
                  <InputLabel>Route</InputLabel>
                  <Select name="routeId" value={form.routeId} onChange={handleChange} label="Route">
                    <MenuItem value="">Select Route</MenuItem>
                    {routes.map((r) => (
                      <MenuItem key={r.id} value={r.id}>{r.routeName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth disabled={submitting}>
                  <InputLabel>Academic Year</InputLabel>
                  <Select name="academicYearId" value={form.academicYearId} onChange={handleChange} label="Academic Year">
                    <MenuItem value="">Select Academic Year</MenuItem>
                    {academicYears.map((y) => (
                      <MenuItem key={y.id} value={y.id}>{y.yearName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth label="Per Month (₹)" name="amountPerMonth" type="number"
                  value={form.amountPerMonth} onChange={handleChange} disabled={submitting}
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { step: "0.01", min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth label="Per Year (₹)" name="amountPerYear" type="number"
                  value={form.amountPerYear} onChange={handleChange} disabled={submitting}
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { step: "0.01", min: 0 } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth label="Per Km (₹)" name="amountPerKm" type="number"
                  value={form.amountPerKm} onChange={handleChange} disabled={submitting}
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { step: "0.01", min: 0 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Due Date (Optional)" name="dueDate" type="date"
                  value={form.dueDate} onChange={handleChange} disabled={submitting}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, gap: 1 }}>
            <Button onClick={handleCloseDialog} disabled={submitting} sx={{ color: "#64748b" }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={submitting} sx={{ bgcolor: "#6495ED", "&:hover": { bgcolor: "#4169E1" } }}>
              {submitting ? <CircularProgress size={24} color="inherit" /> : (isEdit ? "Update" : "Save")}
            </Button>
          </DialogActions>
        </StyledDialog>

        {/* Delete Confirmation Dialog */}
        <StyledDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ fontWeight: 700, color: "#dc2626" }}>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this fee structure? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, gap: 1 }}>
            <Button onClick={() => setDeleteDialogOpen(false)} disabled={submitting} sx={{ color: "#64748b" }}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete} disabled={submitting}>
              {submitting ? <CircularProgress size={24} color="inherit" /> : "Yes, Delete"}
            </Button>
          </DialogActions>
        </StyledDialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ContentWrapper>
    </PageContainer>
  );
}