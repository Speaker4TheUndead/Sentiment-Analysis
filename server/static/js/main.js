$(document).ready(function () {
    GRAPH = document.getElementById('graph');
    $("#results").hide();
    $("#base").append("<textarea id='text' rows=\"10\" cols=\"50\" placeholder='Enter the text you wish to analyze'></textarea>");
    $("#buttonDiv").append("<input class='btn btn-info btn-large' id='analyze' type='submit' value='Analyze'>");
    $("#graph").on('plotly_afterplot', function () {
        $("#results").show(1000);
    });
    $('#analyze').click(function () {
        var userText = $('#text').val();
        $.ajax({
            url: '/analyze',
            type: 'POST',
            data: {
                text: userText,
            },
            dataType: 'json',
            success: function (data) {
                $('#patternData').empty();
                Object.keys(data["sentence_data"]).forEach(function (k) {
                    $('#patternData').append(coloredPolarize(k, parseFloat(data["sentence_data"][k])));
                });
            }
        });
        $.ajax({
            url: '/analyze_nv',
            type: 'POST',
            data: {
                text: userText,
            },
            dataType: "json",
            success: function (data) {
                $('#nv_results').empty();
                $('#nv_results').append("<p>The overall sentiment is: " + data["sentiment"] + "<br>The positivity value is: " + data["pos"] + "<br>The negativity value is: " + data["neg"] + "</p>");

                var graph_data = [{
                    values: [data["pos"], data["neg"]],
                    labels: ['Positivity', 'Negativity'],
                    type: 'pie'
                }];

                var layout = {
                    height: 400,
                    width: 600
                };


                Plotly.newPlot('graph', graph_data, layout);

            }
        });

    })

});


function rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

function toColor(r, g, b) {
    return rgbToHex(r) + rgbToHex(g) + rgbToHex(b);
}

function coloredPolarize(text, polarity) {
    var color;

    if (polarity < 0) {
        color = toColor(100 + Math.round((-1 * polarity) * 155), 100, 100);
    } else if (polarity == 0) {
        color = toColor(100, 100, 100);
    } else {
        color = toColor(100, 100 + Math.round(polarity * 155), 100);
    }
    $(".sentSent").empty();
    return "<div class='sentSent' style='color:#" + color + "'>" + text + "</div>";
}

function stripText(element) {
    var item = element[0];
    var newElement = $('<' + item.nodeName + '/>');
    for (i = 0; i < item.attributes.length; i++) {
        newElement.attr(item.attributes[i].name, item.attributes[i].value);
    }
    element.children().each(function () {
        newElement.append(this);
    });
    element.replaceWith(newElement);
    return newElement;
}