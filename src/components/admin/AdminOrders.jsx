import React from "react";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";
import PageTltle from "../PageTltle";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const orders = useLoaderData();
  const revalidator = useRevalidator();

  function formatDate(isoDate) {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const handleConfirm = async (orderId) => {
    try {
      await apiClient.patch(`/admin/orders/${orderId}/confirm`);
      toast.success(`Order ${orderId} confirmed`);
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failed to confirm order.");
    }
  };

  const handleCancel = async (orderId) => {
    try {
      await apiClient.patch(`/admin/orders/${orderId}/cancel`);
      toast.success(`Order ${orderId} cancelled`);
      revalidator.revalidate();
    } catch (error) {
      toast.error("Failed to cancel order.");
    }
  };

  return (
    <div className="min-h-[852px] container mx-auto px-6 py-12 font-primary dark:bg-darkbg">
      {orders.length === 0 ? (
        <p className="text-center text-2xl  text-primary dark:text-lighter">
          No orders found.
        </p>
      ) : (
        <div className="mt-4 space-y-6">
          <PageTltle title="Admin Orders Management" />
          {orders.map((order) => {
            return (
              <div
                key={order.orderId}
                className="rounded-md bg-white p-6 shadow-md dark:bg-gray-700"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-primary dark:text-lighter">
                      Order #{order.orderId}
                    </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status:{" "}
                      <span className="font-medium text-gray-800 dark:text-lighter">
                        {order.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Price:{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        ${order.totalPrice}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Date:{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {formatDate(order.createdAt)}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-4 lg:mt-0">
                    <button
                      onClick={() => handleConfirm(order.orderId)}
                      className="rounded-md bg-primary px-6 py-2 text-md text-white transition duration-200 hover:bg-dark dark:bg-light dark:text-dark dark:hover:bg-lighter"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(order.orderId)}
                      className="rounded-md bg-red-500 px-6 py-2 text-md text-white transition duration-200 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b pb-4 last:border-b-0"
                    >
                      <Link to={`/item/${item.productId}`} state={item}>
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="mr-4 h-16 w-16 rounded-md object-cover"
                        />
                      </Link>

                      <div>
                        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Price: ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export async function adminOrdersLoader() {
  try {
    const response = await apiClient.get("/admin/orders");
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
