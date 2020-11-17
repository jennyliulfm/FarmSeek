using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FarmWorkPost.Entities
{
    [Table("AppUsers")]
    public class User
    {
        [Key]
        public string UserId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string Telephone { get; set; }
        

        public List<Job> Jobs {get;set;}
        public string UserName { get; internal set; }
    }
}
