import { defineStore } from 'pinia';
import { WordSet } from '@/types/ExperimentTypes.ts';

function generateRandomGroup() {
  const groups = ['A', 'B', 'C', 'D', 'E', 'F'];
  const randomGroup = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * groups.length);
    randomGroup.push(groups[randomIndex]);
    groups.splice(randomIndex, 1);
  }
  return randomGroup as ('A' | 'B' | 'C' | 'D' | 'E' | 'F')[];
}

export const useSerialPositionStore = defineStore({
  id: 'serial-position-store',
  state: () => {
    return {
      wordList: [
        {
          group: 'A',
          // prettier-ignore
          words: ['ヘニ','トヌ','ルム','テヒ','ウホ','ヌホ','スヘ','ミヒ','ロム','ツニ'],
        },
        {
          group: 'B',
          // prettier-ignore
          words: ['エニ','ハホ','ノニ','レサ','スニ','セテ','スヨ','ルフ','ルロ','ヘノ'],
        },
        {
          group: 'C',
          // prettier-ignore
          words: ['ラロ','ミユ','ロモ','ナネ','メヌ','スユ','ユナ','セノ','ヌム','ヒハ'],
        },
        {
          group: 'D',
          // prettier-ignore
          words: ['ワム','ムル','ラヨ','リネ','エウ','ロニ','ルメ','ノエ','ソニ','ネミ'],
        },
        {
          group: 'E',
          // prettier-ignore
          words: ['ユヨ','ホナ','ソイ','ワヌ','リヘ','レウ','セヤ','オヌ','ヒホ','ヤウ'],
        },
        {
          group: 'F',
          // prettier-ignore
          words: ['ノヨ','ネセ','ツヌ','モセ','ミメ','レユ','レソ','スオ','セア','ネノ'],
        },
      ] as WordSet[],
      groupOrder: generateRandomGroup(),
    };
  },
  getters: {
    getWordListByGroup: state => (group: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
      return state.wordList.find(wordSet => wordSet.group === group);
    },
    getGroupOrder: state => state.groupOrder,
  },
});
