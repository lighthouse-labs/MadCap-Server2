export const generateRandomString = function () {
  let poschar =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 9; i++) {
    result += poschar.charAt(Math.floor(Math.random() * poschar.length));
  }
  return result;
};