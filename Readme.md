## File Upload and Folder Management System
This is a full-stack project that allows users to upload files, manage nested folders, and create shareable temporary links with expiration time control. The application is secured with JWT-based authentication.

### Features
JWT authentication (register, login, protected routes)

Create, rename, delete folders (supports nesting)

Upload, rename, delete files

Generate temporary shareable links with expiration time

View shared files/folders via unique link

Prisma-based schema and database management

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Rad UI
- React Router DOM
- Lucide React Icons

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Multer (File upload handling)
- Passport.js (Authentication)
- Express Validator
- JWT Authentication
- Session Management

## Project Structure

```
file-uploader/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
│
└── server/            # Node.js backend application
    ├── controllers/   # Route controllers
    ├── routes/        # API routes
    ├── uploads/       # Uploaded files storage
    ├── prisma/        # Database schema and migrations
    ├── validators/    # Input validation
    ├── config/        # Configuration files
    └── package.json   # Backend dependencies
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd file-uploader
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

4. Set up environment variables:
   - Create `.env` files in both frontend and server directories
   - Configure necessary environment variables (see .env.example files)

5. Set up the database:
```bash
cd server
npx prisma migrate dev
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Development

- Frontend development server with hot reload: `npm run dev`
- Build frontend for production: `npm run build`
- Run linting: `npm run lint`

