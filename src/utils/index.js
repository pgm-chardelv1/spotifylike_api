/**
 * Utility functions
 */

const handleHTTPError = (error, next) => next(error);

const HTTPError = (message, statusCode) => {
  const e = new Error(message);
  e.statusCode = statusCode;
  return e;
};

export { 
  handleHTTPError,
  HTTPError,
};
