using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactMVC.Models
{
    //[BsonIgnoreExtraElements]
    public class PlantModel
    {
        public ObjectId _id { get; set; }
        
        public string name { get; set; }

        public int qty { get; set; }

        public GrowingConditions growing_conditions { get; set; }

        public BsonDateTime StartDate { get; set; }
        
        public BsonDateTime EndDate { get; set; }

        public string GerminationDays { get; set; }

        public string SowDepth { get; set; }

        public string SowDistance { get; set; }
    }

    //embedded doc
    public class GrowingConditions
    {
        public string temp { get; set; }

        public string humid { get; set; }

        public string water { get; set; }

        public string care { get; set; }

        public string light { get; set; }

        public string power { get; set; }

    }
}
