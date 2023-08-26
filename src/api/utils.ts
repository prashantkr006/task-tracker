export const handleResponse = (response: any) => {
  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Request failed");
};

export const ResponseStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const ResponseMessages = {
  [ResponseStatus.OK]: "Request successful",
  [ResponseStatus.CREATED]: "Resource created",
  [ResponseStatus.NO_CONTENT]: "No content",
  [ResponseStatus.BAD_REQUEST]: "Bad request",
  [ResponseStatus.UNAUTHORIZED]: "Unauthorized",
  [ResponseStatus.FORBIDDEN]: "Forbidden",
  [ResponseStatus.NOT_FOUND]: "Resource not found",
  [ResponseStatus.INTERNAL_SERVER_ERROR]: "Internal server error",
};

export const isSuccessStatus = (status: number) =>
  status >= 200 && status < 300;
