function addToCart() {
	let cartElement = document.getElementById("cart-amount")
	var amount = 0
	amount = cartElement.textContent.replace(/\D/g,'') // removes all non-numeric digits from string
	let newAmount = parseInt(amount) + 1
	cartElement.textContent = "(" + newAmount + ")"	
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

