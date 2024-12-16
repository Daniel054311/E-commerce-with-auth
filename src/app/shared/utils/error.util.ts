

  interface ErrorResponse {
    error?: string | { message?: string };
    message?: string;
  }

  export const getErrorMessage = (error: ErrorResponse): string => {
    if (error.error && typeof error.error === 'string') {
      return error.error;
    } else if (error.error && typeof error.error === 'object' && error.error.message) {
      return error.error.message;
    }
    else if (error.message) {
      return error.message;
    } else {
      return 'An unknown error occurred.';
    }
  };


