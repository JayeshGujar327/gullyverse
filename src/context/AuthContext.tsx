import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, UserPlaylist, ArtistSubmission } from '../types';
import { useToast } from './ToastContext';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  favoriteSongIds: string[];
  favoriteArtistIds: string[];
}

interface AuthContextType {
  user: UserProfile;
  setRole: (role: Role) => void;
  switchRole: (role: Role) => void;
  toggleFavoriteSong: (songId: string) => void;
  toggleFavoriteArtist: (artistId: string) => void;
  playlists: UserPlaylist[];
  createPlaylist: (name: string, description: string) => void;
  removePlaylist: (playlistId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  submissions: ArtistSubmission[];
  submitArtist: (sub: Omit<ArtistSubmission, 'id' | 'status' | 'submittedAt' | 'submittedBy'>) => void;
  moderateSubmission: (id: string, status: 'APPROVED' | 'REJECTED') => void;
  votedCategoryIds: string[];
  castVote: (categoryId: string, nomineeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: 'usr_gully_99',
  name: 'Jay Sinha',
  email: 'gujarj327@gmail.com',
  role: 'ADMIN', // Default to ADMIN for complete playground access
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  favoriteSongIds: ['mere-gully-mein', 'nanchaku', 'kohinoor', 'no-cap'],
  favoriteArtistIds: ['divine', 'seedhe-maut', 'krsna', 'mc-stan']
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('gullyverse_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        return {
          ...DEFAULT_USER,
          ...parsed,
          favoriteSongIds: Array.isArray(parsed?.favoriteSongIds) ? parsed.favoriteSongIds : DEFAULT_USER.favoriteSongIds,
          favoriteArtistIds: Array.isArray(parsed?.favoriteArtistIds) ? parsed.favoriteArtistIds : DEFAULT_USER.favoriteArtistIds,
        };
      } catch {}
    }
    return DEFAULT_USER;
  });

  const [playlists, setPlaylists] = useState<UserPlaylist[]>(() => {
    const saved = localStorage.getItem('gullyverse_playlists');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'pl_gully_drill',
        name: 'DHH Drill & Underground Heat',
        description: 'Hard sliding 808s and technical bars from Delhi and Mumbai.',
        coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
        createdBy: 'Jay Sinha',
        songIds: ['nanchaku', '101', 'no-cap', 'basti-ka-hasti'],
        isPublic: true,
        createdAt: '2025-08-01'
      },
      {
        id: 'pl_gully_classics',
        name: 'Gully Classics & Anthems',
        description: 'The foundation stones of the Indian hip hop movement.',
        coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
        createdBy: 'Jay Sinha',
        songIds: ['mere-gully-mein', 'kohinoor', 'class-sikh-maut', 'aathma-raama'],
        isPublic: true,
        createdAt: '2025-07-15'
      }
    ];
  });

  const [submissions, setSubmissions] = useState<ArtistSubmission[]>(() => {
    const saved = localStorage.getItem('gullyverse_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [
      {
        id: 'sub_001',
        artistName: 'Arjun Rao',
        stageName: 'Dharavi Tiger',
        city: 'Mumbai',
        state: 'Maharashtra',
        language: 'Marathi / Hindi',
        genre: 'Gully Rap',
        bio: '19-year old MC from Dharavi crafting fast boom-bap rhythm bars about youth education and street aspirations.',
        topSongTitle: 'Gully Ki Roshni',
        streamingLink: 'https://youtube.com',
        instagramUrl: 'https://instagram.com',
        status: 'PENDING',
        submittedAt: '2025-08-18',
        submittedBy: 'Jay Sinha'
      },
      {
        id: 'sub_002',
        artistName: 'Zoya Khan',
        stageName: 'Noor-e-Kalam',
        city: 'Hyderabad',
        state: 'Telangana',
        language: 'Urdu / Dakhani',
        genre: 'Conscious Rap',
        bio: 'Dakhani conscious rap poetess dissecting heritage preservation and gender equality.',
        topSongTitle: 'Charminar Ki Sada',
        streamingLink: 'https://spotify.com',
        instagramUrl: 'https://instagram.com',
        status: 'APPROVED',
        submittedAt: '2025-08-10',
        submittedBy: 'Zoya'
      }
    ];
  });

  const [votedCategoryIds, setVotedCategoryIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gullyverse_votes');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('gullyverse_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gullyverse_playlists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('gullyverse_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('gullyverse_votes', JSON.stringify(votedCategoryIds));
  }, [votedCategoryIds]);

  const setRole = (newRole: Role) => {
    setUser((prev) => ({ ...prev, role: newRole }));
    showToast(`Role switched to ${newRole}`, 'info');
  };

  const switchRole = setRole;

  const toggleFavoriteSong = (songId: string) => {
    setUser((prev) => {
      const currentList = Array.isArray(prev?.favoriteSongIds) ? prev.favoriteSongIds : [];
      const exists = currentList.includes(songId);
      const updated = exists
        ? currentList.filter((id) => id !== songId)
        : [...currentList, songId];
      showToast(exists ? 'Removed from favorites' : 'Added to favorites', 'success');
      return { ...prev, favoriteSongIds: updated };
    });
  };

  const toggleFavoriteArtist = (artistId: string) => {
    setUser((prev) => {
      const currentList = Array.isArray(prev?.favoriteArtistIds) ? prev.favoriteArtistIds : [];
      const exists = currentList.includes(artistId);
      const updated = exists
        ? currentList.filter((id) => id !== artistId)
        : [...currentList, artistId];
      showToast(exists ? 'Unfollowed artist' : 'Added artist to favorites', 'success');
      return { ...prev, favoriteArtistIds: updated };
    });
  };

  const createPlaylist = (name: string, description: string) => {
    const newPl: UserPlaylist = {
      id: 'pl_' + Date.now(),
      name,
      description,
      createdBy: user?.name || 'Jay Sinha',
      songIds: [],
      isPublic: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPlaylists((prev) => [newPl, ...(prev || [])]);
    showToast(`Playlist "${name}" created!`, 'success');
  };

  const removePlaylist = (playlistId: string) => {
    setPlaylists((prev) => (prev || []).filter((pl) => pl.id !== playlistId));
    showToast('Playlist deleted', 'info');
  };

  const deletePlaylist = removePlaylist;

  const addSongToPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      (prev || []).map((pl) => {
        if (pl.id === playlistId) {
          const currentIds = Array.isArray(pl.songIds) ? pl.songIds : [];
          if (currentIds.includes(songId)) {
            showToast('Song already in playlist', 'info');
            return pl;
          }
          showToast('Added to playlist', 'success');
          return { ...pl, songIds: [...currentIds, songId] };
        }
        return pl;
      })
    );
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((prev) =>
      (prev || []).map((pl) => {
        if (pl.id === playlistId) {
          const currentIds = Array.isArray(pl.songIds) ? pl.songIds : [];
          return { ...pl, songIds: currentIds.filter((id) => id !== songId) };
        }
        return pl;
      })
    );
    showToast('Removed from playlist', 'info');
  };

  const submitArtist = (sub: Omit<ArtistSubmission, 'id' | 'status' | 'submittedAt' | 'submittedBy'>) => {
    const newSub: ArtistSubmission = {
      ...sub,
      id: 'sub_' + Date.now(),
      status: 'PENDING',
      submittedAt: new Date().toISOString().split('T')[0],
      submittedBy: user.name
    };
    setSubmissions((prev) => [newSub, ...prev]);
    showToast('Artist profile submitted for editorial review!', 'success');
  };

  const moderateSubmission = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
    showToast(`Submission marked as ${status}`, status === 'APPROVED' ? 'success' : 'info');
  };

  const castVote = (categoryId: string, nomineeId: string) => {
    if (votedCategoryIds.includes(categoryId)) {
      showToast('You have already voted in this category!', 'info');
      return;
    }
    setVotedCategoryIds((prev) => [...prev, categoryId]);
    showToast('Vote successfully cast!', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setRole,
        switchRole,
        toggleFavoriteSong,
        toggleFavoriteArtist,
        playlists,
        createPlaylist,
        removePlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        submissions,
        submitArtist,
        moderateSubmission,
        votedCategoryIds,
        castVote
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

