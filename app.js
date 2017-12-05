$(function () {

	var model = {
		
		cat1 : {
			id : "cat1",
			count : 0
		},
		
		cat2 : {
			id : "cat2",
			count : 0
		},
		
		cat3 : {
			id : "cat3",
			count : 0
		},
		
		cat4 : {
			id : "cat4",
			count : 0
		},
		
		cat5 : {
			id : "cat5",
			count : 0
		},

		getCount: function (cat) {
			return cat.count;
		},
			
		setCount : function(cat) {
			cat.count++;
		}
	};

	var octopus = {
		init: function () {
//			model.init();
			view.init();
		},

		getTheCounter: function (catID) {
			return model.getCount(catID);
		},
		
		incrementTheCounter : function(catID) {
			model.setCount(catID);
		}

	};

	var view = {
		cats: $(".cat"),
		buttons: $("button"),

		init: function () {
			this.hideAllCats();
			$("#cat1").show();
			this.render();
		},

		render: function () {
			for (var i = 1; i <= this.buttons.length; i++) {
				this.bindButtonToCat(i);
			}

			for (var k = 1; k <= this.cats.length; k++) {
				this.bindCounterToCat(k);
			}
		},

		hideAllCats: function () {
			for (var j = 0; j < this.cats.length; j++) {
				$(this.cats[j]).hide();
			}
		},

		bindButtonToCat: function (idNumber) {
			$("#button" + idNumber).click(function () {
				view.hideAllCats();
				$("#cat" + idNumber).show();
			})
		},

		bindCounterToCat: function (idNumber) {
			var cat = "#cat" + idNumber
			$(cat).click(function () {
				var count = $(cat + " > .counter").text();
				count = parseInt(count) + 1;
				$(cat + " > .counter").text(count);
				octopus.incrementTheCounter(cat);
			})
		}

	};

	octopus.init();

});