-- Create tables for Quiosco app

-- Category table
CREATE TABLE IF NOT EXISTS "Category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL
);

-- Product table
CREATE TABLE IF NOT EXISTS "Product" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "categoryId" INTEGER NOT NULL REFERENCES "Category"("id")
);

-- Order table
CREATE TABLE IF NOT EXISTS "Order" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN DEFAULT FALSE,
    "orderReadyAt" TIMESTAMP
);

-- OrderProducts table (junction table)
CREATE TABLE IF NOT EXISTS "OrderProducts" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "Order"("id"),
    "productId" INTEGER NOT NULL REFERENCES "Product"("id"),
    "quantity" INTEGER NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "Product_categoryId_idx" ON "Product"("categoryId");
CREATE INDEX IF NOT EXISTS "OrderProducts_orderId_idx" ON "OrderProducts"("orderId");
CREATE INDEX IF NOT EXISTS "OrderProducts_productId_idx" ON "OrderProducts"("productId");
