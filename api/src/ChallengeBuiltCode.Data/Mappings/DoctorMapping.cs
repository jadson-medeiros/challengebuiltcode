using ChallengeBuiltCode.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChallengeBuiltCode.Data.Mappings
{
    public class DoctorMapping : IEntityTypeConfiguration<Doctor>
    {
        public void Configure(EntityTypeBuilder<Doctor> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Crm)
                .IsRequired()
                .HasColumnType("varchar(10)");

            builder.Property(p => p.CrmUf)
                .IsRequired()
                .HasColumnType("varchar(2)");

            builder.Property(p => p.Name)
                .IsRequired()
                .HasColumnType("varchar(200)");

            // 1 : N => Doctor : Patients
            builder.HasMany(f => f.Patients)
                .WithOne(p => p.Doctor)
                .HasForeignKey(p => p.DoctorId);

            builder.ToTable("Doctors");
        }
    }
}