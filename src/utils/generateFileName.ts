/* 
    input: tony
    output: tony_20230915_143205
*/

export const generateFileName = (username: string = "CSV") => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${username}_${year}${month}${day} ${hours}_${minutes}_${seconds}`;
};
