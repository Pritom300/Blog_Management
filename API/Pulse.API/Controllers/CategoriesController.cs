using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pulse.API.Models.Domain;
using Pulse.API.Models.DTO;
using Pulse.API.Repositories.Interface;

namespace Pulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly ICategoryRepository categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        [HttpPost]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequestDto request)
        {
           
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await categoryRepository.CreateAsync(category);

            
            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories(
          [FromQuery] string? query,
          [FromQuery] string? sortBy,
          [FromQuery] string? sortDirection,
          [FromQuery] int? pageNumber,
          [FromQuery] int? pageSize)
        {
            var caterogies = await categoryRepository
                .GetAllAsync(query, sortBy, sortDirection, pageNumber, pageSize);

            // Map Domain model to DTO

            var response = new List<CategoryDto>();
            foreach (var category in caterogies)
            {
                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }

            return Ok(response);
        }

        [HttpGet]
        [Route("count")]
        //[Authorize(Roles = "Writer")]
        public async Task<IActionResult> GetCategoriesTotal()
        {
            var count = await categoryRepository.GetCount();

            return Ok(count);
        }


    }
}
