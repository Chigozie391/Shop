using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.Migrations
{
    public partial class RenameDefaultAdress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DefaultAddress",
                table: "AspNetUsers",
                newName: "HasDefaultAddress");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HasDefaultAddress",
                table: "AspNetUsers",
                newName: "DefaultAddress");
        }
    }
}
