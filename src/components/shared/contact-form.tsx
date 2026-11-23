"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Info,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { getOrderedBrokers } from "@/data/brokers";
import type { Broker } from "@/types";
import { SITE_CONFIG } from "@/lib/seo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập họ và tên (tối thiểu 2 ký tự).")
    .max(80, "Họ và tên không vượt quá 80 ký tự."),
  email: z
    .string()
    .trim()
    .email("Địa chỉ Email không đúng định dạng (ví dụ: trader@domain.com)."),
  phoneOrZalo: z
    .string()
    .trim()
    .regex(
      /^(0|\+84)[0-9]{8,11}$/,
      "Vui lòng nhập số điện thoại / Zalo hợp lệ tại Việt Nam (9–12 chữ số)."
    ),
  interestedBroker: z
    .string()
    .min(1, "Vui lòng chọn sàn giao dịch hoặc nội dung bạn quan tâm."),
  message: z
    .string()
    .trim()
    .min(10, "Vui lòng mô tả nhu cầu chi tiết hơn (tối thiểu 10 ký tự).")
    .max(1000, "Nội dung tin nhắn không vượt quá 1000 ký tự."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  defaultBroker?: string;
  brokersList?: Broker[];
}

export function ContactForm({
  defaultBroker = "austex",
  brokersList,
}: ContactFormProps) {
  const brokers = React.useMemo(
    () => brokersList ?? getOrderedBrokers(),
    [brokersList]
  );
  const [validatedPayload, setValidatedPayload] =
    React.useState<ContactFormValues | null>(null);
  const [savedToDatabase, setSavedToDatabase] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneOrZalo: "",
      interestedBroker: brokers.some((b) => b.slug === defaultBroker)
        ? defaultBroker
        : "austex",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    let dbOk = false;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok?: boolean; savedToDb?: boolean };
      dbOk = Boolean(res.ok && data.savedToDb);
    } catch {
      dbOk = false;
    }

    setSavedToDatabase(dbOk);
    setValidatedPayload(values);
    setCopied(false);
  };

  const formattedSummary = React.useMemo(() => {
    if (!validatedPayload) return "";
    const brokerName =
      brokers.find((b) => b.slug === validatedPayload.interestedBroker)?.name ??
      validatedPayload.interestedBroker;
    return [
      `[YÊU CẦU TƯ VẤN - BACKCOM MR LEO]`,
      `- Họ tên: ${validatedPayload.fullName}`,
      `- Email: ${validatedPayload.email}`,
      `- SĐT / Zalo: ${validatedPayload.phoneOrZalo}`,
      `- Quan tâm: ${brokerName}`,
      `- Nội dung: ${validatedPayload.message}`,
    ].join("\n");
  }, [validatedPayload, brokers]);

  const copySummary = async () => {
    if (!formattedSummary) return;
    try {
      await navigator.clipboard.writeText(formattedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-ink-primary">
            Biểu mẫu Liên hệ &amp; Đăng ký Tư vấn
          </h2>
          <p className="mt-1 text-xs text-ink-muted">
            Tuyệt đối không nhập mật khẩu tài khoản giao dịch vào biểu mẫu này.
          </p>
        </div>
        <Badge variant="gold">CRM Connected</Badge>
      </div>

      {validatedPayload ? (
        <div className="mt-6 space-y-5">
          {savedToDatabase ? (
            <div className="rounded-card border border-success/40 bg-success-muted p-4 text-xs leading-relaxed text-ink-primary sm:text-sm">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <strong className="text-success">
                    Đã gửi yêu cầu tư vấn thành công!
                  </strong>{" "}
                  Thông tin của bạn đã được lưu trực tiếp vào hệ thống quản trị
                  Backcom Mr Leo. Đội ngũ sẽ liên hệ sớm qua SĐT/Zalo của bạn,
                  hoặc bạn có thể bấm nút Zalo bên dưới để trò chuyện ngay.
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-card border border-vip/35 bg-vip/10 p-4 text-xs leading-relaxed text-ink-primary sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-vip" />
                <div>
                  <strong className="text-vip-light">
                    Đã chuẩn hóa phiếu yêu cầu tư vấn:
                  </strong>{" "}
                  Bạn vui lòng sao chép nội dung bên dưới và gửi vào Zalo Hỗ trợ
                  chính thức để đội ngũ phản hồi ngay lập tức.
                </div>
              </div>
            </div>
          )}

          <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-line bg-background-secondary p-4 font-sans text-xs leading-relaxed text-ink-primary sm:text-sm">
            {formattedSummary}
          </pre>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" variant="secondary" onClick={copySummary}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-success" />
                  Đã sao chép nội dung
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gold" />
                  Sao chép nội dung yêu cầu
                </>
              )}
            </Button>

            <a
              href={SITE_CONFIG.zaloGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              <MessageCircle className="h-4 w-4" />
              Mở Zalo Hỗ trợ ngay
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setValidatedPayload(null);
                reset();
              }}
            >
              <RotateCcw className="h-4 w-4" />
              Gửi yêu cầu khác
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                Họ và tên (Full Name) *
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Nguyễn Văn A"
                {...register("fullName")}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
              />
              {errors.fullName && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                Email liên hệ *
              </label>
              <input
                id="email"
                type="email"
                placeholder="ban@domain.com"
                {...register("email")}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="phoneOrZalo"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                Số điện thoại / Zalo *
              </label>
              <input
                id="phoneOrZalo"
                type="tel"
                placeholder="0901234567"
                {...register("phoneOrZalo")}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
              />
              {errors.phoneOrZalo && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.phoneOrZalo.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="interestedBroker"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                Sàn giao dịch / Sản phẩm quan tâm *
              </label>
              <select
                id="interestedBroker"
                {...register("interestedBroker")}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary focus:border-gold focus:outline-none"
              >
                {brokers.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name} {b.slug === "austex" ? "(Mặc định STD05)" : ""}
                  </option>
                ))}
                <option value="bot-trading">Bot Trading (EA MT5)</option>
                <option value="indicators-tools">
                  Công cụ Trading (Indicators)
                </option>
                <option value="copy-trading">Copy Trading Master</option>
                <option value="ib-partnership">Hợp tác phát triển IB</option>
              </select>
              {errors.interestedBroker && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-danger">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {errors.interestedBroker.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
            >
              Nội dung cần hỗ trợ (Message) *
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Mô tả nhu cầu mở tài khoản mới, chuyển mã IB (chỉ ghi ID tài khoản nếu có, không ghi mật khẩu) hoặc tư vấn công cụ..."
              {...register("message")}
              className="w-full rounded-input border border-line-strong bg-background-secondary p-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
            {errors.message && (
              <p className="mt-1.5 flex items-center gap-1 text-xs text-danger">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "Đang gửi thông tin..." : "Gửi Yêu cầu Tư vấn"}
          </Button>
        </form>
      )}
    </Card>
  );
}
