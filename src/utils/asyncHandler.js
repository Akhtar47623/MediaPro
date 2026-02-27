// Wrapper Function for async functions to handle errors without try-catch blocks in every route handler.

// Using Promises
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .catch(next)
      .catch((error) => next(error));
  };
};

// Using Try Catch
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     req.status(error.code || 500).json({
//       success: false,
//       message: error.message || "Internal Server Error",
//     });
//   }
// };

export { asyncHandler };
