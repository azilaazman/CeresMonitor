using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactMVC.Models
{
    public class CommentModel
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
    }
}
