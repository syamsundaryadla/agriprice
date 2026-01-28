import requests
from datetime import datetime, timedelta

def debug_enam():
    url = "https://enam.gov.in/web/Ajax_ctrl/trade_data_list"
    today = datetime.now()
    # Try Jan 3 as we know it has data from the subagent run
    target_date = "2026-01-03" 
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://enam.gov.in/web/dashboard/trade-data',
        'Origin': 'https://enam.gov.in'
    }
    
    payload = {
        'language': 'en',
        'stateName': '-- All --',
        'apmcName': '-- Select APMCs --',
        'commodityName': '-- Select Commodity --',
        'fromDate': target_date,
        'toDate': target_date
    }
    
    print(f"Testing eNAM POST to {url} with date {target_date}")
    try:
        session = requests.Session()
        # First visit the home page to get any session cookies
        session.get("https://enam.gov.in/web/dashboard/trade-data", headers={'User-Agent': headers['User-Agent']})
        
        response = session.post(url, headers=headers, data=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response Head (first 500 chars): {response.text[:500]}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    debug_enam()
