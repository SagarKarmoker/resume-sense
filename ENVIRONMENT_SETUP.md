# Environment Setup Guide

The ResumeSense application requires several environment variables to function properly. Create a `.env.local` file in the root directory with the following variables:

## Required Environment Variables

### Clerk Authentication
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret_here
```

### Database
```env
DATABASE_URL="postgresql://username:password@localhost:5432/resumesense"
```

### AWS S3 Configuration
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key_here
AWS_S3_BUCKET_NAME=your_s3_bucket_name_here
```

### Google Gemini AI
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### OpenAI (Alternative AI Provider)
```env
AIMLAPI_KEY=your_aimlapi_key_here
```

### Next.js
```env
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## How to Get These Values

### Clerk Authentication
1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Get your publishable key and secret key from the dashboard
4. Set up webhooks and get the webhook secret

### Database
1. Set up a PostgreSQL database (local or cloud)
2. Update the DATABASE_URL with your database credentials

### AWS S3
1. Create an AWS account
2. Create an S3 bucket for file storage
3. Create an IAM user with S3 access
4. Get the access key ID and secret access key
5. Note your AWS region and bucket name

### Google Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key to your environment variables

### OpenAI (AIMLAPI)
1. Go to [AIMLAPI](https://aimlapi.com)
2. Sign up for an account
3. Get your API key from the dashboard
4. Copy the API key to your environment variables

## AI Provider Fallback System

The application now supports multiple AI providers with intelligent fallback:

1. **Primary**: Google Gemini AI
2. **Secondary**: OpenAI GPT-4o (via AIMLAPI)
3. **Fallback**: Local analysis with comprehensive skill detection

If one AI provider fails (due to quota limits, API errors, etc.), the system automatically tries the next available provider.

## Current Error
The 500 error you're experiencing is likely due to missing environment variables. The application will now provide more specific error messages to help identify which variables are missing.

After setting up the environment variables:
1. Restart your development server
2. Try uploading and analyzing a resume again
3. Check the console logs for specific error messages