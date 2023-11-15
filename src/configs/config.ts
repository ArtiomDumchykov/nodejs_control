import { config } from "dotenv";

config();

export const configs = {
  PORT: 8080,
  // DB_URL: process.env.DB_URL || "mongodb://localhost:27017/control_okten",
  DB_URL:
    process.env.DB_URL ||
    "mongodb+srv://artemdumchykov:ViEBzS4P2mVC1Dgi@fullstack.tgdhn.mongodb.net/control_okten",

  SECRET_SALT: 10,

  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS || "SECRET_ACCESS_KEY",
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || "SECRET_REFRESH_KEY",

  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY || "AKIAUSDSRM3QSFQRC2U6",
  AWS_S3_SECRET_KEY:
    process.env.AWS_S3_SECRET_KEY || "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",
  AWS_S3_BUKET: process.env.AWS_S3_BUKET || "march-2023-mybucket",
  AWS_S3_REGION: process.env.AWS_S3_REGION || "us-east-1",
  AWS_S3_BUKET_URL:
    process.env.AWS_S3_BUKET_URL ||
    "https://march-2023-mybucket.s3.amazonaws.com/",

  PRIVATE_BANK_API:
    process.env.PRIVATE_BANK_API ||
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
};
