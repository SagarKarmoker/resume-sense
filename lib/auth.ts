import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return null;
    }

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    // If user doesn't exist in database, create them (fallback for existing users)
    if (!user) {
      const primaryEmail = clerkUser.emailAddresses.find(email => email.id === clerkUser.primaryEmailAddressId);
      
      if (!primaryEmail) {
        console.error('No primary email found for user:', clerkUser.id);
        return null;
      }

      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: primaryEmail.emailAddress,
          name: clerkUser.firstName && clerkUser.lastName 
            ? `${clerkUser.firstName} ${clerkUser.lastName}` 
            : clerkUser.firstName || clerkUser.lastName || null,
        },
      });

      console.log('Created user in database (fallback):', user.id);
    }

    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function getCurrentUserOrThrow() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
} 