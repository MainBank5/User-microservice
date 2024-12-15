import { Controller, Put, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../product/dtos/create-product.dto';
import { Product } from '../product/entities/product-entities';

@Controller('products')
export class ProductController {
    constructor(private readonly _productService: ProductService) {}

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return await this._productService.getAllProducts();
    }

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return await this._productService.createProduct(createProductDto);
    }

    @Get(':id')
    async getProductById(@Param('id') id: string): Promise<Product> {
        return await this._productService.getProductById(id);
    }

    @Put(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDto: CreateProductDto
    ): Promise<Product> {
        return await this._productService.updateProduct(id, updateProductDto);
    }
}

