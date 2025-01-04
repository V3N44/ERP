export const formatLogMessage = (message: string, level: "info" | "warn" | "error") => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
};

export const logInfo = (message: string) => {
  console.log(formatLogMessage(message, "info"));
};

export const logWarning = (message: string) => {
  console.warn(formatLogMessage(message, "warn"));
};

export const logError = (error: Error) => {
  console.error(formatLogMessage(error.message, "error"));
};