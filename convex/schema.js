import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    profilePicture: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    tokenIdentifier: v.string(),
  }).index("by_email", ["email"]).index("by_tokenIdentifier", ["tokenIdentifier"]),
});
