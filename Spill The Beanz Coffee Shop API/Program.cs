using Microsoft.EntityFrameworkCore;
using Spill_The_Beanz_Coffee_Shop_API.DB_Context;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;



//using Spill_The_Beanz_Coffee_Shop_API.DB_Context;
using Spill_The_Beanz_Coffee_Shop_API.Models; //the dbContext links to the Model CLASSES. So we link the model class namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<CoffeeDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http///////")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve; //need namespace
    });

//builder.Services.AddControllers()
//    .AddNewtonsoftJson();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowReactApp");


//// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();
