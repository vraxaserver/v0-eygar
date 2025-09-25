import { NextResponse } from "next/server";

export function middleware(request) {
    // 1. Specify the protected routes
    const protectedRoutes = ["/become-a-host", "/dashboard"];
    const { pathname } = request.nextUrl;

    // 2. Check if the user is trying to access a protected route
    if (protectedRoutes.some((path) => pathname.startsWith(path))) {
        // 3. Get the token from the cookies
        const token = request.cookies.get("accessToken"); // We will create this cookie on login

        // 4. If there's no token, redirect to the login page
        if (!token) {
            const loginUrl = new URL("/login", request.url);
            // Optionally, add a 'from' query param to redirect back after login
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // 5. If the route is not protected or the user has a token, continue
    return NextResponse.next();
}

// This config ensures the middleware runs only on the specified paths
export const config = {
    matcher: ["/become-a-host/:path*", "/dashboard/:path*"],
};
