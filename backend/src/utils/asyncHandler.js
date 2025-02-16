// src/utils/asyncHandler.js
const asyncHandler = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  
  export default asyncHandler;
  