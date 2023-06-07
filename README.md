# Relive

Relive is a clone of Airbnb, a complete web application where users can create, review and book spots. 

Check out [Relive](https://relive.onrender.com)

<!-- ## Index

[MVP Feature List](https://github.com/ExcuseMeImJack/watchboxd/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/ExcuseMeImJack/watchboxd/wiki/Database-Schema) |
[User Stories](https://github.com/ExcuseMeImJack/watchboxd/wiki/User-Stories) |
[Wire Frames](https://github.com/ExcuseMeImJack/watchboxd/wiki/Wireframe) | -->

## Technologies Used

<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white'><img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'><img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'><img src='https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue'/><img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'><img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white'><img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'><img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'><img src='https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white'><img src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E'>

## Spots Page

![Spots](https://github.com/ExcuseMeImJack/Relive/assets/118242834/958dad9f-60e4-4005-b3ee-9955e4bafa7a)

## Spot Details Page

![Spot Details](https://github.com/ExcuseMeImJack/Relive/assets/118242834/93ae4c6d-38cb-4b3a-b49c-744594559874)


## Create a Spot Page

![Spot Creation Form](https://github.com/ExcuseMeImJack/Relive/assets/118242834/7180057e-1787-4383-892c-b3f79d86b8e3)

## Getting started
1. Clone this repository:

   `
   https://github.com/ExcuseMeImJack/Relive.git
   `
   
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `npm install`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both backend and frontend using:

   * `npm start`

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features 

## Spots
* Users can create a Spot
* Users can read/view other Spot
* Users can update their Spot
* Users can delete their Spot

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot

## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete/Cancel their booking

## Future Features
### AWS
Logged-in Users can
* Upload multiple images of their spot to AWS S3
* 
### Google Maps Api
Logged in Users can
* Locate their spot with Google Maps Api 

*** 

# API-Backend

## SPOTS
    * `POST /api/spots/:spotId/bookings` Create a booking from a Spot based on the Spot's ID
    * `GET /api/spots/:spotId/bookings` Get all the Bookings for a Spot based on the Spot's ID
    * `POST /api/spots/:spotId/reviews` Create a Review for a Spot based on the Spot's ID
    * `GET /api/spots/:spotId/reviews` Get all Reviews by a Spot's ID
    * `GET /api/spots/current` Get all Spots owned by the Current User
    * `POST /api/spots/:spotId/images` Create an Image for a Spot based on the Spot's ID
    * `GET /api/spots/:spotId` Get details of a Spot based on the Spot's ID
    * `DELETE /api/spots/:spotId` Delete a Spot based on the Spot's ID
    * `PUT /api/spots/:spotId` Edit a Spot based on the Spot's ID
    * `POST /api/spots` Create a Spot
    * `GET /api/spots` Get all Spots

## REVIEWS
    * `POST /api/reviews/:reviewId/images` Create an Image for a Review based on the Review's ID
    * `GET /api/reviews/current` Get all the Reviews of a Current User
    * `PUT /api/reviews/:reviewId` Edit a Review based on the Review's ID
    * `DELETE /api/reviews/:reviewId` Delete a Review based on the Review's ID

## BOOKINGS
    * `DELETE /api/bookings/:bookingId` Delete a Booking based on the Booking ID
    * `PUT /api/bookings/:bookingId` Edit a Booking based on the Booking ID
    * `GET /api/bookings/current` Get all of the Current User's Bookings

## SPOT IMAGES
    * `DELETE /api/spot-images/:imageId` Delete a Spot Image based on the Spot Image ID

## REVIEW IMAGES
    * `DELETE /api/review-images/:imageId` Delete a Review Image based on the Review Image ID

## USERS
    * `POST /api/users` Create/Sign up a User
    
## SESSION
    * `POST /api/session` Login a User
    * `DELETE /api/session` Log out a User
    * `GET /api/session` Restore session user
