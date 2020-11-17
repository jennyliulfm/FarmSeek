using System;
using System.Collections.Generic;

namespace FarmWorkPost.Models
{
    public class User
    {
        public string UserId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
       
        public string Email { get; set; }
        public string Telephone { get; set; }

        public List<Job> Jobs { get; set; }

        public User()
        {
        }

        public User(Entities.User user)
        {
            this.UserId = user.UserId;
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.Telephone = user.Telephone;
        }
    }
}
