import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export default async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;

    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const isAuthenticated = !!session; // true pr false

    if (pathname.startsWith("/auth") && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}