## OPL:
- how to save the keys in env/secure
- if google auth was not used to fetch profile info. create a profile table and link to user table ?? try this out

## sequence in app.js
- global const and require
- passport
- load routes
- load mongoose keys
- mongoose connect
- express
- middleware : sequence of middle ware is important,
   1. cookieParser, express session, passport, routes
- app.get post put delete

## note:
1. app.use always calls a function, which can pass objects: watch for the syntax
2. everytime the app.js file is modified, user is logged out and has to log back in.
- checkout the verify and logout routes in auth.js and check for user login and logout



## start the project
1. npm init
2. start server
3. push to heroku

## use passport-google-oauth2
https://github.com/jaredhanson/passport-google-oauth2

1. enable google oauth in developer console
2. create credentials
3. save them in config/keys.js

## install passport
- npm install --save passport passport-google-oauth20


1. create routes for auth.
2. create routes/auth.js and express router in app.js
3. test out with /auth/google
4. define strategy -> create config/passport.js
5. upadte auth.js, app.js

## configure callback
/auth/google/callback

https://github.com/jaredhanson/passport-google-oauth2:

<!-- at this stage notice in console, profile and google info is fetched -->


## push to heroku
1. notice redirect_url_mismatch
2. configure heroku urls and callback on google cloud

## add user model.
1. connect mongoose in app.js
2. create user model

## get profile info when user logs in and store into user model
1.  switch to google auth (localhost:3000/auth/google) and notice

<!-- id: '104223708683771739043',
  displayName: 'Nandini Nayak',
  name: { familyName: 'Nayak', givenName: 'Nandini' },
  emails:
   [ { value: 'nandini.nayak@coderacademy.edu.au', type: 'account' } ],
  photos:
   [ { value: 'https://lh4.googleusercontent.com/-TlB2wAbo5Yc/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7ptGZ7ZbVdb8MZEKdilIXLkEwwW_A/mo/photo.jpg?sz=50' } ],
  gender: 'other', -->

  - use substring to end the photo at jpeg in passport.js

  - create user in the databse.
  - now login in to mlab and notice users has been created with google profile in collection
  - note: in this project local db was not created dire tly mlab was used

  - add serialize and deserialize an dmiddle ware for passport
  - npm install express-session cookie-parser --save
  - use express-session and cookie parser middle ware above passport

  ## errors
  1.  Error: passport.initialize() middleware not in use
  - this is due to the presence of middleware underneatch routes, which was not getting used. hence middle ware should be placed before calling routes

  ## index routes and handlebars
  
