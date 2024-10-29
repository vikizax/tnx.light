declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        DATABASE_URL: string;
        ENVIRONMENT: "DEV" | "PROD";
        PORT: string;
      }
    }
  }
}
