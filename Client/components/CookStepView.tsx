import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Ionicons } from "@expo/vector-icons";
import type { IRecipeStep } from "../interfaces/IRecipe";

type Props = {
  step: IRecipeStep;
  stepIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  isLandscape: boolean;
  allSteps: IRecipeStep[];
  currentUserId: string;
};

const STORAGE_KEY = "activeCookSessionV2";

type TimerState = {
  running: boolean;
  start: number | null;
  remaining: number;
};

type PersistedState = {
  stepIndex: number;
  timers: { [stepId: string]: TimerState };
  userId: string;
};

export const CookStepView: React.FC<Props> = ({
  step,
  stepIndex,
  totalSteps,
  onPrev,
  onNext,
  isFirst,
  isLast,
  isLandscape,
  allSteps,
  currentUserId,
}) => {
  const [timers, setTimers] = useState<{ [stepId: string]: TimerState }>({});
  const scrollViewRef = useRef<ScrollView>(null);

  // Restore state on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(data => {
      if (data) {
        const parsed: PersistedState = JSON.parse(data);
        if (parsed.userId === currentUserId) {
          setTimers(parsed.timers || {});
        }
      }
    });
  }, [currentUserId]);

  // Persist state on change
  useEffect(() => {
    const persist: PersistedState = {
      stepIndex,
      timers,
      userId: currentUserId,
    };
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
  }, [stepIndex, timers, currentUserId]);

  // Timer logic for all timer steps
  useEffect(() => {
    const intervals: { [stepId: string]: NodeJS.Timeout } = {};
    allSteps.forEach(s => {
      if (s.type && "startTime" in s.type) {
        const t = timers[s.id];
        if (t && t.running && t.start) {
          intervals[s.id] = setInterval(() => {
            const elapsed = Math.floor((Date.now() - t.start!) / 1000);
            const total = s.type.duration * 60;
            const left = Math.max(total - elapsed, 0);
            setTimers(prev => ({
              ...prev,
              [s.id]: {
                ...prev[s.id],
                remaining: left,
                running: left > 0,
              },
            }));
            if (left === 0) {
              sendTimerNotification(s.type.text);
              clearInterval(intervals[s.id]);
            }
          }, 1000);
        }
      }
    });
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
    // eslint-disable-next-line
  }, [timers, allSteps]);

  // Scroll to current step
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: stepIndex * 80,
        animated: true,
      });
    }, 100);
  }, [stepIndex]);

  // Notification logic
  async function sendTimerNotification(stepText: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Timer finished!",
        body: `Step finished: ${stepText}`,
        sound: true,
      },
      trigger: null,
    });
  }

  // Handle app resume (restore timer)
  useEffect(() => {
    const sub = AppState.addEventListener("change", state => {
      if (state === "active") {
        setTimers(prev => {
          const updated = { ...prev };
          allSteps.forEach(s => {
            if (s.type && "startTime" in s.type) {
              const t = prev[s.id];
              if (t && t.running && t.start) {
                const elapsed = Math.floor((Date.now() - t.start) / 1000);
                const total = s.type.duration * 60;
                updated[s.id] = {
                  ...t,
                  remaining: Math.max(total - elapsed, 0),
                  running: total - elapsed > 0,
                };
              }
            }
          });
          return updated;
        });
      }
    });
    return () => sub.remove();
  }, [allSteps]);

  function handleTimerToggle(stepId: string, duration: number, text: string) {
    setTimers(prev => {
      const t = prev[stepId];
      if (!t || !t.running) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Timer finished!",
            body: `Step finished: ${text}`,
            sound: true,
          },
          trigger: { seconds: duration * 60 },
        });
        return {
          ...prev,
          [stepId]: {
            running: true,
            start: Date.now(),
            remaining: duration * 60,

          },
        };
      } else {
        Notifications.cancelAllScheduledNotificationsAsync();
        return {
          ...prev,
          [stepId]: {
            running: false,
            start: null,
            remaining: t.remaining,
          },
        };
      }
    });
  }

  function formatTime(sec: number | null) {
    if (sec === null) return "--:--";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <View style={styles.portraitContainer}>
      {/* Top: Previous/Cancel Button */}
      <TouchableOpacity style={styles.navButtonTop} onPress={onPrev}>
        <Text style={styles.navButtonText}>{isFirst ? "Cancel" : "Previous"}</Text>
      </TouchableOpacity>

      {/* Middle: Steps in a scrollable area */}
      <View style={styles.scrollArea}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          style={styles.stepList}
        >
          {allSteps.map((s, idx) => {
            const isCurrent = idx === stepIndex;
            const isTimer = s.type && "startTime" in s.type;
            const timerState = timers[s.id];
            return (
              <View
                key={s.id}
                style={[
                  styles.stepListItem,
                  isCurrent && styles.currentStepItem,
                ]}
              >
                <Text style={[styles.stepListText, isCurrent && styles.currentStepText]}>
                  {isTimer && (
                    <Ionicons
                      name="timer-outline"
                      size={18}
                      color={isCurrent ? "#fff" : "#2563eb"}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  Step {idx + 1}: {s.type.text}
                </Text>
                {isTimer && (
                  <View style={styles.timerStepBox}>
                    <Ionicons name="timer" size={22} color={isCurrent ? "#fff" : "#2563eb"} style={{ marginRight: 8 }} />
                    <Text style={[styles.timerStepText, !isCurrent && { color: "#2563eb" }]}>
                      {timerState && timerState.running
                        ? `Time left: ${formatTime(timerState.remaining)}`
                        : `Ready to start (${formatTime(s.type.duration * 60)})`}
                    </Text>
                    {isCurrent && (
                      <TouchableOpacity
                        style={styles.timerStepButton}
                        onPress={() => handleTimerToggle(s.id, s.type.duration, s.type.text)}
                      >
                        <Text style={styles.timerStepButtonText}>
                          {timerState && timerState.running ? "Pause" : "Start"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Bottom: Next/Complete Button */}
      <TouchableOpacity style={styles.navButtonBottom} onPress={onNext}>
        <Text style={styles.navButtonText}>{isLast ? "Complete" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  portraitContainer: { flex: 1, padding: 16, backgroundColor: "#fff" },
  navButtonTop: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    width: "100%",
  },
  scrollArea: {
    flex: 1,
    flexDirection: "column",
    minHeight: 0,
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  stepList: {
    flexGrow: 0,
    marginBottom: 12,
  },
  stepListItem: {
    flexDirection: "column",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    marginBottom: 10,
    padding: 14,
  },
  currentStepItem: {
    backgroundColor: "#2563eb",
  },
  stepListText: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  currentStepText: {
    color: "#fff",
  },
  timerStepBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  timerStepText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 12,
  },
  timerStepButton: {
    backgroundColor: "#fbbf24",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  timerStepButtonText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  navButtonBottom: {
    backgroundColor: "#2563eb",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
    width: "100%",
  },
  navButtonText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});