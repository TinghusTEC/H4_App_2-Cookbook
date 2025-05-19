import React, { useRef, useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Ionicons } from '@expo/vector-icons';
import type { IRecipeStep } from '../interfaces/IRecipe';

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

const STORAGE_KEY = 'activeCookSessionV2';

type TimerState = {
    running: boolean;
    startedAt: number | null; // timestamp in ms
    elapsed: number; // seconds
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
    const [now, setNow] = useState(Date.now());
    const scrollViewRef = useRef<ScrollView>(null);

    // Restore state on mount
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((data) => {
            if (data) {
                const parsed: PersistedState = JSON.parse(data);
                if (parsed.userId === currentUserId) {
                    setTimers(parsed.timers || {});
                }
            }
        });
    }, [currentUserId]);

    useEffect(() => {
        const persist: PersistedState = {
            stepIndex,
            timers,
            userId: currentUserId,
        };
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    }, [stepIndex, timers, currentUserId]);

    // Timer tick: update "now" every second to force re-render
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                y: stepIndex * 80,
                animated: true,
            });
        }, 100);
    }, [stepIndex]);

    useEffect(() => {
        const sub = AppState.addEventListener('change', (state) => {
            if (state === 'active') {
                setNow(Date.now());
            }
        });
        return () => sub.remove();
    }, []);

    async function sendTimerNotification(stepText: string) {
        if (Platform.OS !== 'web') {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Timer finished!',
                    body: `Step finished: ${stepText}`,
                    sound: true,
                },
                trigger: null,
            });
        } else {
            Alert.alert('Timer', 'Step finished: ' + stepText);
        }
    }

    function handleTimerToggle(stepId: string, duration: number, text: string) {
        setTimers((prev) => {
            const t = prev[stepId];
            if (!t?.running) {
                if (Platform.OS !== 'web') {
                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Timer finished!',
                            body: `Step finished: ${text}`,
                            sound: true,
                        },
                        trigger: {
                            type: 'timeInterval',
                            seconds: getRemaining(duration, t, true),
                            repeats: false,
                        } as any,
                    });
                }
                return {
                    ...prev,
                    [stepId]: {
                        running: true,
                        startedAt: Date.now(),
                        elapsed: t ? t.elapsed : 0,
                    },
                };
            } else {
                // Pause
                const elapsed = t.elapsed + Math.floor((Date.now() - (t.startedAt || Date.now())) / 1000);
                if (Platform.OS !== 'web') {
                    Notifications.cancelAllScheduledNotificationsAsync();
                }
                return {
                    ...prev,
                    [stepId]: {
                        running: false,
                        startedAt: null,
                        elapsed,
                    },
                };
            }
        });
    }

    // Helper to get remaining seconds for a timer step
    function getRemaining(duration: number, t: TimerState | undefined, runningOverride?: boolean) {
        if (!t) return duration * 60;
        if (t.running || runningOverride) {
            const elapsed = t.elapsed + Math.floor((Date.now() - (t.startedAt || Date.now())) / 1000);
            return Math.max(duration * 60 - elapsed, 0);
        } else {
            return Math.max(duration * 60 - t.elapsed, 0);
        }
    }

    const s = allSteps[stepIndex];
    const isTimer = s.type && 'startTime' in s.type;
    const timerState = timers[s.id];
    const timerRunning = timerState && timerState.running;
    const timerCompleted = timerState && getRemaining(s.type?.duration, timerState) === 0;

    // Send notification when timer completes
    useEffect(() => {
        if (isTimer && timerState && timerState.running) {
            const left = getRemaining(s.type.duration, timerState);
            if (left === 0) {
                sendTimerNotification(s.type.text);
                // Pause timer when done
                setTimers(prev => ({
                    ...prev,
                    [s.id]: {
                        ...prev[s.id],
                        running: false,
                        startedAt: null,
                        elapsed: s.type.duration * 60,
                    },
                }));
            }
        }
        // eslint-disable-next-line
    }, [now, isTimer, timerState]);

    function handleNextButton() {
        if (isTimer && !timerRunning && (!timerState || getRemaining(s.type.duration, timerState) > 0)) {
            // Start timer and move to next step (unless last step)
            handleTimerToggle(s.id, s.type.duration, s.type.text);
            if (!isLast) {
                onNext();
            }
            // If last step, just start timer (do not complete yet)
        } else {
            onNext();
        }
    }

    let nextLabel = 'Next';
    if (isTimer && !timerRunning && (!timerState || getRemaining(s.type.duration, timerState) > 0)) {
        nextLabel = isLast ? 'Start timer' : 'Start timer & next';
    } else if (isLast) {
        nextLabel = 'Complete';
    }

    // Only show Complete if last step is not a timer step, or timer is running or completed
    const showNextButton = !isLast || !isTimer || timerRunning || timerCompleted;

    function formatTime(sec: number | null | undefined) {
        if (typeof sec !== 'number' || isNaN(sec) || sec < 0) return '--:--';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    return (
        <View style={styles.portraitContainer}>
            {/* Top: Previous/Cancel Button */}
            <TouchableOpacity
                style={styles.navButtonTop}
                onPress={onPrev}
            >
                <Text style={styles.navButtonText}>{isFirst ? 'Cancel' : 'Previous'}</Text>
            </TouchableOpacity>

            <View style={styles.scrollArea}>
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollContent}
                    style={styles.stepList}
                >
                    {allSteps.map((s, idx) => {
                        const isCurrent = idx === stepIndex;
                        const isTimer = s.type && 'startTime' in s.type;
                        const timerState = timers[s.id];
                        // Always get a valid remaining value
                        const remaining = isTimer
                            ? getRemaining(s.type.duration, timerState)
                            : (s.type && s.type.duration ? s.type.duration * 60 : 0);
                        const safeRemaining = Number.isFinite(remaining) && remaining >= 0
                            ? remaining
                            : (s.type && s.type.duration ? s.type.duration * 60 : 0);
                        return (
                            <View
                                key={s.id}
                                style={[styles.stepListItem, isCurrent && styles.currentStepItem]}
                            >
                                <Text
                                    style={[
                                        styles.stepListText,
                                        isCurrent && styles.currentStepText,
                                    ]}
                                >
                                    {isTimer && (
                                        <Ionicons
                                            name='timer-outline'
                                            size={18}
                                            color={isCurrent ? '#fff' : '#2563eb'}
                                            style={{ marginRight: 4 }}
                                        />
                                    )}
                                    Step {idx + 1}: {s.type.text}
                                </Text>
                                {isTimer && (
                                    <View style={styles.timerStepBox}>
                                        <Ionicons
                                            name='timer'
                                            size={22}
                                            color={isCurrent ? '#fff' : '#2563eb'}
                                            style={{ marginRight: 8 }}
                                        />
                                        <Text
                                            style={[
                                                styles.timerStepText,
                                                !isCurrent && { color: '#2563eb' },
                                            ]}
                                        >
                                            {timerState && timerState.running
                                                ? `Time left: ${formatTime(safeRemaining)}`
                                                : `Ready to start (${formatTime(safeRemaining)})`}
                                        </Text>
                                        {isCurrent && (
                                            <TouchableOpacity
                                                style={styles.timerStepButton}
                                                onPress={() =>
                                                    handleTimerToggle(
                                                        s.id,
                                                        s.type.duration,
                                                        s.type.text,
                                                    )
                                                }
                                            >
                                                <Text style={styles.timerStepButtonText}>
                                                    {timerState && timerState.running
                                                        ? 'Pause'
                                                        : 'Start'}
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
            {showNextButton && (
                <TouchableOpacity
                    style={styles.navButtonBottom}
                    onPress={handleNextButton}
                >
                    <Text style={styles.navButtonText}>{nextLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    portraitContainer: { flex: 1, padding: 16, backgroundColor: '#fff' },
    navButtonTop: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
        width: '100%',
    },
    scrollArea: {
        flex: 1,
        flexDirection: 'column',
        minHeight: 0,
        justifyContent: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    stepList: {
        flexGrow: 0,
        marginBottom: 12,
    },
    stepListItem: {
        flexDirection: 'column',
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        marginBottom: 10,
        padding: 14,
    },
    currentStepItem: {
        backgroundColor: '#2563eb',
    },
    stepListText: {
        fontSize: 18,
        color: '#2563eb',
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentStepText: {
        color: '#fff',
    },
    timerStepBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    timerStepText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 12,
    },
    timerStepButton: {
        backgroundColor: '#fbbf24',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
    },
    timerStepButtonText: {
        color: '#222',
        fontWeight: 'bold',
        fontSize: 16,
    },
    navButtonBottom: {
        backgroundColor: '#2563eb',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 16,
        alignItems: 'center',
        width: '100%',
    },
    navButtonText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
});