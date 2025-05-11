import dayjs from "dayjs";

import { getLocalStoragedata } from "./StorageHelper";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Array of month abbreviations
const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Array of day names
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const formatJoinDate = (dateString) => {
  // Output: Joined on 2024 April 28

  if (dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();

    // Format the date into the desired string
    const formattedDate = `Joined on ${year} ${monthNames[monthIndex]} ${day}`;

    return formattedDate;
  } else {
    return "-";
  }
};

export const formatMonthString = (dateString) => {
  // Output: 2024 AUGUST 8

  if (dateString) {
    // Format the date into the desired string
    const formattedDate = dayjs(dateString).format("DD MMM YYYY");

    return formattedDate;
  } else {
    return "-";
  }
};

export function formatDateWithDayExtension(dateString) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString); // Convert the date string to a Date object
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Function to determine the correct ordinal suffix
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th"; // covers 11th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Format the date as "12th June 2024"
  return `${day}${getDaySuffix(day)} ${month} ${year}`;
}

export const formatMonthShortString = (dateString) => {
  // Output: 2024 AUG 8

  if (dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthAbbreviation = monthNamesShort[monthIndex];
    const day = date.getDate();

    // Format the date into the desired string
    const formattedDate = `${year} ${monthAbbreviation.toUpperCase()} ${day}`;

    return formattedDate;
  } else {
    return "-";
  }
};

export const formatMonthLowerCaseString = (dateString) => {
  // Output:

  if (dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthAbbreviation = monthNames[monthIndex];
    const day = date.getDate();

    // Format the date into the desired string
    const formattedDate = `${year} ${monthAbbreviation} ${day}`;

    return formattedDate;
  } else {
    return "-";
  }
};

export const formatDateString = (dateString) => {
  //8 AUG / THU
  if (dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDay();
    const monthAbbreviation = monthNamesShort[monthIndex];
    const dayAbbreviation = dayNames[dayIndex];

    // Format the date into the desired string
    const formattedDate = `${day} ${monthAbbreviation.toUpperCase()} / ${dayAbbreviation.toUpperCase()}`;

    return formattedDate;
  } else {
    return "-";
  }
};

export const formatDateMonthYear = (dateString) => {
  // Output: 24th May 2024

  if (dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();
    // Add suffix for the day (1st, 2nd, 3rd, etc.)
    const formatDay = day + getDaySuffix(day);

    // Format the date into the desired string
    let formattedDate = `${formatDay} ${monthNames[monthIndex]} ${year}`;

    return formattedDate;
  } else {
    return "-";
  }
};

export const formatDateMonthYearShort = (dateString) => {
  // Output: 24th May 2024

  if (dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();
    // Add suffix for the day (1st, 2nd, 3rd, etc.)
    const formatDay = day + getDaySuffix(day);

    // Format the date into the desired string
    let formattedDate = `${formatDay} ${monthNamesShort[monthIndex]} ${year}`;

    return formattedDate;
  } else {
    return "-";
  }
};

export const formatDate = (dateString) => {
  // Output: 2024/12/01

  if (dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  } else {
    return "-";
  }
};

export const formatTime = (dateString) => {
  // Output: 10:10:10
  if (dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "-"; // Invalid date
    }

    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    // Format the time into the desired string
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedTime;
  } else {
    return "-";
  }
};

export const convertToISOString = (dateString) => {
  // Output: 2024-12-01T10:10:10.000Z
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  // Convert the date to ISO format
  const isoString = date.toISOString();

  return isoString;
};

export const createStartDateTime = (date, time) => {
  let timeZone = getLocalStoragedata("user").timeZone;
  let timeZoneOffset = null;

  const match = timeZone?.match(/\( UTC([+-]\d{2}:\d{2}) \)/);
  if (match) {
    const offset = match[1];
    timeZoneOffset = offset;
  }
  let newDate = dayjs(date).format("YYYY-MM-DD");
  //let newTime = dayjs(time).format("HH:mm");

  return newDate + "T" + time + ":00.000" + timeZoneOffset;
};

export const formatTimeTo24Hour = (dateString) => {
  // Output: 20:10
  if (dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "-"; // Invalid date
    }

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    //const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the time into the desired string
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime; //20:10
  } else {
    return "-";
  }
};

export const formatTimeTo12Hour = (dateString) => {
  // Output: 10:10 AM
  if (dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "-"; // Invalid date
    }

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    //const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedHours = String(hours).padStart(2, "0");

    // Format the time into the desired string
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    return formattedTime; //10:10 AM
  } else {
    return "-";
  }
};

export const formatTimeAmPmTo24Hour = (timeString) => {
  // Input: 10:10 AM
  const [time, modifier] = timeString.split(" ");

  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
};

export const formatMonth = (dateString) => {
  // Output: 2024 MAY

  if (dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthAbbreviation = monthNames[monthIndex];
    // const day = date.getDate();

    // Format the date into the desired string
    const formattedDate = `${year} ${monthAbbreviation.toUpperCase()} `;

    return formattedDate;
  } else {
    return "-";
  }
};
