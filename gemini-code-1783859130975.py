# The user wants to download the file again, let's output the zip file information so they can access it directly.
import os

zip_filename = "audio_brief_feature_files.zip"
if os.path.exists(zip_filename):
    print(f"File verified: {zip_filename}")
else:
    print("File not found, recreating...")
    import zipfile
    # Re-verify/re-create just in case
    os.makedirs("app/api/generate-script", exist_ok=True)
    os.makedirs("app/api/audio-brief", exist_ok=True)
    os.makedirs("components", exist_ok=True)
    
    # contents are already saved locally from previous execution, let's zip them up
    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        zipf.write("app/api/generate-script/route.ts")
        zipf.write("app/api/audio-brief/route.ts")
        zipf.write("components/AudioBriefButton.tsx")