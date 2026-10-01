import cv2
import os
import glob

def process_target_video():
    video_files = glob.glob('New folder/Exploded*.mp4')
    if not video_files:
        print("Target video not found in New folder")
        return
    
    target_video_path = video_files[0]
    print(f"Opening target video: {target_video_path}")
    
    cap = cv2.VideoCapture(target_video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Video Specs: {width}x{height}, FPS: {fps}, Total Frames: {total_frames}")
    
    output_dir = 'public/hero-sequence'
    os.makedirs(output_dir, exist_ok=True)
    
    frame_idx = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame_idx += 1
        # Save as ezgif-frame-XXX.jpg with high quality (quality=92)
        out_path = os.path.join(output_dir, f"ezgif-frame-{frame_idx:03d}.jpg")
        cv2.imwrite(out_path, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 92])
    
    cap.release()
    print(f"Extracted {frame_idx} full 1080p frames to {output_dir} successfully!")

def inspect_user_recording():
    user_recording_files = glob.glob('New folder/VELARA*.mp4')
    if not user_recording_files:
        return
    
    rec_path = user_recording_files[0]
    print(f"Inspecting user screen recording: {rec_path}")
    cap = cv2.VideoCapture(rec_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    print(f"User recording total frames: {total_frames}, FPS: {fps}")
    cap.release()

if __name__ == '__main__':
    process_target_video()
    inspect_user_recording()
