using System;
using Microsoft.EntityFrameworkCore;
using FarmWorkPost.Common;

namespace FarmWorkPost.Entities
{
    public class DBContext: DbContext
    {
        public DBContext(DbContextOptions<DBContext> options): base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Convert JobType to string
            modelBuilder.Entity<Job>()
                .Property(j => j.Type)
                .HasConversion(
                    t => t.ToString(),
                    t => (JobType)Enum.Parse(typeof(JobType), t));

            //Convert JobStatus to string
            modelBuilder.Entity<Job>()
               .Property(j => j.Status)
               .HasConversion(
                   s => s.ToString(),
                   s => (JobStatus)Enum.Parse(typeof(JobStatus), s));

            //Set Default value for jobstatus
            //modelBuilder.Entity<Job>()
            //    .Property(j => j.Status)
            //    .HasDefaultValue(JobStatus.Valid);
        }

        public DbSet<User> AppUsers { get; set; }
        public DbSet<Job> Jobs { get; set; }
    }
}
