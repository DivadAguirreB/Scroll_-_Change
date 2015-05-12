var BoxEnlarger = function (nameOfObjects, sizeToAdd) {
	
	//Array for elements 
	var arrayOfElements = new Array();

	function init() {
		loadElements();	
		refresh();
	}

	function refresh() {
		var elements = getElementsToBeChanged();

		if( elements.length > 0 ) {
			for(var i = 0; i < elements.length; i++) {
				var difference = getDifference( elements[i] );
				assignChange(elements[i], difference);
			}
		}
	}

	function assignChange(element, change) {
		element.Element.style.width = (element.initWidth + change) + "px"; 
		element.Element.style.height = (element.initHeight + change) + "px";
	}

	function getDifference(element) {
		var difference = 0;
		var peak = element.Begins + (element.Height/2);

		var currentPoint = parseInt(window.scrollY) + ( parseInt(window.innerHeight)/2 );

		if(peak > currentPoint) {
			var progress = ( ( ( currentPoint - element.Begins) * 100 ) /( element.Height/2 ) )/100;
			difference = progress * sizeToAdd;
		} else {
			var revProgress = ( ( ( currentPoint - peak ) * 100 ) / ( element.Height/2) ) /100; 
			var progress = 1.00 - revProgress;
			difference = progress * sizeToAdd;
		}

		return difference;
	}

	function getElementsToBeChanged(){
		var scrolledSoFar = (parseInt(window.innerHeight)/2) + parseInt(window.scrollY);
		var elementsToBeReturned = new Array();
		for(var i = 0; i < arrayOfElements.length; i++) {
			if(scrolledSoFar >= arrayOfElements[i].Begins && scrolledSoFar <= arrayOfElements[i].Ends) {
				elementsToBeReturned.push(arrayOfElements[i]);
			}
		}
		return elementsToBeReturned;
	}

//function required for creating elements
	function loadElements() {

		var elements = document.getElementsByClassName(nameOfObjects);

		for(var i = 0; i < elements.length; i++) {
			var width = parseInt(elements[i].clientWidth);
			var height = parseInt(elements[i].clientHeight);
			var begins = getOffset(elements[i]) + (sizeToAdd/2);
			var ends = begins + height + sizeToAdd; 
			var Height = ends - begins;
			arrayOfElements.push( new Elements( elements[i], width, height,  begins, ends, Height) );
		}		
	}

//This method returns the distance from the current element to the top of the page
	function getOffset(element) {

		var currentElement = element;
		var sum = 0;

		do {
			sum += parseInt(currentElement.offsetTop);	
			currentElement = currentElement.offsetParent;

		} while(currentElement != Document.Node);		

		return sum;
	}

	var Elements = function(element, width, height, begins, ends, Height) {

		this.Element = element;
		this.initHeight = height;
		this.initWidth = width;
		this.Begins = begins;
		this.Ends = ends;
		this.Height = Height;

		return {
			Element:this.Element,
			initHeight:this.initHeight,
			initWidth:this.initWidth,
			Begins:this.Begins,
			Ends:this.Ends,
			Height:this.Height
		}
	}

	window.addEventListener("load", init);
	document.addEventListener("scroll", refresh);
}
