export const handleSuccess = (data?: any) => {
  return {
    isSuccess: true,
    data
  };
};

export const handleError = (error: any) => {
  const message = error.response.data.message;

  return {
    isSuccess: false,
    alertMessage: message
  };
};
