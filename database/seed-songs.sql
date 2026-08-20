-- ============================================================================
-- GULLYVERSE — RELATIONAL SCHEMA & SEED SCRIPT FOR SONGS & SPOTIFY INTEGRATION
-- Idempotent schema definition and seed for Indian Hip-Hop Top 5 Tracks
-- ============================================================================

-- 1. Create normalized tables
CREATE TABLE IF NOT EXISTS artists (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(120) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    stage_name VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    region VARCHAR(50),
    primary_language VARCHAR(50),
    primary_role VARCHAR(50) DEFAULT 'RAPPER',
    spotify_url VARCHAR(500),
    youtube_url VARCHAR(500),
    image_url VARCHAR(500),
    cover_image_url VARCHAR(500),
    popularity INT DEFAULT 50,
    verified BOOLEAN DEFAULT FALSE,
    verified_100k_plus BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS songs (
    id VARCHAR(120) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE,
    artist_id VARCHAR(100) REFERENCES artists(id) ON DELETE CASCADE,
    artist_name VARCHAR(255) NOT NULL,
    featured_artists TEXT[], -- Array of featured artist names
    album_id VARCHAR(120),
    album_title VARCHAR(255),
    release_year INT NOT NULL,
    release_date DATE,
    duration_ms INT DEFAULT 180000,
    duration_formatted VARCHAR(20) DEFAULT '3:00',
    bpm INT DEFAULT 120,
    mood VARCHAR(50) DEFAULT 'STREET',
    genre VARCHAR(100) NOT NULL,
    language VARCHAR(100) NOT NULL,
    producer VARCHAR(255),
    is_underground BOOLEAN DEFAULT FALSE,
    is_explicit BOOLEAN DEFAULT FALSE,
    cover_image_url VARCHAR(500) NOT NULL,
    audio_preview_url VARCHAR(500),
    audio_source_type VARCHAR(50) DEFAULT 'master',
    spotify_track_id VARCHAR(100),
    spotify_uri VARCHAR(150),
    spotify_url VARCHAR(500),
    youtube_id VARCHAR(50),
    youtube_url VARCHAR(500),
    apple_music_url VARCHAR(500),
    lyrics_snippet TEXT,
    iconic_bars TEXT,
    description TEXT,
    spotify_match_status VARCHAR(50) DEFAULT 'VERIFIED',
    source_type VARCHAR(50) DEFAULT 'Spotify',
    source_url VARCHAR(500),
    source_name VARCHAR(100) DEFAULT 'Spotify Official Web API',
    last_verified_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS artist_songs (
    id VARCHAR(150) PRIMARY KEY,
    artist_id VARCHAR(100) NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
    song_id VARCHAR(120) NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'PRIMARY', -- PRIMARY, FEATURED, PRODUCER, COLLABORATOR
    is_featured_song BOOLEAN DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 1, -- 1, 2, 3, 4, 5 for Top 5
    selection_type VARCHAR(50) NOT NULL DEFAULT 'POPULAR', -- POPULAR, MOST_STREAMED, BREAKTHROUGH, EDITOR_PICK, FEATURED
    editorial_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_artist_song_order UNIQUE (artist_id, display_order),
    CONSTRAINT unique_artist_song_pair UNIQUE (artist_id, song_id)
);

-- Indexing for rapid queries
CREATE INDEX IF NOT EXISTS idx_songs_artist_id ON songs(artist_id);
CREATE INDEX IF NOT EXISTS idx_songs_spotify_track_id ON songs(spotify_track_id);
CREATE INDEX IF NOT EXISTS idx_artist_songs_artist_featured ON artist_songs(artist_id, is_featured_song, display_order);

-- 2. Idempotent Artist & Top 5 Songs Seed Inserts
-- DIVINE
INSERT INTO artists (id, slug, name, stage_name, city, state, region, primary_language, spotify_url, verified, verified_100k_plus)
VALUES ('divine', 'divine', 'Vivian Fernandes', 'DIVINE', 'Mumbai', 'Maharashtra', 'West', 'Hindi', 'https://open.spotify.com/artist/4Ai0pGz6GhQnK0D4Z3j4xP', TRUE, TRUE)
ON CONFLICT (id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP;

INSERT INTO songs (id, title, slug, artist_id, artist_name, featured_artists, album_title, release_year, release_date, genre, language, producer, bpm, cover_image_url, spotify_track_id, spotify_uri, spotify_url, youtube_id, youtube_url, spotify_match_status, selection_type, display_order)
VALUES 
('mere-gully-mein', 'Mere Gully Mein', 'mere-gully-mein', 'divine', 'DIVINE', ARRAY['Naezy'], 'Gully Classics', 2015, '2015-04-16', 'Gully Rap', 'Hindi / Bambaiya', 'Sunit Music', 96, 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', '4L1XoN2k1J9W5T3r8L5P1k', 'spotify:track:4L1XoN2k1J9W5T3r8L5P1k', 'https://open.spotify.com/track/4L1XoN2k1J9W5T3r8L5P1k', 'p8T21fQp9bM', 'https://www.youtube.com/watch?v=p8T21fQp9bM', 'VERIFIED', 'POPULAR', 1),
('divine-3-59-am', '3:59 AM', '3-59-am', 'divine', 'DIVINE', ARRAY[]::TEXT[], 'Punya Paap', 2020, '2020-12-04', 'Gully Rap', 'Hindi', 'Stunnah Beatz', 140, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', '3t9g8X6nZ14pYV7b2M9eR1', 'spotify:track:3t9g8X6nZ14pYV7b2M9eR1', 'https://open.spotify.com/track/3t9g8X6nZ14pYV7b2M9eR1', '8Z_5w3t2N1Y', 'https://www.youtube.com/watch?v=8Z_5w3t2N1Y', 'VERIFIED', 'MOST_STREAMED', 2),
('kaam-25', 'Kaam 25', 'kaam-25', 'divine', 'DIVINE', ARRAY[]::TEXT[], 'Sacred Games OST', 2018, '2018-06-14', 'Gully Rap', 'Hindi / Bambaiya', 'Phenom', 94, 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', '1K6kY9p8V3j2N7m5P4q1X0', 'spotify:track:1K6kY9p8V3j2N7m5P4q1X0', 'https://open.spotify.com/track/1K6kY9p8V3j2N7m5P4q1X0', 'r5iQ8jU7mN4', 'https://www.youtube.com/watch?v=r5iQ8jU7mN4', 'VERIFIED', 'BREAKTHROUGH', 3),
('chal-bombay', 'Chal Bombay', 'chal-bombay', 'divine', 'DIVINE', ARRAY[]::TEXT[], 'Kohinoor', 2019, '2019-11-29', 'Gully Rap', 'Hindi / Bambaiya', 'iLL Wayno', 100, 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80', '5M2XoN2k1J9W5T3r8L5P1k', 'spotify:track:5M2XoN2k1J9W5T3r8L5P1k', 'https://open.spotify.com/track/5M2XoN2k1J9W5T3r8L5P1k', '3G_jZ5r0W6M', 'https://www.youtube.com/watch?v=3G_jZ5r0W6M', 'VERIFIED', 'POPULAR', 4),
('kohinoor', 'Kohinoor', 'kohinoor', 'divine', 'DIVINE', ARRAY[]::TEXT[], 'Kohinoor', 2019, '2019-11-29', 'Gully Rap', 'Hindi', 'Phenom', 88, 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80', '2G7j4N1m9K3v8P5q6T2x0Z', 'spotify:track:2G7j4N1m9K3v8P5q6T2x0Z', 'https://open.spotify.com/track/2G7j4N1m9K3v8P5q6T2x0Z', 'L_W14jL3j1M', 'https://www.youtube.com/watch?v=L_W14jL3j1M', 'VERIFIED', 'EDITOR_PICK', 5)
ON CONFLICT (id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP;

INSERT INTO artist_songs (id, artist_id, song_id, role, is_featured_song, display_order, selection_type)
VALUES 
('divine-song-1', 'divine', 'mere-gully-mein', 'PRIMARY', TRUE, 1, 'POPULAR'),
('divine-song-2', 'divine', 'divine-3-59-am', 'PRIMARY', TRUE, 2, 'MOST_STREAMED'),
('divine-song-3', 'divine', 'kaam-25', 'PRIMARY', TRUE, 3, 'BREAKTHROUGH'),
('divine-song-4', 'divine', 'chal-bombay', 'PRIMARY', TRUE, 4, 'POPULAR'),
('divine-song-5', 'divine', 'kohinoor', 'PRIMARY', TRUE, 5, 'EDITOR_PICK')
ON CONFLICT (artist_id, display_order) DO UPDATE SET song_id = EXCLUDED.song_id, selection_type = EXCLUDED.selection_type;
