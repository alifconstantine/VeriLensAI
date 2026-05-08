import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  scans: defineTable({
    userId: v.string(), // From Clerk
    mediaType: v.string(), // "image" | "text" | "document"
    fileStorageId: v.optional(v.id("_storage")), // Convex storage ID for images/documents
    textContent: v.optional(v.string()), // For text scans
    fileName: v.optional(v.string()), // For document scans
    confidenceScore: v.number(),
    isAiGenerated: v.boolean(),
    conclusion: v.string(),
    anomalies: v.optional(v.any()), // Store the JSON array of anomalies
  }).index("by_user", ["userId"]),
  users: defineTable({
    userId: v.string(), // Clerk User ID
    credits: v.number(),
    language: v.optional(v.string()), // ID or EN
  }).index("by_userId", ["userId"]),
});
