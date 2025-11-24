// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChannelScreen } from '../features/home/screens/channelScreen';
import { colors } from '../shared/constants/colors';

const Tab = createBottomTabNavigator();

function NPO1Screen() {
  return <ChannelScreen channelId="npo1" />;
}

function NPO2Screen() {
  return <ChannelScreen channelId="npo2" />;
}

function NPO3Screen() {
  return <ChannelScreen channelId="npo3" />;
}

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
      }}
    >
      <Tab.Screen 
        name="NPO1" 
        component={NPO1Screen}
        options={{
          title: 'NPO 1',
          tabBarLabel: 'NPO 1',
        }}
      />
      <Tab.Screen 
        name="NPO2" 
        component={NPO2Screen}
        options={{
          title: 'NPO 2',
          tabBarLabel: 'NPO 2',
        }}
      />
      <Tab.Screen 
        name="NPO3" 
        component={NPO3Screen}
        options={{
          title: 'NPO 3',
          tabBarLabel: 'NPO 3',
        }}
      />
    </Tab.Navigator>
  );
}