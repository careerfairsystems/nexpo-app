import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HeaderStyles } from "components/HeaderStyles";
import AdminScreen from './AdminScreen';

export type AdminStackParamList = {
    AdminScreen: undefined;
};
const AdminStack = createStackNavigator<AdminStackParamList>();

export function AdminNavigator() {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="AdminScreen"
                component={AdminScreen}
                options={{ title: 'Admin', headerTitle: 'Admin', ...HeaderStyles }}
            />
        </AdminStack.Navigator>
    );
}