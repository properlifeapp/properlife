Content Dashboard Application
This is a web application for managing and organizing content. It allows users to log in with their Google account, view and manage content items, and assign severity levels and social media platforms to each item.

Technologies Used
Node.js
Express.js
MySQL
Socket.io
Google OAuth2 API
JWT
Rollup.js
Svelte.js
Getting Started
To run this application locally, follow these steps:

Clone the repository to your local machine.
Install the necessary dependencies by running 
npm install
.
Create a 
.env
 file in the root directory and add the following environment variables:
DB_HOST=<your_database_host>
DB_USER=<your_database_username>
DB_PASSWORD=<your_database_password>
DB_NAME=<your_database_name>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
JWT_PRIVATE_KEY=<your_jwt_private_key>
Start the server by running 
npm run dev
.
Open the application in your browser at 
http://localhost:3000
.
Features
Google OAuth2 authentication
View and manage content items
Assign severity levels and social media platforms to each item
Real-time updates using Socket.io
Code Structure
server.js
: Main server file that sets up the Express app and connects to the database.
routes/
: Contains the route handlers for the different endpoints of the application.
db.js
: Contains the database connection pool and helper functions for executing queries.
public/
: Contains the client-side code for the application.
src/
: Contains the Svelte components and Rollup configuration for building the client-side code.
hooks.server.js
: Contains the Cloudflare Workers code for handling authentication and authorization.
auth.js
: Contains helper functions for generating and verifying JWT tokens and signup hashes.
Contributing
Contributions to this project are welcome. To contribute, follow these steps:

Fork the repository.
Create a new branch for your changes.
Make your changes and commit them with descriptive commit messages.
Push your changes to your fork.
Submit a pull request to the main repository.
License
This project is licensed under the MIT License. See the 
LICENSE
 file for more information.