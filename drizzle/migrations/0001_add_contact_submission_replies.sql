CREATE TABLE `contact_submission_replies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submission_id` integer NOT NULL,
	`message` text NOT NULL,
	`sent_at` integer NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `contact_submissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `contact_submission_replies_submission_id_idx` ON `contact_submission_replies` (`submission_id`);--> statement-breakpoint
CREATE INDEX `contact_submission_replies_sent_at_idx` ON `contact_submission_replies` (`sent_at`);