const config = {
  // API Configuration
  api: {
    // Default timeout for API calls
    timeout: 10000,
    // Maximum number of retries for failed requests
    maxRetries: 2,
    // Delay between retries in milliseconds
    retryDelay: 1000,
  },
  
  // Environment specific settings
  env: {
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  },
  
  // Default API endpoints
  endpoints: {
    default: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
    // Add other endpoints here if needed
  },
  
  // Authentication
  auth: {
    tokenKey: 'auth_token',
    userKey: 'user_data',
    tokenRefreshThreshold: 300000, // 5 minutes in milliseconds
  },
  
  // Feature flags
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    enableErrorReporting: process.env.REACT_APP_ENABLE_ERROR_REPORTING === 'true',
  },
};

export default config;
