using AutoMapper;
using CSMS_Trial.DTOs;
using CSMS_Trial.Models;

namespace CSMS_Trial.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Admin, AdminDto>().ReverseMap();
            CreateMap<MenuCategory, MenuCategoryDto>().ReverseMap();
            CreateMap<MenuItem, MenuItemDto>().ReverseMap();
            CreateMap<ItemVariant, ItemVariantDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<TableReservation, TableReservationDto>().ReverseMap();
            CreateMap<Promotion, PromotionDto>().ReverseMap();
            CreateMap<CustomerPromotion, CustomerPromotionDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderItem, OrderItemDto>().ReverseMap();
            CreateMap<Inventory, InventoryDto>().ReverseMap();
        }
    }

    
}
