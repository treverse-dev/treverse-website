"""Check the deployable site's routes, metadata, and local references."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re

root = Path(__file__).resolve().parent.parent / 'dist'
errors = []
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]; self.ids=set(); self.h1=0; self.title=False; self.description=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='h1': self.h1+=1
        if tag=='title': self.title=True
        if tag=='meta' and a.get('name')=='description': self.description=bool(a.get('content'))
        if 'id' in a: self.ids.add(a['id'])
        for key in ('src','href'):
            if key in a: self.refs.append(a[key])
        if tag=='img' and 'alt' not in a: errors.append('Image is missing alternative text')
for route in ['index.html','about/index.html','locations/index.html','jobs/index.html','404.html']:
    path=root/route
    if not path.exists(): errors.append(f'Missing {route}'); continue
    content=path.read_text(); parser=Page();parser.feed(content)
    if parser.h1!=1 or not parser.title or not parser.description: errors.append(f'{route}: missing/duplicate page metadata or main heading')
    if 'framerusercontent.com' in content or '<script' in content: errors.append(f'{route}: unexpected external runtime dependency')
    for ref in parser.refs:
        url=urlsplit(ref)
        if url.scheme or url.netloc: continue
        if ref.startswith('#'):
            if ref[1:] not in parser.ids: errors.append(f'{route}: missing anchor {ref}')
            continue
        dest=root/unquote(url.path.lstrip('/'))
        if not dest.is_file() and not (dest/'index.html').is_file(): errors.append(f'{route}: missing local asset or route {ref}')
for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)',(root/'styles.css').read_text()):
    if not (root/ref.lstrip('/')).is_file(): errors.append(f'Missing CSS asset {ref}')
if errors: raise SystemExit('\n'.join(errors))
print('PASS: 5 pages, internal navigation, local images/fonts, metadata, and skip links. No Framer runtime dependencies.')
