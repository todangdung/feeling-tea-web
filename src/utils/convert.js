// function convertTimestamp(timestamp) {
//   const date = new Date(timestamp > 9999999999 ? timestamp : timestamp * 1000);

//   const options = {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   };

//   const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
//   return formattedDate;
// }

function getCurrentTimestamp() {
  // Lấy thời gian hiện tại và chuyển đổi thành timestamp (số giây kể từ Epoch)
  const timestamp = new Date().getTime();

  return Math.floor(timestamp);
}

function convertTimestamp(timestamp) {
  // Kiểm tra xem timestamp là milliseconds hay giây
  const isMilliseconds = timestamp > 9999999999; // Nếu timestamp lớn hơn 9999999999, đây là milliseconds

  // Nếu là giây, nhân với 1000 để chuyển thành milliseconds
  const timestampInMilliseconds = isMilliseconds ? timestamp : timestamp * 1000;

  const date = new Date(timestampInMilliseconds);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
  return formattedDate;
}

export { convertTimestamp, getCurrentTimestamp };
