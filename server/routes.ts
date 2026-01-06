import type { Express, Request, Response } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { sendLeadNotification } from "./email";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.leads.create.path, async (req: Request, res: Response) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);

      // Send email notification asynchronously (non-blocking)
      sendLeadNotification(lead.email, lead.productInterest).catch(
        (err: unknown) => {
          console.error("Failed to send email notification:", err);
        }
      );

      res.status(201).json(lead);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      // Re-throw unknown errors for global error handler
      throw err;
    }
  });

  return httpServer;
}
