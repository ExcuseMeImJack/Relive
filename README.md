# Relive

Relive is a clone of Airbnb, a complete web application where users can create, review and book spots.

Check out [Relive](https://relive.onrender.com)

## Index

[MVP Feature List](https://github.com/ExcuseMeImJack/Relive/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/ExcuseMeImJack/Relive/wiki/Database-Schema) |
[User Stories](https://github.com/ExcuseMeImJack/Relive/wiki/User-Stories) |
[Wire Frames](https://github.com/ExcuseMeImJack/Relive/wiki/Wireframe) |

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
   * `POST /api/spots/:spotId/bookings`
       * Purpose: Create a booking from a Spot based on the Spot's ID
       * Return: `{"id": 1,"spotId": 1,"userId": 2,"startDate": "2021-11-19","endDate": "2021-11-20","createdAt": "2021-11-19 20:39:36","updatedAt": "2021-11-19 20:39:36"}`
   * `GET /api/spots/:spotId/bookings`
       * Purpose: Get all the Bookings for a Spot based on the Spot's ID
       * Return: `{"Bookings": [{"spotId": 1,"startDate": "2021-11-19","endDate": "2021-11-20"}]}`
   * `POST /api/spots/:spotId/reviews`
       * Purpose: Create a Review for a Spot based on the Spot's ID
       * Return: `{"review": "This was an awesome spot!","stars": 5,}`
   * `GET /api/spots/:spotId/reviews`
       * Purpose: Get all Reviews by a Spot's ID
       * Return: `{"Reviews": [{"id": 1,"userId": 1,"spotId": 1,"review": "This was an awesome spot!", . . . }]}`
   * `GET /api/spots/current`
       * Purpose: Get all Spots owned by the Current User
       * Return: `{"Spots": [{"id": 1, "ownerId": 1, "address": "123 Disney Lane" . . . }]}`
   * `POST /api/spots/:spotId/images`
       * Purpose: Create an Image for a Spot based on the Spot's ID
       * Return: `{"url": "image url", "preview": true}`
   * `GET /api/spots/:spotId`
       * Purpose: Get details of a Spot based on the Spot's ID
       * Return: `{"id": 1, "ownerId": 1, "address": "123 Disney Lane" . . . }`
   * `DELETE /api/spots/:spotId`
       * Purpose: Delete a Spot based on the Spot's ID
       * Return: `{"message": "Successfully deleted"}`
   * `PUT /api/spots/:spotId`
       * Purpose: Edit a Spot based on the Spot's ID
       * Return: `{"id": 1, "ownerId": 1, "address": "123 Disney Lane" . . . }`
   * `POST /api/spots`
       * Purpose: Create a Spot
       * Return: `{"address": "123 Disney Lane", "city": "San Francisco", . . . }`
   * `GET /api/spots`
       * Purpose: Get all Spots
       * Return: `{"Spots": [{"id": 1, "ownerId": 1, "address": "123 Disney Lane" . . . }]}`

## REVIEWS
   * `POST /api/reviews/:reviewId/images`
       * Purpose: Create an Image for a Review based on the Review's ID
       * Return: `{"id": 1,"url": "image url"}`
   * `GET /api/reviews/current`
       * Purpose: Get all the Reviews of a Current User
       * Return: `{"Reviews": [{"id": 1,"userId": 1,"spotId": 1,"review": "This was an awesome spot!", . . . }]}`
   * `PUT /api/reviews/:reviewId`
       * Purpose: Edit a Review based on the Review's ID
       * Return: `{"id": 1,"userId": 1,"spotId": 1,"review": "This was an awesome spot!", . . . }]}`
   * `DELETE /api/reviews/:reviewId`
       * Purpose: Delete a Review based on the Review's ID
       * Return: `{"message": "Successfully deleted"}`

## BOOKINGS
   * `DELETE /api/bookings/:bookingId`
       * Purpose: Delete a Booking based on the Booking ID
       * Return: `{"message": "Successfully deleted"}`
   * `PUT /api/bookings/:bookingId`
       * Purpose: Edit a Booking based on the Booking ID
       * Return: `{"id": 1,"spotId": 1,"userId": 2,"startDate": "2021-11-19", . . . }`
   * `GET /api/bookings/current`
       * Purpose: Get all of the Current User's Bookings
       * Return: `{"Bookings": [{"id": 1,"spotId": 1,"Spot": { . . . } . . . }]}`

## SPOT IMAGES
   * `DELETE /api/spot-images/:imageId`
       * Purpose: Delete a Spot Image based on the Spot Image ID
       * Return: `{"message": "Successfully deleted"}`

## REVIEW IMAGES
   * `DELETE /api/review-images/:imageId`
       * Purpose: Delete a Review Image based on the Review Image ID
       * Return: `{"message": "Successfully deleted"}`

## USERS
   * `POST /api/users`
       * Purpose: Create/Sign up a User
       * Return: `{"id": 1,"firstName": "John","lastName": "Smith", . . . }`

## SESSION
   * `POST /api/session`
       * Purpose: Login a User
       * Return: `{"user": {"id": 1,"firstName": "John", . . . }}`
   * `GET /api/session`
       * Purpose: Returns the information about the current user that is logged in.
       * Return: `{"user": {"id": 1,"firstName": "John", . . . }}`
