// src/api/index.js

// ---- Core APIs ----
import busApi from './busApi';
import busRouteApi from './busRouteApi';
import busTripApi from './busTripApi';
import busLocationApi from './busLocationApi';
import busStopApi from './busStopApi';
import conductorApi from './conductorApi';
import driverApi from './driverApi';
import serviceProviderApi from './serviceProviderApi';

// ---- Student & Academic APIs ----
import studentApi from './studentApi';
import studentFeePaymentApi from './studentFeePaymentApi';
import studentScanApi from './studentScanApi';
import academicYearApi from './academicYearApi';
import classApi from './classApi';
import divisionApi from './divisionApi';
import mediumApi from './mediumApi';

// ---- Dashboard ----
import dashboardApi from './dashboardApi';

// ---- Other (if any) ----
// import busRouteStopApi from './busRouteStopApi'; // if exists

// ------------------------------------------------
// 1. Named exports – for explicit imports
// ------------------------------------------------
export {
  busApi,
  busRouteApi,
  busTripApi,
  busLocationApi,
  busStopApi,
  conductorApi,
  driverApi,
  serviceProviderApi,
  studentApi,
  studentFeePaymentApi,
  studentScanApi,
  academicYearApi,
  classApi,
  divisionApi,
  mediumApi,
  dashboardApi,
};

// ------------------------------------------------
// 2. Default export – grouped object for convenience
// ------------------------------------------------
const api = {
  bus: busApi,
  busRoute: busRouteApi,
  busTrip: busTripApi,
  busLocation: busLocationApi,
  busStop: busStopApi,
  conductor: conductorApi,
  driver: driverApi,
  serviceProvider: serviceProviderApi,
  student: studentApi,
  studentFeePayment: studentFeePaymentApi,
  studentScan: studentScanApi,
  academicYear: academicYearApi,
  class: classApi,
  division: divisionApi,
  medium: mediumApi,
  dashboard: dashboardApi,
};

export default api;