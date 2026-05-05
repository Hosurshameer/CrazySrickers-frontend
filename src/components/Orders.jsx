import React from "react";
import apiClient from "../api/apiClient";
import { Link, useLoaderData } from "react-router-dom";
import BackToHome from "./BackToHome";

function formatCurrency(value) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function getStatusClasses(status) {
  const normalizedStatus = status?.toLowerCase() || "";

  if (normalizedStatus.includes("created")) {
    return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/25 dark:bg-sky-500/10 dark:text-sky-200";
  }

  if (normalizedStatus.includes("cancelled") || normalizedStatus.includes("fail")) {
    return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/25 dark:bg-rose-500/10 dark:text-rose-200";
  }

  return "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-400/25 dark:bg-slate-500/10 dark:text-slate-200";
}

export default function Orders() {
  const orders = useLoaderData() ?? [];

  function formatDate(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <div className="relative min-h-[70vh] overflow-hidden px-4 py-10 font-primary">
        <div className="absolute left-0 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-yellow-300/20 blur-3xl dark:bg-yellow-100/10" />

        <div className="relative mx-auto max-w-6xl space-y-6">
          <section className="glass-panel rounded-[32px] p-7 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex rounded-full border border-primary/15 bg-white/70 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-primary dark:border-primary/25 dark:bg-gray-900/70">
                  Order History
                </span>
                <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 dark:text-white sm:text-4xl">
                  My Orders
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Track every sticker order, revisit your favorites, and keep an
                  eye on delivery progress from one clean dashboard.
                </p>
              </div>

              <div className="rounded-[28px] border border-primary/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(232,244,248,0.95))] px-6 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-primary/20 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.9),rgba(8,47,73,0.78))]">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary dark:text-light">
                  Total Orders
                </p>
                <p className="mt-3 text-4xl font-black text-gray-900 dark:text-white">
                  {orders.length}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Your latest purchases and delivery updates live here.
                </p>
              </div>
            </div>
          </section>

          {orders.length === 0 ? (
            <section className="glass-panel rounded-[32px] px-6 py-14 text-center md:px-10">
              <div className="mx-auto max-w-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-black text-primary dark:bg-primary/20">
                  0
                </div>
                <h2 className="mt-6 text-2xl font-black text-gray-900 dark:text-white">
                  No orders found yet
                </h2>
                <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-300">
                  Once you place an order, it will show up here with status,
                  pricing, and product details.
                </p>
              </div>
            </section>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const orderItems = order.items ?? [];

                return (
                  <section
                    key={order.orderId}
                    className="glass-panel rounded-[32px] p-6 md:p-8"
                  >
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex rounded-full border border-primary/15 bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary dark:border-primary/25 dark:bg-gray-900/70">
                            Order #{order.orderId}
                          </span>
                          <span
                            className={`inline-flex rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] ${getStatusClasses(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <h2 className="mt-5 text-2xl font-black text-gray-900 dark:text-white">
                          Placed on {formatDate(order.createdAt)}
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                          {orderItems.length} item{orderItems.length === 1 ? "" : "s"} in
                          this order. Tap any product to open its detail page again.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
                        <div className="rounded-[24px] border border-primary/12 bg-white/65 px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] dark:border-primary/20 dark:bg-gray-900/70">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-light">
                            Total
                          </p>
                          <p className="mt-2 text-xl font-black text-gray-900 dark:text-white">
                            {formatCurrency(order.totalPrice)}
                          </p>
                        </div>

                        <div className="rounded-[24px] border border-primary/12 bg-white/65 px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] dark:border-primary/20 dark:bg-gray-900/70">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-light">
                            Items
                          </p>
                          <p className="mt-2 text-xl font-black text-gray-900 dark:text-white">
                            {orderItems.length}
                          </p>
                        </div>

                        <div className="rounded-[24px] border border-primary/12 bg-white/65 px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] dark:border-primary/20 dark:bg-gray-900/70">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-light">
                            Status
                          </p>
                          <p className="mt-2 text-xl font-black capitalize text-gray-900 dark:text-white">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      {orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-4 rounded-[28px] border border-primary/12 bg-white/65 p-4 shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-primary/25 dark:border-primary/20 dark:bg-gray-900/70 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <Link
                              to={`/user/item/${item.productId}`}
                              state={item}
                              className="overflow-hidden rounded-[22px]"
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="h-20 w-20 rounded-[22px] object-cover transition duration-300 hover:scale-105"
                              />
                            </Link>

                            <div>
                              <Link
                                to={`/user/item/${item.productId}`}
                                state={item}
                                className="text-lg font-bold text-gray-900 transition hover:text-primary dark:text-white dark:hover:text-light"
                              >
                                {item.productName}
                              </Link>
                              <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary dark:bg-primary/20 dark:text-light">
                                  Qty {item.quantity}
                                </span>
                                <span className="rounded-full bg-white/80 px-3 py-1 font-medium text-gray-700 dark:bg-slate-800 dark:text-gray-200">
                                  Each {formatCurrency(item.price)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="sm:text-right">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-light">
                              Line Total
                            </p>
                            <p className="mt-2 text-xl font-black text-gray-900 dark:text-white">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          <div className="flex justify-center pt-2">
            <BackToHome />
          </div>
        </div>
      </div>
    </>
  );
}

export async function ordersLoader() {
  try {
    const response = await apiClient.get("/orders");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch orders. Please try again.",
      { status: error.status || 500 }
    );
  }
}
