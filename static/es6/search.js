const s = new SpotifyWebApi();
s.setAccessToken(TOKEN);

function block(item) {
    $(item).block({
        message: '<i class="fa fa-check"></i>',
        css: {
            border: '0',
            backgroundColor: 'none',
            color: 'white',
            fontSize: 200,
            cursor: 'not-allowed',
        }
    });
}

function unblock(item) {
    $(item).block({
        message: '<i class="fa fa-times"></i>',
        css: {
            border: '0',
            backgroundColor: 'none',
            color: 'white',
            fontSize: 200,
            cursor: 'not-allowed',
        },
        timeout: 1000,
    });
    // $(item).unblock();
}

function add_to_sidebar(name) {
    let new_item = $('<a>');
    new_item.text(name);
    new_item.attr('href', '?query=' + escape(name));
    $('#mySidenav .playlist').append(new_item);
}

async function get_playlist(playlist_id) {
    let playlist_items = (await s.getPlaylistTracks(playlist_id))['items'];

    $('#mySidenav .playlist').empty();

    playlist_items.forEach(element => add_to_sidebar(element['track']['name']));

    return playlist_items.map(data => data['track']['id'])
}

async function search(query) {
    let resultsdiv = $('#results');
    resultsdiv.empty();

    const track_ids = await get_playlist(playlist_id);

    const result = await s.searchTracks(query, {'limit': 6});
    result['tracks']['items'].forEach(async function (song) {
        let name = song['name'];

        let artistImage = (await s.getArtist(song['artists'][0]['id']))['images'][0]['url'];

        let artists = song['artists'].map(
            artist => artist['name']
        ).join(', ');
        let album = song['album']['name'];
        let albumImage = song['album']['images'][0]['url'];
        const id = song['id'];

        let new_item = $("<div class='search-result-item column is-one-third'>").loadTemplate(
            "#spotify-result",
            {
                id,
                name,
                artists,
                artistImage,
                album,
                albumImage,
            });


        new_item.on('click',
            '.add-to-list',
            function (e) {
                e.preventDefault();
                $.post(
                    POSTURL,
                    {'track_id': id})
                // todo: replace with pop-up notification
                    .then(result => notify(result, 'success'))
                    .catch(error => {
                        notify(error['responseText'], 'danger');
                        unblock(new_item);
                    });


                block(new_item);
                add_to_sidebar(name);

            }
        );

        resultsdiv.append(new_item);

        if (track_ids.includes(id)) {
            block(new_item);
        }
    })
}

$.urlParam = function (name) {
    return new URL(window.location.href).searchParams.get(name);
};
$.setParam = function (name, newvalue) {
    history.pushState({
        id: ''
    }, '', `?${name}=${newvalue}`);
};

$(() => {

    // on form submit
    $('#searchform').on('submit', function () {
        let songinput = $('#searchform #songname');
        const term = songinput.val();
        if (term) {
            search(term);
            $.setParam('query', term);
            songinput.removeClass('is-danger');
            songinput.addClass('is-success')
        } else {
            // todo: foutmelding
            songinput.removeClass('is-success');
            songinput.addClass('is-danger')
        }
        return false;
    });

    // autofill/search ?query= param
    let query_param = $.urlParam('query');
    if (query_param) {
        query_param = unescape(query_param);
        search(query_param);
        $('#searchform #songname').val(query_param);
    }

})