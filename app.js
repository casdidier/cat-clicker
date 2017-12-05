$(function(){
	
	var model = {
		init: function() {
            if (!localStorage.count) {
                localStorage.count = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.count);
            data.push(obj);
            localStorage.count = JSON.stringify(data);
        },
        getCount: function() {
            return JSON.parse(localStorage.count);
        }
	};
	
	var octopus = {
		init : function() {
			model.init();
			view.init();
		},
		
		getTheCounter : function() {
			return model.getCount();
		}
		
	};
	
	var view = {
		cats : $(".cat"),
		buttons : $("button"),
		
		init : function() {
			this.hideAllCats();
			$("#cat1").show();
			this.render;
		},
		
		render : function() {
			for (var i=1; i<=buttons.length; i++){
				bindButtonToCat(i);
			}

			for (var i=1; i<=cats.length; i++){
				bindCounterToCat(i);
			}
		},
		
		hideAllCats : function() {
			for (var i=0; i<view.cats.length; i++){
				$(view.cats[i]).hide();
			}
		},
		
		bindButtonToCat : function(idNumber) {
			$("#button"+idNumber).click(function(){
				view.hideAllCats();
				$("#cat"+idNumber).show();
			})
		},
		
		bindCounterToCat : function(idNumber){
			var cat = "#cat"+idNumber
			$(cat).click(function(){
				var count = $(cat+" > .counter").text();
				count = parseInt(count) + 1;
				$(cat+" > .counter").text(count);
			})
		}
				
	};
	
	octopus.init();
});	