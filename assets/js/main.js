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
	console.log(cart);

	updateCartAmount();

	// add to items list in summary card of cart page
	//updateSummaryCard(cart);
	
} 

function onLoad() {
	updateCartAmount()
}


function updateCartAmount() {
	// update amount in cart in nav
	let cartAmounts = document.querySelectorAll(".cart-amount");
	let cart = JSON.parse(localStorage.getItem("cart"));
	let amount = cart.length;
	let newAmount = parseInt(amount) 
	cartAmounts.forEach( cartAmount => cartAmount.textContent = "(" + newAmount + ")"	 )
}

function updateSummaryCard(cart) {
	let tag = document.createElement("p");
	let text = document.createTextNode("Sample text");
	tag.appendChild(text);
	let itemsList = document.getElementById("summary-card-items-list");
	console.log(itemsList);
	itemsList.appendChild(tag);
	console.log( document.getElementById("summary-card-items-list").children)
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
	if (button.style.background === selected) {
		
		button.style.background = unselected
	}
}

function selectButtonHelper(selected, unselected, id, others) {
	// helps button serve as radio button while mantaining styling
	var button = document.getElementById(id)
	if (button.style.background === selected) {
		button.style.background = unselected
	}
	else {
		button.style.background = selected
		// check if each of the other buttons are already selected
		others.forEach ( other => deselectIfSelected(other, unselected) )
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

