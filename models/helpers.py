from base64 import b64encode


# helpers

def b64(text):
    return b64encode(text.encode()).decode()


def find(query, data):
    results = filter(query, data)
    try:
        return next(results)
    except StopIteration:
        return None


def _method(method):
    if not request.env.request_method == method.upper():
        raise HTTP(405, f'use {method}')


def post(f):
    def wrapper():
        _method('POST')
        return f()

    return wrapper


def get(f):
    def wrapper():
        _method('GET')
        return f()

    return wrapper


# front-end

# STATE = 'PROD'
STATE = 'DEV'


def staticjs(file):
    # create url for static file
    ext = 'js' if STATE == 'PROD' else 'es6'
    return URL('static', f'{ext}/{file}')
