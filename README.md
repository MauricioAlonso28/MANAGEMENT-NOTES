# Full Stack Notes Application

## **Project Description**

This is a Full Stack Notes Application that allows users to:
- Create, edit, and delete notes.
- Archive and unarchive notes.
- Add and remove categories (tags) to notes.
- Filter notes by category.

The application is divided into two parts:
1. **Frontend**: Built with React.js and Vite.
2. **Backend**: Built with Node.js, NestJS, TypeORM, and MySQL as the database.

---

## **Technologies Used**

### **Frontend**
- ReactJS
- Vite `v6.0.1`
- npm `v10.2.4`
- Node.js `v20.11.1`

### **Backend**
- Node.js `v20.11.1`
- NestJS CLI `v10.4.9`
- TypeORM `v0.3.20`
- MySQL `v8.0.36`

---

## **Prerequisites**

Ensure you have the following installed on your system:
1. **Node.js**: `v20.11.1`
2. **npm**: `v10.2.4`
3. **MySQL**: `v8.0.36`

You will also need a MySQL database configured to run the backend.

---

## **Installation and Setup**

Follow these steps to run the application locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Create a MySQL database (e.g., app_notes)

Update the database credentials in the .env file inside the backend folder.

Example .env file:

DB_USER=root
DB_PASSWORD=your_password
DB_NAME=app_notes
DB_HOST=localhost
DB_PORT=3306

### 3. Run the Application

Run the following command from the root of the project:
- ./start.sh

The script will:

Install dependencies for the backend and frontend.
Run database migrations and import initial data.
Start the backend and frontend servers.

### 4. Access the Application

- Open a web browser and navigate to `http://localhost:5173` to access the frontend
- The backend API runs at `http://localhost:3000`

## Test User Credentials

Use the following credentials to log in and test the application:

- Email: Demo123@gmail.com
- Password: Demo123

This user is preloaded with example notes and data.

Project Structure
The repository is organized as follows:

``` bash
root/
├── backend/           # NestJS backend code
│   ├── src/           # Source code (controllers, services, entities, etc)
│   ├── database/      # Database migrations and dump
│   ├── .env           # Environment variables
│   └── package.json
├── frontend/          # React frontend code
│   ├── src/           # React components, hooks, etc.
│   ├── vite.config.js # Vite configuration
│   └── package.json
├── start.sh           # Script to set up and run the application
└── README.md          # Project documentation
```

## Additional Notes

Database Initialization: The script imports initial_data.sql into your MySQL database. This file contains the test user and preloaded notes.
Stop the Application: Use Ctrl + C to stop the servers.

## Author
Mauricio Alonso Ayllón
