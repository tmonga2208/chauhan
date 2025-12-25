"use client"
import { Label } from "@radix-ui/react-label"
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "./credenza"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Full name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits." })
      .max(15)
      .optional()
      .or(z.literal(""))
})

function ContackButton() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fullName: "",
          email: "",
          phone: "",
        },
    })
    
    
      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Submitted values:", values)
      }
  return (
    <Credenza>
       <CredenzaTrigger asChild>
    <Button type="button" className="text-blackbg hover:text-white bg-white focus:ring-4 focus:ring-gray-500 font-medium rounded-3xl text-sm  dark:focus:ring-primary-900">CONTACT US</Button> </CredenzaTrigger> <CredenzaContent>
          <CredenzaHeader>
                    <CredenzaTitle>Contact Us</CredenzaTitle>
                <CredenzaDescription>
                  Fill The Form With Your Details
                </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
                              <div>
                <form className="space-y-6 max-w-md mx-auto">
                <div>
                  <Label className="my-1" htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...form.register("fullName")} />
                  {form.formState.errors.fullName && (
                    <p className="text-red-500 text-sm">{form.formState.errors.fullName.message}</p>
                  )}
                </div>
          
                <div>
                  <Label className="my-1" htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...form.register("email")} />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                  )}
                </div>
          
                <div>
                  <Label className="my-1" htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" {...form.register("phone")} />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                  )}
                      </div>
                       </form>            
                  </div>
                   </CredenzaBody>
                              <CredenzaFooter>
      <CredenzaClose asChild>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-blackbg focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Contact Us
        </Button>
      </CredenzaClose>
    </CredenzaFooter>
  </CredenzaContent>
</Credenza>
  )
}

export default ContackButton
