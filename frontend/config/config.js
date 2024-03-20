let url;
if (process.env.NODE_ENV === "production") {
  url = "https://movie-website-mqnf.onrender.com";
} else {
  url = "http://localhost:3000";
}
export default url;
