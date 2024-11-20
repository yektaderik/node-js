# category management

This project is a backend application developed using [Fastify](https://www.fastify.io/) and [MongoDB](https://www.mongodb.com/). Below is the guide for cloning the project, installing dependencies, prerequisites, and running the project in different ways.

## 1. Clone the Project

To get started, clone the project from the GitHub repository:

```bash
git clone https://github.com/yourusername/backend-project.git
cd backend-project
```

## 2. Install Dependencies

Use `npm` to install the required dependencies:

```bash
npm install
```

This command will install all the necessary packages listed in `package.json`.

## 3. Prerequisites

Before running the project, make sure the following are installed:

- **Node.js**: The project requires Node.js version 14 or higher to run.
  - To check the Node.js version, you can run the following command:
    ```bash
    node -v
    ```
- **MongoDB**: This project uses MongoDB as the database.
  - make sure the service is running on your machine on port `27017`.

## 4. Running the Project

### 4.1 Running in Development Mode

To run the project in development mode, use the following command:

```bash
npm run dev
```
**⚠️ Make sure that the port 3000 of your device is empty**


### 4.2 Running tests

To run the test of project, first, use:

```bash
npm run test
```
**⚠️ Make sure that the port 3000 of your device is empty**

## 6. API Documentation

This project uses [Swagger](https://swagger.io/) for API documentation. To view the API docs, navigate to the following URL:

```
http://localhost:3000/documentation
```