import React from "react";
import { Link } from "react-router-dom";
import PageTltle from "./PageTltle";
import { Form } from "react-router-dom";
import { useActionData, useNavigation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

import { loginSuccess} from "../store/auth-slice";
import { useDispatch } from "react-redux";

export default function Login() {
  // const { loginSuccess } = useAuth();
 const dispatch=useDispatch();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();

  const from = sessionStorage.getItem("redirectPath") || "/home";

  useEffect(() => {
    if (actionData?.success) {
      dispatch(loginSuccess({jwtToken:actionData.jwtToken,user:actionData.user}));
      sessionStorage.removeItem("redirectPath");
      setTimeout(()=>{
            navigate(from);
      },100)
     
    } else if (actionData?.errors) {
      toast.error(actionData.errors.message || "Login Failed");
    }
  }, [actionData]);

  const labelStyle = "glass-label";
  const textFieldStyle = "glass-input";
  return (
    <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
      <div className="glass-form-shell max-w-md w-full rounded-[28px] px-8 py-8">
        {/* Title */}
        <PageTltle title="Login" />
        {/* Form */}
        <Form method="POST" className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              required
              className={textFieldStyle}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              required
              minLength={4}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-button"
            >
              {isSubmitting ? "Authenticating" : "Login"}
            </button>
          </div>
        </Form>

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary dark:text-light hover:text-dark dark:hover:text-primary transition duration-200"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function loginAction({ request }) {
  const data = await request.formData();

  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
    
  };
  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, jwtToken, user } = response.data;
    console.log("Login response:", response.data);
    console.log("User:", user);
    return { success: true, message, jwtToken, user };
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
      throw new Response(
        error.response?.data?.message ||
          error.message ||
          "Failed to login please try again later",
        { status: error.response?.status || 500 }
      );
    }
  }
}
