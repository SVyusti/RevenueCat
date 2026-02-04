import { Tabs } from 'expo-router'
import React from 'react'
import {Ionicons} from "@expo/vector-icons"
import { COLORS } from '@/constants/theme'

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel : false,
            tabBarInactiveTintColor : COLORS.grey,
            tabBarStyle : {
                backgroundColor : "black",
                borderTopWidth : 0,
                position : 'absolute',
                elevation : 0,
                height : 40,
                paddingBottom: 8
            } 
        }}
    >
        <Tabs.Screen
            name='index'
            options={{
                tabBarIcon: ({color,size}) => <Ionicons name="home" size={size} color={color} />
            }}
        />
    </Tabs>
  )
}