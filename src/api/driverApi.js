const API_BASE_URL = "https://pjsofttech.in:9090/driver";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'An error occurred');
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
};

// Helper function to format date for API
const formatDateForApi = (dateString) => {
  if (!dateString) return null;
  return dateString;
};

// Helper function to convert form data to API request DTO
const convertToRequestDTO = (formData, includePassword = true) => {
  const dto = {
    name: formData.name?.trim() || "",
    phone: formData.phone?.trim() || "",
    email: formData.email?.trim() || "",
    employeeId: formData.employeeId?.trim() || "",
    licenseNumber: formData.licenseNumber?.trim() || "",
    licenseType: formData.licenseType || "",
    licensePhoto: formData.licensePhoto || null,
    driverPhoto: formData.driverPhoto || null,
    licenseExpiryDate: formatDateForApi(formData.licenseExpiryDate),
    experienceYears: parseInt(formData.experienceYears) || 0,
    status: formData.status || "",
    joiningDate: formatDateForApi(formData.joiningDate),
    terminateDate: formatDateForApi(formData.terminatedDate),
    houseNo: formData.houseNo || "",
    street: formData.street || "",
    city: formData.city || "",
    state: formData.state || "",
    pincode: formData.pincode || ""
  };

  if (includePassword && formData.password && formData.password.length > 0) {
    dto.password = formData.password;
  }

  return dto;
};

// Helper function to convert API response to form data
const convertToFormData = (apiResponse) => {
  return {
    id: apiResponse.id || null,
    name: apiResponse.name || "",
    phone: apiResponse.phone || "",
    email: apiResponse.email || "",
    password: "",
    employeeId: apiResponse.employeeId || "",
    licenseNumber: apiResponse.licenseNumber || "",
    licenseType: apiResponse.licenseType || "",
    licensePhoto: apiResponse.licensePhoto || null,
    driverPhoto: apiResponse.driverPhoto || null,
    licenseExpiryDate: apiResponse.licenseExpiryDate || "",
    experienceYears: apiResponse.experienceYears || "",
    status: apiResponse.status || "",
    joiningDate: apiResponse.joiningDate || "",
    terminatedDate: apiResponse.terminateDate || "",
    houseNo: apiResponse.houseNo || "",
    street: apiResponse.street || "",
    city: apiResponse.city || "",
    state: apiResponse.state || "",
    pincode: apiResponse.pincode || ""
  };
};

export const driverApi = {
  // GET ALL DRIVERS
  getAllDrivers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await handleResponse(response);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching drivers:', error);
      throw error;
    }
  },

  // GET DRIVER BY ID
  getDriverById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await handleResponse(response);
      return convertToFormData(data);
    } catch (error) {
      console.error(`Error fetching driver ${id}:`, error);
      throw error;
    }
  },

  // CREATE DRIVER
  createDriver: async (formData) => {
    try {
      // Handle file uploads - convert to base64 or use FormData
      const requestDTO = convertToRequestDTO(formData, true);
      
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestDTO),
      });
      
      const data = await handleResponse(response);
      return convertToFormData(data);
    } catch (error) {
      console.error('Error creating driver:', error);
      throw error;
    }
  },

  // UPDATE DRIVER
  updateDriver: async (id, formData) => {
    try {
      const requestDTO = convertToRequestDTO(formData, false);
      
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestDTO),
      });
      
      const data = await handleResponse(response);
      return convertToFormData(data);
    } catch (error) {
      console.error(`Error updating driver ${id}:`, error);
      throw error;
    }
  },

  // DELETE DRIVER
  deleteDriver: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error deleting driver ${id}:`, error);
      throw error;
    }
  },

  // DRIVER LOGIN
  login: async (employeeId, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: employeeId,
          password: password
        }),
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  },

  // SEARCH DRIVERS
  searchDrivers: async (query) => {
    try {
      const allDrivers = await driverApi.getAllDrivers();
      if (!query || query.trim().length === 0) {
        return allDrivers;
      }
      const term = query.toLowerCase().trim();
      return allDrivers.filter(driver =>
        driver.name?.toLowerCase().includes(term) ||
        driver.phone?.includes(term) ||
        driver.email?.toLowerCase().includes(term) ||
        driver.employeeId?.toLowerCase().includes(term) ||
        driver.city?.toLowerCase().includes(term) ||
        driver.status?.toLowerCase().includes(term)
      );
    } catch (error) {
      console.error('Error searching drivers:', error);
      throw error;
    }
  },

  // GET DRIVERS BY STATUS
  getDriversByStatus: async (status) => {
    try {
      const allDrivers = await driverApi.getAllDrivers();
      return allDrivers.filter(driver => driver.status === status);
    } catch (error) {
      console.error(`Error fetching drivers by status ${status}:`, error);
      throw error;
    }
  },

  // GET DRIVER STATISTICS
  getDriverStats: async () => {
    try {
      const allDrivers = await driverApi.getAllDrivers();
      return {
        total: allDrivers.length,
        active: allDrivers.filter(d => d.status === 'Join').length,
        suspended: allDrivers.filter(d => d.status === 'Suspended').length,
        terminated: allDrivers.filter(d => d.status === 'Terminated').length,
        byLicenseType: allDrivers.reduce((acc, driver) => {
          const type = driver.licenseType || 'Not Specified';
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {}),
        byCity: allDrivers.reduce((acc, driver) => {
          const city = driver.city || 'Unknown';
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }, {})
      };
    } catch (error) {
      console.error('Error fetching driver statistics:', error);
      throw error;
    }
  },

  // UPLOAD DRIVER PHOTO
  uploadDriverPhoto: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);
      
      const response = await fetch(`${API_BASE_URL}/upload-photo/${id}`, {
        method: 'POST',
        body: formData,
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error uploading driver photo:', error);
      throw error;
    }
  },

  // UPLOAD LICENSE PHOTO
  uploadLicensePhoto: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('licensePhoto', file);
      
      const response = await fetch(`${API_BASE_URL}/upload-license/${id}`, {
        method: 'POST',
        body: formData,
      });
      
      return await handleResponse(response);
    } catch (error) {
      console.error('Error uploading license photo:', error);
      throw error;
    }
  }
};

export default driverApi;