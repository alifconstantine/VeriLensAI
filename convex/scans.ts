import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveScan = mutation({
  args: {
    mediaType: v.string(),
    fileStorageId: v.optional(v.id("_storage")),
    textContent: v.optional(v.string()),
    confidenceScore: v.number(),
    isAiGenerated: v.boolean(),
    conclusion: v.string(),
    anomalies: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to saveScan");
    }

    const scanId = await ctx.db.insert("scans", {
      userId: identity.subject,
      mediaType: args.mediaType,
      fileStorageId: args.fileStorageId,
      textContent: args.textContent,
      confidenceScore: args.confidenceScore,
      isAiGenerated: args.isAiGenerated,
      conclusion: args.conclusion,
      anomalies: args.anomalies,
    });

    return scanId;
  },
});

export const getUserHistory = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const scans = await ctx.db
      .query("scans")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    return Promise.all(
      scans.map(async (scan) => ({
        ...scan,
        fileUrl: scan.fileStorageId ? await ctx.storage.getUrl(scan.fileStorageId) : null,
      }))
    );
  },
});
