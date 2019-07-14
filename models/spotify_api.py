# import spotify
import spotify.sync as spotify  # Nothing requires async/await now!
import requests
from urllib.parse import quote_plus as url_escape


# from urllib.parse import unquote as url_unescape


# spotify class

class Spotify:
    def __init__(self):
        print('creating new instance')
        self.client_id = client_id = configuration.get('spotify.client_id')
        self.client_secret = client_secret = configuration.get('spotify.client_secret')

        self.client = spotify.Client(client_id, client_secret)
        self.state = 'mybotuser'
        self.uri = 'http://localhost/spotipy/default/callback'
        self.user = None
        self.token = None

    # spotify.User.from_code(client, 'somecode', redirect_uri='some://redirect', refresh=False)

    def generate_login_url(self):
        scopes = ['user-read-private',
                  'user-read-email',
                  'playlist-modify-public',
                  'playlist-modify-private',
                  'playlist-modify',
                  'playlist-read-collaborative',
                  'playlist-read-private',
                  'streaming',
                  'app-remote-control']

        parameters = {
            "client_id": self.client_id,
            "response_type": "code",
            "redirect_uri": self.uri,
            "scope": ' '.join(scopes),
            "state": self.state,
        }

        args = '&'.join([f"{k}={url_escape(v)}" for k, v in parameters.items()])

        return "https://accounts.spotify.com/authorize?" + args

    def generate_token(self, code, grant_type='authorization_code'):
        print('querying for new token', grant_type)
        headers = {
            'Authorization': 'Basic ' + b64(f"{self.client_id}:{self.client_secret}"),
        }

        grant_type_key = 'code' if grant_type == 'authorization_code' else 'refresh_token'

        data = {
            'grant_type': grant_type,
            grant_type_key: code,
            'redirect_uri': self.uri,
        }

        return requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data).json()

    def refresh(self):
        print('refreshing token')
        query = db.auth_code.code_type == 'refresh_token'
        refresh_token = db(query).select(orderby=~db.auth_code.id, limitby=(0, 1)).first()
        auth_info = self.generate_token(refresh_token.code, grant_type='refresh_token')
        if not auth_info.get('error'):
            db.auth_code.insert(code=auth_info['access_token'], code_type='access_token')
            if auth_info.get('refresh_token'):
                db.auth_code.insert(code=auth_info['refresh_token'], code_type='refresh_token')
            db.commit()

    def login(self):
        print('logging in')
        query = db.auth_code.code_type == 'access_token'
        token = db(query).select(orderby=~db.auth_code.id, limitby=(0, 1)).first()
        self.token = token.code
        try:
            self.user = spotify.User.from_token(self.client, self.token)
        except spotify.errors.HTTPException:
            self.refresh()
            self.login()

        return self.user

    def require_login(self, f):

        def catcher():
            if not self.user:
                self.login()
            try:
                return f()
            except spotify.errors.HTTPException:
                self.login()
                f()

        return catcher

    @staticmethod
    def track(track_id):
        return 'spotify:track:' + track_id

    @staticmethod
    def playlist(pl_id):
        return 'spotify:playlist:' + pl_id


# cache

@cache('spotify', time_expire=3600, cache_model=cache.ram)
def cachetest():
    print('executing login etc')
    s_instance = Spotify()
    s_instance.login()
    return s_instance


s = cachetest()
