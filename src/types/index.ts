export type SuccessResponse<T> = {
  meta: {
    success: boolean;
    message: string;
  };
  payload: T;
};

export type ErrorResponse = {
  meta: {
    success: boolean;
    message: string;
  };
  error: string[];
};
