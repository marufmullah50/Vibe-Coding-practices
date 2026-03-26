import sys
try:
    from pypdf import PdfReader
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    from pypdf import PdfReader

reader = PdfReader('Md_Maruf_Mullah_CV.pdf')
text = []
for page in reader.pages:
    text.append(page.extract_text())

with open("cv_extracted.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(text))

print("Extraction complete.")
