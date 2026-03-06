const isProd = process.env.NODE_ENV === "production";

export const logger = {
  error(message: string, context?: Record<string, unknown>) {
    if (typeof window === "undefined") {
      console.error(`[ERROR] ${message}`, context ?? "");
    }
  },

  warn(message: string, context?: Record<string, unknown>) {
    if (typeof window === "undefined") {
      console.warn(`[WARN] ${message}`, context ?? "");
    }
  },

  info(message: string, context?: Record<string, unknown>) {
    if (!isProd && typeof window === "undefined") {
      console.info(`[INFO] ${message}`, context ?? "");
    }
  },
};
