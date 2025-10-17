// Profiles/MappingProfile.cs
using AutoMapper;
using ProductManagement.DTOs;
using ProductManagement.Entities;

namespace ProductManagement.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Product Mappings
            CreateMap<ProductCreateDTO, Product>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id é gerado pelo banco
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Definido no serviço
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore()); // Definido no serviço

            CreateMap<ProductUpdateDTO, Product>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore()) // Definido no serviço
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null)); // Ignora nulos na atualização

            CreateMap<Product, ProductReadDTO>();

            // User Mappings (se necessário, para outros DTOs de usuário)
            // CreateMap<UserRegisterDTO, User>(); // Exemplo, mas o registro manipula a senha hash separadamente
            // CreateMap<User, UserReadDTO>();
        }
    }
}