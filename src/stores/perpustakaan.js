import { create } from 'zustand';

/**
 * Perpustakaan Store - Menyimpan state global data perpustakaan
 * Menggunakan Zustand untuk state management
 */
const usePerpustakaanStore = create((set, get) => ({
    // State
    buku: [],
    anggota: [],
    transaksi: [],
    loading: false,
    error: null,

    // Actions untuk Buku
    setBuku: (bukuList) => set({ buku: bukuList }),

    addBuku: (bukuBaru) => set((state) => ({
        buku: [...state.buku, bukuBaru]
    })),

    updateBuku: (id, bukuUpdate) => set((state) => ({
        buku: state.buku.map(b => b.id === id ? { ...b, ...bukuUpdate } : b)
    })),

    deleteBuku: (id) => set((state) => ({
        buku: state.buku.filter(b => b.id !== id)
    })),

    // Actions untuk Anggota
    setAnggota: (anggotaList) => set({ anggota: anggotaList }),

    addAnggota: (anggotaBaru) => set((state) => ({
        anggota: [...state.anggota, anggotaBaru]
    })),

    updateAnggota: (id, anggotaUpdate) => set((state) => ({
        anggota: state.anggota.map(a => a.id === id ? { ...a, ...anggotaUpdate } : a)
    })),

    deleteAnggota: (id) => set((state) => ({
        anggota: state.anggota.filter(a => a.id !== id)
    })),

    // Actions untuk Transaksi
    setTransaksi: (transaksiList) => set({ transaksi: transaksiList }),

    addTransaksi: (transaksiBaru) => set((state) => ({
        transaksi: [...state.transaksi, transaksiBaru]
    })),

    updateTransaksi: (id, transaksiUpdate) => set((state) => ({
        transaksi: state.transaksi.map(t => t.id === id ? { ...t, ...transaksiUpdate } : t)
    })),

    // Loading & Error
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    // Getters
    getBukuById: (id) => get().buku.find(b => b.id === id),
    getAnggotaById: (id) => get().anggota.find(a => a.id === id),
    getTransaksiById: (id) => get().transaksi.find(t => t.id === id),
}));

export default usePerpustakaanStore;
