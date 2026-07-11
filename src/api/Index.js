import busApi from './busApi';
import busRouteApi from './busRouteApi';
import busTripApi from './busTripApi';
import conductorApi from './conductorApi';
import driverApi from './driverApi';


export {
  busApi,
  busRouteApi,
  busTripApi,
  conductorApi,
  driverApi,

};

export default {
  bus: busApi,
  busRoute: busRouteApi,
  busTrip: busTripApi,
  conductor: conductorApi,
  driver: driverApi,
  
};