using Microsoft.AspNetCore.Builder;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactMVC
{
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNetCore.Cors.Infrastructure;
    using Microsoft.Owin.Builder;
    using AppFunc = Func<IDictionary<string, object>, Task>;

    public static class AppBuilderExtensions
    {
        public static IApplicationBuilder UseAppBuilder(this IApplicationBuilder app, Action<IAppBuilder> configure)
        {
            app.UseOwin(addToPipeline =>
            {
                addToPipeline(next =>
                {
                    var appBuilder = new AppBuilder();
                    appBuilder.Properties["builder.DefaultApp"] = next;

                    configure(appBuilder);

                    return appBuilder.Build<AppFunc>();
                });
            });

            return app;
        }

        public static void UseSignalR2(this IApplicationBuilder app)
        {
           
            app.UseAppBuilder(appBuilder => appBuilder.MapSignalR("/~/signalr", new HubConfiguration()));
        }
    }
}
