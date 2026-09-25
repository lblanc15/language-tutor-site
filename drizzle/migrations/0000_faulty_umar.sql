CREATE TABLE `contact_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'NEW' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `contact_submissions_created_at_idx` ON `contact_submissions` (`created_at`);--> statement-breakpoint
CREATE INDEX `contact_submissions_status_idx` ON `contact_submissions` (`status`);--> statement-breakpoint
CREATE TABLE `enrollment_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`number` text NOT NULL,
	`province` text NOT NULL,
	`city_municipality` text NOT NULL,
	`facebook` text NOT NULL,
	`facebook_url` text NOT NULL,
	`occupation` text,
	`course` text,
	`proficiency` text NOT NULL,
	`has_study_spanish` integer NOT NULL,
	`study_spanish_in` text NOT NULL,
	`learning_reason` text NOT NULL,
	`other_reason` text NOT NULL,
	`status` text DEFAULT 'NEW' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enrollment_submissions_created_at_idx` ON `enrollment_submissions` (`created_at`);--> statement-breakpoint
CREATE INDEX `enrollment_submissions_status_idx` ON `enrollment_submissions` (`status`);