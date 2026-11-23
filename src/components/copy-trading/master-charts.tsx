"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EquityPoint, MonthlyReturnPoint } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface MasterChartsProps {
  equityCurve: EquityPoint[];
  monthlyReturns: MonthlyReturnPoint[];
  isDemo?: boolean;
}

export function MasterCharts({
  equityCurve,
  monthlyReturns,
  isDemo = true,
}: MasterChartsProps) {
  const tagSuffix = isDemo ? " (Demo)" : "";

  return (
    <div className="space-y-8">
      {/* 3. Equity Curve */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-heading text-lg font-bold text-ink-primary">
              Biểu đồ Đường cong Vốn — Equity vs Balance
            </h3>
            <p className="text-xs text-ink-muted">
              Đơn vị: USD{" "}
              {isDemo
                ? "• Dữ liệu mô phỏng giao diện DEMO"
                : "• Dữ liệu hồ sơ chiến lược"}
            </p>
          </div>
          {isDemo ? (
            <Badge variant="demo">BIỂU ĐỒ MINH HỌA DEMO</Badge>
          ) : (
            <Badge variant="gold">EQUITY ANALYTICS</Badge>
          )}
        </div>

        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={equityCurve}
              margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="oceanEquityGrad"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.36} />
                  <stop offset="95%" stopColor="#00C2FF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(56,214,255,0.08)"
              />
              <XAxis
                dataKey="period"
                stroke="#5C7394"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="#5C7394"
                fontSize={12}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#061120",
                  borderColor: "rgba(0,194,255,0.45)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#F2F8FF",
                }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                name={`Balance${tagSuffix}`}
                stroke="#94A8C4"
                strokeDasharray="4 4"
                fill="none"
                strokeWidth={1.8}
              />
              <Area
                type="monotone"
                dataKey="equity"
                name={`Equity${tagSuffix}`}
                stroke="#00C2FF"
                fillOpacity={1}
                fill="url(#oceanEquityGrad)"
                strokeWidth={2.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 4 & 5. Monthly Returns + Drawdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-heading text-base font-bold text-ink-primary">
                Biến động theo tháng — Monthly Returns (%)
              </h3>
              <p className="text-xs text-ink-muted">
                Tỷ suất biến động lợi nhuận qua từng tháng giao dịch
              </p>
            </div>
            {isDemo ? (
              <Badge variant="demo">DEMO</Badge>
            ) : (
              <Badge variant="neutral">MONTHLY</Badge>
            )}
          </div>

          <div className="mt-5 h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyReturns}
                margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(56,214,255,0.08)"
                />
                <XAxis
                  dataKey="month"
                  stroke="#5C7394"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#5C7394"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#061120",
                    borderColor: "rgba(0,194,255,0.3)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [
                    `${value > 0 ? "+" : ""}${value}%${tagSuffix}`,
                    "Biến động tháng",
                  ]}
                />
                <Bar dataKey="returnPct" radius={[5, 5, 0, 0]}>
                  {monthlyReturns.map((entry, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={entry.returnPct >= 0 ? "#00C2FF" : "#FF5A6E"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-heading text-base font-bold text-ink-primary">
                Biểu đồ Sụt giảm Vốn — Drawdown Curve (%)
              </h3>
              <p className="text-xs text-ink-muted">
                Theo dõi biên độ sụt giảm tài sản tạm thời qua các chu kỳ
              </p>
            </div>
            {isDemo ? (
              <Badge variant="demo">DEMO</Badge>
            ) : (
              <Badge variant="danger">DRAWDOWN</Badge>
            )}
          </div>

          <div className="mt-5 h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={equityCurve}
                margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5A6E" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#FF5A6E" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(56,214,255,0.08)"
                />
                <XAxis
                  dataKey="period"
                  stroke="#5C7394"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#5C7394"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#061120",
                    borderColor: "rgba(255,90,110,0.4)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [
                    `${value}%${tagSuffix}`,
                    "Drawdown",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#FF5A6E"
                  fill="url(#ddGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
