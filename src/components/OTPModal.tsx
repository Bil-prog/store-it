"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";




const OTPModal = ({accountId, email} : {accountId: string, email: string}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
          const sessionId = await verifySecret({accountId, password});
          if (sessionId) router.push("/");
        } catch(error) {
            console.log("Failed to verify OTP", error)
        }
        setIsLoading(false);
    }

    const handleResendOTP = async () => {
      await sendEmailOTP({email});
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="shad-alert-dialog">
        <DialogHeader className="relative flex justify-center">
          <DialogTitle className="h2 text-center">Enter your OTP
          </DialogTitle>
          <DialogDescription className="subtitle-2 text-center text-light-100">
            We&apos;ve sent a code to <span className="pl-1 text-brand">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot"/>
            <InputOTPSlot index={1} className="shad-otp-slot"/>
            <InputOTPSlot index={2} className="shad-otp-slot"/>
            <InputOTPSlot index={3} className="shad-otp-slot"/>
            <InputOTPSlot index={4} className="shad-otp-slot"/>
            <InputOTPSlot index={5} className="shad-otp-slot"/>
          </InputOTPGroup>
        </InputOTP>
        <div>
            <div className="flex w-full flex-col gap-4">
                <button 
                onClick={handleSubmit}
                className="shad-submit-btn h-12"
                type="button"
                >Submit</button>
                {isLoading && (
                    <Image 
                    className="ml-2 animate-spin"
                    src="/assets/icons/loader.svg"
                    alt="loader"
                    width={24} height={24}
                    />
                )}
            </div>
            <br />
            <div className="text-center text-sm">Didn&apos;t get a code?
                <Button type="button" variant="link" className="pl-1 text-brand" onClick={handleResendOTP}>Click to Resend</Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
