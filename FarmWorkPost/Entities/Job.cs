using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FarmWorkPost.Common;

namespace FarmWorkPost.Entities
{
  
    [Table("Jobs")]
    public class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JobId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Location { get; set; }

        public string Description { get; set; }

        
        public JobType Type { get; set; }

        public string Company { get; set; }

        public float Salary { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime CreationDate { get; set; }

        public JobStatus Status { get; set; }

      
        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
