using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FarmWorkPost.Entities;
using Microsoft.AspNetCore.Mvc;

using Microsoft.Extensions.Logging;

using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FarmWorkPost.Controllers
{
    [Route("api/[controller]")]
    public class JobController : BasicController
    {

        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        public JobController(ILoggerFactory loggerFactory, DBContext dbContext): base(dbContext)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;
        }

        // GET: api/values
        [HttpGet]
        [Route("GetJobsByPage")]
        public async Task<ActionResult<List<Models.Job>>> GetAllJobs([FromQuery] int pageNumber, [FromQuery] int jobNumber)
        {
            try
            {
                var jobs = await this._dbContext.Jobs
                    .Skip((pageNumber - 1) * jobNumber)
                    .Take((pageNumber - 1) * jobNumber + jobNumber)
                    .AsNoTracking()
                    .Select(job => new Models.Job(job))
                    .ToListAsync();

                if (jobs.Count > 0)
                {
                    return Ok(jobs);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "GetJobsByPage Failed");
                return BadRequest();
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        [Route("PostNewJob")]
        public async Task<ActionResult<Models.Job>> PostNewJob([FromBody]Models.Job model)
        {
            try
            {
                var user = this.GetUser();
                if (user == null) return BadRequest(new { message = "You have not logged in, please login first." });

                Entities.Job newJob = new Entities.Job()
                {
                    Title = model.Title,
                    Location = model.Location,
                    Description = model.Description,
                    Type = model.Type,
                    Company = model.Company,
                    Salary = model.Salary,
                    CreationDate = DateTime.Now,
                    Status = Common.JobStatus.Valid,
                    User = user,
                };

                await this._dbContext.Jobs.AddAsync(newJob);
               
                int result = await this._dbContext.SaveChangesAsync();

                if (result > 0)
                {
                    return Ok(new Models.Job(newJob));
                }
                else
                {
                    return BadRequest();
                }


            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "PostNewJob Failed");
                return BadRequest();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete]
        [Route("DeleteJobById")]
        public void DeleteJobById([FromQuery]int id)
        {
        }

        [HttpDelete]
        [Route("GetJobsByUserId")]
        public void GetJobsByUserId([FromQuery]int userId)
        {
        }

    }
}
