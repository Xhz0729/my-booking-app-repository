# 🏡 DreamStay Booking App Project

## 📌 Overview

This is a full-stack booking application built using the MERN (MongoDB, Express, React, Node.js) stack. The app allows users to register, log in, book available listings, listing houses and browse listings based on availability.
The key features of the app include:

- User registration and login
- Booking and listing management
- Browsing available listings with filters

## 🚀 Tools & Frameworks

This project leverages the following tools and frameworks:

- **Frontend**:

  - React (created using Vite for optimized builds)
  - React Router for client-side navigation
  - Tailwind CSS for responsive, utility-first design

- **Backend**:

  - Node.js and Express for the server
  - MongoDB for the database
  - Mongoose for handling MongoDB connections and models

- **Other Tools**:
  - GitHub for version control
  - Trello for project management and task tracking

## 💡 Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```
git clone https://github.com/Xhz0729/my-booking-app-repository.git
```

### 2. Navigate to the client folder and install the required dependencies:

Go to client and install dependencies:

```
  cd client
  npm install
```

Go to server and install dependencies:

```
  cd ..
  cd server
  npm install
```

### 3. MongoDB Setup

#### Step 1: Create a MongoDB Cluster

- Go to the [MongoDB Atlas website](https://www.mongodb.com/cloud/atlas).
- Create an account (if you don’t have one already) or log in.
- Once logged in, create a new **Cluster** by following the instructions. Choose a free tier if you're setting up a development environment.

#### Step 2: Get the MongoDB Connection URL

- After the cluster is created, click **Connect** and choose **Connect your application**.
- Select **Node.js** as your driver and ensure the version is compatible.
- Copy the provided connection string (this is your `MONGO_URL`).
  - The connection string should look something like this:
    ```
    mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    ```
- Replace `<username>` and `<password>` with the credentials you set up during the MongoDB cluster creation.

- **Note:** The data schema for your application is located in the `server/models` folder, and MongoDB will automatically create the necessary collections based on those models when you interact with the database.

#### Step 3: Create a `.env` File in the Server Directory

- In the `server` folder of your project, create a `.env` file.
- Add the MongoDB connection URL you copied in Step 2 to the `.env` file like this:

  ```env
  MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/dreamStayDB?retryWrites=true&w=majority
  ```

- Also, add other environment variables such as the port and JWT secret:
  ```env
  MONGO_URL=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  ```

#### Step 4: Connect the App to MongoDB

- Ensure that your backend server is correctly connected to MongoDB by starting it with:
  ```bash
  cd server
  npm run dev
  ```

## Project Management

The development of this project is tracked using a [Trello board](https://trello.com/invite/b/670feb7f0c9ba7d89c54cb48/ATTI7a52d3b4a19fbdafec91207eacbcbe8bE2C939D1/dream-stay-app). You can follow the progress, view tasks, and check completed milestones on the board.

## 📝 Project Files

- [**Week1 milestones**](https://drive.google.com/file/d/1A3c7h4risHmuV2zdmPI0CuuQ0HCevnTW/view?usp=drive_link)

## Demos

- [Login demo](https://drive.google.com/file/d/1Jk5VPj5gZxBGyxaFnbieTodeHBYdYzdc/view?usp=drive_link)  
  This demo showcases the login functionality, including user authentication and validation.

- [Display listing and update listing](https://drive.google.com/file/d/18AO5WxLZGJIdmP6FfKx-mdhG3D24fzQS/view?usp=drive_link)  
  This demo highlights how listings are displayed and the process of updating a listing within the project.
