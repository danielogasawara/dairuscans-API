-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `name` TINYTEXT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` TINYTEXT NOT NULL,
    `role` ENUM('Admin', 'Moderator', 'Uploader', 'Reader') NOT NULL DEFAULT 'Reader',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Works` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `synopsis` TEXT NOT NULL,
    `cover_url` TEXT NOT NULL,
    `status` ENUM('Completed', 'Ongoing', 'Paused', 'Canceled') NOT NULL,
    `type` ENUM('Manga', 'Novel') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,

    UNIQUE INDEX `Works_title_key`(`title`),
    INDEX `Works_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapters` (
    `id` VARCHAR(191) NOT NULL,
    `title` TINYTEXT NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `workId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Chapters_workId_number_key`(`workId`, `number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChapterContent` (
    `id` VARCHAR(191) NOT NULL,
    `pagesCount` SMALLINT NULL,
    `content` JSON NOT NULL,
    `chapterId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ChapterContent_chapterId_key`(`chapterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genres` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genres_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rates` (
    `id` VARCHAR(191) NOT NULL,
    `rate` TINYINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP NULL,
    `userId` VARCHAR(191) NOT NULL,
    `workId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Rates_userId_workId_key`(`userId`, `workId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authors` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Authors_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artists` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Artists_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Scanlations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Scanlations_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GenresOnWorks` (
    `genreId` VARCHAR(191) NOT NULL,
    `workId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`genreId`, `workId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthorsOnWorks` (
    `workId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`authorId`, `workId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtistsOnWorks` (
    `artistId` VARCHAR(191) NOT NULL,
    `workId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`artistId`, `workId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BookmarksInWorks` (
    `userId` VARCHAR(191) NOT NULL,
    `workId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `workId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScanlationsChapters` (
    `chapterId` VARCHAR(191) NOT NULL,
    `scanlationId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`chapterId`, `scanlationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlternateTitlesOnWorks` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `workId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AlternateTitlesOnWorks_title_workId_key`(`title`, `workId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReportErrosOnChapters` (
    `id` VARCHAR(191) NOT NULL,
    `subject` TINYTEXT NOT NULL,
    `text` TEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `chapterId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ReportErrosOnChapters_userId_chapterId_key`(`userId`, `chapterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chapters` ADD CONSTRAINT `Chapters_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChapterContent` ADD CONSTRAINT `ChapterContent_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rates` ADD CONSTRAINT `Rates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rates` ADD CONSTRAINT `Rates_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenresOnWorks` ADD CONSTRAINT `GenresOnWorks_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenresOnWorks` ADD CONSTRAINT `GenresOnWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorsOnWorks` ADD CONSTRAINT `AuthorsOnWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuthorsOnWorks` ADD CONSTRAINT `AuthorsOnWorks_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Authors`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistsOnWorks` ADD CONSTRAINT `ArtistsOnWorks_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artists`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistsOnWorks` ADD CONSTRAINT `ArtistsOnWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookmarksInWorks` ADD CONSTRAINT `BookmarksInWorks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookmarksInWorks` ADD CONSTRAINT `BookmarksInWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScanlationsChapters` ADD CONSTRAINT `ScanlationsChapters_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScanlationsChapters` ADD CONSTRAINT `ScanlationsChapters_scanlationId_fkey` FOREIGN KEY (`scanlationId`) REFERENCES `Scanlations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlternateTitlesOnWorks` ADD CONSTRAINT `AlternateTitlesOnWorks_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportErrosOnChapters` ADD CONSTRAINT `ReportErrosOnChapters_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReportErrosOnChapters` ADD CONSTRAINT `ReportErrosOnChapters_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
