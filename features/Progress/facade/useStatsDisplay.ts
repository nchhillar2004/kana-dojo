'use client';

import useStatsStore from '../store/useStatsStore';

/**
 * Read-only stats access for display components
 *
 * Use this facade when components only need to display stats,
 * not modify them.
 */
export function useStatsDisplay() {
  const stats = useStatsStore(state => ({
    correctAnswers: state.numCorrectAnswers,
    wrongAnswers: state.numWrongAnswers,
    currentStreak: state.currentStreak,
    bestStreak: state.allTimeStats.bestStreak,
    stars: state.stars,
    characterHistory: state.characterHistory,
    characterScores: state.characterScores,
    showStats: state.showStats,
    toggleStats: state.toggleStats,

    // All-time stats
    totalSessions: state.allTimeStats.totalSessions,
    totalCorrect: state.allTimeStats.totalCorrect,
    totalIncorrect: state.allTimeStats.totalIncorrect,
    characterMastery: state.allTimeStats.characterMastery
  }));

  return stats;
}

/**
 * Read-only session stats for in-game UI
 */
export function useSessionStats() {
  return useStatsStore(state => ({
    sessionCorrect: state.numCorrectAnswers,
    sessionWrong: state.numWrongAnswers,
    sessionStreak: state.currentStreak
  }));
}

/**
 * Read-only timed mode stats (Blitz/Gauntlet)
 */
export function useTimedStats(contentType: 'kana' | 'kanji' | 'vocabulary') {
  return useStatsStore(state => {
    switch (contentType) {
      case 'kana':
        return {
          correct: state.timedCorrectAnswers,
          wrong: state.timedWrongAnswers,
          streak: state.timedStreak,
          bestStreak: state.timedBestStreak,
          reset: state.resetTimedStats
        };
      case 'kanji':
        return {
          correct: state.timedKanjiCorrectAnswers,
          wrong: state.timedKanjiWrongAnswers,
          streak: state.timedKanjiStreak,
          bestStreak: state.timedKanjiBestStreak,
          reset: state.resetTimedKanjiStats
        };
      case 'vocabulary':
        return {
          correct: state.timedVocabCorrectAnswers,
          wrong: state.timedVocabWrongAnswers,
          streak: state.timedVocabStreak,
          bestStreak: state.timedVocabBestStreak,
          reset: state.resetTimedVocabStats
        };
    }
  });
}
