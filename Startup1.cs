using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Owin;
using Microsoft.Owin;
using Microsoft.AspNet.SignalR;

[assembly: OwinStartupAttribute(typeof(ReactMVC.Startup1))]
namespace ReactMVC
{
    public partial class Startup1
    {
        public void Configure(IAppBuilder app)
        {
            app.MapSignalR(
                
                new HubConfiguration() { EnableJSONP = true }
                
                
                );
        }
    }
}
