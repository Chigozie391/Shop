using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using Shop.API.Core;
using Shop.API.Core.Models;
using Shop.API.Helper;

namespace Shop.API.Persistance
{
	public class OrderRepository : IOrderRepository
	{
		private readonly DataContext context;
		public OrderRepository(DataContext context)
		{
			this.context = context;
		}

		public async Task<Order> GetOrderedItems(int userId, string reference)
		{
			return await this.context.Orders
			.Include(u => u.User)
			.FirstOrDefaultAsync(x => x.UserId == userId && x.Reference == reference);
		}

		public async Task<QueryResult<Order>> GetAllOrderedItems(OrderQueryParams queryParams)
		{
			var queryResult = new QueryResult<Order>();
			var query = queryParams.IsShipped ?
							this.context.Orders.Where(x => x.IsShipped).AsQueryable()
							:
							this.context.Orders.Where(x => !x.IsShipped).AsQueryable();

			var columMap = new Dictionary<string, Expression<Func<Order, object>>>()
			{
				["orderDate"] = v => v.OrderDate,
			};

			query = query.ApplyOrdering(queryParams, columMap);

			queryResult.TotalItems = await query.CountAsync();

			queryResult.Items = query.ApplyPaging(queryParams);

			return queryResult;

		}

		public async Task<Order> GetOrder(int id, bool includeUser)
		{
			var order = includeUser ? await this.context.Orders
											.Include(u => u.User)
											.FirstOrDefaultAsync(x => x.Id == id)
											:
											 await this.context.Orders
											.FirstOrDefaultAsync(x => x.Id == id);

			return order;
		}

		public async Task<bool> SendEmail(int id)
		{
			var order = await this.GetOrder(id, true);
			var senderEmail = "chigoziemadubuko@gmail.com";
			var message = new MimeMessage();

			message.From.Add(new MailboxAddress("Shopping Store", senderEmail));
			message.To.Add(new MailboxAddress(order.User.FirstName, order.User.Email));
			message.Subject = $"Order Reference: {order.Reference}";

			string emailString;
			using (var file = new StreamReader("Helper/Email.html", Encoding.UTF8))
			{
				emailString = await file.ReadToEndAsync();
			}

			message.Body = new TextPart(TextFormat.Html)
			{
				Text = emailString
			};

			using (var client = new SmtpClient())
			{
				await client.ConnectAsync("smtp.gmail.com", 465, true);
				await client.AuthenticateAsync(senderEmail, "emrocolage4617");
				await client.SendAsync(message);
				await client.DisconnectAsync(true);
			}
			return true;
		}
	}
}