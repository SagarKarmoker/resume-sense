# ResumeSense 🤖

**AI-Powered Resume Analysis & Job Matching Platform**

ResumeSense is a modern web application that leverages advanced AI to analyze resumes, extract skills, provide quality scoring, and match candidates with relevant job opportunities. Built with Next.js 15, TypeScript, and powered by Google Gemini AI with OpenAI fallback.

![ResumeSense Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.10.1-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Resume Analysis**: Extract skills, experience, and education using Google Gemini AI
- **Quality Scoring**: Comprehensive resume scoring based on content, formatting, and presentation
- **Smart Suggestions**: Personalized recommendations for resume improvement
- **Job Matching**: Match resumes with relevant job opportunities
- **Keyword Analysis**: ATS-optimized keyword density analysis
- **Grammar & Format Checking**: Automated proofreading and formatting suggestions

### 🚀 Advanced Features
- **Multi-AI Provider Support**: Gemini AI with OpenAI fallback for reliability
- **File Format Support**: PDF and DOCX resume uploads
- **Real-time Processing**: Live upload progress and analysis status
- **Dashboard Analytics**: Comprehensive statistics and insights
- **Secure Authentication**: Clerk-powered user management
- **Cloud Storage**: AWS S3 integration for file management

### 📊 Dashboard Features
- **Overview Tab**: Summary statistics and recent activities
- **Analyses Tab**: Detailed resume analysis results
- **Suggestions Tab**: Improvement recommendations
- **Job Matches Tab**: Matched job opportunities
- **Resume Management**: Upload, view, and manage multiple resumes

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.4** - React framework with App Router
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend & Database
- **Prisma 6.10.1** - Database ORM
- **PostgreSQL** - Primary database
- **Next.js API Routes** - Serverless API endpoints

### AI & External Services
- **Google Gemini AI** - Primary AI analysis provider
- **OpenAI GPT-4o** - Fallback AI provider (via AIMLAPI)
- **AWS S3** - File storage and management
- **Clerk** - Authentication and user management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Prisma Studio** - Database management

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js 18+** installed
- **PostgreSQL** database (local or cloud)
- **AWS Account** with S3 bucket
- **Google AI Studio** account for Gemini API
- **Clerk** account for authentication
- **AIMLAPI** account (optional, for OpenAI fallback)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resume-sense.git
cd resume-sense
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret_here

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/resumesense"

# AWS S3 Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_S3_BUCKET_NAME=your_s3_bucket_name_here

# AI Providers
GEMINI_API_KEY=your_gemini_api_key_here
AIMLAPI_KEY=your_aimlapi_key_here

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# (Optional) Open Prisma Studio
npm run db:studio
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
resume-sense/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── analyze/              # Resume analysis endpoint
│   │   ├── dashboard/            # Dashboard data endpoint
│   │   ├── resumes/              # Resume management endpoints
│   │   ├── upload/               # File upload endpoint
│   │   └── webhooks/             # Webhook handlers
│   ├── auth/                     # Authentication pages
│   ├── components/               # Reusable components
│   │   └── dashboard/            # Dashboard-specific components
│   ├── dashboard/                # Main dashboard page
│   └── resume/                   # Resume viewing page
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication utilities
│   ├── extractText.ts            # Text extraction from files
│   ├── gemini.ts                 # Gemini AI integration
│   ├── openai.ts                 # OpenAI integration
│   ├── prisma.ts                 # Database client
│   └── utils.ts                  # General utilities
├── prisma/                       # Database schema and migrations
│   ├── migrations/               # Database migration files
│   └── schema.prisma             # Database schema
└── public/                       # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio
npm run db:reset         # Reset database
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **User**: User accounts and authentication
- **Resume**: Uploaded resume files and metadata
- **Analysis**: AI analysis results and scores
- **JobMatch**: Job matching results and recommendations

### Key Relationships
- Users can have multiple resumes
- Each resume can have multiple analyses
- Resumes can be matched with multiple jobs
- All data is properly linked with foreign key relationships

## 🤖 AI Analysis Features

### Resume Analysis Types
1. **Skills Extraction**: Identify and categorize technical and soft skills
2. **Experience Analysis**: Analyze work history and achievements
3. **Education Analysis**: Evaluate educational background
4. **Overall Assessment**: Comprehensive resume scoring
5. **Job Compatibility**: Match resume with specific job requirements

### AI Provider Fallback System
The application implements a robust fallback system:

1. **Primary**: Google Gemini AI (fastest and most reliable)
2. **Secondary**: OpenAI GPT-4o via AIMLAPI
3. **Fallback**: Local analysis with comprehensive skill detection

This ensures high availability even when AI services experience issues.

## 🔐 Authentication & Security

- **Clerk Integration**: Secure user authentication and management
- **JWT Tokens**: Stateless authentication
- **Role-based Access**: User-specific data isolation
- **Secure File Upload**: S3 presigned URLs for direct upload
- **Input Validation**: Comprehensive request validation

## 📤 File Upload Process

1. **Client-side Validation**: File type and size checks
2. **S3 Presigned URL**: Secure direct upload to AWS S3
3. **Text Extraction**: Extract text from PDF/DOCX files
4. **AI Analysis**: Process content with AI providers
5. **Database Storage**: Save results and metadata
6. **Real-time Updates**: Live progress tracking

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Mobile-first design approach
- **Dark/Light Mode**: Theme support (planned)
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Progress Indicators**: Real-time upload and processing status

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform supporting Next.js:
- **Netlify**: Static site generation
- **Railway**: Full-stack deployment
- **AWS**: Custom infrastructure
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Test thoroughly before submitting PRs

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Environment Setup Guide](ENVIRONMENT_SETUP.md)
2. Review the console logs for specific error messages
3. Ensure all environment variables are properly configured
4. Verify database connectivity and migrations
5. Check AI provider API keys and quotas

## 🔮 Roadmap

- [ ] Dark mode support
- [ ] Resume templates
- [ ] Advanced job matching algorithms
- [ ] Email notifications
- [ ] Team collaboration features
- [ ] API rate limiting
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Clerk** for seamless authentication
- **Prisma** for excellent database tooling
- **Tailwind CSS** for beautiful styling
- **Next.js** team for the amazing framework

---

**Made with ❤️ by the ResumeSense Team**

For questions and support, please open an issue on GitHub.
