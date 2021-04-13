# RobinHood
import robin_stocks as api

from autoscraper import AutoScraper

# Crypto-currency object
class Crypto:
    def __init__(self, id, name, code, symbol):
        self.id = id
        self.name = name
        self.code = code
        self.symbol = symbol


# Cached crpto-curency data
cryptos = []

def getFromList(code):
    for crypto in cryptos:
        if crypto.code == code:
            return crypto
    return None

def getPrice():
    url = 'https://stackoverflow.com/questions/2081586/web-scraping-with-python'
    wanted_list = ["What are metaclasses in Python?"]

    scraper = AutoScraper()
    result = scraper.build(url, wanted_list)
    print(result)
# Extracts json element from request as dictionary
def trackCrypto(code, details):
    # Check for existing entry
    crypto = getFromList(code)

    # New entry
    if crypto == None:
        info = details.get('asset_currency')

        crypto = Crypto(info.get('id'), info.get(
            'name'), code, details.get('symbol'))

        cryptos.append(crypto)

    #
    #    api.robinhood.get_crypto_positions(info='cost_bases')
    #  'direct_cost_basis': '169.900000000000000000',
    #  'direct_quantity': '2243.000000000000000000',

    quote = api.robinhood.orders.get_all_crypto_orders()
    print('Quote: ' + str(quote))

    print(f'Tracking Crypto: {crypto.name} | Current Price: {crypto.symbol}')
    #print('Quote: ' + str(quote))
