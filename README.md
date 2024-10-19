<h1 align="center">Zairza App Backend API</h1>

Developed a scalable and secure backend API for Zairza App, built using **Node.js** and **Express.js**, to handle user authentication, events/projects management, resources sharing, and media uploads for admins and users.

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.3-green.svg?style=rounded-square)](https://nodejs.org/)

## Features
- **User Authentication**: Register, login, and manage user sessions.
- **Events/Projects Management**: Admins can upload and update events/projects while users can view them.
- **Profile Management**: Users can update and retrieve their profiles.
- **Resource Sharing**: Admins can upload resources (roadmaps, videos, presentations), and users can access them.
- **Media Upload**: Authenticated users can upload photos, visible to all.

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app?
1. Open the app directory in CMD or Terminal.
2. Type `npm install` to install dependencies.
3. Turn on your web server (use tools like XAMPP for MySQL).
4. Open Postman or any HTTP client to interact with the API endpoints.

## API Endpoints

### 1. Authentication
**Register (POST Request)**  
`/zairza/register`  
*Fields*: name, registration_number, branch, phone_number, email, password, batch

**Login (POST Request)**  
`/zairza/login`  
*Fields*: email, password

---

### 2. Events/Projects Management (Admins only)
**Upload Event/Project (POST Request)**  
`/zairza/uploadEvent`  
*Fields*: title, date_and_time, wing(Hardware/Software/Design), event_img, description, senior_incharge

**Retrieve Events/Projects (GET Request)**  
`/zairza/retrieveEvent`

**Update Event/Project (PUT Request)**  
`/zairza/updateEvent/{id}`  
*Fields*: title, date_and_time, wing(Hardware/Software/Design), event_img, description, senior_incharge

---

### 3. Profile Management
**Upload Profile (POST Request)**  
`/zairza/uploadProfile`  
*Fields*: See the image format in the project link.

**Get Profile (GET Request)**  
`/zairza/getProfile`

---

### 4. Resources Sharing (Admins only)
**Upload Resources (POST Request)**  
`/zairza/uploadResources`  
*Fields*:  
- roadmaps: [Single/List of drive links in this Square bracket],  
- videos: [Single/List of Video Links in this Square bracket like "https://www.youtube.com/gateway/roboflow"],  
- session_presentations,  
- domain: "Web Development", "App Development", "Design", "Machine Learning"

**Retrieve Resources (GET Request)**  
`/zairza/retrieveResources`

**Update Resources (PUT Request)**  
`/zairza/updateResources/{id}`  
*Fields*:  
- roadmaps: [Single/List of drive links in this Square bracket],  
- videos: [Single/List of Video Links in this Square bracket],  
- session_presentations,  
- domain: "Web Development", "App Development", "Design", "Machine Learning"

---

### 5. Media Upload
**Upload Photo (POST Request)**  
`/zairza/upload`  
*Field*: image (file upload like `abhinaba.jpeg`)

**Get All Uploaded Photos (GET Request)**  
`/zairza/getPhotos`

---

## Example API Interaction
Use tools like **Postman** or **cURL** to interact with the API:

- **To Register**:  
POST `/zairza/register`  
```json
{
    "name": "John Doe",
    "registration_number": "12345",
    "branch": "CSE",
    "phone_number": "9876543210",
    "email": "johndoe@example.com",
    "password": "password123",
    "batch": "2024"
}
