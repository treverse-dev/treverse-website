"""Generate a portable, dependency-free Treverse website. Run: python3 scripts/build.py."""
from pathlib import Path
from html import escape
from urllib.parse import quote
import json

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist'

def button(label, href):
    return f'<a class="button" href="{escape(href, quote=True)}">{label}<span aria-hidden="true">↗</span></a>'

def page(route, title, description, content):
    nav = ''.join(f'<a href="/{r}"'+(' aria-current="page"' if route == r else '')+f'>{label}</a>' for r,label in [('about','About'),('locations','Locations'),('jobs','Jobs')])
    canonical = 'https://www.treversellc.com/' + route
    markup = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{escape(title)}</title><meta name="description" content="{escape(description, quote=True)}"><meta name="theme-color" content="#d8f1e5"><link rel="canonical" href="{canonical}"><meta property="og:title" content="{escape(title, quote=True)}"><meta property="og:description" content="{escape(description, quote=True)}"><meta property="og:type" content="website"><meta property="og:url" content="{canonical}"><link rel="icon" href="/assets/favicon.png"><link rel="preload" href="/assets/esteban.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"></head>
<body><a class="skip-link" href="#main">Skip to content</a><header class="site-header"><nav class="shell nav" aria-label="Main navigation"><a class="wordmark" href="/" aria-label="Treverse home"><img src="/assets/mark.png" alt="" width="32" height="40">Treverse</a><div class="nav-links">{nav}</div></nav></header><main id="main">{content}</main><footer class="site-footer"><div class="shell footer-row"><div class="footer-brand"><a class="wordmark" href="/">Treverse LLC</a><p>© 2026 Treverse LLC. All rights reserved.</p></div><nav class="social" aria-label="Social media"><a href="https://www.facebook.com/AStockAuctions/">Facebook</a><a href="https://www.instagram.com/_a_stock/">Instagram</a><a href="https://www.youtube.com/@AStockBids">YouTube</a></nav></div></footer></body></html>'''
    path = OUT / route / 'index.html' if route else OUT / 'index.html'
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(markup)

services = [
 ('Distribution', '<li>Online with dynamic pricing</li><li>Retail<ul><li>Item-level reporting</li><li>Revenue share capabilities</li></ul></li><li>Domestic wholesale</li><li>Export / international sales</li>', 'distribution.jpg', 'People overlooking a distribution cityscape', '/about'),
 ('Export','<li>International sales</li><li>High-volume item processing and manifesting</li><li>Online sales</li>', 'export.jpg','Inventory being loaded into a shipping trailer','/about'),
 ('RMS','<li>Visibility throughout the product lifecycle</li><li>Standard and custom reporting</li><li>Currently processing 500+ truckloads monthly</li><li>Custom operational plans</li>','warehouse.jpg','Inventory racks and a forklift in a warehouse','/locations'),
 ('B2C','<li>A-Stock online marketplace</li><li>Revenue share with item-level sales reporting</li><li>Bin stores</li><li>Other specialties</li>','marketplace.jpg','Online inventory and sales reporting on a laptop','https://astock.com')
]
home = '''<div class="shell"><section class="hero" aria-labelledby="hero-title"><img class="hero-logo" src="/assets/logo.png" alt="Treverse LLC" width="543" height="166"><img class="hero-image" src="/assets/trucks.jpg" alt="Aerial view of trucks at a distribution center" width="1800" height="1199" fetchpriority="high"><div class="hero-copy"><h1 id="hero-title">Where technology meets<br> <em>Reverse Logistics</em></h1><p>Treverse LLC partners with retailers, logistics companies, and importers to give a second life to obsolete inventory—from customer returns and seasonal stock to liquidation events and inventory pulls.</p></div></section><section aria-labelledby="services-title"><div class="section-intro"><div><span class="eyebrow">What we do</span><h2 id="services-title">Services</h2></div><p>Since 2020, we have been building an ecosystem to provide the RMS tooling needed for the biggest recovery across all verticals.</p></div><div class="services">'''
for n,(title,items,asset,alt,href) in enumerate(services,1):
    home += f'<article class="service"><div class="service-content"><span class="eyebrow">0{n} / Our services</span><h2>{title}</h2><ul>{items}</ul>{button("Read more",href)}</div><img class="service-image" src="/assets/{asset}" alt="{alt}" width="1200" height="800" loading="lazy" decoding="async"></article>'
home += '</div></section><section class="cta"><h2>Want to work with us?</h2>'+button('Explore careers','/jobs')+'</section></div>'
page('', 'Treverse LLC | Technology meets Reverse Logistics', 'Treverse partners with retailers, logistics companies, and importers to give inventory a second life through distribution, export, RMS, and retail.', home)

about = '''<div class="shell"><header class="page-heading"><span class="eyebrow">About Treverse</span><h1>Welcome to Treverse,<br>a Nashville-based company.</h1><p>Our mission is to give our customers the power to name their price.</p></header><div class="about-layout"><div class="prose"><p>All the items in our sales start at just one dollar. Our inventory changes weekly, allowing you to browse products for all occasions. <a href="https://a-stock.bid/Account/AccountSettings">Sign up for our newsletter</a> so you don’t miss out on these great deals.</p><p>We’ll let you in on our little secret. We buy in bulk from major retailers, which helps us help you name your price. These items tend to be overstocked, seasonal, or closeout products.</p></div><img class="about-image" src="/assets/logistics.jpg" alt="A-Stock auction pickup entrance" width="1600" height="1067"></div><section class="how"><h2>How does it work?</h2><ol class="steps"><li>Items at a specific location are grouped into a sale with a specified end date and time.</li><li>At the close of the sale, the winning bidder receives a notice and their credit card is automatically charged.</li><li>Each sale lists the specific days and location where the winning bidder can pick up their items.</li></ol><p class="note">Local pickup only. We do not offer shipping, and items cannot be transferred between locations. Items not picked up within the allotted time are forfeited.</p></section><section class="faq"><span class="eyebrow">A few common questions</span><h2>FAQ</h2><details open><summary>Who is Treverse LLC?</summary><p>We are a reverse logistics company working on returning deep discounts to our customers through strategic purchasing.</p></details><details><summary>What is reverse logistics?</summary><p>We work with big-box retailers to give returned and excess inventory a second life.</p></details><details><summary>How do we provide deep-discount products?</summary><p>We work with big-box retailers who have customer returns, overstock products, or abandoned inventory. We liquidate that inventory to provide deals to our customers.</p></details></section></div>'''
page('about','About | Treverse LLC','Learn about Treverse, our reverse logistics approach, and how our local pickup auctions work.',about)

locations = [
 ('West Nashville, TN','7145 Centennial Blvd, Nashville, TN 37209'),
 ('La Vergne, TN','1450 Gould Blvd, La Vergne, TN 37086'),
 ('Bartlett, TN','1981 Fletcher Creek Dr, Memphis, TN 37133'),
 ('Cookeville, TN','401 Joff Dr, Cookeville, TN 38501'),
 ('Paducah, KY','1927 Irvin Cobb Dr, Paducah, KY 42003'),
 ('Millington, TN','8219 Highway 51 N, Millington, TN 38053'),
 ('Johnson City, TN','506 S Roan St, Johnson City, TN 37601'),
 ('FH Liquidations','3332 Powell Ave, Nashville, TN 37204'),
 ('Springdale, OH','11925 Commons Dr, Springdale, OH 45246'),
 ('Tupelo, MS','1130 Commonwealth Blvd, Tupelo, MS 38804'),
 ('Dickson, TN','535 TN-46, Dickson, TN 37055'),
]
content = '<div class="shell"><header class="page-heading"><span class="eyebrow">Our network</span><h1>Locations</h1></header><div class="locations">'
for name,address in locations:
    content += f'<article class="location"><h2 style="font-size:1.55rem">{escape(name)}</h2><address>{escape(address)}</address><a href="https://www.google.com/maps/search/?api=1&amp;query={quote(address)}">View map <span aria-hidden="true">↗</span></a></article>'
content += '</div></div>'
page('locations','Locations | Treverse LLC','Find Treverse and A-Stock locations across Tennessee, Kentucky, Ohio, and Mississippi.',content)

jobs = '<div class="shell"><header class="page-heading"><span class="eyebrow">Careers at Treverse</span><h1>Join our growing team.</h1><p>Start your next career chapter with us.</p></header><section class="jobs" aria-label="Positions">'
for title,job_id in [('Machine Learning Software Engineer','4257409629'),('Full Stack Software Engineer','4267788035'),('Mobile Software Engineer','4282337682')]:
    jobs += f'<article class="job"><div><h2 style="font-size:1.55rem"><a href="https://www.linkedin.com/jobs/view/{job_id}">{title}</a></h2><p>On site</p></div><span class="badge">Position filled</span></article>'
jobs += '</section><section class="cta"><h2>Apply now.</h2><p>Share your resume with our team.</p>'+button('Upload resume','https://treverse.notion.site/1916db5f5eb68037b122ea0a8ff63848?pvs=105')+'</section></div>'
page('jobs','Jobs | Treverse LLC','Explore careers with Treverse and share your resume with our growing team.',jobs)
page('404','Page not found | Treverse LLC','This page could not be found.','<div class="shell not-found"><span class="eyebrow">404</span><h1>Let’s get you back on track.</h1><p>We couldn’t find that page.</p>'+button('Back to home','/')+'</div>')
(OUT/'404.html').write_text((OUT/'404/index.html').read_text().replace('<link rel="canonical" href="https://www.treversellc.com/404">','<meta name="robots" content="noindex">'))
(OUT/'404/index.html').unlink()
(OUT/'404').rmdir()
(OUT/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: https://www.treversellc.com/sitemap.xml\n')
(OUT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>https://www.treversellc.com/{r}</loc></url>' for r in ['', 'about','locations','jobs'])+'</urlset>\n')
print('Generated Home, About, Locations, Jobs, 404, robots.txt, and sitemap.xml.')
