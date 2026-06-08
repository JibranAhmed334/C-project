using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using project.Models; // Aapke Models folder ka sahi namespace
using project.ViewModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;



namespace project.Controllers
{
    public class HomeController : Controller
    {

        //private readonly UserManager<IdentityUser> userManager;
        //private readonly SignInManager<IdentityUser> signInManager;

        //public HomeController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        //{
        //    this.userManager = userManager;
        //    this.signInManager = signInManager;
        //}


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
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            //if (ModelState.IsValid)
            //{
            //    var user = new ApplicationUser {
            //        UserName = model.Username, 
            //        Email = model.Email,
                    
            //    };

            //    var result = await userManager.CreateAsync(user, model.Password);

            //    if (result.Succeeded)
            //    {
            //        //await userManager.AddToRoleAsync(user, model.Role);
            //        return RedirectToAction("Login");
            //    }

            //}

            //ViewBag.Roles = new SelectList(new[] { "Instructor", "Staff" });
            return View(model);
        }   


        public IActionResult Register()
        {
            ViewBag.Roles = new SelectList(new[] { "Instructor", "Staff" });
            return View();
        }
        public IActionResult Login
            ()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(LoginViewModel ViewModel)
        {
            return View(ViewModel);
        }

        public IActionResult Logout()
        {
            return Content("Log out page");
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
