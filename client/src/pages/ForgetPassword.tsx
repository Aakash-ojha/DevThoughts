import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// 1. Validation Schema
const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Password reset requested for:", data.email);
    // Axios call to your backend would go here
  };

  // Shared Floating Label Classes
  const inputClasses =
    "peer w-full h-14 px-4 pt-4 text-base rounded-lg border border-gray-300 focus:border-blue-500 placeholder-transparent outline-none transition-all";
  const labelClasses =
    "absolute left-4 top-4 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md p-2 shadow-2xl rounded-3xl bg-white border-none">
        <div className="text-center mt-8 mb-6 px-4">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">
            Reset Password
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg mt-2 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? "Sending Link..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Back to Login */}
          <div className="text-center pb-4">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Log In
            </Link>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-xs text-gray-400 max-w-[250px]">
        Locked out? Contact <b>DevThought Support</b> if you no longer have
        access to your email.
      </p>
    </div>
  );
}
