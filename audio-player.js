$(document).ready(function() {

    var playlist1 = "RS.json";
    var playlist2 = "Repeaded-RS.json";

    var currentPlaylist = playlist1;
    
    // Tạo các thành phần giao diện cho danh sách phát
    function createPlaylistUI(data) {
        var playlist = "";
        $.each(data, function(index, song) {
            playlist += `<a href="${song.audioLink}" class="list-group-item list-group-item-action">${song.orderId}</a>`;
        });
    
        // Hiển thị trình phát âm thanh
        var audioPlayer = `
        <div class="card mt-3">
        <div class="card-body">
            <h5 class="card-title">Trình phát âm thanh</h5>
            <audio controls id="audioPlayer">
            <source src="${data[0].audioLink}"="audio/mp3">
            </audio>
            <h6 id="lyrics" class="card-title"></h6>
            <div class="playlist-container">
                <div class="list-group mt-3">${playlist}</div>
            </div>
        </div>
        </div>
        `;
    
        $("#audio-player").html(audioPlayer);
    
        // Xử lý sự kiện khi người dùng nhấp vào một mục bài hát
        $(".list-group-item").click(function(event) {
            event.preventDefault();

            var index = $(this).index();
            var lyrics = data[index].orderId + ": " + data[index].answer;
            $("#lyrics").text(lyrics);

            var songFile = data[index].audioLink;
            var audioElement = document.getElementById("audioPlayer");
            audioElement.src = songFile;
            audioElement.play();
        });
    }

    
    //Lấy danh sách phát từ tệp JSON
    function loadPlaylist(playlist) {
        $.getJSON(playlist, function(data) {
        createPlaylistUI(data);
        });
    }
    
    // Mặc định hiển thị playlist1
    loadPlaylist(currentPlaylist);
    
    // Xử lý sự kiện khi người dùng nhấp vào checkbox to change repeaded list
    $("#toggle-checkbox").change(function() {
            if (this.checked) {
                currentPlaylist = playlist2;
            } else {
                currentPlaylist = playlist1;
            }
            loadPlaylist(currentPlaylist);
    });

    var isPlaying = false;
    // Khởi tạo biến để theo dõi số lần phát
    var playCount = 0;
    // Xử lý sự kiện khi người dùng nhấp vào checkbox to random select question
    $("#toggle-checkbox-2").change(function() {
        if ($(this).is(":checked")) {
            isPlaying = true;
            // Đặt số lần phát ban đầu là 0
            playCount = 0;
            clearInterval(interval);
            var interval = setInterval(function() {
                if (playCount >= 3) {
                    if (!isPlaying) {
                        clearInterval(interval);
                        return;
                    }
                    $.getJSON(currentPlaylist, function(data) {
                        var randomIndex = Math.floor(Math.random() * data.length);

                        var lyrics = data[randomIndex].orderId + ": " + data[randomIndex].answer;
                        $("#lyrics").text(lyrics);
            
                        var songFile = data[randomIndex].audioLink;
                        var audioElement = document.getElementById("audioPlayer");
                        audioElement.src = songFile;
                        audioElement.play();
                    });
                    playCount = 0;
                } else {
                    var audioElement = document.getElementById("audioPlayer");
                    audioElement.play();
                    playCount++;
                }
            
            }, 8000);
        } else {
            isPlaying = false;
            clearInterval(interval);
        }
    });

});
