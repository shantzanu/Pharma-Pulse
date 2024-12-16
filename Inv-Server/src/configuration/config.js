import env from "dotenv";
env.config();

export const CONSTANTS = {
  port: process.env.PORT,
  logLevel: process.env.LOG_LEVEL,
  sessionSecret: process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGORITHM,
  domainUrl: process.env.DOMAIN_URL,
  reqURL: process.env.REQ_URL,
  jwtTimeoutDuration: process.env.JWT_TIMEOUT_DURATION,
  devDataBaseUrl: process.env.DEV_DATABASE_URL,
  prodDatabaseUrl: process.env.PROD_DATABASE_URL,
  nodeMailerTransporterOptions: {
    // service: process.env.EMAIL_SERVICE,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      // name: process.env.EMAIL_USER,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  },
};

export const DIR = ["./src/assets/productImages"];
