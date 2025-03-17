import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { Web3Provider } from "@/context/Web3Provider";

export const metadata: Metadata = {
  title: 'AdChain',
  description: 'AdChain',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>
          <Toaster position="top-center" />
          <Web3Provider>
            {children}
          </Web3Provider>
        </body>
      </AuthProvider>
    </html>
  )
}