/**
 * Environment Configuration
 * Load environment variables with type safety
 */

interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: number;
  FIREBASE_API_KEY: string;
  FIREBASE_AUTH_DOMAIN: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_STORAGE_BUCKET: string;
  FIREBASE_MESSAGING_SENDER_ID: string;
  FIREBASE_APP_ID: string;
  ENV: 'development' | 'staging' | 'production';
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}

// Get environment variables (from .env file or system env)
const getEnvVariable = (key: string, defaultValue?: string): string => {
  // In React Native, you typically use react-native-dotenv
  // For now, using a basic approach
  const value = process.env[`REACT_APP_${key}`] || defaultValue;
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} not found`);
  }
  return value || '';
};

export const envConfig: EnvConfig = {
  API_BASE_URL: getEnvVariable(
    'API_BASE_URL',
    'http://localhost:3000/api'
  ),
  API_TIMEOUT: parseInt(getEnvVariable('API_TIMEOUT', '30000'), 10),
  FIREBASE_API_KEY: getEnvVariable('FIREBASE_API_KEY', ''),
  FIREBASE_AUTH_DOMAIN: getEnvVariable('FIREBASE_AUTH_DOMAIN', ''),
  FIREBASE_PROJECT_ID: getEnvVariable('FIREBASE_PROJECT_ID', ''),
  FIREBASE_STORAGE_BUCKET: getEnvVariable('FIREBASE_STORAGE_BUCKET', ''),
  FIREBASE_MESSAGING_SENDER_ID: getEnvVariable(
    'FIREBASE_MESSAGING_SENDER_ID',
    ''
  ),
  FIREBASE_APP_ID: getEnvVariable('FIREBASE_APP_ID', ''),
  ENV: (getEnvVariable('ENV', 'development') as any) || 'development',
  LOG_LEVEL: (getEnvVariable('LOG_LEVEL', 'info') as any) || 'info',
};

// Validate critical config in production
if (envConfig.ENV === 'production') {
  const requiredKeys: (keyof EnvConfig)[] = [
    'API_BASE_URL',
    'FIREBASE_API_KEY',
    'FIREBASE_PROJECT_ID',
  ];

  requiredKeys.forEach((key) => {
    if (!envConfig[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}

export default envConfig;
