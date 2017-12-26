$(document).ready(function () {
    $("#base").append("<textarea id='text' rows=\"10\" cols=\"50\">Enter the text you wish to analyze.</textarea>");
    $("#buttonDiv").append("<input class='btn btn-info btn-large' data-toggle='modal' datatarget='#myModal' type='submit'>");
    $('#buttonDiv').click(function (){
        var userText = $('#text').val();
        $.ajax({
            url: '/analyze',
            type: 'POST',
            data: {
                text: $('#text').val(),
            },
            dataType: 'text',
            success: function(data){
                alert(data);
                $('#results').display.innerHTML = "";
                $('#results').display.innerHTML += "<div id='myModal' class='modal fade' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Modal Header</h4></div><div class='modal-body'><p>Some text in the modal.</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div>"
            }
        });
    })
});