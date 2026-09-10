import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:{default:"WONY",template:"%s · WONY"},description:"WONY Growtopia Private Server companion app"};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="id"><body>{children}</body></html>; }
