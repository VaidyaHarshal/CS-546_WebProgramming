$(document).ready(function () {
    var searchForm = $('#searchForm'),
        search_term = $('#search_term'),
        showError = $('#showError'),
        showList = $('#showList'),
        show = $('#show'),
        homeLink = $('#homeLink'),
        footer = $('#footer');

    const configRequest = {
        method: "GET",
        url: "http://api.tvmaze.com/shows",
    };
    $.ajax(configRequest).then((object) => {
        let tempVar;
        for(let key of object) {
            footer.css("position","sticky");
            tempVar = `<li><a class="eachshow" href="${key._links.self.href}">${key.name}</a></li>`;
            showList.append(tempVar);
        }
        showList.show();
    });
    $(document).on('submit', '#searchForm', function (event) {
        showError.empty();
        showError.hide();
        event.preventDefault();
        showList.empty();
        showList.hide();
        show.empty();
        show.hide();
        homeLink.show();

        let searchShow = search_term.val();
        searchShow = searchShow.trim();
        if(!searchShow) {
            const errMsg = `<p class="showError">The value entered is not valid. Please enter a valid value. </p>`;
            footer.css("position", "fixed");
            showError.append(errMsg);
            showError.show();
        }

        const requestConfig = {
            method: "GET",
            url: "http://api.tvmaze.com/search/shows?q=" + searchShow,
        };

        $.ajax(requestConfig).then((object) => {
            if(searchShow && object.length === 0) {
                const errMsg = `<p class="showError">No data found for the given search value </p>`;
                footer.css('position', 'fixed');
                showError.append(errMsg);
                showError.show();
            }
            let resultValue;
            for(let key of object) {
                resultValue = `<li><a class="allShows" href="${key.show._links.self.href}">${key.show.name}</a></li>`;
                footer.css('position', 'fixed');
                showList.append(resultValue);
            }
            
            showList.show();
        })
    });
    $(document).on("click", "ul#showList > li > a", function(event) {
        showError.empty();
        showError.hide();
        event.preventDefault();
        showList.empty();
        showList.hide();
        show.empty();
        show.hide();
        homeLink.show();

        let urlLink = $(this).attr("href");
        let requestConfig = {
            method: "GET",
            url: urlLink,
        };
        $.ajax(requestConfig).then((object) => {
            footer.css("position", "sticky");
            if(object.name) {
                let showName = `<h1>${object.name}<h1>`;
                show.append(showName);
            }
            else {
                let showName = `<h1>N/A<h1>`;
                show.append(showName);
            }

            if(object.image) {
                let imgValue = `<img src="${object.image.medium}">`;
                show.append(imgValue);
            }
            else {
                let imgValue = `<img src="../public/img/no_image.jpeg">`;
                show.append(imgValue);
            }

            let langValue = object.language
            ? `<dt>Language</dt><dd>${object.language}</dd>`
            : `<dt>Language</dt><dd>N/A</dd>`

            let genreValue = `<dt>Genres</dt><dd><ul>`;
            if(object.genres && object.genres.length > 0) {
                $.each(object.genres, function(index, value) {
                    genreValue += `<li>${value}</li>`;
                });
                genreValue += `</ul></dd>`;
            }
            else {
                genreValue = `<dt>Genres</dt><dd>N/A</dd>`;
            }

            let avgValue = "";
            if(!object.rating.average) {
                avgValue = `<dt>Average Rating</dt><dd>N/A</dd>`;
            }
            else {
                avgValue = `<dt>Average Rating</dt><dd>${object.rating.average}</dd>`;
            }

            let netValue = object.network
            ? `<dt>Network</dt><dd>${object.network.name}</dd>`
            : `<dt>Network</dt><dd>N/A</dd>`;

            let summValue = object.summary
            ? `<dt>Summary</dt><dd>${object.summary}</dd>`
            : `<dt>Summary</dt><dd>N/A</dd>`;

            let allValue = `<dl>${langValue} ${genreValue} ${avgValue} ${netValue} ${summValue}</dl>`;
            show.append($(allValue));
            show.show();
        });
    });
});
