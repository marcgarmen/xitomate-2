"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  username: z.string().min(2, {
    //change this to our own regex
    message: "Tu username debe ser más largo.",
  }),
  password: z.string().min(6, {
    //change this to our own regex
    message: "Tu contraseña debe ser más larga.",
  }),
});

export function SignInFields() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className={`border-4 p-2 w-full rounded-md ${
                    field.value ? "border-[#A1C374]" : "border-black"
                  }`}
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Así nos referiremos a ti.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    className={`border-4 p-2 w-full rounded-md ${
                      field.value ? "border-[#A1C374]" : "border-black"
                    }`}
                    placeholder="Escribe tu contraseña"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute right-2 top-2 text-gray-600"
                  >
                    {isPasswordVisible ? (
                      <AiOutlineEye className="h-6 w-6" />
                    ) : (
                      <AiOutlineEyeInvisible className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormDescription>
                {/*change to our own instructions*/}
                Tu password debe de ser mejor.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Cambiar a botón nuestro</Button>
      </form>
    </Form>
  );
}