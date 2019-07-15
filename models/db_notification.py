class Notify:

    def __init__(self, notifications=None):
        if not notifications:
            notifications = []
        session.notifications = self.notification = notifications

    def queue(self, content, importance='success', timeout=2000):
        self.notification.append({
            'content': content,
            'importance': importance,
            'timeout': timeout,
        })

    def show(self):
        result = []
        for notification in self.notification:
            result.append(f'notify("{notification["content"]}", "{notification["importance"]}", "{notification["timeout"]}");')
        self.clear()
        return XML('\n'.join(result))

    def clear(self):
        session.notifications = self.notification = []


notify = Notify(session.notifications)
