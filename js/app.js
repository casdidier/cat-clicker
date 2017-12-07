/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'cat1',
            imgSrc : 'images/cat_picture1.jpg'
        },
        {
            clickCount : 0,
            name : 'cat2',
            imgSrc : 'images/cat_picture2.jpeg'
        },
        {
            clickCount : 0,
            name : 'cat3',
            imgSrc : 'images/cat_picture3.jpeg'
        },
        {
            clickCount : 0,
            name : 'cat4',
            imgSrc : 'images/cat_picture4.jpeg'
        },
        {
            clickCount : 0,
            name : 'cat5',
            imgSrc : 'images/cat_picture5.jpeg'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
				adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
	
		displayAdminArea : function() {
			adminView.render();
		},
	
		exitAdminArea : function() {
			adminView.render();
		},
	
		saveCatData : function(count, catName, imgSrc) {
			
			// save data in the model
			model.currentCat.clickCount = count;
			model.currentCat.name = catName;
			model.currentCat.imgSrc = imgSrc;
			
			catView.render();
		},
	
		
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
				this.catSrcElem = document.getElementById('cat-img-src');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
				this.catSrcElem.textContent = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

var adminView = {
	
	init : function() {
		// store the DOM elements
		this.adminButtonElem = document.getElementById('admin');
		this.catFormElem = document.getElementById('new-cat-form');
		this.catNewNameElem = document.getElementById('new-cat-content');
		this.catNewImgElem = document.getElementById('new-img-content');
		this.catNewCountElem = document.getElementById('new-count-click');
		this.adminSubmitElem = document.getElementById('admin-submit');
		this.adminCancelElem = document.getElementById('admin-cancel');
		
		// add event listeners to admin
		this.adminButtonElem.addEventListener('click', function(){
					octopus.displayAdminArea();
        });
		
		// add event listeners to submit
		this.adminSubmitElem.addEventListener('click', function(){
					// store the values
					var count = $('#new-count-click').val();
					var catName = $('#new-cat-content').val();
					var imgSrc = $('#new-img-content').val();

					octopus.saveCatData(count, catName, imgSrc);
        });
		
		// add event listeners to cancel
		this.adminCancelElem.addEventListener('click', function(){
					octopus.exitAdminArea();
        });
		
		// update this view
		this.render();
	},
	
	render : function() {
		// update the DOM elements with values from the current cat
		var currentCat = octopus.getCurrentCat();
		
		// toogle the admin area display
		if (this.catFormElem.className.endsWith('hidden')) {
			this.catFormElem.classList.remove('hidden');
		} else {
			this.catFormElem.classList.add('hidden');
		}
		
		// update inputs filled in for the currently-selected cat
		this.catNewNameElem.value = currentCat.name;
		this.catNewImgElem.value = currentCat.imgSrc;
		this.catNewCountElem.value = currentCat.clickCount;
		
	}
	
	
	
	
	
	
	
}

//launch app
octopus.init();
	