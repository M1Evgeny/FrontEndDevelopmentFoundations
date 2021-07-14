class CustomError extends Error {}

function triggerCustomError(message) {
  throw new CustomError(message);
}

try {
  triggerCustomError('Custom Error, Something went wrong!');
} catch (err) {
  console.log(err);
  console.log(`message ${err.message}`);
} finally {
  console.log('Finall block');
}
