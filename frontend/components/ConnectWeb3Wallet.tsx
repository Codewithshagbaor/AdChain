"use client";

import { ConnectKitButton } from "connectkit";

export function CustomConnectWallet() {
    const customTheme = {
        "--ck-connectbutton-background": "linear-gradient(to right, #3B82F6, #1E40AF)", // Gradient background
        "--ck-connectbutton-color": "white", // Text color
        "--ck-connectbutton-border-radius": "8px", // Rounded corners
      };
      
    return <ConnectKitButton customTheme={customTheme} />;
}