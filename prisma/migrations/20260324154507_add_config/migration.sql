-- CreateTable
CREATE TABLE "config" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "theme" TEXT NOT NULL DEFAULT 'system',
    "colorTheme" TEXT NOT NULL DEFAULT 'default',
    "fontTheme" TEXT NOT NULL DEFAULT 'default',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "config_pkey" PRIMARY KEY ("id")
);
