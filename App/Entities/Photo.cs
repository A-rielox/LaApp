using System.ComponentModel.DataAnnotations.Schema;

namespace App.Entities;

// p' especificar el nombre q va a tener en la db, xq no voy a hacer el DbSet
[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool IsMain { get; set; }
    public string PublicId { get; set; }

    // p'q ocupe la id del AppUser como foreign-key, y paq la prop AppUserId NO sea
    // nullable ( NO puede haber fotos q no esten relacionadas a un AppUser )
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
}

// en AppUser
// relacion one-to-many ( un user many photos )
// public List<Photo> Photos { get; set; }
// en Photo hago
// p'q ocupe la id del AppUser como foreign-key
// public AppUser AppUser { get; set; }
// public int AppUserId { get; set; }
// asi las fotos quedan ligadas a un AppUser, y cuando se borre un user se van a
// borrar las fotos, el cascade delete
