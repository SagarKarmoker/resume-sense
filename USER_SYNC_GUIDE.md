# User Database Sync Guide

## 🎯 **When to Add User Details to Database**

### **1. Primary Method: Webhook (Recommended)**
- **When**: User signs up for the first time
- **How**: Clerk webhook automatically creates user record
- **Location**: `app/api/webhooks/clerk/route.ts`

### **2. Fallback Method: On-Demand Creation**
- **When**: Existing users who signed up before webhook was set up
- **How**: Automatically created when they first access the app
- **Location**: `lib/auth.ts` - `getCurrentUser()` function

### **3. Manual Creation (Development Only)**
- **When**: Testing or debugging
- **How**: Direct database insertion or API call

## 🔧 **Setup Instructions**

### **1. Configure Clerk Webhook**
1. Go to your Clerk Dashboard
2. Navigate to Webhooks
3. Create a new webhook endpoint: `https://yourdomain.com/api/webhooks/clerk`
4. Select these events:
   - `user.created`
   - `user.updated` 
   - `user.deleted`
5. Copy the webhook secret to your `.env` file:
   ```
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### **2. Environment Variables**
Add these to your `.env` file:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/resume_sense"

# Clerk Webhook
CLERK_WEBHOOK_SECRET="whsec_your_webhook_secret_here"

# Existing Clerk variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_key"
CLERK_SECRET_KEY="your_key"
```

### **3. Run Database Migration**
```bash
npm run db:migrate
```

## 📋 **User Data Flow**

### **New User Sign-Up Flow:**
1. User signs up with Clerk
2. Clerk sends `user.created` webhook
3. Webhook handler creates user in database
4. User can immediately use the app

### **Existing User Access Flow:**
1. User signs in with Clerk
2. `getCurrentUser()` checks if user exists in database
3. If not found, creates user record automatically
4. User can use the app

### **User Update Flow:**
1. User updates profile in Clerk
2. Clerk sends `user.updated` webhook
3. Webhook handler updates user in database

## 🛠 **Usage Examples**

### **In API Routes:**
```typescript
import { getCurrentUserOrThrow } from '@/lib/auth';

export async function GET(req: Request) {
  const user = await getCurrentUserOrThrow();
  
  // Now you can use user.id, user.email, etc.
  const resumes = await prisma.resume.findMany({
    where: { userId: user.id }
  });
}
```

### **In Server Components:**
```typescript
import { getCurrentUser } from '@/lib/auth';

export default async function Dashboard() {
  const user = await getCurrentUser();
  
  if (!user) {
    return <div>Please sign in</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

### **In Client Components:**
```typescript
'use client';
import { useUser } from '@clerk/nextjs';

export default function UserProfile() {
  const { user } = useUser();
  
  return <div>Hello, {user?.firstName}!</div>;
}
```

## 🔍 **Testing the Setup**

### **1. Test Webhook (Development)**
Use ngrok to test webhooks locally:
```bash
npx ngrok http 3000
```
Then update your webhook URL in Clerk dashboard.

### **2. Test User Creation**
1. Sign up a new user
2. Check the database: `npm run db:studio`
3. Verify user record exists

### **3. Test Fallback Creation**
1. Delete a user from database (for testing)
2. Sign in with that user
3. Verify user is recreated automatically

## 🚨 **Important Notes**

### **Security:**
- Webhook secret must be kept secure
- Always verify webhook signatures
- Use HTTPS in production

### **Error Handling:**
- Webhook failures are logged
- Fallback creation handles edge cases
- Database errors are caught and logged

### **Performance:**
- User lookup is cached by Prisma
- Webhook processing is asynchronous
- Fallback creation only happens once per user

## 🔧 **Troubleshooting**

### **User Not Found Errors:**
1. Check if webhook is configured correctly
2. Verify webhook secret in `.env`
3. Check webhook logs in Clerk dashboard
4. Use fallback creation as backup

### **Database Connection Issues:**
1. Verify `DATABASE_URL` is correct
2. Run `npm run db:generate` to regenerate client
3. Check database is running and accessible

### **Webhook Not Firing:**
1. Verify webhook URL is correct
2. Check webhook is enabled in Clerk dashboard
3. Test with ngrok for local development
4. Check server logs for errors 