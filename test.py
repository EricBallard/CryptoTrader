from threading import Thread
import time

class Example(Thread):
    def __init__(self):
        Thread.__init__(self)

    def run (self):
        for x in range(5):
            print(f'{x}')
            time.sleep(0.5)

Example().start()
print("Started thread")
