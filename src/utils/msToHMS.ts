// https://stackoverflow.com/questions/29816872/how-can-i-convert-milliseconds-to-hhmmss-format-using-javascript
// Convert milliseconds to HH:mm:mmm format

const msToHMS = (ms: number) => {
  // 1- Convert to seconds:
  let seconds = ms / 1000;

  // 2- Extract hours:
  const hours = parseInt(String(seconds / 3600)); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours

  // 3- Extract minutes:
  const minutes = parseInt(String(seconds / 60)); // 60 seconds in 1 minute

  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;

  return `${hours}:${minutes}${seconds}`;
};

export default msToHMS;
