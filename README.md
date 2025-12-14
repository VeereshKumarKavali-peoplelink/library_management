# api.http file 
-> used to send request for all API end points with respective sample data  
-> install Extension → REST Client (by Huachao Mao), prior to send API Requests

# .env file contains
PORT=3000
JWT_SECRET="SECRET_KEY"
libraryUserTable=user
libraryBookTable=book
mongoConnString=""

# To install dependencies in package.json
-> npm install 
-> npm install --legacy-peer-deps (if get package conflicts)

# To start server
-> npm start 
-> npm run dev    (with nodemon package)

# app.js file is the starting point of application

# controllers folder contains
-> bookController.js file which has Book related API's
-> userController.js file which has SignUp & login API's for user to add , update and delete books based on JwtToken mechanism

# middleWare folder contains
-> authMiddlewar.js file which is used to validate JwtToken 
-> validation.js file uses "joi" package to validate user & book respectively

# models folder contains
-> bookSchema which has fields like title (book name), author (author name), description, pages, available, createdAt, updatedAt
-> userSchema which has fields like email, password of a user

# routes folder contains
-> userRoutes file which routes to Authentication API's through validation Middleware
-> bookRoutes file which routes to Book API's through AuthenticateToken & validation Middleware

# utils folder contains
-> error.js file which has re-usable error messages
-> response.js file which has re-usable success & failure response with proper status codes

# databaseConn.js file has connection to MongoDB database with help of mongoose ODM

# dbQueries file has optimized re-usable database queries

# install Extension → REST Client (by Huachao Mao)
-> From api.http file to send request for below API's with sample data
POST http://localhost:3000/api/users/register

POST http://localhost:3000/api/users/login

POST http://localhost:3000/api/books

GET http://localhost:3000/api/books?page=1&limit=10

GET http://localhost:3000/api/books/author?search=authorName

PUT http://localhost:3000/api/books/:bookId

DELETE http://localhost:3000/api/books/:bookId








