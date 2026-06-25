"use client" 
// layout is server component
import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "./components/Nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050505" />
        <title>Epoxy Nation Pro | Phoenix #1 Epoxy Floor Specialists</title>
        <meta name="description" content="Phoenix epoxy floor experts. Free digital estimate in 10 minutes. Powered by Xtreme Polishing Systems." />
      </head>
      <body>
        <Nav />
        {children}
        <footer className="footer">
          <div className="fi">
            <div>
              <div className="fbrand">EPOXY <span>NATION PRO</span></div>
              <p style={{fontSize:13,lineHeight:1.6}}>Phoenix most advanced epoxy and concrete coating system. Powered by Xtreme Polishing Systems.</p>
            </div>
            <div>
              <div className="fct">Services</div>
              <div className="flinks">
                <a href="/gallery">Garage Floors</a>
                <a href="/gallery">Commercial</a>
                <a href="/gallery">Patios</a>
                <a href="/gallery">Polished Concrete</a>
              </div>
            </div>
            <div>
              <div className="fct">Company</div>
              <div className="flinks">
                <a href="/about">About Us</a>
                <a href="/contact">Contact</a>
                <a href="/digital-bid">Get a Quote</a>
                <a href="/customer-portal/dashboard">My Dashboard</a>
              </div>
            </div>
          </div>
          <div className="fbtm">
            <span>© 2026 Epoxy Nation Pro. All rights reserved.</span>
            <span>Powered by <a href="https://xtremepolishingsystems.com" target="_blank" rel="noopener noreferrer">Xtreme Polishing Systems</a></span>
          </div>
        </footer>
      </body>
    </html>
  );
}