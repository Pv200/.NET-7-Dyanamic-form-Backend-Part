# .NET-7-Dyanamic-form-Backend-Part

# Express Backend with TypeScript and JSON Database

## Overview

This project sets up an Express backend using TypeScript and uses a JSON file as a database for storing submissions.

## Prerequisites

- Node.js and npm installed
- Visual Studio Code

## Project Structure

-express-ts-app
- ├── src
- │ ├── routes
- │ │ └── submission.ts
- │ ├── db.json
- │ └── index.ts
- ├── tsconfig.json
- ├── package.json
- └── nodemon.json


## Setup Instructions

### Step 1: Initialize Project

1. **Open VSCode and create a new folder for your project:**
   ```bash
   mkdir express-ts-app
   cd express-ts-app

2. **Initialize a new Node.js project:**
    ```bash
    npm init -y

3. **Install the necessary dependencies:**
   ```bash
   npm install express body-parser
   
   npm install -D typescript @types/express @types/node ts-node nodemon

4. **Initialize a TypeScript configuration file:**
   ```bash
   npx tsc --init

5. **Update your 'tsconfig.json':**
   ```bash
   Open the tsconfig.json file and replace its content with the following configuration:
   {
      "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "outDir": "./dist",
        "rootDir": "./src",
        "strict": true,
        "esModuleInterop": true
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules"]
    }

###Step 2: Create Project Files

1. **Create the project structure:**
   ```bash
   mkdir -p src/routes
   touch src/routes/submission.ts src/db.json src/index.ts
   touch nodemon.json

2. **Setup Nodemon for Development:**
   ```bash
   Create nodemon.json in the root directory:
   {
      "watch": ["src"],
      "ext": "ts",
      "exec": "ts-node ./src/index.ts"
   }

3. **Create db.json in the src folder:**
   ```bash
   Create a db.json file inside the src folder with the following initial content:
   {
      "submissions": []
   }

4. **adjust the  'submission.ts' code on your os. **
5. **adjust the  'index.ts' code on your os. **

6. **Start your server:**
   ```bash
   npx nodemon

 

   






