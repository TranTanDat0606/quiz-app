/* 
    input: 30
    output: "00:30"
*/

export const formatTime = (number: number) => {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};
