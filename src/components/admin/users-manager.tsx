"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Trash2, User } from "lucide-react";
import type { AppUser, UserRole } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SafeUser = Omit<AppUser, "passwordHash">;

export function UsersManager({ initialItems }: { initialItems: SafeUser[] }) {
  const router = useRouter();
  const [items, setItems] = React.useState<SafeUser[]>(initialItems);

  const handleRoleChange = async (id: string, nextRole: UserRole) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, role: nextRole }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: nextRole } : u))
      );
      router.refresh();
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (
      !window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${email}" không?`)
    ) {
      return;
    }
    const res = await fetch(`/api/admin/users?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((prev) => prev.filter((u) => u.id !== id));
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="gold">REGISTERED MEMBERS</Badge>
        <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
          Quản lý Tài khoản Thành viên &amp; Phân quyền
        </h1>
        <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
          Danh sách người dùng đăng ký qua Email hoặc Google OAuth. Bạn có thể
          cấp quyền Admin cho thành viên tin cậy.
        </p>
      </div>

      {items.length === 0 ? (
        <Card className="p-10 text-center text-sm text-ink-secondary">
          Chưa có thành viên nào đăng ký tài khoản trên hệ thống.
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((u) => (
            <Card
              key={u.id}
              className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3.5">
                {u.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={u.avatarUrl}
                    alt={u.fullName}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
                    {u.role === "admin" ? (
                      <ShieldCheck className="h-5 w-5" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </span>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading text-base font-bold text-ink-primary">
                      {u.fullName}
                    </span>
                    {u.role === "admin" ? (
                      <Badge variant="featured">ADMIN</Badge>
                    ) : (
                      <Badge variant="neutral">MEMBER</Badge>
                    )}
                    <Badge variant="gold">
                      {u.provider === "google" ? "Google" : "Email"}
                    </Badge>
                  </div>
                  <div className="mt-0.5 text-xs text-ink-secondary">
                    {u.email}
                    {u.phoneOrZalo ? ` • SĐT/Zalo: ${u.phoneOrZalo}` : ""} •{" "}
                    {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <select
                  value={u.role}
                  onChange={(e) =>
                    handleRoleChange(u.id, e.target.value as UserRole)
                  }
                  className="h-9 rounded-lg border border-line-strong bg-background-secondary px-3 text-xs font-semibold text-ink-primary"
                >
                  <option value="user">Quyền: Thành viên (User)</option>
                  <option value="admin">Quyền: Quản trị viên (Admin)</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleDelete(u.id, u.email)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 bg-danger-muted text-danger hover:bg-danger/20"
                  title="Xóa tài khoản"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
