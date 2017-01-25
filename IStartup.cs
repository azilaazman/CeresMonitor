using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace ReactMVC
{
    public interface IStartup
    {
        IConfigurationRoot Configuration { get; }

        void Configure(IApplicationBuilder app);
        void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory);
        void ConfigureServices(IServiceCollection services);
    }
}