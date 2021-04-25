import robin_stocks as api
import account as acc
import browser as web
import logging as log
import threading as t
import crypto
import time
import sys


def buildCache():
    # De-serialize json response and cache
    response = api.robinhood.get_crypto_currency_pairs()
    size = len(response)

    # Iterate response and cherry-pick relevant queries
    for i in range(size):
        # Interrogate
        details = response[i]
        code = str(details.get('asset_currency', {}).get('code'))

        # Cache crpto details
        if code == 'DOGE':
            crypto.trackCrypto(code, details)

def browserThread():
    print('Started browser thread')
    web.startScraping()

# Main - init
if __name__ == '__main__':
    try:
        # Login and verify
        if not (acc.login()):
            sys.exit(0)
        else:
            pass

        # Success
        acc.log('Logged in - Lets get it!')
        buildCache()

        # Start selenium on seperate thread
        # (Scrapes robinhood websites for live doge price)
        # (RobinHood API doesnt offer live socket for prices)
        # (Also sending manual request every second could flag my account)
        browserThread = t.Thread(target=browserThread())
        browserThread.start()


        for x in range(10):
            print(f'Waiting {x}')
            time.sleep(1)

        acc.log('Stopping browser...')
        web.runBrowser(False)
        # Main loop
        #while True:
        #    price =
        #    time.sleep(1000)
    finally:
        # Logout on exit
        acc.logout()
        acc.log('Logged out - Goodbye.')
