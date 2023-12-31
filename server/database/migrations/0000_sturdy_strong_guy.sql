CREATE TABLE `requests` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`title` text,
	`description` text,
	`completed` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
