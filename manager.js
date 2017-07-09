var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
});

connection.connect(function(err){
	if (err) throw err;
});



function taskList(){
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Logout"],
			name: "task"
		}

	]).then(function(answer) {
		if(answer.task == "View Products"){
			connection.query("SELECT * FROM products", function (err, res) {
				if (err) console.log(err);
				else{
					for (var i = 0; i < res.length; i++){
			 			console.log("Item ID = " + res[i].item_id + " | " + res[i].product_name + " | " + "Department - " + res[i].department_name + " | " + "In Stock:" + res[i].stock_quantity);
					}
					taskList();
				}
			})
		}
		else if(answer.task == "View Low Inventory"){
			connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 6", function (err, res) {
				if (err) console.log(err);
				else{
					for (var i = 0; i < res.length; i++){
			 			console.log("Item ID = " + res[i].item_id + " | " + res[i].product_name + " | " + "In Stock:" + res[i].stock_quantity);
					}
				taskList();
				}
			})
		}
		else if(answer.task == "Add to Inventory"){
			inquirer.prompt([
				{
					type: "input",
					message: "What is the Item ID of the product you would like to stock?",
					name: "id"
				},
				{
					type: "input",
					message: "How many more units would you like to order?",
					name: "order"
				}
			]).then(function(answers){
				connection.query ("SELECT item_id, stock_quantity FROM products WHERE ?", {item_id: answers.id}, function(err, res){
					if (err) console.log(err);
					var newStock = res[0].stock_quantity + parseInt(answers.order);
					
					connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newStock}, {item_id: answers.id}],
					 function(err, res){
						if (err) console.log(err);
						console.log("Item ID :" + answers.id + " now has " + newStock + " units in stock!");
						taskList();
					 })
				})		
			})
		}
		else if( answer.task == "Add New Product"){
			inquirer.prompt([
				{
					type: "input",
					message: "What is the name of the prodcut you would like to order?",
					name: "prodName"
				},
				{
					type: "input",
					message: "What department will stock the product?",
					name: "prodDept"
				},
				{
					type: "input",
					message: "How much are you going to sell the product for?",
					name: "prodPrice"
				},
				{
					type: "input",
					message: "How many units would you like to order?",
					name: "prodStock"
				}
			]).then(function(userInput){
				var newName = userInput.prodName;
				var newDept = userInput.prodDept;
				var newPrice = userInput.prodPrice;
				var newStock = userInput.prodStock;
				connection.query("INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [newName, newDept, newPrice, newStock], function(err, data) {
				if (err) console.log(err);
				console.log("items have been added to your inventory");
				taskList()
				})

			})

			
		}
		else if( answer.task == "Logout"){
			console.log("Thanks for updating your inventory!")
			process.exit(0);
		}
	});
}

taskList();
