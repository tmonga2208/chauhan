import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from "./credenza";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Full name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits." })
      .max(15)
      .optional()
      .or(z.literal("")),
    billingName: z.string().min(2, { message: "Billing name is required." }),
    billingAddress: z.string().min(5, { message: "Billing address is required." }),
})
export default function GetStartedButton({ price }: { price: string }) {
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      billingName: "",
      billingAddress: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    const emailResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientName: values.fullName,
        clientEmail: values.email,  
        WeaponPrice: price,
        phone: values.phone,
        billingName: values.billingName,
        billingAddress: values.billingAddress,
      }),
    });
    if (!emailResponse.ok) {
      throw new Error('Failed to send confirmation emails');
    }
  }

  

  return (
    <Credenza>
  <CredenzaTrigger asChild>
  <button className="w-full bg-white text-black py-4 rounded-full text-lg font-semibold mb-6 cursor-pointer">{price}</button>
  </CredenzaTrigger>
  <CredenzaContent>
    <CredenzaHeader>
          <CredenzaTitle>Details</CredenzaTitle>
      <CredenzaDescription>
        Please fill in your details And We&apos;ll get Back To You.
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

      <div>
        <Label className="my-1" htmlFor="billingName">Billing Name</Label>
        <Input id="billingName" {...form.register("billingName")} />
        {form.formState.errors.billingName && (
          <p className="text-red-500 text-sm">{form.formState.errors.billingName.message}</p>
        )}
      </div>

      <div>
        <Label className="my-1" htmlFor="billingAddress">Billing Address</Label>
        <Input id="billingAddress" {...form.register("billingAddress")} />
        {form.formState.errors.billingAddress && (
          <p className="text-red-500 text-sm">{form.formState.errors.billingAddress.message}</p>
        )}
      </div>
        <div className="flex gap-3 items-center">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={checked => setTermsAccepted(checked === true)}
          />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
    </form>            
        </div>
    </CredenzaBody>
                <CredenzaFooter>
      <CredenzaClose asChild>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-blackbg hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
          disabled={!termsAccepted}
        >
          Proceed
        </Button>
      </CredenzaClose>
    </CredenzaFooter>
  </CredenzaContent>
</Credenza>
    )
}