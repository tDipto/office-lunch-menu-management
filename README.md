# Office Lunch Menu Management System

## Technologies Used
Backend: Express.js
Frontend: React.js
Database: PostgreSQL

# Running the Project
Follow these steps to run the project:

1. Clone the Repository
Clone the Teebay repository to your local machine using the following command:

```sh
git clone https://github.com/tDipto/office-lunch-menu-management.git
```

2. Install Dependencies
Navigate to the project directory and install the dependencies for both the backend and frontend:

``` sh
cd office-lunch-menu-management
cd server
npm install

cd ../client
npm install
```

3. Set Up Environment Variables
In both the backend and frontend directories, create a .env file and define the following environment variables:

# Backend (.env file in the backend directory)
``` sh
DATABASE_URL= "postgresql://<user-name>:<password>@localhost:5432/Lunch-management?schema=public"
JWT_SECRET=<your-jwt-secret>
```

4. Run Prisma migrations:
``` sh
cd server
npx prisma migrate dev
```

5. Run the Backend Server
In the backend directory, start the backend server:

``` sh
npm start
```
The backend server will start running on http://localhost:5000

6. Run the Frontend Application
In the frontend directory, start the frontend application:
`` sh
npm run dev
``
The frontend application will start running on http://localhost:5173




## Feature

### Menu Add
![Menu Add](https://github.com/tDipto/office-lunch-menu-management/blob/master/features/menuAdd.PNG)


### Menu Select
![Menu Select](https://github.com/tDipto/office-lunch-menu-management/blob/master/features/menuSelect.PNG)

### All Employee
![All Employee](https://github.com/tDipto/office-lunch-menu-management/blob/master/features/allEmployee.PNG


### All Items
![All Items](https://github.com/tDipto/office-lunch-menu-management/blob/master/features/allItems.PNG)
