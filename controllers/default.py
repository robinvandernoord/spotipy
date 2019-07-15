# -*- coding: utf-8 -*-
# -------------------------------------------------------------------------
# This is a sample controller
# this file is released under public domain and you can use without limitations
# -------------------------------------------------------------------------


@get
@require_spotify
def index():

    return {
        'get auth': A(_href=URL('generate_auth')),
        'playlists': A(_href=URL('playlists')),
        'cache': A(_href=URL('reset_cache')),
    }


@get
@require_spotify
def playlists():
    s_user = request.spotify.user

    plists = s_user.get_playlists()

    ps = {}
    for playlist in plists:
        playlist_id = playlist.id
        tracks = find((lambda pl: pl.uri == Spotify.playlist(playlist_id)), plists)
        if tracks:
            ps[playlist_id] = tracks.get_all_tracks()

    return dict(playlists = ps)

    # for playlist in s_user.get_playlists():


@post
@require_spotify
def create_playlist():
    s_user = s.user
    pl_name = request.post_vars.name
    pl_descr = request.post_vars.description
    s_user.create_playlist(pl_name, description=pl_descr, public=False, collaborative=True)
    raise HTTP(201, 'playlist toegevoegd')


@post
@require_spotify
def add_to_playlist():
    s_user = request.spotify.user
    playlist_id = Spotify.playlist(request.env.http_referer.split('?')[0].split('/')[-1])
    if request.post_vars.track_id:
        playlist = find((lambda pl: pl.uri == playlist_id), s_user.get_playlists())
        if not playlist:
            raise HTTP(400, 'invalid playlist id')
        track_id = Spotify.track(request.post_vars.track_id)

        track = find((lambda pl: pl.uri == track_id), playlist.get_all_tracks())
        if not track:
            s_user.add_tracks(playlist_id, track_id)
            raise HTTP(202, 'added')
        else:
            raise HTTP(208, 'already in list')

    else:
        raise HTTP(400, 'invalid track_id')


@get
@require_spotify
def search():
    return dict(token=request.spotify.token)


@get
def reset_cache():
    cache.ram.clear('')
    redirect(URL('index'))


@get
@require_spotify
def generate_auth():
    return redirect(request.spotify.generate_login_url())


def callback():
    # empty spotify so we can use the generate_token function
    s = Spotify()
    print('we are in callback')
    if request.vars.state == s.state:
        code = request.vars.code
        if not db(db.auth_code.code == code).count():
            db.auth_code.insert(code=code)
            db.commit()
    else:
        code = 3
    auth_info = s.generate_token(code)
    print('======================')
    print(auth_info)
    print('======================')

    if not auth_info.get('error'):
        s.token = auth_info['access_token']
        db.auth_code.insert(code=auth_info['access_token'], code_type='access_token')
        if auth_info.get('refresh_token'):
            db.auth_code.insert(code=auth_info['refresh_token'], code_type='refresh_token')
        db.commit()

    notify.queue('sucessfully logged in!')
    redirect(URL('index'))


@get
def refresh():
    s.refresh()
    redirect(URL('index'))


@get
def status():
    return db(db.auth_code.id > 0).select()


# ---- Action for login/register/etc (required for auth) -----
def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())


# ---- action to server uploaded static content (required) ---
@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)
