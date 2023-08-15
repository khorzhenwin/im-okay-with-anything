enum ResponseStatusEnum {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  UNKNOWN_ERROR = 520,
}

enum ResponseMessageEnum {
  OK = "OK",
  CREATED = "CREATED",
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export const DEFAULT_RESPONSES = {
  OK: {
    status: ResponseStatusEnum.OK,
    message: ResponseMessageEnum.OK,
  },
  CREATED: {
    status: ResponseStatusEnum.CREATED,
    message: ResponseMessageEnum.CREATED,
  },
  BAD_REQUEST: {
    status: ResponseStatusEnum.BAD_REQUEST,
    message: ResponseMessageEnum.BAD_REQUEST,
  },
  UNAUTHORIZED: {
    status: ResponseStatusEnum.UNAUTHORIZED,
    message: ResponseMessageEnum.UNAUTHORIZED,
  },
  FORBIDDEN: {
    status: ResponseStatusEnum.FORBIDDEN,
    message: ResponseMessageEnum.FORBIDDEN,
  },
  NOT_FOUND: {
    status: ResponseStatusEnum.NOT_FOUND,
    message: ResponseMessageEnum.NOT_FOUND,
  },
  CONFLICT: {
    status: ResponseStatusEnum.CONFLICT,
    message: ResponseMessageEnum.CONFLICT,
  },
  INTERNAL_SERVER_ERROR: {
    status: ResponseStatusEnum.INTERNAL_SERVER_ERROR,
    message: ResponseMessageEnum.INTERNAL_SERVER_ERROR,
  },
  SERVICE_UNAVAILABLE: {
    status: ResponseStatusEnum.SERVICE_UNAVAILABLE,
    message: ResponseMessageEnum.SERVICE_UNAVAILABLE,
  },
  GATEWAY_TIMEOUT: {
    status: ResponseStatusEnum.GATEWAY_TIMEOUT,
    message: ResponseMessageEnum.GATEWAY_TIMEOUT,
  },
  UNKNOWN_ERROR: {
    status: ResponseStatusEnum.UNKNOWN_ERROR,
    message: ResponseMessageEnum.UNKNOWN_ERROR,
  },
};
