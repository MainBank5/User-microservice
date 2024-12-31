import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from '../product/entities/product-entities';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(private readonly _prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this._prisma.product.findMany();
      console.log('Fetched products:', products);
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new BadRequestException('An error occurred while fetching products.');
    }
  }
  
  @EventPattern('product_created') //listen to event 'product_created' from the Publisher product service
  async createProduct(@Payload() createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, description, image } = createProductDto;

    try {
      const newProduct = await this._prisma.product.create({
        data: {
          name,
          price,
          description,
          image,
        },
      });

      return newProduct;
    } catch (error) {
      // Handle known Prisma errors (e.g., unique constraint violations)
      if (error.code === 'P2002') {
        throw new BadRequestException(`Product with name "${name}" already exists.`);
      }

      // Re-throw other unexpected errors
      throw new BadRequestException('An error occurred while creating the product.');
    }
  }
  async getProductById(id: string): Promise<Product> {
    return this._prisma.product.findUnique({ where: { id } });
  }
  async updateProduct(
    id: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const { name, price, description, image } = createProductDto;
    try {
      const updatedProduct = await this._prisma.product.update({
        where: { id },
        data: {
          name,
          price,
          description,
          image,
        },
      });
      return updatedProduct;
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while updating the product.',
      );
    }
  }
  async deleteProduct(
    id: string,
  ): Promise<{ message: string; deletedProduct: Product }> {
    try {
      const deletedProduct = await this._prisma.product.delete({
        where: { id },
      });
      return {
        message: 'Product deleted successfully',
        deletedProduct,
      };
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while deleting the product.',
      );
    }
  }
}

