import app from "../coverage/instrumented/src/app";
// 서버 띄우는 과정
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
