export default function getFormattedDateTime(seconds: number) {
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the date and time as YYYY-MM-DD HH:MM. Pad single digits with leading zeros
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
