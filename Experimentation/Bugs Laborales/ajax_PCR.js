$(document).ready(function() {

	$("button").click(function(){
	    var content = $(this).text();
		if(content == "Create New Topic") {

			$.ajax({
				url : '/bin/createNewTagServlet'
				data : {
					topic : $("[name='./newTopicName']").val()
				},
				success : function(responseText) {
					$(this).closest("div").append("<div style='position:relative;left:115px;top:-18px;width:200px'>New Topic " + responseText + "successfully created</div>");
				},
				error: function () {
                	$(this).closest("div").append("<div style='position:relative;left:115px;top:-18px;width:200px'>Unable to create New Topic</div>");
                }
			});

		} else if(content == "Create New Tag") {
	    	
			$.ajax({
				url : '/bin/createNewTagServlet'
				data : {
					tag : $("[name='./newTagName']").val(),
					route : "/content/journey/us/en/tags"
				},
				success : function(responseText) {
					$(this).closest("div").append("<div style='position:relative;left:115px;top:-18px;width:200px'>New Tag " + responseText + "successfully created</div>");
				},
				error: function () {
                	$(this).closest("div").append("<div style='position:relative;left:115px;top:-18px;width:200px'>Unable to create New Tag</div>");
                }
			});

	    } else if(content == "Create New Author") {

	    	$.ajax({
				url : '/bin/createNewTagServlet'
				data : {
					author : $(".x-form-text.x-form-field.x-form-focus").val()
				},
				success : function(responseText) {
					$(this).closest("div").append("<div style='position:relative;left:115px;top:-18px;width:200px'>New Author " + responseText + "successfully created</div>");
				},
				error: function () {
                	$(this).closest("div").append("<div style='position:relative;left:115px;top:-18px;width:200px'>Unable to create New Author</div>");
                }
			});

	    }
	})
});