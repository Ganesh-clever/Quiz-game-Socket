import React from 'react'
import Room from '../Assets/Room.gif';
import Profile from '../Assets/Profile.gif';
import Setting from '../Assets/Settings.gif';
import Quiz from '../Assets/Quiz.gif';

export const MenuItems: any = [
    {
        title: 'Rooms Management',
        image: Room,
        path: '/rooms'
    },
    {
        title: 'Socket Io Quiz Game',
        image: Quiz,
        path: '/quiz-slots'
    },
    {
        title: 'Profile Settings',
        image: Profile,
        path: '/profile'
    },
    {
        title: 'Settings',
        image: Setting,
        path: '/settings'
    },
    {
        title: 'Settings',
        image: Setting,
        path: '/settings'
    },
]

export const GameAnalytics: any = [
    {
        type: 'Play Game',
        value: 27,
    },
    {
        type: 'Won Game',
        value: 25,
    },
    {
        type: 'Lose Game',
        value: 18,
    }
];

export const RevenueDetails: any = [
    {
        type: 'Deposit',
        value: 60,
    },
    {
        type: 'Withdraw',
        value: 40,
    },
    {
        type: 'Tax',
        value: 7,
    }
];

export const GameSlot: any = [
    {
        type: 'Free',
        value: 15,
    },
    {
        type: 'Paid',
        value: 85,
    }
];
