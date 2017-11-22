/*eslint-env jquery */
/*eslint-disable no-unused-params, no-unused-vars*/
function onSubmitChange() {
	function processOK(response) {
		console.log('OK, new conversation workspace set.');
    }         
    function processNotOK(err) {
        //not ok call
        console.log('Not OK, no new conversation workspace set.');
    }
    function invokeAjax(message) {
		var ajaxData = {};
		if (message) {
			ajaxData.context = message; 
		}
		$.ajax({
				type: 'POST',
				url: 'api/new_dialog',
				dataType : 'json',
				data: ajaxData,
				success: processOK,
				error: processNotOK
			});
    	}
		
		var new_conversation = {
			url: $('#new_urltext').val(),
			workspace: $('#new_ws').val(),
			user: $('#new_user').val(),
			pwd: $('#new_pwd').val()
		};
		console.log(JSON.stringify(new_conversation));
		console.log('sending request to server...');
		invokeAjax(new_conversation); 
		//myForm.reset();
}