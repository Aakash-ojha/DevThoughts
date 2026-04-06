import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Registration Data:", data);
  };

  const handleGoogleSignIn = () => {
    console.log("Redirecting to Google Auth...");
    // window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const inputClasses =
    "peer w-full h-14 px-4 pt-4 text-base rounded-lg border border-gray-300 focus:border-blue-500 placeholder-transparent outline-none transition-all";
  const labelClasses =
    "absolute left-4 top-4 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-4 shadow-md rounded-2xl bg-white border-none">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">DevThought</h1>
          <p className="text-gray-500 mt-1 font-medium">Create a new account</p>
        </div>

        <CardContent className="px-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Input
                {...register("name")}
                type="text"
                placeholder=" "
                className={inputClasses}
              />
              <label className={labelClasses}>Full Name</label>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                {...register("email")}
                type="email"
                placeholder=" "
                className={inputClasses}
              />
              <label className={labelClasses}>Email Address</label>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                placeholder=" "
                className={inputClasses}
              />
              <label className={labelClasses}>Password</label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder=" "
                className={inputClasses}
              />
              <label className={labelClasses}>Confirm Password</label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="flex items-center gap-3 py-1">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-400 text-xs uppercase font-bold">
                OR
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Sign Up Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full h-12 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 rounded-lg font-medium text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>

            <Button
              variant="outline"
              type="button"
              className="w-full h-12 flex items-center justify-center gap-2 border-gray-300 hover:bg-gray-50 rounded-lg font-medium text-gray-700"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              GitHub
            </Button>

            <div className="text-center pt-2">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
