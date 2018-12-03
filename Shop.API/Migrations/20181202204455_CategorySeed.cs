using Microsoft.EntityFrameworkCore.Migrations;

namespace Shop.Migrations
{
	public partial class CategorySeed : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Men')");
			migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Women')");
			migrationBuilder.Sql("INSERT INTO Categories (Name) VALUES ('Unisex')");

			migrationBuilder.Sql("INSERT INTO ChildCategories (Name, CategoryId) VALUES ('Shoes', (SELECT Id FROM Categories WHERE Name ='Men'))");
			migrationBuilder.Sql("INSERT INTO ChildCategories (Name, CategoryId) VALUES ('Jewlry', (SELECT Id FROM Categories WHERE Name ='Men'))");

			migrationBuilder.Sql("INSERT INTO ChildCategories (Name, CategoryId) VALUES ('Shoes', (SELECT Id FROM Categories WHERE Name ='Women'))");
			migrationBuilder.Sql("INSERT INTO ChildCategories (Name, CategoryId) VALUES ('Jewlry', (SELECT Id FROM Categories WHERE Name ='Women'))");

			migrationBuilder.Sql("INSERT INTO ChildCategories (Name, CategoryId) VALUES ('Shoes', (SELECT Id FROM Categories WHERE Name ='Unisex'))");
			migrationBuilder.Sql("INSERT INTO ChildCategories (Name, CategoryId) VALUES ('Jewlry', (SELECT Id FROM Categories WHERE Name ='Unisex'))");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.Sql("DELETE FROM Categories WHERE Name IN ('Men', 'Women', 'Unisex')");
		}
	}
}
