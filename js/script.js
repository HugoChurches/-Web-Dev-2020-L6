$(document).ready(function(){
    var API_KEY = "AIzaSyB8eXaYUCHSV259ixBNTk4twAPF1XFpjNI"
    var video = ""
    var Limiter = 10
    var added = 0
    var buttonApp = '<button class="back">Back</button><span class="counter"></span><button class="next">Next</button>'
    var PaginationToken = ""
    var myAnswer = ""
    //Target the form for the get request
    $("form").submit(function(event){
        event.preventDefault()
        var search = $("#search").val()
        //API key, search term, amount of videos to display
        videoSearch(API_KEY, search, Limiter)
    })
    function videoSearch(key, search, maxResults){
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
            myAnswer = data
            data.items.forEach(item => {
                var string = item.snippet.title
                if(string.length > 30)
                {
                    var length = 30
                    console.log(string)
                    var trimmedString = string.substring(0, length)
                    trimmedString += "..."
                }
                else
                {
                    trimmedString = string
                }
                video = `
                <a href=https://www.youtube.com/watch?v=${item.id.videoId}>
                <img src=${item.snippet.thumbnails.medium.url}>
                <h3>${trimmedString} <span class="YTitle"></span></h3>
                         `
                $("#results").append(video)
            })
        })
        if(added==0)
        {
            $("#buttonAdd").append(buttonApp)
            $(".back").click(function(){
                PaginationToken = myAnswer.prevPageToken
                nextPage(API_KEY, search, Limiter, myAnswer.prevPageToken)
                console.log(PaginationToken)
        })

        $(".next").click(function(){
            PaginationToken = myAnswer.nextPageToken
            nextPage(API_KEY, search, Limiter, myAnswer.nextPageToken)
            console.log(PaginationToken)
        })
        added=1;
        }
        $("#results").html(video)
        Limiter = 9
    }
    function nextPage(key, search, maxResults, nextPageToken){
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&pageToken=" + nextPageToken +"&q=" + search, function(data){
        console.log("I got called!")
                console.log(data)
                myAnswer = data

                data.items.forEach(item => {
                
                var string = item.snippet.title
                if(string.length > 30)
                {
                var length = 30
                console.log(string)
                var trimmedString = string.substring(0, length)
                trimmedString += "..."
                }
                else{
                    trimmedString = string
                }
                console.log(trimmedString)
                video = `
                <a href=https://www.youtube.com/watch?v=${item.id.videoId}>
                <img src=${item.snippet.thumbnails.medium.url}>
                <h3>${trimmedString} <span class="YTitle"></span></h3>
                         `
                $("#results").append(video)
            })
    })
        $("#results").html(video)
    }
});
