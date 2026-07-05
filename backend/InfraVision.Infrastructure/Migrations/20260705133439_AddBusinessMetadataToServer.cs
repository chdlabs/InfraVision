using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace InfraVision.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBusinessMetadataToServer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BusinessRole",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CommissionedAt",
                table: "Servers",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Criticality",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LifecycleStatus",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Owner",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ServerType",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Vendor",
                table: "Servers",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "WarrantyUntil",
                table: "Servers",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessRole",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "CommissionedAt",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "Criticality",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "LifecycleStatus",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "Location",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "Owner",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "ServerType",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "Vendor",
                table: "Servers");

            migrationBuilder.DropColumn(
                name: "WarrantyUntil",
                table: "Servers");
        }
    }
}
