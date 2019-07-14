# db

db.define_table('auth_code',
                Field('code'),
                Field('code_type', default='auth_code'),
                )
