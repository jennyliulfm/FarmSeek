using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FarmWorkPost.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FarmWorkPost.Controllers
{
    [Route("api/[controller]")]
    public class UserController : BasicController
    {
        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        public UserController(ILoggerFactory loggerFactory, DBContext dbContext): base(dbContext)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;
        }

        [HttpPost]
        [Route("UserLogin")]
        public async Task<IActionResult> UserLogin([FromBody]Models.User model)
        {
            try
            {
                if (model.Email != null)
                {
                    var user = await this._dbContext.AppUsers.FindAsync(model.UserId);
                    if (user == null)
                    {
                        Entities.User newUser = new Entities.User()
                        {
                            Email = model.Email,
                            FirstName = model.FirstName,
                            LastName = model.LastName,
                            UserId = model.UserId

                        };

                        await this._dbContext.AppUsers.AddAsync(newUser);
                        var result = await this._dbContext.SaveChangesAsync();
             
                        //Generate JWT token
                        if (result > 0)
                        {
                            var token = this.GenerateJWTTokenAsync(newUser);

                            return Ok(new { token });
                        }
                        else
                        {
                            return BadRequest(new { message = "You are having trouble of loging in, please try later" });
                        }
                    }
                    else
                    {
                        var token = this.GenerateJWTTokenAsync(user);

                        return Ok(new { token });
                    }
                }
                else
                {
                    return BadRequest(new { message = "Invalid Email or Password" });
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "SocialLogin Failed");
                return BadRequest();
            }

        }

        private string GenerateJWTTokenAsync(Entities.User user)
        {

            IdentityOptions options = new IdentityOptions();

            var tokenDescriber = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.UserId),
                }),

                Expires = DateTime.UtcNow.AddMinutes(30),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("0123456789123456")), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriber);
            var token = tokenHandler.WriteToken(securityToken);

            var result = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return token;

        }
    }
}
