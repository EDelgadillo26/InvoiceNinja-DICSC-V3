import dotenv from 'dotenv';

// Cargar variables de entorno del archivo .env
dotenv.config();

/**
 * Utilidades de entorno para Invoice Ninja
 * Contiene todas las configuraciones, rutas y credenciales necesarias
 */

// Obtener variables de entorno con validación
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Variables de entorno base
export const ENV = {
  INVOICE_NINJA_EMAIL: getEnvVar('INVOICE_NINJA_EMAIL'),
  INVOICE_NINJA_PASSWORD: getEnvVar('INVOICE_NINJA_PASSWORD'),
  INVOICE_NINJA_BASE_URL: getEnvVar('INVOICE_NINJA_BASE_URL'),
};

// Configuración de URLs
export const URLS = {
  base: ENV.INVOICE_NINJA_BASE_URL,
  login: `${ENV.INVOICE_NINJA_BASE_URL}/#/login`,
  dashboard: `${ENV.INVOICE_NINJA_BASE_URL}/#/dashboard`,
  clients: `${ENV.INVOICE_NINJA_BASE_URL}/#/clients`,
  products: `${ENV.INVOICE_NINJA_BASE_URL}/#/products`,
  invoices: `${ENV.INVOICE_NINJA_BASE_URL}/#/invoices`,
  settings: `${ENV.INVOICE_NINJA_BASE_URL}/#/settings`,
};

// Credenciales de usuario
export const USER_CREDENTIALS = {
  email: ENV.INVOICE_NINJA_EMAIL,
  password: ENV.INVOICE_NINJA_PASSWORD,
};

// Función de validación de configuración
export const validateEnvironment = (): void => {
  try {
    // Las validaciones ya se ejecutan en getEnvVar
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    throw error;
  }
};

// Exportar configuración consolidada (para compatibilidad)
export const config = {
  urls: URLS,
  user: USER_CREDENTIALS,
};

// Exportar función de validación con nombre alternativo
export const validateConfig = validateEnvironment;
