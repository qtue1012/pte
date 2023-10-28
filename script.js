$(document).ready(function () {
    $("#bodyHtml").load("body.html", function () {

        //CONSTANTS
        var playlist1 = window.playlist1;
        var playlist2 = playlist1.filter(function (item) {
            return item.repeated === true;
        });
        var currentPlaylist = playlist1;

        var currentSongIndex = 0;
        const songsPerPage = 20;
        var totalSongs = currentPlaylist.length;
        var totalNumberOfPages = Math.ceil(totalSongs / songsPerPage);
        var currentPage = 1;
        var isPlaying = false;
        var playCount = 0;
        const pagesToShow = 5;

        function resetConstants() {
            currentSongIndex = 0;
            totalSongs = currentPlaylist.length;
            totalNumberOfPages = Math.ceil(totalSongs / songsPerPage);
            currentPage = 1;
            isPlaying = false;
            playCount = 0;
        }

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to change repeaded list
        $("#toggle-checkbox").change(function () {
            if (this.checked) {
                currentPlaylist = playlist2;
            } else {
                currentPlaylist = playlist1;
            }
            resetConstants()
            generateSongListAndPagination(currentPlaylist);

        });

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to random select question
        $("#toggle-checkbox-2").change(function () {
            if ($(this).is(":checked")) {
                isPlaying = true;
                // Đặt số lần phát ban đầu là 0
                playCount = 0;
                clearInterval(interval);
                var interval = setInterval(function () {
                    if (playCount >= 3) {
                        if (!isPlaying) {
                            clearInterval(interval);
                            return;
                        }
                        var data = currentPlaylist;
                        //$.getJSON(currentPlaylist, function(data) {
                        var currentSongIndex = Math.floor(Math.random() * data.length);

                        var lyrics = data[currentSongIndex].orderId + ": " + data[currentSongIndex].answer;
                        $("#lyrics").text(lyrics);

                        var songFile = data[currentSongIndex].audioLink;
                        var audioElement = document.getElementById("audioPlayer");
                        audioElement.src = songFile;
                        audioElement.play();
                        //});
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

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to play all select question
        $("#toggle-checkbox-4").change(function () {
            if ($(this).is(":checked")) {
                isPlaying = true;
                // Đặt số lần phát ban đầu là 0
                playCount = 0;
                clearInterval(interval4);
                var interval4 = setInterval(function () {
                    var audioElement = document.getElementById("audioPlayer");
                    if (playCount >= 3) {
                        if (!isPlaying) {
                            clearInterval(interval4);
                            return;
                        }
                        var data = currentPlaylist;
                        currentSongIndex < data.length - 1 ? currentSongIndex++ : currentSongIndex = 0;
                        var lyrics = data[currentSongIndex].orderId + ": " + data[currentSongIndex].answer;
                        $("#lyrics").text(lyrics);
                        audioElement.src = data[currentSongIndex].audioLink;;
                        audioElement.play();
                        playCount = 0;
                    } else {
                        audioElement.play();
                        playCount++;
                    }

                }, 8000);
            } else {
                isPlaying = false;
                clearInterval(interval4);
            }
        });

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to random select question
        $("#toggle-checkbox-3").change(function () {
            if ($(this).is(":checked")) {
                isPlaying = true;
                // Đặt số lần phát ban đầu là 0
                playCount = 0;
                clearInterval(interval2);

                var audioElement = document.getElementById("audioPlayer");
                audioElement.play();

                var interval2 = setInterval(function () {
                    if (playCount >= 3) {
                        //clearInterval(interval);
                        //$("#toggle-checkbox-3").prop("checked", false);
                        return;
                    } else {
                        var audioElement = document.getElementById("audioPlayer");
                        audioElement.play();
                        playCount++;
                    }

                }, 8000);
            } else {
                isPlaying = false;
                clearInterval(interval2);
            }
        });

        // Lắng nghe sự kiện khi nhấn nút prev-song
        $('#prevBtn').on('click', function () {
            if (currentSongIndex > 1) {
                currentSongIndex--;
            }
            var audioElement = document.getElementById("audioPlayer");
            audioElement.src = currentPlaylist[currentSongIndex].audioLink;
            $("#lyrics").text(currentPlaylist[currentSongIndex].orderId + ": " + currentPlaylist[currentSongIndex].answer);
            audioElement.play();
            playCount = 0;
        });

        // Lắng nghe sự kiện khi nhấn nút random-song
        $('#ranBtn').on('click', function () {
            currentSongIndex = Math.floor(Math.random() * totalSongs);
            var audioElement = document.getElementById("audioPlayer");
            audioElement.src = currentPlaylist[currentSongIndex].audioLink;
            $("#lyrics").text(currentPlaylist[currentSongIndex].orderId + ": " + currentPlaylist[currentSongIndex].answer);
            audioElement.play();
            playCount = 0;
        });

        // Lắng nghe sự kiện khi nhấn nút next-song
        $('#nextBtn').on('click', function () {
            if (currentSongIndex < totalSongs) {
                currentSongIndex++;
            }
            var audioElement = document.getElementById("audioPlayer");
            audioElement.src = currentPlaylist[currentSongIndex].audioLink;
            $("#lyrics").text(currentPlaylist[currentSongIndex].orderId + ": " + currentPlaylist[currentSongIndex].answer);
            audioElement.play();
            playCount = 0;
        });

        function generateSongList() {
            var playlist = "";
            for (let i = currentSongIndex; i < currentSongIndex + songsPerPage && i < totalSongs; i++) {
                var song = currentPlaylist[i];
                playlist += `<a href="${song.audioLink}" class="list-group-item list-group-item-action" value="${i}">${song.orderId} - ${song.answer}</a>`;
            }
            return playlist;
        }

        function generatePagination1(numberOfPages) {
            const paginationContainer = document.createElement("nav");
            const ul = document.createElement("ul");
            paginationContainer.setAttribute("aria-label", "Page navigation");
            ul.classList.add("pagination");
            paginationContainer.appendChild(ul);

            for (let i = 1; i <= numberOfPages; i++) {
                const li = document.createElement("li");
                li.classList.add("page-item");
                const link = document.createElement("a");
                link.classList.add("page-link");
                link.href = "#";
                link.textContent = i;
                li.appendChild(link);
                ul.appendChild(li);
            }
            return paginationContainer;
        }

        // Hàm tạo HTML cho các phần tử trang
        function renderPagination() {
            const paginationContainer = document.querySelector('.pagination');
            paginationContainer.innerHTML = '';

            //Trang 1
            const oneItem = document.createElement('li');
            oneItem.classList.add('page-item');
            const oneLink = document.createElement('a');
            oneLink.classList.add('page-link');
            oneLink.href = '#';
            oneLink.textContent = '<<';
            oneItem.appendChild(oneLink);
            paginationContainer.appendChild(oneItem);

            // Phần tử "Trang trước"
            // const prevItem = document.createElement('li');
            // prevItem.classList.add('page-item');
            // const prevLink = document.createElement('a');
            // prevLink.classList.add('page-link');
            // prevLink.href = '#';
            // prevLink.textContent = 'Prev';
            // prevItem.appendChild(prevLink);
            // paginationContainer.appendChild(prevItem);

            // Các phần tử trang
            const firstPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
            const lastPage = Math.min(firstPage + pagesToShow - 1, totalNumberOfPages);

            for (let i = firstPage; i <= lastPage; i++) {
                const pageItem = document.createElement('li');
                pageItem.classList.add('page-item');
                if (i === currentPage) {
                    pageItem.classList.add('active');
                }
                const pageLink = document.createElement('a');
                pageLink.classList.add('page-link');
                pageLink.href = '#';
                pageLink.textContent = i;
                pageItem.appendChild(pageLink);
                paginationContainer.appendChild(pageItem);
            }

            // Phần tử "Trang sau"
            // const nextItem = document.createElement('li');
            // nextItem.classList.add('page-item');
            // const nextLink = document.createElement('a');
            // nextLink.classList.add('page-link');
            // nextLink.href = '#';
            // nextLink.textContent = 'Next';
            // nextItem.appendChild(nextLink);
            // paginationContainer.appendChild(nextItem);

            //Trang cuối
            const lastItem = document.createElement('li');
            lastItem.classList.add('page-item');
            const lastLink = document.createElement('a');
            lastLink.classList.add('page-link');
            lastLink.href = '#';
            lastLink.textContent = totalNumberOfPages;
            lastItem.appendChild(lastLink);
            paginationContainer.appendChild(lastItem);

            // Sự kiện click cho các phần tử trang
            const pageLinks = paginationContainer.querySelectorAll('.page-link');
            pageLinks.forEach((pageLink) => {
                pageLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (pageLink.textContent === 'Prev') {
                        if (currentPage > 1) {
                            currentPage--;
                        }
                    } else if (pageLink.textContent === 'Next') {
                        if (currentPage < totalNumberOfPages) {
                            currentPage++;
                        }
                    } else if (pageLink.textContent === '<<') {
                        currentPage = 1;
                    } else if (pageLink.textContent === totalNumberOfPages) {
                        currentPage = totalNumberOfPages;
                    } else {
                        currentPage = parseInt(pageLink.textContent, 10);
                    }
                    renderPagination();
                    handlePageClick(currentPage);
                });
            });
        }


        // Xác định hàm xử lý sự kiện nhấp chuột trên mỗi trang
        function handlePageClick(pageNumber) {
            console.log(`Người dùng đã nhấp chuột vào trang số ${pageNumber}`);
            currentPage = pageNumber;
            currentSongIndex = (currentPage - 1) * songsPerPage;
            // Xóa danh sách bài hát hiện tại
            const listGroup = document.querySelector(".list-group");
            listGroup.innerHTML = "";

            // Tính toán chỉ số của bài hát đầu tiên và bài hát cuối cùng trên trang được nhấp
            const firstSongIndex = (pageNumber - 1) * songsPerPage;
            const lastSongIndex = Math.min(firstSongIndex + songsPerPage, totalSongs);

            // Tạo danh sách bài hát cho trang được nhấp
            listGroup.innerHTML = generateSongList();

            // Xử lý sự kiện khi người dùng nhấp vào một mục bài hát
            $(".list-group-item").click(function (event) {
                event.preventDefault();

                currentSongIndex = parseInt(($(this)[0].getAttribute('value')));
                var lyrics = currentPlaylist[currentSongIndex].orderId + ": " + currentPlaylist[currentSongIndex].answer;
                $("#lyrics").text(lyrics);

                var songFile = currentPlaylist[currentSongIndex].audioLink;
                var audioElement = document.getElementById("audioPlayer");
                audioElement.src = songFile;
                audioElement.play();
                playCount = 0;
            });
        }

        // Tạo lại hàm tạo danh sách bài hát và phân trang để cập nhật khi có sự kiện nhấp chuột
        function generateSongListAndPagination(songs) {

            var audioPlayer = `
                    <div class="card mt-3">
                    <div class="card-body">
                        <audio controls id="audioPlayer">
                        <source src="${currentPlaylist[0].audioLink}"="audio/mp3">
                        </audio>
                        <h6 id="lyrics" class="card-title"></h6>
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                                <!-- Pagination will be filled by JavaScript -->
                            </ul>
                        </nav>
                        <div class="playlist-container">
                            <div class="list-group mt-3"></div>
                        </div>
                    </div>
                    </div>
                    `;

            $("#audio-player").html(audioPlayer);

            // Gắn container danh sách bài hát và phân trang vào HTML
            document.querySelector(".list-group").innerHTML = generateSongList();
            //document.querySelector(".pagination").appendChild(generatePagination(totalNumberOfPages));
            renderPagination()

            /* // Xác định tất cả các phần tử li trong container phân trang
            const pageLinks = document.querySelectorAll(".page-link");
            // Lặp qua từng phần tử li và thêm sự kiện click
            pageLinks.forEach((pageLink) => {
                pageLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    const pageNumber = parseInt(pageLink.textContent, 10);
                    handlePageClick(pageNumber);
                });
            }); */

            // Xử lý sự kiện khi người dùng nhấp vào một mục bài hát
            $(".list-group-item").click(function (event) {
                event.preventDefault();

                currentSongIndex = parseInt(($(this)[0].getAttribute('value')));
                var lyrics = currentPlaylist[currentSongIndex].orderId + ": " + currentPlaylist[currentSongIndex].answer;
                $("#lyrics").text(lyrics);

                var songFile = currentPlaylist[currentSongIndex].audioLink;
                var audioElement = document.getElementById("audioPlayer");
                audioElement.src = songFile;
                audioElement.play();
                playCount = 0;
            });
        }

        // Sử dụng hàm generateSongListAndPagination để tạo danh sách ban đầu và phân trang
        generateSongListAndPagination(currentPlaylist);

    });
});