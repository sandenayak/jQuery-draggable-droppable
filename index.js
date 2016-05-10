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
	});

	$(".table-top-body").on("click"," .js-remove-row", function(evnt){
		console.log("clicked")
		$(evnt.target).removeClass("fa-minus-circle js-remove-row").addClass("fa-plus-circle js-add-row");
		var clone = $(evnt.target).closest("tr").clone();			
		clone.removeClass("top-tr");
		$(".table-bottom-body").append(clone);	
		makeDraggable();
		$(evnt.target).closest("tr").remove();

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
			}			
		},

		/*out: function(evnt, ui){
			if(ui.draggable.hasClass("top-tr")){
				$(ui.draggable).remove();
			}
		}	*/		
	});


});