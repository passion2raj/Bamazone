var mysql = require("mysql");
var inquirer = require("inquirer");


// connection 
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql@UCF100",
    database: "bamazon",
    port: 3306
});
connection.connect(function (err) {
    if (err) throw err;
    console.log(" Connected as Id" + connection.threadId + "\n");
    afterConnection();
});

  var productChosen = null;
function afterConnection() {
    connection.query("SELECT * from products", function (err, res) {
        if (err) throw err;
        console.table(res);
        //connection.end();
        userPrompt();
    });
};
function userPrompt() {
    inquirer.prompt([
        {
            type: "Input",
            name: "product",
            message: "Please input the item ID number that you are interested in purching "
        }
    ]).then(function (userRes) {
        productChosen = userRes.product
        switch (userRes.product) {
            case "1": console.log("\n Thank you for your selection\n you have chosen iphone 7")
                userQuantity();
                break;
            case '2': console.log('\nThank you for your selection\nYou have chosen i phone 8\n');
                userQuantity();
                break;


            case '3':
                console.log('\nThank you for your selection\nYou have chosen Levis Jeans\n');
                userQuantity();
                break;


            case '4':
                console.log('\nThank you for your selection\nYou have chosen Nike Track pant\n');
                userQuantity();
                break;


            case '5': console.log('\nThank you for your selection\nYou have chosen Think and grow Rich\n');
                userQuantity();
                break;


            case '6':
                console.log('\nThank you for your selection\nYou have chosen The Secrets\n');
                userQuantity();
                break;


            case '7':
                console.log('\nThank you for your selection\nYou have chosen G - shock watch\n');
                userQuantity();
                break;


            case '8':
                console.log('\nThank you for your selection\nYou have chosen Citizen watch\n');
                userQuantity();
                break;


            case '9':
                console.log('\nThank you for your selection\nYou have chosen Vitamix mixture\n');
                userQuantity();
                break;


            case '10':
                console.log('\nThank you for your selection\nYou have chosen Chefs knife set \n');
                userQuantity();
                break;


            default:
                console.log("\n Invalid input, please try again \n");
                userPrompt();
                
        };
    });

};

function userQuantity() {
    connection.query('SELECT * FROM products', function (err, res) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'quantity',
                message: 'How many would you like to purchase?'
            }
        ])
            .then(function (answer) {
                var chosenProduct = productChosen;
                var chosenQuantity = answer.quantity;
                connection.query('SELECT * FROM products WHERE item_id=?', [chosenQuantity], function (err, res) {
                    if (err) throw err;
                    if (chosenQuantity > res[0].stock_quantity) {
                        console.log('\nOut of stock, sorry for the inconvenience\n')
                        userPrompt()
                    } else {
                        var updatedStock = res[0].stock_quantity - chosenQuantity;
                        query = 'UPDATE products SET ? WHERE ?';
                        connection.query('SELECT * FROM products WHERE item_id=?',
                            [
                                { stock_quantity: updatedStock },
                                { item_id: chosenProduct }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                connection.end();
                            });
                        var totalCost = chosenQuantity * res[0].price;
                        var totalCostOwed = totalCost.toFixed(2);

                        console.log('\nOrder successful!\nYour total cost is $' + totalCostOwed + '\nThanks for shopping with Bamazon!\n')

                    }
                })

            })
    })
}
