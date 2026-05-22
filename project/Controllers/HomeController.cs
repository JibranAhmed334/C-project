using Microsoft.AspNetCore.Mvc;
using project.Models;
using System.Diagnostics;

namespace project.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Services()
        {
            return View();
        }

        public IActionResult Admin()
        {
            return View();
        }

        public IActionResult Calculator()
        {
            return View();
        }

        public IActionResult Schemes()
        {
            return View();
        }
        public IActionResult Loan()
        {
            return View();
        }
         public IActionResult Dasboard()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult Login
            ()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
