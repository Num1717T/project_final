from flask import Flask, request, jsonify
from google.cloud import speech
import os
import io
import wave
import pandas as pd
from moviepy.editor import VideoFileClip
from pydub import AudioSegment

app = Flask(__name__)

def extract_audio_from_video(video_path, output_audio_path):
    try:
        video_clip = VideoFileClip(video_path)
        audio_clip = video_clip.audio
        audio_clip.write_audiofile(output_audio_path, codec='pcm_s16le', ffmpeg_params=['-ac', '1'])
        return video_clip.duration
    except Exception as e:
        print(f"Error extracting audio: {e}")
        return None

def preprocess_audio(audio_path):
    audio = AudioSegment.from_wav(audio_path)
    normalized_audio = audio.normalize()
    filtered_audio = normalized_audio.low_pass_filter(3000)
    preprocessed_path = audio_path.replace('.wav', '_preprocessed.wav')
    filtered_audio.export(preprocessed_path, format='wav')
    return preprocessed_path

def split_audio(audio_file_path, chunk_length_ms=60000):
    audio = AudioSegment.from_wav(audio_file_path)
    chunks = [audio[i:i+chunk_length_ms] for i in range(0, len(audio), chunk_length_ms)]
    return chunks

def transcribe_audio_with_time(audio_segment, thai_bad_words):
    client = speech.SpeechClient()
    audio = speech.RecognitionAudio(content=audio_segment.raw_data)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        language_code="th-TH",
        enable_word_time_offsets=True,
        sample_rate_hertz=audio_segment.frame_rate,
        speech_contexts=[speech.SpeechContext(phrases=thai_bad_words)]
    )
    response = client.recognize(config=config, audio=audio)
    return response

def detect_profanity_with_time(response, bad_words, chunk_start_time):
    results = []
    for result in response.results:
        alternative = result.alternatives[0]
        for word_info in alternative.words:
            word = word_info.word
            start_time = chunk_start_time + word_info.start_time.total_seconds()
            end_time = chunk_start_time + word_info.end_time.total_seconds()
            if word in bad_words:
                results.append({
                    'word': word,
                    'start_time': start_time,
                    'end_time': end_time
                })
    return results

@app.route('/process-video', methods=['POST'])
def process_video():
    video_path = request.json['video_path']
    output_audio_path = 'output_audio.wav'
    bad_words_file = 'หยาบกระด้าง_V4.csv'
    service_account_file = 'kradang-4a774105d096.json'
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = service_account_file

    video_duration = extract_audio_from_video(video_path, output_audio_path)
    if video_duration is None:
        return jsonify({'error': 'Failed to extract audio from video.'}), 500

    preprocessed_audio_path = preprocess_audio(output_audio_path)
    audio_chunks = split_audio(preprocessed_audio_path)

    bad_words_df = pd.read_csv(bad_words_file, encoding='utf-8-sig')
    thai_bad_words = bad_words_df['คำหยาบ'].tolist()

    chunk_start_time = 0
    results = []
    for i, chunk in enumerate(audio_chunks):
        response = transcribe_audio_with_time(chunk, thai_bad_words)
        chunk_results = detect_profanity_with_time(response, thai_bad_words, chunk_start_time)
        results.extend(chunk_results)
        chunk_start_time += len(chunk) / 1000

    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
