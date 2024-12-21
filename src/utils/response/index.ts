import { Request, Response } from "express";
import { ZodError } from "zod";
import { GenericObject } from "../../types";
import { serverLog } from "../logs";

export type ResHandlerObj<T> = {
  req?: Request;
  res: Response;
  code: number;
  success?: boolean;
  payload?: T;
  callee: string;
  message?: string;
  error?: Error | null;
  responseErrors?: GenericObject[];
};

export function defaultErrorHandler(
  res: Response,
  e: Error | ZodError | unknown,
  callee: string
): void {
  if (e instanceof ZodError) {
    let errorsString = "";
    const zodFormErrors = e.flatten().formErrors; // these are the top level errors ... i.e. expected an object and got an array
    const zodFieldErrors = e.flatten().fieldErrors; // these are the property errors ... i.e. one field on object is wrong type

    if (zodFormErrors?.length) [errorsString] = zodFormErrors;
    else if (Object.keys(zodFieldErrors).length) {
      for (const key in zodFieldErrors) {
        if (zodFieldErrors[key]) {
          const message =
            zodFieldErrors[key]?.[0] === "Required"
              ? `Missing required field '${key}'` // gives a better error message than just 'Required'
              : `Validation failed for field '${key}':  ${zodFieldErrors[key]?.[0]}.`;
          errorsString += message;
          break;
        }
      }
    }
    return createBadRequest(res, errorsString, callee);
  }
  return createInternalServerError(
    res,
    e instanceof Error ? e.message : "Internal-Server-Error",
    e as Error,
    callee
  );
}

function _sendResponse<T = void>({
  res,
  code,
  success,
  callee,
  message,
  payload,
  error,
}: ResHandlerObj<T>): void {
  return resHandler({
    res,
    code,
    success,
    message,
    callee,
    payload,
    error,
  });
}

export function createCustom<T = void>(
  res: Response,
  code: number,
  message: string,
  callee: string,
  payload: T
) {
  return _sendResponse({ res, code, success: false, message, callee, payload });
}

// this is for when a resource is returned, such as a GET request or when a resource successfully completes a DELETE request
export function createSuccess<T = void>(
  res: Response,
  message: string,
  payload: T,
  callee: string
) {
  return _sendResponse({
    res,
    code: 200,
    success: true,
    message,
    callee,
    payload,
  });
}

// this is for when a resource is created, such as a POST request
export function createCreated<T = void>(
  res: Response,
  message: string,
  payload: T,
  callee: string
) {
  return _sendResponse({
    res,
    code: 201,
    success: true,
    message,
    callee,
    payload,
  });
}

// This is for changes, such as a PATCH request
export function createAccepted<T = void>(
  res: Response,
  message: string,
  payload: T,
  callee: string
) {
  return _sendResponse({
    res,
    code: 202,
    success: true,
    message,
    callee,
    payload,
  });
}

// This is for when a GET request is performed on a resource that does not exist
export function createNoContent(
  res: Response,
  message: string,
  callee: string
) {
  return _sendResponse({
    res,
    code: 204,
    success: true,
    message,
    callee,
    payload: null,
  });
}

// This is for when a request was redirected
export function createRedirect(res: Response, message: string, callee: string) {
  return _sendResponse({
    res,
    code: 302,
    success: true,
    message,
    callee,
    payload: null,
  });
}

// This is for when a request was made without the required parameters
export function createMissingField(
  res: Response,
  field: string,
  callee: string
) {
  return _sendResponse({
    res,
    code: 400,
    success: false,
    payload: { error: "Missing-Required-Fields" },
    message: `Missing required field(s): ${field}`,
    callee,
  });
}

const resHandler = (h: ResHandlerObj<unknown | null>) => {
  h.res.logData = h.res.logData || {};
  h.res.logData.responseBody = JSON.stringify(h.payload);
  h.res.logData.responseHeaders = JSON.stringify(h.res.getHeaders());
  h.res.logData.responseMessage = h.message ? h.message : "";
  h.res.logData.responseStatus = h.code;
  if (h.error) {
    h.res.logData.internalResponse = h.error.message;
  } else {
    h.res.logData.internalResponse = JSON.stringify(h.payload);
  }
  if (!h.res.headersSent) {
    h.res
      .status(h.code)
      .json({ message: h.message, payload: h.payload, success: h.success });
  }
  if (!h.success) {
    if (h.error instanceof Error) {
      h.res.logData.errorMessage = h.error.message;
      h.res.logData.errorStack = h.error.stack;
    } else {
      h.res.logData.errorMessage = h.message;
      h.res.logData.errorStack = null;
    }
    h.res.logData.errorFunction = h.callee;
  }
  if (!h.success && process.env.NODE_ENV === "development") {
    serverLog("\nSERVER ERROR\n");
    if (h.error instanceof Error) serverLog(h.error);
    else serverLog(h.message, h.callee);
  }
};

// This is for when a request was made with valid parameters (according to our schema) but something in the request was invalid.
export function createBadRequest(
  res: Response,
  message: string,
  callee: string
) {
  return _sendResponse({
    res,
    code: 400,
    success: false,
    message,
    callee,
    payload: null,
  });
}
// This is when a request is made with duplcate data
export function createDuplicate(
  res: Response,
  message: string,
  callee: string
) {
  return _sendResponse({
    res,
    code: 409,
    success: false,
    message,
    callee,
    payload: null,
  });
}

// This is when a request is made without the required tokens
export function createUnauthenticated<T = void>(
  res: Response,
  callee: string,
  message?: string,
  payload?: T
) {
  return _sendResponse({
    res,
    code: 401,
    success: false,
    callee,
    message,
    payload,
  });
}

// This is when a request is made with the required tokens but the user does not have the required permissions
export function createUnauthorized(
  res: Response,
  message: string,
  callee: string
) {
  return _sendResponse({
    res,
    code: 403,
    success: false,
    message,
    callee,
    payload: null,
  });
}

// This is for when a route does not exist
export function createNotFound(res: Response, message: string, callee: string) {
  return _sendResponse({
    res,
    code: 404,
    success: false,
    message,
    callee,
    payload: null,
  });
}

// This is for when a File is too large or the request Json is too large
export function createRequestEntityTooLarge(
  res: Response,
  message: string,
  callee: string
) {
  return _sendResponse({
    res,
    code: 413,
    success: false,
    message,
    callee,
    payload: null,
  });
}

// this is the return response for when something went wrong internally
export function createInternalServerError(
  res: Response,
  message: string,
  error: Error,
  callee: string
) {
  return _sendResponse({
    res,
    code: 500,
    success: false,
    message,
    callee,
    payload: {},
    error,
  });
}

// this is the return response for when something is not implemented
export function createNotImplemented(res: Response, callee: string) {
  return _sendResponse({
    res,
    code: 501,
    success: false,
    message: "Not Implemented",
    callee,
    payload: {},
  });
}
