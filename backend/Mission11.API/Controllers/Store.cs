using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : Controller
    {
        private BookDbContext _bookContext;

        public StoreController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, [FromQuery] List<string>? bookCategory = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookCategory != null && bookCategory.Any())
            {
                query = query.Where(b => bookCategory.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            var somethings = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new
            {
                Books = somethings,
                totalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetBookCategory")]
        public IActionResult GetBookCategory()
        {
            var bookCategory = _bookContext.Books
                .Select(b => b.Category) 
                .Distinct()
                .ToList();
            return Ok(bookCategory);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPost("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updateBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);
            
            existingBook.Title = updateBook.Title;
            existingBook.Author = updateBook.Author;
            existingBook.Publisher = updateBook.Publisher;
            existingBook.ISBN = updateBook.ISBN;
            existingBook.Classification = updateBook.Classification;
            existingBook.Category = updateBook.Category;
            existingBook.PageCount = updateBook.PageCount;
            existingBook.Price = updateBook.Price;
            
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            return Ok(existingBook);
        }

        [HttpPost("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book != null)
            {
                return NotFound(new {message = "book not found"});
            }

            ;
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            
            return NoContent();
        }
    }
}