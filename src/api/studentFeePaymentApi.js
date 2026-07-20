// src/api/studentFeePaymentApi.js
import api from "./axios";

// ============ STUDENT FEE PAYMENT CRUD ============

export const payFee = async (data) => {
  const response = await api.post("/student-fees/pay", data);
  return response.data;
};

export const getFeeHistoryByStudent = async (studentId) => {
  const response = await api.get(`/student-fees/student/${studentId}`);
  return response.data;
};

export const getAllFeePayments = async () => {
  const response = await api.get("/student-fees");
  return response.data;
};

const studentFeePaymentApi = {
  pay: payFee,
  getHistory: getFeeHistoryByStudent,
  getAll: getAllFeePayments,
};

export default studentFeePaymentApi;