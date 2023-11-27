const getPrevious = (day) =>
  // tra ve ngay truoc do
  new Date(new Date().setDate(new Date().getDate() - day));

export { getPrevious };
