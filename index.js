$(document).ready(function(){
	var tableTopData = [
		{
			orderDate:"03-19-2016",
			orderNumber:"1000121335",
			poNumber:"ABCD12345",
			loadDate:"03-30-2016",
			shipToLocation:"ABC Distribution",
			weight:"17,240kg",
			volume:"1000 gal"
		}
	];

	var tableBottomData = [
		{
			orderDate:"03-19-2016",
			orderNumber:"1000121335",
			poNumber:"ABCD12345",
			loadDate:"03-30-2016",
			shipToLocation:"ABC Distribution",
			weight:"17,240kg",
			volume:"1000 gal"
		},
		{
			orderDate:"03-19-2016",
			orderNumber:"100012133",
			poNumber:"ABCD12345",
			loadDate:"03-30-2016",
			shipToLocation:"ABC Distribution",
			weight:"240kg",
			volume:"20 gal"
		},	

		{
			orderDate:"03-19-2016",
			orderNumber:"100012133",
			poNumber:"ABCD12345",
			loadDate:"03-30-2016",
			shipToLocation:"ABC Distribution",
			weight:"240kg",
			volume:"20 gal"
		},
		{
			orderDate:"03-19-2016",
			orderNumber:"100012133",
			poNumber:"ABCD12345",
			loadDate:"03-30-2016",
			shipToLocation:"ABC Distribution",
			weight:"2390kg",
			volume:"3000 gal"
		},
		{
			orderDate:"03-19-2016",
			orderNumber:"100012133",
			poNumber:"ABCD12345",
			loadDate:"03-30-2016",
			shipToLocation:"ABC Distribution",
			weight:"1654kg",
			volume:"4000 gal"
		}	
	];

	var fixHelper = function(e, ui) {
	    ui.children().each(function() {
	        $(this).width($(this).width());
	    });
	    return ui;	   
	};

	var makeDraggable= function(){
		$(".table-bottom-body tr").draggable({		
			helper:"clone",
			cursor:"move"
		});
	};	

	

	$("#table-top-template").tmpl(tableTopData).appendTo(".table-top-body");
	$("#table-bottom-template").tmpl(tableBottomData).appendTo(".table-bottom-body");

	makeDraggable();

	$(".table-bottom-body").on("click", ".js-add-row",function(evnt){
		$(evnt.target).removeClass("fa-plus-circle js-add-row").addClass("fa-minus-circle js-remove-row");
		var clone = $(evnt.target).closest("tr").clone();			
		clone.addClass("top-tr");
		$(".table-top-body").append(clone);		
		$(evnt.target).closest("tr").remove();
		makeTotalWeight();
		makeTotalVolume();
	});

	$(".table-top-body").on("click"," .js-remove-row", function(evnt){
		console.log("clicked")
		$(evnt.target).removeClass("fa-minus-circle js-remove-row").addClass("fa-plus-circle js-add-row");
		var clone = $(evnt.target).closest("tr").clone();			
		clone.removeClass("top-tr");
		$(".table-bottom-body").append(clone);	
		makeDraggable();
		$(evnt.target).closest("tr").remove();
		makeTotalWeight();
		makeTotalVolume();
	});


		
	$(".table-top-body").sortable({
		helper: fixHelper,
		cursor: "move"
	
	}).disableSelection();

	

	$("#table-top").droppable({
		accept:".table-bottom-body tr",
		activeClass: "ui-state-default",
		revert:"invalid",
		drop:function(event, ui){
			$(ui.draggable).find("i").removeClass("fa-plus-circle js-add-row").addClass("fa-minus-circle js-remove-row");
			if(!ui.draggable.hasClass("top-tr")){
				$(".table-top-body").append($(ui.draggable).clone().addClass("top-tr"));
				$(ui.draggable).remove();	
				makeTotalWeight();
				makeTotalVolume();
			}			
		},

		/*out: function(evnt, ui){
			if(ui.draggable.hasClass("top-tr")){
				$(ui.draggable).remove();
			}
		}	*/		
	});

	function makeTotalWeight(){
		var totalWeight = 0;		
		var weight, unit;
		$(".table-top-body tr").each(function(index, obj){
			console.log((obj))
			var weightStr = $(obj).find(".weight").data("weight");
			console.log(weightStr);
			weight = weightStr.substr(0, weightStr.length-2);	
			unit = weightStr.substr(weightStr.length-2, weightStr.length);
			console.log(weight);
			console.log(unit);
			var formatWeight = weight.replace(/\,/,"");
			totalWeight+=parseInt(formatWeight);
			console.log("totalWeight",totalWeight)
		});

		$(".js-total-weight").html(commaSeparateNumber(totalWeight)+unit);
	}

	function makeTotalVolume(){
		var totalWeight = 0;		
		var weight, unit;
		$(".table-top-body tr").each(function(index, obj){
			console.log((obj))
			var weightStr = $(obj).find(".volume").data("volume");
			console.log(weightStr);
			weight = weightStr.substr(0, weightStr.length-3);	
			unit = weightStr.substr(weightStr.length-3, weightStr.length);
			console.log(weight);
			console.log(unit);
			var formatWeight = weight.replace(/\,/,"");
			totalWeight+=parseInt(formatWeight);
			console.log("totalWeight",totalWeight)
		});

		$(".js-total-volume").html(commaSeparateNumber(totalWeight)+unit);
	}

	 function commaSeparateNumber(val){
	    while (/(\d+)(\d{3})/.test(val.toString())){
	      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }
	    return val;
	  }

	makeTotalWeight();
	makeTotalVolume();
});