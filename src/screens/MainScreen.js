import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';

const FILTERS = ['All', 'Groups', 'Businesses', 'Channels'];

const MOCK_CHATS = [
  { id: '1', name: 'Joy', preview: 'yeah give me a sec', time: '2m', type: 'person' },
  { id: '2', name: 'SafeBoda', preview: 'Your ride is arriving in 3 minutes', time: '10m', type: 'business' },
  { id: '3', name: 'Derrick', preview: 'bro send the apk link again', time: '1h', type: 'person' },
  { id: '4', name: 'B24 Builders', preview: 'Derrick: pushed the new build', time: '30m', type: 'group' },
];

const MOCK_REQUESTS = [
  { id: 'r1', name: 'rita_k', preview: 'hey are you the one selling the phone case?' },
];

export default function MainScreen() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('chats'); // 'status' | 'chats' | 'requests'
  const [filter, setFilter] = useState('All');

  return (
    <SafeAreaView style={styles.screen}>
      {/* top bar */}
      <View style={styles.topbar}>
        <Text style={styles.title}>B24</Text>
        <TouchableOpacity style={styles.profilePic} onPress={logout}>
          <Text style={{ color: 'white', fontWeight: '700' }}>
            {(user?.username || '?')[0].toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'chats' && (
        <View style={styles.filters}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.pill, filter === f && styles.pillActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.pillText, filter === f && styles.pillTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* content */}
      {tab === 'status' && (
        <View style={styles.center}>
          <Text style={styles.sectionLabel}>MY STATUS</Text>
          <Text style={styles.rowText}>Tap to share a moment</Text>
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>RECENT</Text>
          <Text style={styles.rowText}>Joy — 12m ago</Text>
          <Text style={styles.rowText}>Derrick — 1h ago</Text>
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>GROUPS</Text>
          <Text style={styles.rowText}>B24 Builders — posted 30m ago</Text>
        </View>
      )}

      {tab === 'chats' && (
        <FlatList
          data={MOCK_CHATS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.row}>
              <View style={styles.avatar}>
                <Text style={{ color: 'white', fontWeight: '700' }}>{item.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.preview} numberOfLines={1}>{item.preview}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {tab === 'requests' && (
        <FlatList
          data={MOCK_REQUESTS}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.note}>People who found you by username.</Text>}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Text style={{ color: 'white', fontWeight: '700' }}>{item.name[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.preview}>{item.preview}</Text>
                <View style={styles.reqActions}>
                  <TouchableOpacity style={styles.acceptBtn}><Text style={{color:'white', fontWeight:'700'}}>Accept</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.declineBtn}><Text style={{color:'#8b8ba7', fontWeight:'700'}}>Decline</Text></TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {/* floating bottom nav */}
      <View style={styles.floatNav}>
        <TouchableOpacity style={[styles.navBtn, tab === 'status' && styles.navBtnActive]} onPress={() => setTab('status')}>
          <Text style={styles.navText}>Status</Text>
          <View style={[styles.dot, { backgroundColor: '#38bdf8' }]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, tab === 'chats' && styles.navBtnActive]} onPress={() => setTab('chats')}>
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, tab === 'requests' && styles.navBtnActive]} onPress={() => setTab('requests')}>
          <Text style={styles.navText}>Requests</Text>
          <View style={[styles.dot, { backgroundColor: '#4ade80' }]} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f0f1a' },
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { color: 'white', fontSize: 20, fontWeight: '800' },
  profilePic: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#9333ea', alignItems: 'center', justifyContent: 'center' },
  filters: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingBottom: 10 },
  pill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#1c1c2e', borderWidth: 1, borderColor: '#2c2c44' },
  pillActive: { backgroundColor: '#9333ea', borderColor: '#9333ea' },
  pillText: { color: '#8b8ba7', fontSize: 12, fontWeight: '700' },
  pillTextActive: { color: 'white' },
  center: { padding: 16 },
  sectionLabel: { color: '#6b6b8a', fontSize: 11, fontWeight: '700', marginBottom: 6 },
  rowText: { color: '#eaeaf5', fontSize: 13, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a2a' },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#9333ea', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: '#eaeaf5', fontSize: 14.5, fontWeight: '600' },
  time: { color: '#6b6b8a', fontSize: 10.5 },
  preview: { color: '#8b8ba7', fontSize: 12.5, marginTop: 2 },
  note: { color: '#55556f', fontSize: 11, padding: 12 },
  reqActions: { flexDirection: 'row', gap: 8, marginTop: 6 },
  acceptBtn: { backgroundColor: '#9333ea', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 8 },
  declineBtn: { backgroundColor: '#1c1c2e', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#33334d' },
  floatNav: { position: 'absolute', bottom: 16, alignSelf: 'center', flexDirection: 'row', backgroundColor: 'rgba(26,26,42,0.9)', borderRadius: 26, padding: 6, borderWidth: 1, borderColor: '#2c2c44', gap: 4 },
  navBtn: { paddingVertical: 9, paddingHorizontal: 16, borderRadius: 20 },
  navBtnActive: { backgroundColor: '#9333ea' },
  navText: { color: '#8b8ba7', fontSize: 12.5, fontWeight: '700' },
  dot: { position: 'absolute', top: 4, right: 6, width: 6, height: 6, borderRadius: 3 }
});
