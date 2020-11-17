using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FarmWorkPost.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FarmWorkPost.Controllers
{ 
    public class BasicController : ControllerBase
    {
        private readonly DBContext _dbContext;

        public BasicController(DBContext dbContext)
        {
            this._dbContext = dbContext;
        }

        protected string Email
        {
            get
            {
                return this.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            }
        }

        protected Entities.User GetUser()
        {
            return this._dbContext.AppUsers.FirstOrDefault(u => u.Email == this.Email);
        }

    }
}
