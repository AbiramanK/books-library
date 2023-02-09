"use client";

import { SnackbarProvider } from "notistack";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </body>
    </html>
  );
}
