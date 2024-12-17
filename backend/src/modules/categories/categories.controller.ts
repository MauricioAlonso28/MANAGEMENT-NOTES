import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { handleError } from "@/utils/error-handler.util";

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) { }
  
  @Get()
  async getAllCategories() { 
    try {
      return this.categoriesService.getAllCategories()
    } catch (error) {
      return handleError(error)
    }
  }
}