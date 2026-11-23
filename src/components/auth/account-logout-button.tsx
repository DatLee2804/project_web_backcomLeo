"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccountLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="subtle"
      size="sm"
      disabled={loading}
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4 text-danger" />
      {loading ? "Đang thoát..." : "Đăng xuất"}
    </Button>
  );
}
