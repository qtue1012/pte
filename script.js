$(document).ready(function () {
    $("#bodyHtml").load("body.html", function () {

        //CONSTANTS
        var playlist1 = window.playlist1;
        var playlist2 = playlist1.filter(function (item) {
            return item.repeated === true;
        });
        var currentPlaylist = playlist2;

        var currentSongIndex = 0;
        const songsPerPage = 20;
        var totalSongs = currentPlaylist.length;
        var totalNumberOfPages = Math.ceil(totalSongs / songsPerPage);
        var currentPage = 1;
        var isPlaying = false;
        var playCount = 0;
        const intervalTime = 8000;
        const pagesToShow = 5;
        const audioElement = document.getElementById("audioPlayer");
        var intervals = []; // Lưu trữ ID của tất cả các interval

        function resetConstants() {
            currentSongIndex = 0;
            totalSongs = currentPlaylist.length;
            totalNumberOfPages = Math.ceil(totalSongs / songsPerPage);
            currentPage = 1;
            isPlaying = false;
            playCount = 0;
        }

        audioElement.addEventListener('canplaythrough', function () {
            highlightCurrentSong();
            audioElement.play();
//            playCount = 0;
        });

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

        function clearAllIntervals() {
            intervals.forEach(function(intervalId) {
              clearInterval(intervalId); // Dừng từng interval
            });
            intervals = []; // Xóa tất cả các ID của interval
          }

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to random select question
        $("#toggle-checkbox-2").change(function () {
            if ($(this).is(":checked")) {
                isPlaying = true;
                // Đặt số lần phát ban đầu là 0
                playCount = 0;
                clearAllIntervals();
                var interval = setInterval(function () {
                    if (playCount >= 3) {
                        if (!isPlaying) {
                            clearAllIntervals();
                            return;
                        }
                        currentSongIndex = Math.floor(Math.random() * currentPlaylist.length);
                        updateLyrics();
                        audioElement.src = currentPlaylist[currentSongIndex].audioLink;
                        playCount = 0;
                    } else {
                        audioElement.play();
                        playCount++;
                    }

                }, intervalTime);
                intervals.push(interval);
            } else {
                isPlaying = false;
                clearAllIntervals();
            }
        });

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to play all select question
        $("#toggle-checkbox-4").change(function () {
            if ($(this).is(":checked")) {
                isPlaying = true;
                // Đặt số lần phát ban đầu là 0
                playCount = 0;
                clearAllIntervals();
                var interval4 = setInterval(function () {
                    if (playCount >= 3) {
                        if (!isPlaying) {
                            clearAllIntervals();
                            return;
                        }
                        currentSongIndex < currentPlaylist.length - 1 ? currentSongIndex++ : currentSongIndex = 0;
                        updateLyrics();
                        audioElement.src = currentPlaylist[currentSongIndex].audioLink;
                        playCount = 0;
                    } else {
                        audioElement.play();
                        playCount++;
                    }

                }, intervalTime);
                intervals.push(interval4);
            } else {
                isPlaying = false;
                clearAllIntervals();
            }
        });

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to Repeat 4 times
        $("#toggle-checkbox-3").change(function () {
            if ($(this).is(":checked")) {
                isPlaying = true;
                // Đặt số lần phát ban đầu là 0
                playCount = 0;
                clearAllIntervals();

                audioElement.play();

                var interval2 = setInterval(function () {
                    if (playCount >= 3) {
                        //clearInterval(interval);
                        //$("#toggle-checkbox-3").prop("checked", false);
                        return;
                    } else {
                        audioElement.play();
                        playCount++;
                    }
                }, intervalTime);
                intervals.push(interval2);
            } else {
                isPlaying = false;
                clearAllIntervals();
            }
        });

        // Lắng nghe sự kiện khi nhấn nút prev-song
        $('#prevBtn').on('click', function () {
            if (currentSongIndex > 1) {
                currentSongIndex--;
            }
            audioElement.src = currentPlaylist[currentSongIndex].audioLink;
            playCount = 0;
            updateLyrics();
        });

        // Lắng nghe sự kiện khi nhấn nút random-song
        $('#ranBtn').on('click', function () {
            currentSongIndex = Math.floor(Math.random() * totalSongs);
            audioElement.src = currentPlaylist[currentSongIndex].audioLink;
            playCount = 0;
            updateLyrics();
        });

        // Lắng nghe sự kiện khi nhấn nút next-song
        $('#nextBtn').on('click', function () {
            if (currentSongIndex < totalSongs) {
                currentSongIndex++;
            }
            audioElement.src = currentPlaylist[currentSongIndex].audioLink;
            playCount = 0;
            updateLyrics();
        });

        function updateLyrics() {
            var lyrics = `<span class="${currentPlaylist[currentSongIndex].difficulty}">${currentPlaylist[currentSongIndex].difficulty.charAt(0)}</span>` + currentPlaylist[currentSongIndex].orderId + ": " + currentPlaylist[currentSongIndex].answer;
            $("#lyrics").html(lyrics);
        }

        function generateSongList(firstSongIndex) {
            var playlist = "";
            for (let i = firstSongIndex; i < firstSongIndex + songsPerPage && i < totalSongs; i++) {
                var song = currentPlaylist[i];
                playlist += `<a href="${song.audioLink}" class="list-group-item list-group-item-action" value="${i}"><span class="${song.difficulty}">${song.difficulty.charAt(0)}</span>${song.orderId} - ${song.answer}</a>`;
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

        function highlightCurrentSong(){
            $(".list-group-item").removeClass("active");
            $('.list-group-item[value="' + currentSongIndex + '"]').addClass('active');
        }

        // Xác định hàm xử lý sự kiện nhấp chuột trên mỗi trang
        function handlePageClick() {
            console.log(`Người dùng đã nhấp chuột vào trang số ${currentPage}`);
            //currentSongIndex = (currentPage - 1) * songsPerPage;
            // Xóa danh sách bài hát hiện tại
            const listGroup = document.querySelector(".list-group");
            listGroup.innerHTML = "";

            // Tính toán chỉ số của bài hát đầu tiên và bài hát cuối cùng trên trang được nhấp
            var firstSongIndex = (currentPage - 1) * songsPerPage;
            // const lastSongIndex = Math.min(firstSongIndex + songsPerPage, totalSongs);

            // Tạo danh sách bài hát cho trang được nhấp
            listGroup.innerHTML = generateSongList(firstSongIndex);
            highlightCurrentSong();
            
            // Xử lý sự kiện khi người dùng nhấp vào một mục bài hát
            $(".list-group-item").click(function (event) {
                event.preventDefault();
                currentSongIndex = parseInt(($(this)[0].getAttribute('value')));
                updateLyrics();
                audioElement.src = currentPlaylist[currentSongIndex].audioLink;
                playCount = 0;
            });
        }

        // Tạo lại hàm tạo danh sách bài hát và phân trang để cập nhật khi có sự kiện nhấp chuột
        function generateSongListAndPagination() {
            // Gắn container danh sách bài hát và phân trang vào HTML
            document.querySelector(".list-group").innerHTML = generateSongList(0);
            highlightCurrentSong();
            renderPagination()

            // Xử lý sự kiện khi người dùng nhấp vào một mục bài hát
            $(".list-group-item").click(function (event) {
                event.preventDefault();

                currentSongIndex = parseInt(($(this)[0].getAttribute('value')));
                updateLyrics();
                audioElement.src = currentPlaylist[currentSongIndex].audioLink;
                playCount = 0;
            });

            //play first song
            updateLyrics();
            audioElement.src = currentPlaylist[currentSongIndex].audioLink;
            playCount = 0;
        }

        // Sử dụng hàm generateSongListAndPagination để tạo danh sách ban đầu và phân trang
        generateSongListAndPagination();
    });
});