export default function getFormattedDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
    new Date(dateString)
  );
}

// export default function getFormattedDate(dateString: string): string {
//   if (!dateString) {
//     throw new Error("Invalid date string: " + dateString);
//   }

//   let date;
//   if (isNaN(Number(dateString))) {
//     date = new Date(dateString);
//   } else {
//     date = new Date(parseInt(dateString));
//   }

//   if (isNaN(date.getTime())) {
//     throw new Error("Invalid date string: " + dateString);
//   }

//   return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(date);
// }
