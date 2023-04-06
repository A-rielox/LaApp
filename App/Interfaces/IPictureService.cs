using CloudinaryDotNet.Actions;

namespace App.Interfaces;

public interface IPictureService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
}
