import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contactSubmissionStatus = ["NEW", "READ", "ARCHIVED"] as const;
export type ContactSubmissionStatus = (typeof contactSubmissionStatus)[number];

export const enrollmentSubmissionStatus = ["NEW", "CONTACTED", "ENROLLED", "ARCHIVED"] as const;
export type EnrollmentSubmissionStatus = (typeof enrollmentSubmissionStatus)[number];

export const contactSubmissions = sqliteTable(
  "contact_submissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    status: text("status", { enum: contactSubmissionStatus }).notNull().default("NEW"),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  },
  (table) => [
    index("contact_submissions_created_at_idx").on(table.createdAt),
    index("contact_submissions_status_idx").on(table.status),
  ],
);

export const enrollmentSubmissions = sqliteTable(
  "enrollment_submissions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    number: text("number").notNull(),
    province: text("province").notNull(),
    cityMunicipality: text("city_municipality").notNull(),
    facebook: text("facebook").notNull(),
    facebookUrl: text("facebook_url").notNull(),
    occupation: text("occupation"),
    course: text("course"),
    proficiency: text("proficiency").notNull(),
    hasStudySpanish: integer("has_study_spanish", { mode: "boolean" }).notNull(),
    studySpanishIn: text("study_spanish_in").notNull(),
    learningReason: text("learning_reason").notNull(),
    otherReason: text("other_reason").notNull(),
    status: text("status", { enum: enrollmentSubmissionStatus }).notNull().default("NEW"),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().$defaultFn(() => new Date()),
  },
  (table) => [
    index("enrollment_submissions_created_at_idx").on(table.createdAt),
    index("enrollment_submissions_status_idx").on(table.status),
  ],
);

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type EnrollmentSubmission = typeof enrollmentSubmissions.$inferSelect;
export type NewEnrollmentSubmission = typeof enrollmentSubmissions.$inferInsert;