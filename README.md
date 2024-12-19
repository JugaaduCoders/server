# Node.js TypeScript Server

---

## Features

- **TypeScript Support**: Fully typed environment with a structured project setup.
- **ESLint and Prettier**: Linting and formatting tools for clean, consistent code.
- **Folder Structure**: Modular design for scalability.
- **Environment Variables**: Secure and flexible configurations using `.env`.
- **Scripts**: Ready-to-use npm scripts for development and production workflows.
- **Testing**: Jest and Supertest integration for robust testing.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>= 20.x)
- npm (>= 8.x)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JugaaduCoders/server.git
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   SERVER_PORT=3000
   DB Configs
   ```

### Running the Server

- **Development Mode**:

  ```bash
  npm run dev
  ```

  The server will start with hot-reloading enabled.

- **Production Mode**:
  1. Build the project:
     ```bash
     npm run build
     ```
  2. Start the server:
     ```bash
     npm start
     ```

### Linting and Formatting

- Run ESLint:
  ```bash
  npm run lint
  ```
- Run Prettier:
  ```bash
  npm run format
  ```

### Testing

Run all tests:

```bash
npm test
```

---

## Scripts

The following npm scripts are available:

| Script   | Description                                |
| -------- | ------------------------------------------ |
| `dev`    | Starts the server in development mode      |
| `build`  | Compiles TypeScript to JavaScript          |
| `start`  | Starts the server in production mode       |
| `lint`   | Runs ESLint to check for linting issues    |
| `format` | Runs Prettier to format the codebase       |
| `test`   | Runs unit and integration tests using Jest |

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "CommitType: Add your commit message"
   ```
4. Push your branch and create a Pull Request.

---
