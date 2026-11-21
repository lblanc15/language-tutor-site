CREATE TABLE `contact_inquiry_topics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`topic` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contact_inquiry_topics_topic_idx` ON `contact_inquiry_topics` (`topic`);--> statement-breakpoint
ALTER TABLE `contact_submissions` ADD `inquiry_topic` text DEFAULT 'Others' NOT NULL;