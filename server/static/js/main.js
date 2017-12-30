$(document).ready(function () {
    GRAPH = document.getElementById('graph');
    $("#base").append("<textarea id='text' rows=\"10\" cols=\"50\">Enter the text you wish to analyze.</textarea>");
    $("#buttonDiv").append("<input class='btn btn-info btn-large' id='naive_bayes' type='submit' value='Naive Bayes'>");
    $('#buttonDiv').append('<p>     </p>')
    $("#buttonDiv").append("<input class='btn btn-info btn-large' id='pattern_matching' type='submit' value='Pattern Matching'>");

    $('#naive_bayes').click(function () {
        var userText = $('#text').val();
        $.ajax({
            url: '/analyze_nv',
            type: 'POST',
            data: {
                text: $('#text').val(),
            },
            dataType: 'text',
            success: function (data) {
                $('#results').empty();
                $('#results').append("<p>"+data+"</p>");

                var graph_data= [{
                    values:[data.pos,data.neg],
                    labels:['Postivity','Negativity'],
                    type:'pie'
                }];
                var layout = {
                    height: 400,
                    width: 600
                };
                console.log(data.pos);
                console.log(data.neg);
                Plotly.newPlot('graph',graph_data,layout);
                
            }
        });
    })

    $('#pattern_matching').click(function () {
        var userText = $('#text').val();
        $.ajax({
            url: '/analyze',
            type: 'POST',
            data: {
                text: $('#text').val(),
            },
            dataType: 'text',
            success: function (data) {
                $('#results').empty();
                $('#results').append("<p>"+data+"</p>");
                alert(data);
            }
        });
    })
});