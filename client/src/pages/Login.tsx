import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/api/authApi";
import { toast } from "sonner";

// validation schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Verifying credentials...");
    try {
      const result = await loginUser(data);

      if (result.status === "success") {
        toast.success("Welcome back!", { id: toastId, duration: 2000 });
        reset();
        navigate("/");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage, { id: toastId });
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-4 shadow-md rounded-2xl bg-white">
        <div className="text-center mb-3">
          <h1 className="text-5xl font-bold text-blue-600">DevThought</h1>
        </div>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Input
                {...register("email")}
                type="email"
                autoComplete="email"
                placeholder=" " // Required for peer-placeholder-shown
                className="peer w-full h-14 px-4 pt-4 text-base rounded-lg border border-gray-300 focus:border-blue-500 placeholder-transparent"
              />
              <label
                className="  absolute left-4 top-4 text-gray-500 transition-all duration-200 pointer-events-none
                peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-500
                peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs text-base "
              >
                Email address
              </label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                autoComplete="password"
                placeholder=" " // Required for peer-placeholder-shown
                className="peer w-full h-14 px-4 pt-4 text-base rounded-lg border border-gray-300 focus:border-blue-500 placeholder-transparent"
              />
              <label
                className="absolute left-4 top-4 text-gray-500 transition-all duration-200 pointer-events-none
                peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-500
                peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs text-base"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* OR Divider */}
            <div className="flex items-center gap-3">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Create Account */}
            <div className="text-center pb-2">
              <Link to="/register">
                <Button
                  type="button"
                  variant="outline"
                  className="px-8 h-12 text-green-600 border-green-500 font-semibold hover:bg-green-50 rounded-lg"
                >
                  Create New Account
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
