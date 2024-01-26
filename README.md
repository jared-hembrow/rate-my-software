# Rate My Software

Welcome to the Rate My Software porject, a web application that allows users to showcase their software projects and receive valuable feedback from other users. This project is built using Next.js with NextAuth.js for authentication and MongoDB as the database to store project data. Bootstrap 5 is utilized for a responsive and modern user interface, and TypeScript ensures a robust and statically-typed codebase.

## Features

- **User Authentication:** Secure login and registration process powered by NextAuth.js, providing a seamless and reliable authentication experience.

- **Project Showcase:** Users can display details of their software projects, including project name, description, links, and reviews.

- **Feedback System:** Foster a collaborative environment by allowing users to provide feedback on each other's projects. Users can share their thoughts, suggestions, and insights.

- **Responsive Design:** Utilizing Bootstrap 5, the platform offers a visually appealing and responsive design, ensuring a consistent user experience across devices.

- **TypeScript Integration:** Enhance code quality and maintainability with TypeScript, bringing static typing to the Next.js project.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

- MongoDB: Set up a MongoDB database and obtain the connection URI.
- Azure Entra: Set up and obtain Client ID, Tenant ID and Secret
- Google Auth: Set up and obtain Client ID and Secret
- Github Auth: Set up and obtain Client ID and Secret
- Secret String: Create a unique secret string

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jared-hembrow/rate-my-software.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project-feedback-platform
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a .env.local file in the root directory and configure the following variables:

   ```bash
    # NextAuth.js Secret
    NEXTAUTH_SECRET="Random String"
    # AZURE
    AZURE_AD_TENANT_ID="ID"
    AZURE_AD_CLIENT_ID="ID"
    AZURE_AD_CLIENT_SECRET="Secret"

    # GITHUB
    GITHUB_SECRET="Secret"
    GITHUB_CLIENT_ID="ID"

    # GOOGLE
    GOOGLE_CLIENT_ID="ID"
    GOOGLE_CLIENT_SECRET="Secret"

    # MONGO DB
    MONGODB_URI='mongodb://admin:admin@localhost:27017/Database_Name'
    DATABASE="Database Name"
   ```

### Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and visit http://localhost:3000 to access the Rate My Feedback Project

## Backend Endpoints

- `/api/user`
  This API endpoint is designed to manage user information, providing functionality for retrieving and updating user details.
  - `GET`: Retrieve user information by user ID.
  - `PUT`: Update user information.
    - `userId` (query parameter): The unique identifier of the user.

#### Request Body (for `PUT` method)

```json
{
  "name": "name of user"
}
```

#### Responses

- `GET`

  - **200 OK**: Successfully retrieved user information. The response body contains the user object.
  - **400 Bad Request**: If `userId` is missing in the query parameters.
  - **404 Not Found**: If the user with the specified `userId` is not found.

- `PUT`

  - **200 OK**: User information successfully updated.
  - **400 Bad Request**: If the update operation fails.

- Other HTTP Methods

  - **405 Method Not Allowed**: For any other HTTP methods besides `GET` and `PUT`.

#### Example Usage

1. **GET Request:**

   - Endpoint: `/api/user?userId=123`
   - Response: `200 OK` with the user information in the response body.

2. **PUT Request:**
   - Endpoint: `/api/user`
   - Request Body: `{ "userId": "123", "name": "UpdatedName", "email": "updated@email.com" }`
   - Response: `200 OK` if the update is successful, `400 Bad Request` otherwise.

#

- `/api/projects`
  This API endpoint is designed to retrieve projects associated with a specific user. - `GET`: Retrieve all projects for a given user. - `userId` (query parameter): The unique identifier of the user.

#### Responses

- `GET`

  - **200 OK**: Successfully retrieved projects associated with the user. The response body contains an array of project objects.
  - **400 Bad Request**: If `userId` is missing in the query parameters.
  - **404 Not Found**: If no projects are found for the specified `userId`.

- Other HTTP Methods
  - **405 Method Not Allowed**: For any other HTTP methods besides `GET`.

#### Example Usage

1. **GET Request:**
   - Endpoint: `/api/projects?userId=123`
   - Response: `200 OK` with an array of project objects in the response body.

#

- `/api/project`
  This API endpoint provides functionality for managing projects associated with a specific user. - `POST`: Create a new project. - `GET`: Retrieve project details by project ID. - `PUT`: Update existing project details. - `DELETE`: Delete a project.

#### Request Parameters

- `userId` (query parameter): The unique identifier of the user.
- `projectId` (query parameter): The unique identifier of the project.

#### Request Body

For `POST` and `PUT` methods, the request body should contain a project object with the following properties:

- `id` (string): Unique identifier of the project.
- `name` (string): Name of the project.
- `description` (string): Description of the project.
- `authorId` (string): Unique identifier of the project author (user).
- `author` (string): Author's name.
- `links` (array): Array of project links.
- `reviews` (array): Array of project reviews.

#### Responses

- `POST`

  - **200 OK**: Successfully created a new project.
  - **400 Bad Request**: If the request body is invalid or the author and project IDs don't match.

- `GET`

  - **200 OK**: Successfully retrieved project details. The response body contains the project object.
  - **404 Not Found**: If the project with the specified `projectId` is not found.

- `PUT`

  - **200 OK**: Successfully updated project details.
  - **400 Bad Request**: If the request body is invalid or the author and project IDs don't match.

- `DELETE`

  - **200 OK**: Successfully deleted the project.
  - **400 Bad Request**: If the project deletion fails.

- Other HTTP Methods
  - **405 Method Not Allowed**: For any other HTTP methods besides `POST`, `GET`, `PUT`, and `DELETE`.

#### Example Usage

1. **POST Request:**

   - Endpoint: `/api/project?userId=123&projectId=456`
   - Request Body: `{ "id": "456", "name": "New Project", "description": "Project Description", "authorId": "123", "author": "John Doe", "links": ["link1", "link2"], "reviews": ["review1", "review2"] }`
   - Response: `200 OK` if the project creation is successful, `400 Bad Request` otherwise.

2. **GET Request:**

   - Endpoint: `/api/project?userId=123&projectId=456`
   - Response: `200 OK` with the project details in the response body.

3. **PUT Request:**

   - Endpoint: `/api/project?userId=123&projectId=456`
   - Request Body: `{ "id": "456", "name": "Updated Project", "description": "Updated Description", "authorId": "123", "author": "John Doe", "links": ["link1", "link2", "link3"], "reviews": ["review1", "review2"] }`
   - Response: `200 OK` if the project update is successful, `400 Bad Request` otherwise.

4. **DELETE Request:**
   - Endpoint: `/api/project?userId=123&projectId=456`
   - Response: `200 OK` if the project deletion is successful, `400 Bad Request` otherwise.

# Lessons Learned

### Technical Skills

Throughout the development of this project, I gained and improved valuable technical skills, including:

- **Next.js and NextAuth.js:**

  - Developing with Next.js and intergrating NextAuth.js for authentication has deepened my understanding of server-side rendering, client-side rendering, and authentication flows.

- **MongoDB Database Integration:**

  - Working with MongoDB allowed me to grasp document database concepts, from schema design to CRUD operations.

- **Bootstrap 5 for Responsive Design:**

  - Utilizing Bootstrap 5 enhanced my ability to create responsive and visually appealing user interfaces.

- **TypeScript Implementation:**
  - Incorporating TypeScript into the project helped to improving code quality and catch potential errors during development.
