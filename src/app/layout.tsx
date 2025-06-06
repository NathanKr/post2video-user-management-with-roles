import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { PageUrl } from "@/logic/enums";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "@/logic/clerk-user-data-helper-utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clerk Next.js Quickstart",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await currentUser();

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header style={{display:'flex' , gap:'10px'}}>
            <SignedOut>
              <SignInButton />
              <SignUpButton forceRedirectUrl={PageUrl.SignUpSuccess}/>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {user && <Link href={PageUrl.UserProfile}>UserProfile</Link>}
            <Link href={PageUrl.PageNotRestricted}>PageNotRestricted</Link>
            {user && <Link href={PageUrl.UserData}>UserData</Link>}
            {user && isAdmin(user) && <Link href={PageUrl.Admin}>Admin</Link>}
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
