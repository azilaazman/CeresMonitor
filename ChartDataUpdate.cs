using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using ReactMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace ReactMVC
{
public class RandomNumberGenerator
    {
        static Random rnd1 = new Random();
        static public int randomScalingFactor()
        {

            return rnd1.Next(100);
        }
        static public int randomColorFactor()
        {

            return rnd1.Next(255);
        }

        static public IEnumerable<PlantDataModel> dataTemp()
        {
            //MongoClient client = new MongoClient("mongodb://localhost");
            //IMongoDatabase db = client.GetDatabase("test");
            //var coll = db.GetCollection<Data>("currentData");

            //var condition = Builders<Data>.Filter.Exists(p => p.temp);
            //var fields = Builders<Data>.Projection.Include(p => p.temp);
            //var results = coll.Find(condition).Project<Data>(fields).ToList().AsQueryable();

            var toJson = new WebClient().DownloadString("http://localhost:52781/api/v1/GetAllPlantsTemp");
            string json = Convert.ToString(toJson);

            List<PlantDataModel> instance = JsonConvert.DeserializeObject<List<PlantDataModel>>(json).ToList();

            //List<Data> listData = instance.Cast<Data>().ToList();
            return instance; 
            
        }
    }

    //Line Chart class
    public class LineChart
    {
        [JsonProperty("lineChartData")]
        private IEnumerable<PlantDataModel> lineChartData;
        [JsonProperty("lineChartArray")]
        private double[] lineChartArray;
        [JsonProperty("lineChartTimeArray")]
        private string[] lineChartTimeArray;

        public void SetLineChartData()
        {
            lineChartData = RandomNumberGenerator.dataTemp().ToList();

            int i = 0;
            int ct = lineChartData.Count(); 
            lineChartArray = new double[ct];
            lineChartTimeArray = new string[ct];

            foreach (var item in lineChartData)
            {
                lineChartArray[i] = double.Parse(item.temp);
                lineChartTimeArray[i] = item._id.CreationTime.ToShortTimeString();
                i++;
            }


        }

    }

    //The Pie Chart Class    
    public class PieChart
    {
        [JsonProperty("value")]
        private int[] pieChartData;

        public void SetPieChartData()
        {
            pieChartData = new int[3];
            pieChartData[0] = RandomNumberGenerator.randomScalingFactor();
            pieChartData[1] = RandomNumberGenerator.randomScalingFactor();
            pieChartData[2] = RandomNumberGenerator.randomScalingFactor();

        }

    }

    public class ChartDataUpdate
    {

        // Singleton instance    
        private readonly static Lazy<ChartDataUpdate> _instance = new Lazy<ChartDataUpdate>(() => new ChartDataUpdate());
        // Send Data every 10 seconds    
        readonly int _updateInterval = 5000;
        //Timer Class    
        private Timer _timer;
        private volatile bool _sendingChartData = false;
        private readonly object _chartUpateLock = new object();
        LineChart lineChart = new LineChart();
        PieChart pieChart = new PieChart();

        private ChartDataUpdate()
        {

        }

        public static ChartDataUpdate Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        // Calling this method starts the Timer    
        public void GetChartData()
        {
            _timer = new Timer(ChartTimerCallBack, null, _updateInterval, _updateInterval);

        }
        private void ChartTimerCallBack(object state)
        {
            if (_sendingChartData)
            {
                return;
            }
            lock (_chartUpateLock)
            {
                if (!_sendingChartData)
                {
                    _sendingChartData = true;
                    SendChartData();
                    _sendingChartData = false;
                }
            }
        }

        private void SendChartData()
        {
            lineChart.SetLineChartData();
            pieChart.SetPieChartData();
            GetAllClients().All.UpdateChart(lineChart, pieChart);

        }

        private static dynamic GetAllClients()
        {
            return GlobalHost.ConnectionManager.GetHubContext<ChartHub>().Clients;
        }
    }
}
