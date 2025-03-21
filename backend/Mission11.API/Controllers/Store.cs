using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers;
[Route("api/[controller]")]
[ApiController]

public class Store : Controller
{
    private BookDbContext _bookContext;

    public Store(BookDbContext temp)
    {
        _bookContext = temp;
    }
    [HttpGet("AllBooks")]
    public IActionResult GetBooks(int pageHowMany = 10, int pageNum =1)
    {
        var somethings = _bookContext.Books
            .Skip((pageNum - 1) * pageHowMany)
            .Take(pageHowMany)
            .ToList();
      
        var totalNumBooks = _bookContext.Books.Count();
      
        return Ok(new 
        {
            Books = somethings,
            totalNumBooks = totalNumBooks
        });
    }
    
}