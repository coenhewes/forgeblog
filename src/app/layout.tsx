import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import {
  StructuredData,
  buildOrganizationSchema,
} from "@/components/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_NAME} — a statically generated blog with scheduled publishing.`,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <StructuredData data={buildOrganizationSchema()} />
        {children}
        {/* Analytics: add your analytics script here */}
      </body>
    </html>
  );
}
