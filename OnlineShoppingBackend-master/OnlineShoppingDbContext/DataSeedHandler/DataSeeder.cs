using Microsoft.EntityFrameworkCore;
using OnlineShoppingDbContext.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineShoppingDbContext.DataSeedHandler
{
    public class DataSeeder
    {
        public static void SeedCategories(ApplicationDbContext context)
        {
            if (!context.Categories.Any())
            {
                var countries = new List<Category>
            {
                new Category { Name = "Baby Care" },
                new Category { Name = "Skin Wellness" },
                new Category { Name = "Mind & Body" },
                new Category { Name = "Hair Wellness" },
                new Category { Name = "Home Wellness" },
                new Category { Name = "Fragnances" },
                new Category { Name = "Homeware" },
                new Category { Name = "Gifting" },
               
            };
                context.Categories.AddRange(countries);
                context.SaveChanges();
            }
        }

       
    }
}
