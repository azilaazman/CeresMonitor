using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactMVC.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Xml.Linq;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactMVC.Controllers
{
    public class PlantController : Controller
    {
        private static readonly IList<PlantModel> plants;

        public class mongoPlants
        {
            MongoServerSettings Settings_;
            MongoServer server;
            MongoDatabase Database_;
            public static mongoPlants _Obj;
            public static mongoPlants GetObject()
            {
                if (_Obj == null)
                {
                    _Obj = new mongoPlants();
                }

                return _Obj;
            }

            public mongoPlants()
            {

            }


        }


        [Route("plants")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<ActionResult> getAllPlants()
        {
            try
            {
                MongoClient client = new MongoClient("mongodb://fypadmin:12345678@ds048719.mlab.com:48719/ceres");
                IMongoDatabase db = client.GetDatabase("ceres");

                List<PlantModel> plant_list = new List<PlantModel>();
                var plantInfo = db.GetCollection<PlantModel>("plant");

                var allPlants
                    = await plantInfo.Find(new BsonDocument()).ToListAsync(); //get all documents in the collection

                foreach (PlantModel Plant in allPlants)
                {
                    plant_list.Add(Plant);
                }

                return Json(plant_list);
            }
            catch
            {
                throw;
            }
        }

        [Route("plants/new")]
        [HttpPost]
        public ActionResult addPlant(PlantModel plant, GrowingConditions gc)
        {
            try
            {
                MongoClient client = new MongoClient("mongodb://fypadmin:12345678@ds048719.mlab.com:48719/ceres");
                IMongoDatabase db = client.GetDatabase("ceres");

                var plantInfo = db.GetCollection<BsonDocument>("plant");


                BsonDocument plant_Doc = new BsonDocument
            {
                {
                    "name", plant.name
                },
                {
                    "growing_conditions", new BsonDocument
                    {
                        { "temp", gc.temp },
                        { "humid", gc.humid},
                        { "water", gc.water},
                        { "care", gc.care},
                        { "light", gc.light },
                        //{ "power", gc.power } power is not added by user
                    }
                }

            };
                plantInfo.InsertOne(plant_Doc);

                return Content("Success :)");
            }
            catch
            {
                throw;
            }
        }

        //[Route("plants/update}")]
        //[HttpPut]
        //public ActionResult Update(PlantModel plant)
        //{
        //    try
        //    {
        //        MongoClient client = new MongoClient("mongodb://fypadmin:12345678@ds048719.mlab.com:48719/ceres");
        //        IMongoDatabase db = client.GetDatabase("ceres");

        //        //List<PlantModel> plant_list = new List<PlantModel>();
        //        var plantInfo = db.GetCollection<BsonDocument>("plant");
        //    }
        //    catch(Exception e)
        //    {
        //        throw;
        //    }

        //    return Content("Success :)");
        //}

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
