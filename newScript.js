class Playlist {
    constructor(playlist) {
        this.currentPlaylist = playlist;
        this.currentSongIndex = 0;
        this.totalSongs = this.currentPlaylist.length;
        this.songsPerPage = 20;
        this.totalNumberOfPages = Math.ceil(this.totalSongs / this.songsPerPage);
        this.currentPage = 1;
        this.isPlaying = false;
        this.playCount = 0;
        this.intervalTime = 8000;
        this.pagesToShow = 5;
        this.intervals = [];
    }
    
    resetConstants() {
        this.currentSongIndex = 0;
        this.totalSongs = this.currentPlaylist.length;
        this.totalNumberOfPages = Math.ceil(this.totalSongs / this.songsPerPage);
        this.currentPage = 1;
        this.isPlaying = false;
        this.playCount = 0;

        this.audioElement = document.getElementById("audioPlayer");
        this.checkbox1 = $("#toggle-checkbox-1");
        this.checkbox2 = $("#toggle-checkbox-2");
        this.checkbox3 = $("#toggle-checkbox-3");
        this.checkbox4 = $("#toggle-checkbox-4");
    }

    genderEventHandler() {
        var self = this;
        this.audioElement.addEventListener('canplaythrough', () => {
            self.highlightCurrentSong();
            self.updateLyrics();
            self.audioElement.play();
        });

        this.audioElement.onended = function() {
            setTimeout(() => {
                //console.log(`Continuing to play audio after 4 seconds: isPlaying:${self.isPlaying} playCount: ${self.playCount}`);
                if (self.isPlaying && self.playCount <= 2) {
                    self.audioElement.play();
                    self.playCount++;
                } else if (self.checkbox2.is(":checked")) { //random
                    self.currentSongIndex = Math.floor(Math.random() * self.currentPlaylist.length);
                    self.playCount = 0;
                    self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
                } else if (self.checkbox4.is(":checked")) { //next song
                    self.currentSongIndex < self.currentPlaylist.length - 1 ? self.currentSongIndex++ : self.currentSongIndex = 0;
                    self.playCount = 0;
                    self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
                }
            }, 4000);
        };

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to change repeaded list
        this.checkbox1.change(function () {
            if (self.checkbox1.is(":checked")) {
                self.currentPlaylist = playlist2;
            } else {
                self.currentPlaylist = playlist1;
            }
            self.resetConstants();
            self.generateSongListAndPagination();
        });

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to random select question
        this.checkbox2.change(function () {
            if ($(this).is(":checked")) {
                self.isPlaying = true;
                self.playCount = 0;
                self.currentSongIndex = Math.floor(Math.random() * self.currentPlaylist.length);
                self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
            } else {
                self.isPlaying = false;
            }
        });

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to play all select question
        this.checkbox4.change(function () {
            if ($(this).is(":checked")) {
                self.isPlaying = true;
                self.playCount = 0;
                self.currentSongIndex < self.currentPlaylist.length - 1 ? self.currentSongIndex++ : self.currentSongIndex = 0;
                self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
            } else {
                self.isPlaying = false;
            }
        });

        // Xử lý sự kiện khi người dùng nhấp vào checkbox to Repeat 4 times
        this.checkbox3.change(function () {
            self.playCount = 0;
            if ($(this).is(":checked")) {
                 self.isPlaying = true;
                 self.audioElement.play();
             } else {
                 self.isPlaying = false;
             }
        });

        $('#prevBtn').on('click', function () {
            if (self.currentSongIndex > 0) {
                self.currentSongIndex--;
            }
            self.playCount = 0;
            self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
            self.updateLyrics();
        });

        $('#ranBtn').on('click', function () {
            self.playCount = 0;
            self.currentSongIndex = Math.floor(Math.random() * self.totalSongs);
            self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
            self.updateLyrics();
        });

        $('#nextBtn').on('click', function () {
            if (self.currentSongIndex < self.totalSongs) {
                self.currentSongIndex++;
            }
            self.playCount = 0;
            self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
            self.updateLyrics();
        });
    }

    clearAllIntervals() {
        this.intervals.forEach(function (intervalId) {
            clearInterval(intervalId); // Dừng từng interval
        });
        this.intervals = []; // Xóa tất cả các ID của interval
    }

    updateLyrics() {
        let lyrics = `<span class="${this.currentPlaylist[this.currentSongIndex].difficulty}">${this.currentPlaylist[this.currentSongIndex].difficulty.charAt(0)}</span>` + this.currentPlaylist[this.currentSongIndex].orderId + ": " + this.currentPlaylist[this.currentSongIndex].answer;
        $("#lyrics").html(lyrics);
    }

    generateSongList(firstSongIndex) {
        let playlist = "";
        for (let i = firstSongIndex; i < firstSongIndex + this.songsPerPage && i < this.totalSongs; i++) {
            var song = this.currentPlaylist[i];
            playlist += `<a href="${song.audioLink}" class="list-group-item list-group-item-action" value="${i}"><span class="${song.difficulty}">${song.difficulty.charAt(0)}</span>${song.orderId} - ${song.answer}</a>`;
        }
        return playlist;
    }
    displayLyrics() {
        let lyrics = `<span class="${this.playlist[this.currentSongIndex].difficulty}">${this.playlist[this.currentSongIndex].difficulty.charAt(0)}</span>` + this.playlist[this.currentSongIndex].orderId + ": " + this.playlist[this.currentSongIndex].answer;
        $("#lyrics").html(lyrics);
    }

    // Hàm tạo HTML cho các phần tử trang
    renderPagination() {
        var self = this;
        const paginationContainer = $('.pagination');
        paginationContainer.html('');

        //Trang 1
        const oneItem = document.createElement('li');
        oneItem.classList.add('page-item');
        const oneLink = document.createElement('a');
        oneLink.classList.add('page-link');
        oneLink.href = '#';
        oneLink.textContent = '<<';
        oneItem.append(oneLink);
        paginationContainer.append(oneItem);

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
        const firstPage = Math.max(this.currentPage - Math.floor(this.pagesToShow / 2), 1);
        const lastPage = Math.min(firstPage + this.pagesToShow - 1, this.totalNumberOfPages);

        for (let i = firstPage; i <= lastPage; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === this.currentPage) {
                pageItem.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageItem.append(pageLink);
            paginationContainer.append(pageItem);
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
        lastLink.textContent = this.totalNumberOfPages;
        lastItem.append(lastLink);
        paginationContainer.append(lastItem);

        // Sự kiện click cho các phần tử trang
        const pageLinks = paginationContainer[0].querySelectorAll('.page-link');
        pageLinks.forEach((pageLink) => {
            pageLink.addEventListener('click', (event) => {
                event.preventDefault();
                if (pageLink.textContent === 'Prev') {
                    if (self.currentPage > 1) {
                        self.currentPage--;
                    }
                } else if (pageLink.textContent === 'Next') {
                    if (self.currentPage < self.totalNumberOfPages) {
                        self.currentPage++;
                    }
                } else if (pageLink.textContent === '<<') {
                    self.currentPage = 1;
                } else if (pageLink.textContent === self.totalNumberOfPages) {
                    self.currentPage = self.totalNumberOfPages;
                } else {
                    self.currentPage = parseInt(pageLink.textContent, 10);
                }
                self.renderPagination();
                self.handlePageClick(self.currentPage);
            });
        });
    }

    highlightCurrentSong() {
        $(".list-group-item").removeClass("active");
        $('.list-group-item[value="' + this.currentSongIndex + '"]').addClass('active');
    }

    // Xác định hàm xử lý sự kiện nhấp chuột trên mỗi trang
    handlePageClick() {
        const listGroup = $(".list-group");
        var firstSongIndex = (this.currentPage - 1) * this.songsPerPage;
        listGroup.html(this.generateSongList(firstSongIndex));
        this.highlightCurrentSong();
        // Xử lý sự kiện khi người dùng nhấp vào một mục bài hát
        var self = this;
        $(".list-group-item").click(function (event) {
            event.preventDefault();
            self.currentSongIndex = parseInt(($(this)[0].getAttribute('value')));
            self.updateLyrics();
            self.playCount = 0;
            self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
        });
    }

    generateSongListAndPagination() {
        var self = this;
        // Gắn container danh sách bài hát và phân trang vào HTML
        $(".list-group").html(this.generateSongList(0));
        this.highlightCurrentSong();
        this.renderPagination();

        // Xử lý sự kiện khi người dùng nhấp vào một mục bài hát
        $(".list-group-item").click(function (event) {
            event.preventDefault();

            self.currentSongIndex = parseInt(($(this)[0].getAttribute('value')));
            self.updateLyrics();
            self.playCount = 0;
            self.audioElement.src = self.currentPlaylist[self.currentSongIndex].audioLink;
        });

        //play first song
        this.updateLyrics();
        this.audioElement.src = this.currentPlaylist[this.currentSongIndex].audioLink;
        this.playCount = 0;
    }

    init() {
        $(document).ready(() => {
            $("#bodyHtml").load("body.html", () => {
                const playlist1 = window.playlist1;
                const playlist2 = playlist1.filter(item => item.repeated === true);
                this.currentPlaylist = playlist2;
                this.resetConstants();
                this.generateSongListAndPagination();
                this.genderEventHandler();
            });
        });
    }
}

const myPlaylist = new Playlist([]);
myPlaylist.init();