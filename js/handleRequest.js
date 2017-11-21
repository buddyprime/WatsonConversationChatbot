/*eslint-env jquery */
/*globals formatJSON */
function onTextClick() {
		
		function createnewDiv(src) {
			var html_code = '<img src=\"' + src + '\" alt=\"the image\" width="250">';
			return $('<div></div>').html(html_code);
			
		}
		function createnewText(text){
			return $('<div></div>').text(text);
		}
		function createnewTextPre(text){
			return $('<pre></pre>').html(text);
		}
		function processOK(response) {
			console.log('OK');
			$('#loading').hide();
			//$('#id_contextdump').prepend(createnewText('Response from Watson: ' + response.output.text));
			$('#id_contextdump').prepend(createnewText(JSON.stringify(response.output.text, null, 2)));
        	$('#id_contextdump').show();
        	$('#conversation_output').prepend(createnewTextPre(formatJSON(JSON.stringify(response), false)));
        }
           
    	function processNotOK(err) {
        	//not ok call
        	$('#loading').hide();
        	$('#id_contextdump').prepend(createnewText('Error in response from Watson' + err));		
        	$('#id_contextdump').show();
    	}
    	function invokeAjax(message) {
        	//var contextdata = $('#id_urltext').data('convContext');
			//var contextdata = message;
			//var ajaxData = "msgdata=" + message;
			var ajaxData = {};
			if (message) {
				ajaxData.context = message; 
			}
			$.ajax({
				type: 'POST',
				url: 'api/chat',
				data: ajaxData,
				success: processOK,
				error: processNotOK
			});
    	}
        
		var temp_url = $('#id_urltext').val();
		if (!temp_url) {
		   $('#id_urltext').val('Enter an image url, please!');
		   return;
        } 
        if (temp_url === 'Enter an image url, please!') {
        	return;
        } 

    	$('#loading').show();
		//$('#id_contextdump').prepend(createnewDiv($('#id_urltext').val()));
        $('#id_contextdump').show();
		
		invokeAjax(temp_url); 
		//myForm.reset();
}
