using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NDAccountManagerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddShareingFields : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<List<string>>(
            name: "SharedWith",
            table: "AccountInfos",
            type: "text[]",
            nullable: true, // Allow null values
            defaultValue: new List<string>()); // Set default value to an empty list

        migrationBuilder.AddColumn<DateTime?>(
            name: "ShareExpiration",
            table: "AccountInfos",
            type: "timestamp with time zone",
            nullable: true); // Allow null values
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "SharedWith",
            table: "AccountInfos");

        migrationBuilder.DropColumn(
            name: "ShareExpiration",
            table: "AccountInfos");
    }
}
}
