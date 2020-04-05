$(document).ready(function(){
    var API_KEY = "AIzaSyDtpAiM04ZbWC5lge1-WgBuOxJFkMVQXfs"
    var video = ""
    //Target the form for the get request
    $("form").submit(function(event){
        event.preventDefault()

        var search = $("#search").val()

        //API key, search term, amount of videos to display
        videoSearch(API_KEY, search, 10)
    })

    function videoSearch(key, search, maxResults){
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
            console.log(data)

            data.items.forEach(item => {

                video = item.id.videoId
                video = `
                <a src="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" class="ui medium image">
                <img src=${item.snippet.thumbnails.medium.url}>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}"class="header" target="_blank">
                ${item.snippet.title}
                         `
                $("#results").append(video)

            })

        })
    }
});