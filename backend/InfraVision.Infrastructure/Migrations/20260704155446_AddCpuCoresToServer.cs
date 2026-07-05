using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InfraVision.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCpuCoresToServer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CpuCores",
                table: "Servers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "DiskTotalGb",
                table: "Servers",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "MemoryTotalGb",
                table: "Servers",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "OsVersion",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CpuCores",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "DiskTotalGb",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "MemoryTotalGb",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "OsVersion",
                table: "Servers");
        }
    }
}
