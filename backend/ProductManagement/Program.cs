// Program.cs
using Microsoft.EntityFrameworkCore;
using ProductManagement.Data;
using ProductManagement.Interfaces;
using ProductManagement.Entities; // Adicione esta linha
using ProductManagement.Services;
using ProductManagement.Profiles; // Para o AutoMapper
using Microsoft.AspNetCore.Authentication.JwtBearer; // Para JWT
using Microsoft.IdentityModel.Tokens; // Para JWT
using System.Text; // Para JWT
using Microsoft.OpenApi.Models; // Para Swagger
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// 1. Configurar Banco de Dados em Memória
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("ProductDb"));

// 2. Configurar AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// 3. Registrar Serviços
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// 4. Configurar Autenticação JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key not found.");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

// 5. Adicionar Autorização
builder.Services.AddAuthorization();

// 6. ********************************************
//    ADICIONAR CONFIGURAÇÃO CORS AQUI!
// ********************************************
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            // Especifica a origem do seu frontend Angular
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()  // Permite qualquer cabeçalho na requisição
                  .AllowAnyMethod(); // Permite qualquer método HTTP (GET, POST, PUT, DELETE, OPTIONS)
        });
});

// Adiciona Controllers
builder.Services.AddControllers();

// 7. Configurar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Product Management API", Version = "v1" });

    // Configuração para adicionar botão de Autorização no Swagger UI
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header usando o esquema Bearer. Ex: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Product Management API V1");
        c.RoutePrefix = string.Empty; // Define a raiz para o Swagger UI
    });
}

app.UseHttpsRedirection();

// ********************************************
//    HABILITAR MIDDLEWARE CORS AQUI!
//    DEVE VIR ANTES de UseAuthentication e UseAuthorization
// ********************************************
app.UseCors();

// Usar Autenticação e Autorização (IMPORTANTE: ordem importa!)
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Inicializa o banco de dados em memória com alguns dados de teste
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    // Certifique-se de que o banco de dados em memória foi criado
    context.Database.EnsureCreated();

    // Adiciona alguns dados de exemplo (produtos e usuários)
    if (!context.Products.Any())
    {
        context.Products.AddRange(
            new Product
            {
                Id = 1,
                Name = "Notebook Dell XPS 15",
                Sku = "DELL-XPS15-2025-I9-32GB-1TB",
                Description = "Notebook premium com tela InfinityEdge 15.6'', processador Intel Core i9 de 13ª geração, 32GB de RAM e SSD NVMe de 1TB. Ideal para uso corporativo e criadores de conteúdo.",
                Price = 12999.9M,
                TotalStock = 500,
                AvailableStock = 472,
                ReservedStock = 28,
                Unit = "unidade",
                ActiveLocations = 5,
                NextDueDate = DateTime.Parse("2025-12-10T00:00:00Z").ToUniversalTime(),
                CategoryId = Guid.Parse("b2a34ad4-982f-4f2b-8b9e-871f86a62b14"),
                SubcategoryId = Guid.Parse("c4b39d21-5f73-40b7-bb6a-7282d67f45c7"),
                Brand = "Dell",
                Model = "XPS 15 9530",
                Material = "Alumínio e fibra de carbono",
                WeightKg = 1.9M,
                DimensionsCm = "34.5 x 23.0 x 1.8",
                Color = "Prata",
                Size = "15.6”",
                Specifications = new Dictionary<string, string>
                {
                    { "processador", "Intel Core i9-13900H" },
                    { "memoria", "32GB LPDDR5" },
                    { "armazenamento", "SSD NVMe 1TB" },
                    { "sistemaOperacional", "Windows 11 Pro" },
                    { "placaDeVideo", "NVIDIA RTX 4060 8GB GDDR6" }
                },
                Condition = 1,
                CountryOfOrigin = "Brasil",
                WarrantyMonths = 24,
                CreatedAt = DateTime.Parse("2025-10-16T17:10:48.3376859Z").ToUniversalTime(),
                UpdatedAt = DateTime.Parse("2025-10-16T17:10:48.3376859Z").ToUniversalTime()
            },
            new Product
            {
                Id = 2,
                Name = "Monitor Gamer Alienware 27",
                Sku = "AW-2723-QD",
                Description = "Monitor QHD de 27 polegadas com taxa de atualização de 240Hz e tempo de resposta de 1ms, ideal para jogos competitivos.",
                Price = 3599.0M,
                TotalStock = 200,
                AvailableStock = 180,
                ReservedStock = 20,
                Unit = "unidade",
                ActiveLocations = 3,
                NextDueDate = null,
                CategoryId = Guid.Parse("b2a34ad4-982f-4f2b-8b9e-871f86a62b15"),
                SubcategoryId = Guid.Parse("c4b39d21-5f73-40b7-bb6a-7282d67f45c8"),
                Brand = "Alienware",
                Model = "AW2723QD",
                Material = "Plástico, Metal",
                WeightKg = 6.5M,
                DimensionsCm = "61.1 x 35.6 x 6.5",
                Color = "Preto",
                Size = "27”",
                Specifications = new Dictionary<string, string>
                { 
                    { "resolucao", "2560x1440" },
                    { "taxaAtualizacao", "240Hz" },
                    { "tempoResposta", "1ms" },
                    { "tecnologiaPainel", "IPS" }
                },
                Condition = 1,
                CountryOfOrigin = "China",
                WarrantyMonths = 12,
                CreatedAt = DateTime.Parse("2024-08-01T10:00:00Z").ToUniversalTime(),
                UpdatedAt = DateTime.Parse("2024-08-01T10:00:00Z").ToUniversalTime()
            }
        );
        await context.SaveChangesAsync();
    }

    if (!context.Users.Any())
    {
        // Cria um usuário administrador padrão para testes
        var adminUser = new User
        {
            Username = "admin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"), // Senha "Admin@123"
            Role = "Admin"
        };

        var regularUser = new User
        {
            Username = "user",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("User@123"), // Senha "User@123"
            Role = "User"
        };

        context.Users.AddRange(adminUser, regularUser);
        await context.SaveChangesAsync();
    }
}

app.Run();