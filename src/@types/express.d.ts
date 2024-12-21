import "express";
declare global {
  namespace Express {
    export interface Response {
      logData: {
        responseBody?: string;
        responseHeaders?: string;
        responseMessage?: string;
        responseStatus?: number;
        internalResponse?: string;
        errorMessage?: string | null;
        errorStack?: string | null;
        errorFunction?: string;
      };
      _shouldLog: boolean;
    }
    export interface Request {
      user: User;
    }
  }
}

export {};
