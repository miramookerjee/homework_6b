function addToCart() {
	// For debugging purposes -- uncomment below line to reset cart
	//localStorage.setItem("cart", JSON.stringify([]));

	let cartElement = getSelected(); 
	
	// retrieve cart
	if (localStorage.getItem("cart") == null) {
		localStorage.setItem("cart", JSON.stringify([]));
	}
	var cart = JSON.parse(localStorage.getItem("cart"));
	
	// add to cart
	cart.push(cartElement);

	// add to local storage
	localStorage.setItem("cart", JSON.stringify(cart));
	updateCartAmount();

	
	
} 

function getFormattedGlaze(glaze) {
	if (glaze == "none") {
		return "No Glaze"
	}
	else if (glaze == "sm") {
		return "Sugar-Milk Glaze"
	}
	else if (glaze == "vm") {
		return "Vanilla-Milk Glaze"
	}
	else if (glaze == "dc") {
		return "Double-Chocolate Glaze"
	}
}

function getFormattedQuantity(quantity) {
	if (quantity == "one") {
		return "1-Pack"
	}
	else if (quantity == "three") {
		return "3-Pack"
	}
	else if (quantity == "six") {
		return "6-Pack"
	}
	else if (quantity == "twelve") {
		return "12-Pack"
	}
}

function createText(element) {
	// create the text to be added to summary card based off of array from saved cart
	let glaze = element[0];
	let quantity = element[1];
	var glazeFormatted = getFormattedGlaze(glaze);
	var quantityFormatted = getFormattedQuantity(quantity);
	return "Original Cinnamon Roll, " + glazeFormatted + ", " + quantityFormatted
}

function updateSummaryCard() {
	let cart = JSON.parse(localStorage.getItem("cart"));

	// Update product list 
	for (var i = 0; i < cart.length; i++) { 
		let tag = document.createElement("p");
		let text = document.createTextNode(createText(cart[i]));
		tag.appendChild(text);
		let itemsList = document.getElementById("summary-card-items-list");
		itemsList.appendChild(tag);
	}
	
	// Update total price
	let totalPrice = calculateTotalPrice();
	document.getElementById("cart-total").innerHTML = "Total: ".bold() + "$" + totalPrice;

	// Update number of items
	document.getElementById("cart-item-count").innerHTML = "Items: ".bold() + cart.length;

}

function updateItemsList() {
	let cart = JSON.parse(localStorage.getItem("cart"));
	let itemList = document.getElementById("individual-items-in-cart");
	let glazes = ["none", "sm", "vm", "dc"];
	let quantities = ["one", "three", "six", "twelve"];

	// loop through each item in cart
	for (var i = 0; i < cart.length; i++) { 

		let glazing = cart[i][0];
		let quantity = cart[i][1];

		// create div container for entire item
		let item = document.createElement("div");
		itemList.appendChild(item);
		item.className = "product_details_and_image";

		// image 
		let image = document.createElement("img");
		item.appendChild(image);
		image.className = "cart-image";
		image.src = "images/original.png";
		image.alt = "Orginal Cinnamon Roll";

		// title 
		let productDetails = document.createElement("div");
		item.appendChild(productDetails);
		productDetails.className = "product_details";
		let title = document.createElement("span");
		productDetails.appendChild(title);
		title.className = "product-in-cart-title";
		title.innerHTML = "Original Cinnamon Roll";

		// price
		productDetails.appendChild( document.createTextNode(getSpaces()));
		let price = document.createElement("span");
		productDetails.appendChild(price);
		price.innerHTML = calculatePrice(quantity);

		// glazing dropdown
		let glazingDropdown = document.createElement("div");
		glazingDropdown.className = "glazing_dropdown";
		productDetails.appendChild(glazingDropdown);
		productDetails.id = i;
		let linebreak = document.createElement("br");
		glazingDropdown.appendChild(linebreak);
		let label = document.createElement("label");
		glazingDropdown.appendChild(label);
		label.innerHTML = "Glazing:";
		glazingDropdown.appendChild(document.createTextNode("\u2003"));
		let select = document.createElement("select");
		glazingDropdown.appendChild(select);
		select.name = "glazing";
		select.className = "glazing_options";
		populateDropdown(select, glazing, glazes, "glaze");
		glazingDropdown.onchange = updateAfterDropdownChange;

		// quantity dropdown
		linebreak = document.createElement("br");
		productDetails.appendChild(linebreak);

		let quantityDropdown = document.createElement("div");
		quantityDropdown.className = "quantity_dropdown";
		productDetails.appendChild(quantityDropdown);
		label = document.createElement("label");
		quantityDropdown.appendChild(label);
		label.innerHTML = "Qty:";
		quantityDropdown.appendChild(document.createTextNode("\u2003"));
		select = document.createElement("select");
		quantityDropdown.appendChild(select);
		select.name = "quantity";
		select.className = "quantity_options";
		populateDropdown(select, quantity, quantities, "quantity");
		quantityDropdown.onchange = updateAfterDropdownChange;

		// remove button 
		linebreak = document.createElement("br");
		productDetails.appendChild(linebreak);
		let removeButton = document.createElement("button");
		productDetails.appendChild(removeButton);
		removeButton.className = "remove-from-cart-btn";
		let removeButtonText = document.createTextNode("Remove");
		removeButton.appendChild(removeButtonText);
		//removeButton.onclick = function() {cart.splice(i, 1)};
		console.log(cart);
		removeButton.onclick = removeFromCart;

		// border between items
		linebreak = document.createElement("br");
		itemList.appendChild(linebreak);
		linebreak = document.createElement("br");
		itemList.appendChild(linebreak);

		let borderBetweenCartItems = document.createElement("hr");
		borderBetweenCartItems.className = "cart-border";
		itemList.append(borderBetweenCartItems);

		linebreak = document.createElement("br");
		itemList.appendChild(linebreak);
		linebreak = document.createElement("br");
		itemList.appendChild(linebreak);
	}

}

function updateAfterDropdownChange(e) {
	// update the page after a new option is selected on cart page
	let selectedValue = e.currentTarget.children[1].value;
	let indexInCart = e.currentTarget.parentNode.id;
	let cart = JSON.parse(localStorage.getItem("cart"));
	console.log(selectedValue);
	if (selectedValue == 1) {
		cart[indexInCart][1] = "one"
	}
	else if (selectedValue == 3) {
		cart[indexInCart][1] = "three"
		console.log(cart);
	}
	else if (selectedValue == 6) {
		cart[indexInCart][1] = "six"
		console.log(cart);
	}
	else if (selectedValue == 12) {
		cart[indexInCart][1] = "twelve"
		console.log(cart);
	}
	localStorage.setItem("cart", JSON.stringify(cart));
	location.reload()
}

function removeFromCart(e) {
	let indexInCart = e.currentTarget.parentNode.id;
	cart = JSON.parse(localStorage.getItem("cart"));
	cart.splice(indexInCart, 1);
	localStorage.setItem("cart", JSON.stringify(cart));
	location.reload();
	return false;
}

function getValue(selection) {
	// get value for option in dropdown

	// glazes
	if (selection == "none") {
		return "none"
	}
	else if (selection == "sm") {
		return "sugar-milk"
	}
	else if (selection == "vm") {
		return "vanilla-milk"
	}
	else if (selection == "dc") {
		return "double-chocolate"
	}

	// quantities
	else if (selection == "one") {
		return "1"
	}
	else if (selection == "three") {
		return "3"
	}
	else if (selection == "six") {
		return "6"
	}
	else if (selection == "twelve") {
		return "12"
	}
}

function populateDropdown(selectElement, selection, options, type) {
	// used to create glazing and quantity dropdowns for items in cart
	// help from https://jaketrent.com/post/remove-array-element-without-mutating
	
	let index = options.indexOf(selection);
	
	// put selection at the front of the options 
	options = [selection].concat(options.slice(0, index)).concat(options.slice(index+1));

	// loop through options and add to dropdown
	for (var i = 0; i < 4; i++) { 
		let thisOption = options[i];
		let option = document.createElement("option");
		selectElement.appendChild(option);
		option.value = getValue(thisOption);
		if (type == "glaze") {
			option.innerHTML = getFormattedGlaze(thisOption);
		}
		else {
			option.innerHTML = getFormattedQuantity(thisOption);
		}
	}
}

function calculatePrice(quantity) {
	if (quantity == "one") {
		return "$1.99"
	}
	else if (quantity == "three") {
		return "$" + String(1.99 * 3)
	}
	else if (quantity == "six") {
		return "$" + String(1.99 * 6)
	}
	else if (quantity == "twelve") {
		return "$" + String(1.99 * 12)
	}
}

function getSpaces() {
	// return the correct number of spaces (16) between the product title and price in the cart page
	return "\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003"
}

function onLoad() {
	updateCartAmount();
}

function onLoadCart() {
	updateCartAmount();
	// add to items list in summary card of cart page
	let cart = JSON.parse(localStorage.getItem("cart"));
	updateSummaryCard(cart);

	// add items to items list on left side of cart page
	updateItemsList()
}

function onLoadProductDetail() {
	updateCartAmount();
	// set background colors of first button
	document.getElementById("one").style.background = "rgb(240, 215, 185)";
	document.getElementById("none").style.background = "rgb(240, 215, 185)";
}


function updateCartAmount() {
	// update amount in cart in nav
	let cartAmounts = document.querySelectorAll(".cart-amount");
	let cart = JSON.parse(localStorage.getItem("cart"));
	let amount = cart.length;
	let newAmount = parseInt(amount); 
	cartAmounts.forEach( cartAmount => cartAmount.textContent = "(" + newAmount + ")"	 );
}

function calculateTotalPrice() {
	// calculate total price of items in the cart, return as string
	let cart = JSON.parse(localStorage.getItem("cart"));
	var total = 0
	for (var i = 0; i < cart.length; i++) { 
		quantity = cart[i][1];
		if (quantity == "one") {
			total += 1.99
		}
		else if (quantity == "three") {
			total += (1.99 * 3)
		}
		else if (quantity == "six") {
			total += (1.99 * 6)
		}
		else if (quantity == "twelve") {
			total += (1.99 * 12)
		}
	}
	return total.toFixed(2)
}

function calculateTotalQuantity() {
	// calculate total quantity of items in the cart, return as string
	let cart = JSON.parse(localStorage.getItem("cart"));
	var total = 0
	for (var i = 0; i < cart.length; i++) { 
		quantity = cart[i][1];
		if (quantity == "one") {
			total += 1
		}
		else if (quantity == "three") {
			total += 3
		}
		else if (quantity == "six") {
			total += 6
		}
		else if (quantity == "twelve") {
			total += 12
		}
	}
	return total
}


function getSelected() {
	var selected = "rgb(240, 215, 185)";
	var selectedQuantity;
	var selectedGlaze;

	// get selecteed quantity button
	if (document.getElementById("three").style.background == selected) {
		selectedQuantity = "three"
	}
	else if (document.getElementById("six").style.background == selected) {
		selectedQuantity = "six"
	}
	else if (document.getElementById("twelve").style.background == selected) {
		selectedQuantity = "twelve"
	}
	else {
		selectedQuantity = "one"
	}

	// get selected glaze button
		if (document.getElementById("sm").style.background == selected) {
		selectedGlaze = "sm"
	}
	else if (document.getElementById("vm").style.background == selected) {
		selectedGlaze = "vm"
	}
	else if (document.getElementById("dc").style.background == selected) {
		selectedGlaze = "dc"
	}
	else {
		selectedGlaze = "none"
	}
	return [selectedGlaze, selectedQuantity];
}

// Buttons

function deselectIfSelected(id, unselected) {
	// helper function that is called when a quantity or glaze is selected. 
	// If a different button is already selected, this function will deselect it
	var selected = "rgb(240, 215, 185)"
	var button = document.getElementById(id)
	console.log(button)
	console.log(button.style)
	console.log(button.style.background)
	if (button.style.background === selected) {
		
		button.style.background = unselected
	}
}

function selectButtonHelper(selected, unselected, id, others) {
	// helps button serve as radio button while mantaining styling

	// check if each of the other buttons are already selected
	others.forEach ( other => deselectIfSelected(other, unselected) )

	// check other buttons 
	var button = document.getElementById(id)
	if (button.style.background === selected) {
		button.style.background = unselected
	}
	else {
		button.style.background = selected
		
	}

}

// Quantity

function selectQuantityOne() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(255, 255, 255)"
	var others = ["three", "six", "twelve"]
	selectButtonHelper(selected, unselected, "one", others)
	//update rest of page based on selection
	updateProductName("quantity", "1-Pack")	
}

function selectQuantityThree() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(255, 255, 255)"
	var others = ["one", "six", "twelve"]
	selectButtonHelper(selected, unselected, "three", others)
	//update rest of page based on selection
	updateProductName("quantity", "3-Pack")
}


function selectQuantitySix() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(255, 255, 255)"
	var others = ["one", "three", "twelve"]
	selectButtonHelper(selected, unselected, "six", others)
	//update rest of page based on selection
	updateProductName("quantity", "6-Pack")
}


function selectQuantityTwelve() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(255, 255, 255)"
	var others = ["one", "three", "six"]
	selectButtonHelper(selected, unselected, "twelve", others)
	//update rest of page based on selection
	updateProductName("quantity", "12-Pack")
}

// Glaze
function selectNoGlaze() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(238, 235, 233)"
	var others = ["sm", "vm", "dc"]
	selectButtonHelper(selected, unselected, "none", others)
	//update rest of page based on selection
	updateProductName("glazing", "No Glaze")
	updateImage("none")
} 

function selectSMGlaze() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(238, 235, 233)"
	var others = ["none", "vm", "dc"]
	selectButtonHelper(selected, unselected, "sm", others)
	//update rest of page based on selection
	updateProductName("glazing", "Sugar-Milk Glaze")
	updateImage("sm")
}

function selectVMGlaze() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(238, 235, 233)"
	var others = ["sm", "none", "dc"]
	selectButtonHelper(selected, unselected, "vm", others)
	//update rest of page based on selection
	updateProductName("glazing", "Vanilla-Milk Glaze")
	updateImage("vm")
}

function selectDCGlaze() {
	var selected = "rgb(240, 215, 185)"
	var unselected = "rgb(238, 235, 233)"
	var others = ["sm", "vm", "none"]
	selectButtonHelper(selected, unselected, "dc", others)
	//update rest of page based on selection
	updateProductName("glazing", "Double-Chocolate Glaze")
	updateImage("dc")
}

function updateProductName(field, value) {
	let productNameArray = document.getElementById("product_name_title").innerHTML.split(",");
	if (field === "quantity") {
		productNameArray[2] = value;
	}
	else {
		// field === glazing
		productNameArray[1] = value;
	}
	// now, update the product name
	let productNameString = productNameArray.join(", ");
	document.getElementById("product_name_title").innerHTML = productNameString

}

function updateImage(value) {
	var img = document.getElementById("product_detail_image")
	if (value === "none") {
		img.src = "images/original_large.png"
	}
	else if (value === "sm") {
		img.src = "images/sm_large.png"
	}
	else if (value === "vm") {
		img.src = "images/vm_large.png"
	}
		else if (value === "dc") {
		img.src = "images/dc_large.png"
	}
}

