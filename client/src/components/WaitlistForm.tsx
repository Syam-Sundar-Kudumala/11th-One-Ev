import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useCreateLead } from "@/hooks/use-leads";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";

export function WaitlistForm() {
  const { toast } = useToast();
  const { mutate, isPending } = useCreateLead();
  
  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      email: "",
      productInterest: "both",
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Welcome to the future!",
          description: "You've been added to our exclusive waitlist.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto relative group">
      {/* Decorative gradient blur behind form */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
      
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative bg-card border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl"
      >
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-display font-bold text-foreground">Get Early Access</h3>
          <p className="text-muted-foreground text-sm">Be the first to experience the revolution.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
            <input
              {...form.register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Interested In</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "motorcycle", label: "Moto" },
                { value: "scooty", label: "Scooty" },
                { value: "both", label: "Both" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`
                    cursor-pointer text-center py-2 rounded-lg text-sm font-medium border transition-all
                    ${form.watch("productInterest") === option.value
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-background/50 border-white/10 text-muted-foreground hover:bg-white/5"
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...form.register("productInterest")}
                    className="hidden"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-4 rounded-xl font-bold text-primary-foreground bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_hsla(160,84%,39%,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group/btn"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Join the Revolution
              <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
