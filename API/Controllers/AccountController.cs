
using System.Security.Claims;
using System.Threading.Tasks;
using API.Controllers.DTOs;

using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<Customer> _signInManager;
        private readonly UserManager<Customer> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<Customer> userManager,
        SignInManager<Customer> signInManager, TokenService tokenService)
        {
            this._tokenService = tokenService;
            this._userManager = userManager;
            this._signInManager = signInManager;

        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);

            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("User name token");
            }

            var user = new Customer
            {
                PhoneNumber = registerDto.PhoneNumber,
                DisplayName = registerDto.DisplayName,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                return CreateUserObject(user);

            }

            return BadRequest("Problem registering user");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirstValue(ClaimTypes.Name));
            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(Customer user)
        {
            return new UserDto
            {
                PhoneNumber = user.PhoneNumber,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                DisplayName = user.DisplayName
            };
        }
    }
}