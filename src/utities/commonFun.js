export const getDay = (timeStamp) => {
  const date = new Date(timeStamp);
  const dayOfWeek = date.getDay();
  // Convert the day to a name if needed
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[dayOfWeek];
  return dayName;
};

export const getDate = (timeStamp) => {
  const date = new Date(timeStamp);

  // Get the day, month, and year
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based (0 = January), so we add 1
  const year = date.getFullYear();

  // Format the date as DD-MM-YYYY
  const formattedDate = `${dayOfMonth < 10 ? "0" : ""}${dayOfMonth}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;
  return formattedDate;
};

export const getTime = (timeStamp) => {
  const date = new Date(timeStamp);
  if (!timeStamp) return "waiting";
  // Get the hours, minutes, and seconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Determine AM/PM
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour format
  let hours12 = hours % 12;
  hours12 = hours12 === 0 ? 12 : hours12; // Convert 0 to 12 for 12-hour clock

  // Format the time as hh:mm:ss AM/PM
  //   const formattedTime = `${hours12 < 10 ? "0" : ""}${hours12}:${
  //     minutes < 10 ? "0" : ""
  //   }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${amPm}`;

  const formattedTime = `${hours12 < 10 ? "0" : ""}${hours12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${amPm}`;

  return formattedTime;
};
