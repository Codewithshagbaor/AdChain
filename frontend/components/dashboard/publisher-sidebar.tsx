"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  FileText,
  Globe,
  Home,
  LayoutGrid,
  MessageSquare,
  Settings,
  Tag,
  Wallet,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarBase } from "@/components/dashboard/sidebar-base";

import { useAccount, useDisconnect, useBalance } from "wagmi";

interface PublisherSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export function PublisherSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: PublisherSidebarProps) {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isLoading } = useBalance({ address });

  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUSDTValue() {
      if (!data?.formatted) return;

      try {
        // Replace this with your API call to fetch the USDT value
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=your-token-id&vs_currencies=usd`
        );
        const result = await response.json();
        const tokenToUSDT = result["your-token-id"]?.usd || 0;

        setUsdtBalance((parseFloat(data.formatted) * tokenToUSDT).toFixed(2));
      } catch (error) {
        console.error("Error fetching USDT value:", error);
        setUsdtBalance(null);
      }
    }

    fetchUSDTValue();
  }, [data]);

  const formattedBalance = data?.formatted
    ? `${parseFloat(data.formatted).toFixed(2)} PTT`
    : "Loading...";

  return (
    <SidebarBase
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      walletBalance={isLoading ? "Loading..." : formattedBalance}
      walletBalanceUSD={usdtBalance ? `${usdtBalance} USDT` : "Loading..."}
      walletAction={{
        label: "Disconnect",
        icon: <Wallet className="mr-2 h-4 w-4" />,
        onClick: () => disconnect(),
      }}
    >
      <Link
        href="/dashboard/publisher"
        className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/publisher/ad-units"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <LayoutGrid className="h-4 w-4" />
        Ad Units
      </Link>
      <Link
        href="/dashboard/publisher/websites"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Globe className="h-4 w-4" />
        Websites
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <FileText className="h-4 w-4" />
        Reports
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <CreditCard className="h-4 w-4" />
        Payments
      </Link>
      <Separator className="my-2" />
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <MessageSquare className="h-4 w-4" />
        Support
      </Link>
      <Link
        href="/dashboard/publisher/settings"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </SidebarBase>
  );
}