# Music Academy 🎵

A full-stack music academy web application where users can explore, browse, and enroll in music courses. Built with Next.js, Tailwind CSS, TypeScript, Aceternity UI for the frontend, and Express.js with MongoDB for the backend.

![Preview](https://github.com/user-attachments/assets/42a38b98-0b62-4191-bc69-1e0f024138ad)

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)

## Demo
[Live Demo](https://aman-music-academy.vercel.app)

## Features
- 🎨 Responsive and modern UI design
- 🎸 Course listing with detailed course pages
- 🛒 Course enrollment/purchase system
- 📱 Mobile-friendly design
- ✨ Aceternity UI components with animations
- 📧 Contact form submission
- 🔐 Admin authentication for managing data
- 🛡️ Rate limiting and security features

## Technologies Used

### Frontend (Website)
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Aceternity UI** - Modern UI components
- **Framer Motion** - Animations

### Backend (Server)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Zod** - Input validation
- **Helmet** - Security middleware
- **express-rate-limit** - Rate limiting

## Project Structure

```
Music-Academy/
├── website/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/            # App router pages
│   │   │   ├── courses/    # Course pages
│   │   │   │   └── [slug]/ # Dynamic course detail page
│   │   │   ├── checkout/   # Checkout/enrollment page
│   │   │   └── contact/    # Contact page
│   │   ├── components/     # React components
│   │   │   └── ui/         # Aceternity UI components
│   │   └── data/           # JSON data files
│   └── public/             # Static assets
│
└── server/                  # Backend (Express.js)
    ├── app/
    │   ├── admin/          # Admin authentication
    │   ├── contact/        # Contact form API
    │   └── purchase/       # Course purchase API
    ├── config/             # Database & environment config
    ├── middlewares/        # Auth & rate limiting
    └── index.js            # Server entry point
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/aman-sinha-dev/Music-Academy.git
cd Music-Academy
```

### 2. Setup Backend (Server)
```bash
cd server
npm install
```

Create a `.env` file in the server directory by copying `sample.env`:
```bash
cp sample.env .env
```
Update the `MONGO_URI` and `JWT_SECRET` with your own credentials in the `.env` file.

Start the server:
```bash
npm run dev
```

### 3. Setup Frontend (Website)
```bash
cd website
npm install
```

Create a `.env` file in the website directory by copying `sample.env`:
```bash
cp sample.env .env
```
Ensure `BACKEND_URL` points to your running server (default: `http://localhost:8000`).

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Admin Setup
To access the admin dashboard, you need to create an admin account. Run the following command in the `server` directory:

```bash
node seed.js
```
This will create a default admin with:
- **Email:** `admin@gmail.com`
- **Password:** `123456`

You can now log in at `http://localhost:3000/admin/login`.

## API Endpoints

### Base URL: `http://localhost:5000`

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Check if API is running |

### Contact API
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/contact` | Submit contact form | No |
| GET | `/contact` | Get all contacts | Admin |

**POST /contact - Request Body:**
```json
{
  "name": "Aman Sinha",
  "email": "contactamankumarsinha@gmail.com",
  "phone": "+1234567890",
  "subject": "Course Inquiry",
  "message": "I would like to know more about..."
}
```

### Purchase API
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/purchase` | Submit course purchase | No |
| GET | `/purchase` | Get all purchases | Admin |
| GET | `/purchase/email/:email` | Get purchases by email | Admin |

**POST /purchase - Request Body:**
```json
{
  "name": "Aman Sinha",
  "email": "contactamankumarsinha@gmail.com",
  "phone": "+1234567890",
  "courseSlug": "guitar-fundamentals",
  "courseTitle": "Guitar Fundamentals",
  "coursePrice": 99.99
}
```

### Admin API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/login` | Admin login |
| POST | `/admin/register` | Admin registration |

## Usage

### Running the Application

1. **Start the Backend Server:**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:5000`

2. **Start the Frontend:**
   ```bash
   cd website
   npm run dev
   ```
   Website runs on `http://localhost:3000`

### Available Pages
- **Home** - `/` - Landing page with featured courses
- **All Courses** - `/courses` - Browse all available courses
- **Course Details** - `/courses/[slug]` - Individual course page
- **Checkout** - `/checkout?course=[slug]` - Enroll in a course
- **Contact** - `/contact` - Contact form

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Aman Kumar Sinha](https://github.com/aman-sinha-dev)
