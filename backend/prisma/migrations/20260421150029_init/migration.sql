/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Vendedores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Vendedores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preco` to the `Carros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorTotal` to the `Vendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comissao` to the `Vendedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Vendedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Vendedores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carros` ADD COLUMN `preco` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `vendas` ADD COLUMN `valorTotal` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `vendedores` ADD COLUMN `comissao` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Clientes_email_key` ON `Clientes`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Clientes_cpf_key` ON `Clientes`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `Vendedores_cpf_key` ON `Vendedores`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `Vendedores_email_key` ON `Vendedores`(`email`);
