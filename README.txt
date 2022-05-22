Link Deploy web to Heroku:
https://chatapp-519h0247.herokuapp.com/
Link Github of Project:
https://github.com/demoon2332/chatapp-519h0247

Any More information or Question: contact via gmail: ductrong1313@gmail.com/ 519h0247@student.tdtu.edu.vn

---------------------------Content-----------------------------------------------------------------------
*In this project, we only use Google Account via Google Authentication, 
so that teacher can use Google Account to login and test the our application
(Due to using Google Authentication,
there no private (personal) information stored and stolen in our project
only the message during using has been stored.)

(English)
Step1:
- Unzip source code (if any)
Step2:
- In file .env , the default port for website is 8085 (recommended)
- You can change port to :
+ 3000 , 8000 , 8080 , 8085 , 8086 , 8087 , 45720
( Because these port are register Google API Services already for callback URI)
Step3:
- install packages required in the project:
+ express, express-handlebars, express-session and sub-package of express
+ socket.io, passport, passport-google-oauth20
+ dotenv, http-errors, cookie-parser
+ mongoose, path
Step4:
- Run the project by command "npm start" or "node app.js"


* Trong dự án này, chúng em chỉ sử dụng Tài khoản Google qua Google Authentication,
để giáo viên có thể sử dụng Tài khoản Google để đăng nhập và kiểm tra ứng dụng của chúng em
(Do sử dụng Google Authentication,
không có thông tin cá nhân (cá nhân) được lưu trữ và bị đánh cắp trong dự án của chúng em
chỉ tin nhắn trong quá trình sử dụng đã được lưu trữ tại mongoDB Compass.)

(Vietnamese)
Bước 1:
- Giải nén source ( nếu chưa giải nén )
Bước 2:
- Trong file.env, cổng mặc định cho trang web là 8085
- Thầy có thể đổi sang các cổng:
+ 3000 , 8000 , 8080 , 8085 , 8086 , 8087 , 45720
( Vì những cổng này chúng em đã đăng kí callback cho Google API Services already)
Bước 3:
- Tải những gói thư viện cần thiết cho dự án này:
+ express, express-handlebars, express-session and sub-package of express
+ socket.io, passport, passport-google-oauth20
+ dotenv, http-errors, cookie-parser
+ mongoose, path
Bước 4:
- Khởi chạy dự án bằng lệnh "npm start" hoặc "node app.js"



