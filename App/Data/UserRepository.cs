using App.Entities;
using App.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace App.Data;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;

    public UserRepository(DataContext context)
    {
        _context = context;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        var user = await _context.Users.FindAsync(id);

        return user;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
        var user = await _context.Users
                                 .Include(u => u.Photos)
                                 .FirstOrDefaultAsync(u => u.UserName == username);

        return user;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        var users = await _context.Users
                                  .Include(u => u.Photos)
                                  .ToListAsync();

        return users;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void Update(AppUser user)
    {

        _context.Entry(user).State = EntityState.Modified;
    }
}
