$(document).ready(function () {

    $(document).on("click", "#search", function () {

        getDocs($("#searchTerm").val(), $("#startYear").val(), $("#endYear").val());

        function getDocs(searchTerm, startYear, endYear) {
            var queryURL = BuildURL(searchTerm, startYear, endYear);

            console.log(queryURL);

            $("#results").empty();

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                var docs = response.response.docs;


                $.each(docs, function (key, value) {
                    console.log(value);
                    var newD = $("<div>");

                    var titleP = $("<p>");
                    titleP.text(value.headline.main);

                    var authorP = $("<p>");
                    authorP.text("By: " + value.byline.original);

                    var sectionP = $("<p>");
                    sectionP.text("Section: " + value.section_name);

                    var dateP = $("<p>");
                    dateP.text(value.pub_date);

                    var urlA = $("<a>");
                    urlA.attr("href", value.web_url);
                    urlA.text(value.web_url);

                    if (key < $("#numRecords").val()) {
                        newD.append(titleP, authorP, sectionP, dateP, urlA);
                    }

                    $("#results").append(newD);
                })

            });
        }

    })


    $(document).on("click", "#clear", function () {
        $("#results").html("<br>");
    })



    function BuildURL(searchTerm, startYear, endYear) {
        var APIkey = "0wLtKsDWPyGXEjhJu42KbZ5OldGBKaSF";
        var dateRange = "";

        if ((startYear != "") && (endYear != "")) {
            dateRange = "&begin_date=" + startYear + "&end_date=" + endYear;
        }
        var rslt = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + dateRange + "&api-key=" + APIkey;
        return rslt;
    }




    function displayArticles() {


    }

})