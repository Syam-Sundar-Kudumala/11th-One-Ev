import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertLead } from "@shared/schema";

export function useCreateLead() {
  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid input");
        }
        throw new Error("Failed to submit lead");
      }

      return api.leads.create.responses[201].parse(await res.json());
    },
  });
}
