import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});
export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirm, setConfirm] = useState(false);
  const [timer, setTimer] = useState(120);

  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleConfirm = async () => {
    const toastId = toast.loading("Sending Otp");
    try {
      const res = await sendOtp({ email: email }).unwrap();
      if (res.success) {
        toast.success("OTP Sent", { id: toastId });
        setConfirm(true);
        setTimer(120);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying Otp");
    try {
      const res = await verifyOtp({ email: email, otp: data.pin }).unwrap();
      if (res.success) {
        toast.success("OTP is verified", { id: toastId });
        navigate("/")
      }
    } catch (err) {
      console.log(err);
      toast.error("OTP is Invalid", { id: toastId });
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (email && confirm) {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [email, confirm]);
  return (
    <div className="grid place-content-center h-screen">
      {confirm ? (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to <br />
              Email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          type="button"
                          onClick={handleConfirm}
                          variant="link"
                          disabled={timer > 0}
                          className={cn("p-0 mr-2", {
                            "cursor-pointer": timer === 0,
                            "text-gray-500": timer !== 0,
                          })}
                        >
                          Reset OTP
                        </Button>
                        {timer}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>
              We will send 6-digit OTP at <br />
              Email
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={handleConfirm}>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
