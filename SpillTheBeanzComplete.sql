CREATE DATABASE SpillTheBeanz;
GO
 
USE SpillTheBeanz;
GO
 
CREATE TABLE Admin (
admin_id INT PRIMARY KEY IDENTITY(1,1),
name VARCHAR(50) NOT NULL,
email_address VARCHAR(50) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT GETDATE(),
last_login DATETIME
);
 

CREATE TABLE Menu (
item_id INT PRIMARY KEY IDENTITY(1,1),
item_name VARCHAR(100) NOT NULL,
category VARCHAR(50) NOT NULL,
description VARCHAR(255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
is_available BIT DEFAULT 1,
is_featured BIT DEFAULT 0,
image_url VARCHAR(255),
created_at DATETIME DEFAULT GETDATE(),
updated_at DATETIME
);
 
CREATE TABLE Customers (
Customer_id INT PRIMARY KEY IDENTITY(1,1),
customer_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
phone_number VARCHAR(20) NOT NULL,
password_hash VARCHAR(255) NOT NULL,
address VARCHAR(100),
loyalty_points INT DEFAULT 0,
created_at DATETIME DEFAULT GETDATE(),
last_visited DATETIME,
is_active BIT DEFAULT 1
);

CREATE TABLE CafeTables (
table_id INT PRIMARY KEY IDENTITY(1,1),
table_number VARCHAR(10) NOT NULL UNIQUE,
capacity INT NOT NULL,
location_description VARCHAR(100),
is_available BIT DEFAULT 1
);
 
CREATE TABLE TableReservations (
reservation_id INT PRIMARY KEY IDENTITY(1,1),
customer_id INT NOT NULL,
table_id INT NOT NULL,
reservation_date DATE NOT NULL,
start_time TIME NOT NULL,
end_time TIME NOT NULL,
party_size INT NOT NULL,
special_requests VARCHAR(255),
status VARCHAR(20) DEFAULT 'Pending',
created_at DATETIME DEFAULT GETDATE(),
FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
FOREIGN KEY (table_id) REFERENCES CafeTables(table_id)
);
 
CREATE TABLE Promotions (
promotion_id INT PRIMARY KEY IDENTITY(1,1),
admin_id INT NOT NULL,
promo_name VARCHAR(50) NOT NULL,
promo_description VARCHAR(255) NOT NULL,
discount_type VARCHAR(20),
discount_value DECIMAL(10,2),
start_date DATETIME NOT NULL,
end_date DATETIME NOT NULL,
min_order_amount DECIMAL(10,2),
applicable_category VARCHAR(50),
applicable_item_id INT,
status VARCHAR(20) DEFAULT 'Active', 
created_at DATETIME DEFAULT GETDATE(),
FOREIGN KEY (admin_id) REFERENCES Admin(admin_id),
FOREIGN KEY (applicable_item_id) REFERENCES Menu(item_id)
);

CREATE TABLE CustomerPromotions (
id INT PRIMARY KEY IDENTITY(1,1),
customer_id INT NOT NULL,
promotion_id INT NOT NULL,
date_received DATETIME NOT NULL DEFAULT GETDATE(),
date_redeemed DATETIME,
status VARCHAR(20) DEFAULT 'Sent',
FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
FOREIGN KEY (promotion_id) REFERENCES Promotions(promotion_id)
);
 
 CREATE TABLE Orders (
order_id INT PRIMARY KEY IDENTITY(1,1),
customer_id INT,
order_type VARCHAR(20) NOT NULL,
order_date DATETIME NOT NULL DEFAULT GETDATE(),
total_amount DECIMAL(10,2) NOT NULL,
discount_amount DECIMAL(10,2) DEFAULT 0,
tax_amount DECIMAL(10,2) DEFAULT 0,
final_amount DECIMAL(10,2) NOT NULL,
order_status VARCHAR(20) DEFAULT 'Received', -- Received, Preparing, Ready, Completed, Cancelled
special_instructions VARCHAR(255),
reservation_id INT,
FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
FOREIGN KEY (reservation_id) REFERENCES TableReservations(reservation_id)
);
 
CREATE TABLE OrderItems (
order_item_id INT PRIMARY KEY IDENTITY(1,1),
order_id INT NOT NULL,
item_id INT NOT NULL,
quantity INT NOT NULL DEFAULT 1,
unit_price DECIMAL(10,2) NOT NULL,
special_requests VARCHAR(255),
item_status VARCHAR(20) DEFAULT 'Pending', -- Pending, Preparing, Ready, Served
FOREIGN KEY (order_id) REFERENCES Orders(order_id),
FOREIGN KEY (item_id) REFERENCES Menu(item_id)
);
 

CREATE TABLE Payments (
payment_id INT PRIMARY KEY IDENTITY(1,1),
order_id INT NOT NULL,
payment_method VARCHAR(50) NOT NULL, -- Cash, Card, Mobile Payment, etc.
payment_amount DECIMAL(10,2) NOT NULL,
payment_status VARCHAR(20) DEFAULT 'Pending', -- Pending, Completed, Failed, Refunded
transaction_reference VARCHAR(100), -- Reference number from payment gateway
payment_date DATETIME DEFAULT GETDATE(),
FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
 

 
---Coffees
INSERT INTO Menu (item_name, category, description, price) VALUES
('Cappucino', 'Hot Coffee', 'A bold espresso with steamed milk and a rich, velvety foam top.', 43.00),
('Latte', 'Hot Coffee', 'Smooth espresso blended with creamy steamed milk for a mellow pick-me-up.', 43.00),
('Americano', 'Hot Coffee', 'A rich espresso diluted with hot water for a bold, smooth sip.', 37.00),
('Espresso', 'Hot Coffee', 'Pure, intense coffee flavor in a small but mighty shot.', 32.00),
('Mocha', 'Hot Coffee', 'A luscious fusion of espresso, steamed milk, and indulgent chocolate', 48.00),
('Flat White', 'Hot Coffee', 'Strong espresso with a silky milk texture for perfect balance.', 44.00),
('Cortado', 'Hot Coffee', 'Espresso softened with an equal part of warm milk – smooth and bold.', 40.00),
('Macchiato', 'Hot Coffee', 'A shot of espresso topped with a dollop of foam – strong and simple.', 43.00);

-- Hot Drinks
INSERT INTO Menu (item_name, category, description, price) VALUES
('Hot Chocolate', 'Hot Drinks', 'Rich, creamy, and comforting – a chocolate lover''s dream.', 46.00),
('Chai Latte', 'Hot Drinks', 'Spiced black tea with frothy milk – sweet, spicy, and warming.', 46.00);

-- Iced Beverages
INSERT INTO Menu (item_name, category, description, price) VALUES
('Iced Coffee', 'Cold Coffee', 'Freshly brewed coffee poured over ice – simple and energizing.', 35.00),
('Iced Latte', 'Cold Coffee', 'Chilled espresso and cold milk for a cool, creamy boost.', 40.00),
('Cold Brew', 'Cold Coffee', 'Smooth, slow-steeped coffee with deep, bold flavor.', 45.00),
('Iced Mocha', 'Cold Coffee', 'Cold coffee meets chocolate and milk for a sweet chill.', 50.00),
('Iced Matcha Latte', 'Cold Drinks', 'Earthy matcha and milk over ice – fresh, vibrant, and green.', 50.00),
('Iced Tea', 'Cold Drinks', 'Cool, refreshing tea served chilled for a perfect pick-me-up.', 20.00);

-- Teas
INSERT INTO Menu (item_name, category, description, price) VALUES
('Herbal Tea', 'Tea', 'Naturally caffeine-free, calming blends of pure herbal goodness.', 40.00),
('Rooibos Tea', 'Tea', 'Earthy, naturally sweet, and soothing with no caffeine.', 65.00),
('Chai', 'Tea', 'A bold mix of black tea and exotic spices, brewed to warm the soul.', 75.00),
('Chamomile Tea', 'Tea', 'Light, floral, and perfect for relaxing moments.', 55.00),
('White Tea', 'Tea', 'Delicate and subtly sweet, a light and refreshing choice.', 80.00),
('Hibiscus Tea', 'Tea', 'Vibrant, tart, and fruity – a refreshing caffeine-free brew.', 60.00);

-- Muffins
INSERT INTO Menu (item_name, category, description, price) VALUES
('Chocolate Chip Muffin', 'Muffins', 'Soft muffin loaded with melty chocolate chips.', 30.00),
('Vanilla Muffin', 'Muffins', 'Classic and comforting with a sweet vanilla essence.', 30.00),
('Cappuccino Muffin', 'Muffins', 'Coffee-infused muffin with a touch of mocha magic.', 30.00),
('Blueberry Muffin', 'Muffins', 'Bursting with juicy blueberries in a tender crumb.', 30.00),
('Bran Muffin', 'Muffins', 'Hearty and wholesome, perfect for a nutritious snack.', 30.00),
('Lemon Muffin', 'Muffins', 'Bright and zesty with a citrusy kick.', 30.00),
('Apple Cinnamon Muffin', 'Muffins', 'Warm apple flavor spiced with a hint of cinnamon.', 30.00);

-- Cookies
INSERT INTO Menu (item_name, category, description, price) VALUES
('Chocolate Chip Cookie', 'Cookies', 'Classic never goes out of style — crisp edges, gooey chocolate centers, and pure cookie bliss.', 20.00),
('Oatmeal Cookie', 'Cookies', 'Wholesome oats, a touch of spice, and just the right chew — the comforting cookie you didn''t know you needed.', 20.00),
('Peanut Butter Cookie', 'Cookies', 'Sweet, salty, and nutty — with a soft center that melts in your mouth.', 20.00),
('Snickerdoodle Cookie', 'Cookies', 'Cinnamon-sugar coated and perfectly soft — a cozy twist on your usual cookie fix.', 20.00),
('Butter Biscuit', 'Cookies', 'Melt-in-your-mouth goodness with rich, buttery flavor — simple, satisfying, and utterly delicious.', 20.00),
('Coconut Biscuit', 'Cookies', 'Tropical and toasty — golden-baked biscuits with a delicious coconut twist.', 20.00);

-- Cakes
INSERT INTO Menu (item_name, category, description, price) VALUES
('Carrot Cake', 'Cakes', 'Moist, spiced, and topped with rich cream cheese frosting.', 30.00),
('Cheesecake', 'Cakes', 'Creamy, smooth, and set on a buttery biscuit base.', 30.00),
('Chocolate Cake', 'Cakes', 'Rich, dark, and indulgent — a chocoholic''s dream.', 30.00),
('Red Velvet Cake', 'Cakes', 'Hints of cocoa with cream cheese layers — smooth and striking.', 30.00),
('Pound Cake', 'Cakes', 'Dense, buttery, and perfect with coffee or tea.', 30.00),
('Lemon Drizzle Cake', 'Cakes', 'Light sponge with a sweet, zesty lemon glaze', 30.00),
('Almond Cake', 'Cakes', 'Soft, nutty, and subtly sweet.', 30.00),
('Victoria Sponge Cake', 'Cakes', 'Fluffy layers with jam and whipped cream — a true classic.', 30.00);

INSERT INTO Menu (image_url, item_name, description, price) VALUES
('/images/MenuItemsNB/cappucino.png', 'Cappuccino', 'A bold espresso with steamed milk and a rich, velvety foam top.', 43.00),
('/images/MenuItemsNB/latte.png', 'Latte', 'Smooth espresso blended with creamy steamed milk for a mellow pick-me-up.', 43.00),
('/images/MenuItemsNB/americano.png', 'Americano', 'A rich espresso diluted with hot water for a bold, smooth sip.', 37.00),
('/images/MenuItemsNB/espresso.png', 'Espresso', 'Pure, intense coffee flavor in a small but mighty shot.', 32.00),
('/images/MenuItemsNB/mocha.png', 'Mocha', 'A luscious fusion of espresso, steamed milk, and indulgent chocolate.', 48.00),
('/images/MenuItemsNB/flatwhite.png', 'Flat White', 'Strong espresso with a silky milk texture for perfect balance.', 44.00),
('/images/MenuItemsNB/cortado.png', 'Cortado', 'Espresso softened with an equal part of warm milk – smooth and bold.', 40.00),
('/images/MenuItemsNB/macchiato.png', 'Macchiato', 'A shot of espresso topped with a dollop of foam – strong and simple.', 43.00),
('/images/MenuItemsNB/hotchocolate.png', 'Hot Chocolate', 'Rich, creamy, and comforting – a chocolate lover’s dream.', 46.00),
('/images/MenuItemsNB/chailatte.png', 'Chai Latte', 'Spiced black tea with frothy milk – sweet, spicy, and warming.', 46.00);

INSERT INTO Menu (image_url, item_name, description, price) VALUES
('/images/MenuItemsNB/icedcoffee.png', 'Iced Coffee', 'Freshly brewed coffee poured over ice – simple and energizing.', 35.00),
('/images/MenuItemsNB/icedlatte.png', 'Iced Latte', 'Chilled espresso and cold milk for a cool, creamy boost.', 40.00),
('/images/MenuItemsNB/coldbrew.png', 'Cold Brew', 'Smooth, slow-steeped coffee with deep, bold flavor.', 45.00),
('/images/MenuItemsNB/icedmocha.png', 'Iced Mocha', 'Cold coffee meets chocolate and milk for a sweet chill.', 50.00),
('/images/MenuItemsNB/machalatte.png', 'Iced Matcha Latte', 'Earthy matcha and milk over ice – fresh, vibrant, and green.', 50.00),
('/images/MenuItemsNB/icedtea.png', 'Iced Tea', 'Cool, refreshing tea served chilled for a perfect pick-me-up.', 20.00);

INSERT INTO Menu (image_url,item_name, description,price) VALUES
('/images/MenuItemsNB/herbaltea.png', 'Herbal Tea', 'Naturally caffeine-free, calming blends of pure herbal goodness.', 'R40'),
('/images/MenuItemsNB/rooibostea.png', 'Rooibos Tea', 'Earthy, naturally sweet, and soothing with no caffeine.', 'R65'),
('/images/MenuItemsNB/chai.png', 'Chai', 'A bold mix of black tea and exotic spices, brewed to warm the soul.', 'R75'),
('/images/MenuItemsNB/chamomiletea.png', 'Chamomile Tea', 'Light, floral, and perfect for relaxing moments.', 'R55'),
('/images/MenuItemsNB/whitetea.png', 'White Tea', 'Delicate and subtly sweet, a light and refreshing choice.', 'R80'),
('/images/MenuItemsNB/hibiscus.png', 'Hibiscus Tea', 'Vibrant, tart, and fruity – a refreshing caffeine-free brew.', 'R60');

INSERT INTO Menu(image_url,item_name, description,price) VALUES
('/images/MenuItemsNB/chocmuffin.png', 'Chocolate Chip', 'Soft muffin loaded with melty chocolate chips.', 'R30'),
('/images/MenuItemsNB/vanillamuffin.png', 'Vanilla', 'Classic and comforting with a sweet vanilla essence.', 'R30'),
('/images/MenuItemsNB/capmuffin.png', 'Cappuccino', 'Coffee-infused muffin with a touch of mocha magic.', 'R30'),
('/images/MenuItemsNB/blueberrymuffin.png', 'Blueberry', 'Bursting with juicy blueberries in a tender crumb.', 'R30'),
('/images/MenuItemsNB/branmuffin.png', 'Bran', 'Hearty and wholesome, perfect for a nutritious snack.', 'R30'),
('/images/MenuItemsNB/lemonmuffin.png', 'Lemon', 'Bright and zesty with a citrusy kick.', 'R30'),
('/images/MenuItemsNB/applemuffin.png', 'Apple Cinnamon', 'Warm apple flavor spiced with a hint of cinnamon.', 'R30');

INSERT INTO Menu(image_url,item_name, description,price) VALUES
('/images/MenuItemsNB/chocchipcookie.png', 'Chocolate', 'Classic never goes out of style — crisp edges, gooey chocolate centers, and pure cookie bliss.', 'R20'),
('/images/MenuItemsNB/oatmealcookies.png', 'Oatmeal', 'Wholesome oats, a touch of spice, and just the right chew — the comforting cookie you didn’t know you needed.', 'R20'),
('/images/MenuItemsNB/peanutbutterbiscuit.png', 'Peanut Butter', 'Sweet, salty, and nutty — with a soft center that melts in your mouth.', 'R20'),
('/images/MenuItemsNB/snickerdoodle.png', 'Snickerdoodle', 'Cinnamon-sugar coated and perfectly soft — a cozy twist on your usual cookie fix.', 'R20'),
('/images/MenuItemsNB/butterbiscuits.png', 'Butter Biscuits', 'Melt-in-your-mouth goodness with rich, buttery flavor — simple, satisfying, and utterly delicious.', 'R20'),
('/images/MenuItemsNB/coconutbiscuit.png', 'Coconut', 'Tropical and toasty — golden-baked biscuits with a delicious coconut twist.', 'R20');

INSERT INTO Menu(image_url,item_name, description, price) VALUES
('/images/MenuItemsNB/carrotcake.png', 'Carrot Cake', 'Moist, spiced, and topped with rich cream cheese frosting.', 'R30'),
('/images/MenuItemsNB/cheesecake.png', 'Cheesecake', 'Creamy, smooth, and set on a buttery biscuit base.', 'R30'),
('/images/MenuItemsNB/choccake.png', 'Chocolate Cake', 'Rich, dark, and indulgent — a chocoholic’s dream.', 'R30'),
('/images/MenuItemsNB/redvelvet.png', 'Red Velvet Cake', 'Hints of cocoa with cream cheese layers — smooth and striking.', 'R30'),
('/images/MenuItemsNB/poundcake.png', 'Pound Cake', 'Dense, buttery, and perfect with coffee or tea.', 'R30'),
('/images/MenuItemsNB/lemondrizzle.png', 'Lemon Drizzle', 'Light sponge with a sweet, zesty lemon glaze', 'R30'),
('/images/MenuItemsNB/almondcake.png', 'Almond Cake', 'Soft, nutty, and subtly sweet.', 'R30'),
('/images/MenuItemsNB/spongecake.png', 'Victoria Sponge', 'Fluffy layers with jam and whipped cream — a true classic.', 'R30');
