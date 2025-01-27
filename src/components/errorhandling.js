const errorHandler = (error, text) => {
  switch (error) {
    case "success":
      return {
        text: text,
        message: "success",
      };
      break;
    case "error":
      return {
        text: text,
        message: "error",
      };
      break;
    case "warning":
      return {
        text: text,
        message: "warning",
      };
      break;
    default:
      break;
  }
};

export default errorHandler;
