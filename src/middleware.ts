// import { authMiddleware } from '@clerk/nextjs';

// // This example protects all routes including api/trpc routes
// // Please edit this to allow other routes to be public as needed.
// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
// export default authMiddleware({
//       publicRoutes: ['/api/create-user', '/', '/pokemon(.*)', '/sets(.*)'],
//       ignoredRoutes: ['/api/create-user']

// });

import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

const publicRoutes = ['/api/create-user', '/', '/pokemon(.*)', '/sets(.*)', '/signup', '/signin']
// const ignoredRoutes = ['/api/create-user']

const isPublic = (path: string) => {
      return publicRoutes.find((x) =>
        path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
      );
    };




export default withClerkMiddleware((req: NextRequest) => {

      if (isPublic(req.nextUrl.pathname)) {
            return NextResponse.next();
          }

const { userId } = getAuth(req);
if (!userId) {
      // redirect the users to /pages/sign-in/[[...index]].ts
   
      const signInUrl = new URL("/signin", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  });


export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 