using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NDAccountManagerAPI.Migrations
{
    /// <inheritdoc />
    public partial class RenameSharedWithToEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SharedWith",
                table: "AccountInfos",
                newName: "Email");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Email",
                table: "AccountInfos",
                newName: "SharedWith");
        }
    }
}
