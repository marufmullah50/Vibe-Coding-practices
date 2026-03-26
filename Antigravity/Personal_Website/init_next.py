import os
import shutil

# Run create-next-app
result = os.system('npx -y create-next-app@latest my-site --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm')
if result == 0:
    for f in os.listdir('my-site'):
        src = os.path.join('my-site', f)
        dst = os.path.join('.', f)
        if os.path.exists(dst):
            if os.path.isdir(dst):
                shutil.rmtree(dst)
            else:
                os.remove(dst)
        shutil.move(src, '.')
    os.rmdir('my-site')
    print("Next.js app created and moved successfully.")
else:
    print("Failed to run create-next-app.")
