$(document).ready(function () {
    $("#base").append("<textarea id='text' rows=\"10\" cols=\"50\">Enter the text you wish to analyze.</textarea>");
    $("#buttonDiv").append("<input class='btn btn-large' type='submit'>");
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
            }
        });
    })
});
//
//function getSentimentAnalysis(){
//    $.ajax({
//        url: 'server.py',
//        type: 'POST',
//        data:{
//            text: $()
//        },
//        dataType: 'text',
//        success: function (data) {
//            alert(data);    
//        }
//    })
//}
//
//
//
//
//
//function ShowAllTicket() {
//    $.ajax({
//        url: 'scripts/php/getAllTickets.php',
//        type: 'POST',
//        data: {
//            priority: document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value
//        }, ////<---- change this to filter by type, you can pass category type
//        dataType: 'json',
//        success: function (data) {
//            document.getElementById("display").innerHTML = "";
//            ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
//            ////remember that .innerhtml will close each tag after every time used so you must build a string then add it
//            var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Time Issued:</th><th>View</th><th>Delete</th></tr>";
//            for (var i = 0; i < data.length; i++) {
//                //ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><input type='button' value='View' onclick='ViewTicket(" + data[i].id + ")'</td><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
//                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><button type='button' class='btn btn-custom' data-toggle='modal' data-target='#myModal" + i + "'>View</button></td><div class='modal fade' id='myModal" + i + "' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>Due: " + data[i].DueDate + "<br>" + data[i].tickD + "</p></div><div class='modal-footer'><button type='button' class='btn btn-custom' data-dismiss='modal'>Close</button></div></div></div></div><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
//            }
//            ticketTable += "</table>";
//            document.getElementById("display").innerHTML += ticketTable;
//        }
//    });
//}