# GitHub Profile Analyzer API

A professional backend service that analyzes GitHub user profiles using the GitHub public API and stores useful insights in a MySQL database.

## 🚀 Features

- **Fetch GitHub Profile Data**: Retrieve comprehensive profile information using GitHub username
- **Store Insights**: Save valuable metrics including:
  - Public repository count
  - Followers and following count
  - Account creation date
  - User bio, location, company, and blog
  - Repository analysis (total stars, forks, top programming languages)
- **Database Persistence**: Store all analyzed profiles in MySQL database
- **RESTful API**: Clean and intuitive API endpoints
- **Error Handling**: Robust error handling with meaningful error messages
- **Input Validation**: Validate all incoming requests

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **GitHub API** - Third-party API for profile data
- **Axios** - HTTP client for API requests
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn package manager
- GitHub Personal Access Token (optional but recommended)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd github-profile-analyzer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MySQL Database

#### Option A: Using MySQL Command Line

```bash
mysql -u root -p < database/schema.sql
```

#### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open the `database/schema.sql` file
4. Execute the SQL script

This will create a database named `github_analyzer` with a `profiles` table.

### 4. Configure Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

# GitHub API Configuration
# Get your token from: https://github.com/settings/tokens
GITHUB_TOKEN=your_github_token_here
```

### 5. Get GitHub Personal Access Token (Optional but Recommended)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes: `public_repo` (or `read:user` for more data)
4. Generate and copy the token
5. Paste it in your `.env` file

**Note**: Without a token, GitHub API has rate limits (60 requests/hour). With a token, you get 5,000 requests/hour.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

This uses `nodemon` for auto-restart on file changes.

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Analyze GitHub Profile
```http
POST /api/profiles/analyze/:username
```

**Parameters:**
- `username` (path parameter) - GitHub username

**Example:**
```bash
curl -X POST http://localhost:3000/api/profiles/analyze/octocat
```

**Response:**
```json
{
  "success": true,
  "message": "Profile analyzed and saved successfully",
  "data": {
    "id": 1,
    "username": "octocat",
    "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
    "name": "The Octocat",
    "bio": "GitHub mascot",
    "public_repos": 8,
    "followers": 5000,
    "following": 6,
    "created_at": "2011-01-25T18:44:36Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "location": "San Francisco",
    "company": "GitHub",
    "blog": "https://github.blog",
    "email": null,
    "type": "User",
    "site_admin": false
  }
}
```

#### 3. Get All Profiles
```http
GET /api/profiles
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "username": "octocat",
      "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
      "name": "The Octocat",
      "public_repos": 8,
      "followers": 5000,
      "following": 6,
      "created_at": "2011-01-25T18:44:36Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 4. Get Profile by Username
```http
GET /api/profiles/username/:username
```

**Parameters:**
- `username` (path parameter) - GitHub username

**Example:**
```bash
curl http://localhost:3000/api/profiles/username/octocat
```

#### 5. Get Profile by ID
```http
GET /api/profiles/:id
```

**Parameters:**
- `id` (path parameter) - Profile ID from database

**Example:**
```bash
curl http://localhost:3000/api/profiles/1
```

#### 6. Delete Profile
```http
DELETE /api/profiles/:username
```

**Parameters:**
- `username` (path parameter) - GitHub username

**Example:**
```bash
curl -X DELETE http://localhost:3000/api/profiles/octocat
```

## 📊 Database Schema

### Profiles Table

| Column | Type | Description |
|--------|------|-------------|
| id | INT AUTO_INCREMENT | Primary key |
| username | VARCHAR(255) | GitHub username (unique) |
| avatar_url | TEXT | Profile avatar URL |
| name | VARCHAR(255) | Display name |
| bio | TEXT | User bio |
| public_repos | INT | Number of public repositories |
| followers | INT | Number of followers |
| following | INT | Number of following |
| created_at | DATETIME | Account creation date |
| updated_at | DATETIME | Last update timestamp |
| location | VARCHAR(255) | User location |
| company | VARCHAR(255) | Company name |
| blog | TEXT | Blog URL |
| email | VARCHAR(255) | Email address |
| type | VARCHAR(50) | Account type (User/Organization) |
| site_admin | TINYINT(1) | Site admin flag |

## 🧪 Testing with Postman

A Postman collection is provided in the repository for easy testing:

1. Import `postman-collection.json` into Postman
2. Set up environment variables if needed
3. Run the requests to test the API

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| NODE_ENV | Environment (development/production) | development |
| DB_HOST | MySQL host | localhost |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | (empty) |
| DB_NAME | Database name | github_analyzer |
| GITHUB_TOKEN | GitHub API token | (empty) |

## 📝 Project Structure

```
github-profile-analyzer/
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   └── profileController.js # Request handlers
├── database/
│   └── schema.sql           # Database schema
├── middleware/
│   └── errorHandler.js      # Error handling middleware
├── models/
│   └── Profile.js           # Database model
├── routes/
│   └── profileRoutes.js     # API routes
├── services/
│   └── githubService.js     # GitHub API service
├── .env.example             # Environment variables example
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── README.md               # This file
└── server.js               # Application entry point
```

## 🐛 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: User or profile not found
- **500 Internal Server Error**: Server-side errors

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

## 🔮 Future Enhancements

Potential improvements for the project:

- [ ] Add authentication/authorization
- [ ] Implement caching for GitHub API responses
- [ ] Add pagination for profile list
- [ ] Support for analyzing multiple users at once
- [ ] Add repository language statistics
- [ ] Implement rate limiting
- [ ] Add unit and integration tests
- [ ] Docker support for easy deployment
- [ ] GraphQL API alternative
- [ ] Webhook support for real-time updates

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built as a Node.js Intern assignment.

## 🙏 Acknowledgments

- GitHub API for providing profile data
- Express.js community for excellent documentation
- MySQL for reliable database solution

---

**Note**: This is a demonstration project. For production use, consider adding additional security measures, logging, monitoring, and testing.
