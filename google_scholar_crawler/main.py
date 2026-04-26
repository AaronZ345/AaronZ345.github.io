import json
import os
import sys
import time
from datetime import datetime

import jsonpickle
from scholarly import scholarly

MAX_ATTEMPTS = 3
BACKOFF_SECONDS = [30, 120, 300]


def fetch_author():
    last_error = None
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            print(f"[attempt {attempt}/{MAX_ATTEMPTS}] fetching Google Scholar profile...", flush=True)
            author = scholarly.search_author_id(os.environ['GOOGLE_SCHOLAR_ID'])
            scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
            print(f"[attempt {attempt}] success: {author.get('name')} ({author.get('citedby')} citations)", flush=True)
            return author
        except Exception as exc:
            last_error = exc
            print(f"[attempt {attempt}] failed: {type(exc).__name__}: {exc}", flush=True)
            if attempt < MAX_ATTEMPTS:
                wait = BACKOFF_SECONDS[attempt - 1]
                print(f"[attempt {attempt}] sleeping {wait}s before retry", flush=True)
                time.sleep(wait)
    raise RuntimeError(f"All {MAX_ATTEMPTS} attempts failed; last error: {last_error}")


author = fetch_author()
author['updated'] = str(datetime.now())
author['publications'] = {v['author_pub_id']: v for v in author['publications']}
print(json.dumps(author, indent=2))
os.makedirs('results', exist_ok=True)
with open('results/gs_data.json', 'w') as outfile:
    json.dump(author, outfile, ensure_ascii=False)

shieldio_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": f"{author['citedby']}",
}
with open('results/gs_data_shieldsio.json', 'w') as outfile:
    json.dump(shieldio_data, outfile, ensure_ascii=False)
