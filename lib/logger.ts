export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, meta ? meta : '');
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, meta ? meta : '');
  },
  error: (message: string, meta?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, meta ? meta : '');
  },
  audit: (action: string, userId: string, meta?: any) => {
    // In production, this should write to a secure audit log or database table
    console.log(`[AUDIT] ${new Date().toISOString()} - ACTION: ${action} | USER: ${userId}`, meta ? meta : '');
  }
};
