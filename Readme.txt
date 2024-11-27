
Instructions to Run the Project

Step 1: Prerequisites
- Ensure Node.js is installed on your system:
  - Download it from https://nodejs.org/.
- You do not need to install MongoDB locally since the database is hosted on MongoDB Atlas.


-----------------------------------------------------------------------------------------------

Step 2: Extract the ZIP File or clone it
1. Unzip the provided project folder (rbac-system.zip) into a directory of your choice. OR

2. Clone repo to your local system using Git.


-----------------------------------------------------------------------------------------------

Step 3: Install Dependencies
1. Open a terminal and navigate to the project folder:
   cd /path/to/unzipped/project
2. Install the required dependencies [if needed or copy node_modules as it is]:
   npm install


-----------------------------------------------------------------------------------------------

Step 4: Configure Environment Variables
1. The project includes a .env file for environment variables. Nothing is needed to be changed.
2. Ensure the .env file contains:
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/rbac_system?retryWrites=true&w=majority
   JWT_SECRET=your_secret_key


-----------------------------------------------------------------------------------------------

Step 5: Start the Server
1. Run the application using the following command:
   npm start
2. The server will start at http://localhost:5000.


-----------------------------------------------------------------------------------------------

Step 6: Test the API
Use Postman or any API client to test the endpoints. Below is the demo for every end point used-
(Remember port is 5000)

Authentication Endpoints
1. Register a User:
   - Endpoint: POST /auth/register
   - Request Body:
     {
       "name": "admin",
       "email": "admin@example.com",
       "password": "1234",
       "role": "admin"
     }

2. Login:
   - Endpoint: POST /auth/login
   - Request Body:
     {
       "email": "admin@example.com",
       "password": "1234",
     }
   - Response:
     {
       "token": "output_jwt_token"
     }

3. Logout:
   - Endpoint: POST /auth/logout
   - Headers:
     Authorization: Bearer <your_token_after_log_in>

-----------------------------------------------------------------------------------------------
Protected Routes

1. Admin Access:
   - Endpoint: GET /protected/admin
   - Role Required: Admin
   - Headers:
     Authorization: Bearer <token>
   - Expected Response:
     {
       "message": "Welcome Admin!"
     }

2. Moderator Access:
   - Endpoint: GET /protected/moderator
   - Role Required: Moderator
   - Headers:
     Authorization: Bearer <token>
   - Expected Response:
     {
       "message": "Welcome Moderator!"
     }

3. User Access:
   - Endpoint: GET /protected/user
   - Role Required: User
   - Headers:
     Authorization: Bearer <token>
   - Expected Response:
     {
       "message": "Welcome User!"
     }

Expected Error Responses:
- Missing Token:
  {
    "error": "No token provided"
  }

- Unauthorized Access:
  {
    "error": "Access denied"
  }

--------------------------------------------------------------------------------

2. Shared Resource Access:
   - Endpoint: GET /protected/resource
   - Headers:
     Authorization: Bearer <token>


   - Role-Based Permissions:
     - Admin can View, edit and delete.
     - Moderator can View and edit.
     - User can View only.

   - Example Response (for Admin):
     {
       "message": "Admin: You can view, edit, and delete this resource.",
       "permissions": ["view", "edit", "delete"]
     }


