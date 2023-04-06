using App.DTOs;
using App.Entities;
using AutoMapper;

namespace App.Helpers;

public class Mapper : Profile
{
    public Mapper()
    {
        CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
        CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);

        //           -------->
        CreateMap<AppUser, MemberDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                               src.Photos.FirstOrDefault(p => p.IsMain).Url));

        CreateMap<Picture, PictureDto>();
        CreateMap<MemberUpdateDto, AppUser>();
        CreateMap<RegisterDto, AppUser>();



        CreateMap<Msg, MsgDto>()
            .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src =>
                src.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src =>
                src.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));


        CreateMap<Recipe, RecipeDto>()
            .ForMember(dest => dest.CreatedById, opt => opt.MapFrom(src =>
                src.CreatedBy.Id))
            .ForMember(dest => dest.CreatedByUsername, opt => opt.MapFrom(src =>
                src.CreatedBy.UserName))
            .ForMember(dest => dest.CreatedByPhotoUrl, opt => opt.MapFrom(src =>
                src.CreatedBy.Photos.FirstOrDefault(p => p.IsMain).Url));
        CreateMap<RecipeUpdateDto, Recipe>();



        CreateMap<Post, PostDto>()
            .ForMember(dest => dest.CreatedById, opt => opt.MapFrom(src =>
                src.CreatedBy.Id))
            .ForMember(dest => dest.CreatedByUsername, opt => opt.MapFrom(src =>
                src.CreatedBy.UserName))
            .ForMember(dest => dest.CreatedByPhotoUrl, opt => opt.MapFrom(src =>
                src.CreatedBy.Photos.FirstOrDefault(p => p.IsMain).Url));
        CreateMap<PostUpdateDto, Post>();
    }
}


// agrego services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly); en ApplicationServiceExtensions