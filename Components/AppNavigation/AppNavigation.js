import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Axios from 'axios';

import SignIn from '../Screens/SignIn';

import MyOrders from '../Screens/MyOrders';
import MyDeliveredOrders from '../Screens/MyDeliveredOrders';
import OrderDetails from '../Screens/OrderDetails'
import PickupOrders from '../Screens/PickupOrders'
import PickupOrderDetails from '../Screens/PickupOrderDetails';

import { useSelector } from 'react-redux';
import BASE_URL from '../Config';

import PostAdsIcon from 'react-native-vector-icons/MaterialIcons'
import CartIcon from 'react-native-vector-icons/AntDesign'
import AccountIcon from 'react-native-vector-icons/MaterialIcons'
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { LogOut } from '../Redux/actions/Action';

import { useDispatch } from 'react-redux';	

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// const SplashScreen = ({ navigation }) => {
// 	setTimeout(() => {
// 		navigation.replace('SignIn');
// 	}, 3000);
// 	return (
// 		<View style={{
// 			flex: 1,
// 			justifyContent: 'center',
// 			alignItems: 'center',
// 			alignContent: 'center',
// 			backgroundColor: 'white'
// 		}}>
// 			<Image style={{
// 				justifyContent: 'center',
// 				alignItems: 'center',
// 				alignContent: 'center',
// 				height: 200,
// 				width: 200
// 			}}
// 				source={require('../../assets/Logo.png')} />
// 		</View>
// 	)
// }


const StackedScreens = ({ navigation }) => {
	const dispatch = useDispatch();
	return <Stack.Navigator
		screenOptions={{
			headerShown: true,
			headerStyle: { backgroundColor: "#8B0000" },
			headerTitleStyle: { color: 'white' },
			headerRight: () => (
				<TouchableOpacity  onPress={()=> { dispatch(LogOut()) }}>
					<LogoutIcon
                                name='logout'
                                size={25}
                                color='white'
                                style={{ marginRight: 10, paddingRight: 10 }}
                            />
				</TouchableOpacity>
			)
		}}
	>
		<Stack.Screen name="TabbedHome" component={TabbedScreens} options={{
			headerTitle: (props) => (
				<Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>RENT BUCKET RIDERS</Text>
			),
			headerTitleAlign: 'center'
		}} />
		<Stack.Screen name="OrderDetails" component={OrderDetails} options={{
			headerTitle: (props) => (
				<Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Order Details</Text>
			),
			headerTitleAlign: 'center'
		}} />
		<Tab.Screen name="PickupOrderDetails" component={PickupOrderDetails}
				options={{
					title: "Pickup",
					tabBarLabel: "Pickup", tabBarIcon: ({ color }) => (
						<AccountIcon name="account-circle" color={color} size={24} />
					)
				}} />
	</Stack.Navigator>
}

const TabbedScreens = () => {
	return (
		<Tab.Navigator
			activeColor="red"
			inactiveColor="black"
			screenOptions={{
				indicatorStyle: { width: 50, left: "18%" },
			}}
			barStyle={{ backgroundColor: "white", position: 'absolute', bottom: 5, left: 20, right: 20, elevation: 0, borderRadius: 15, height: 75, justifyContent: 'center', alignContent: 'center', alignItems: 'center', ...style.shadowContainer }}
		>
			<Tab.Screen name="MyOrders" component={MyOrders}
				options={{
					title: "My Orders",
					tabBarLabel: "My Orders",
					tabBarIcon: ({ color }) => (
						<PostAdsIcon name='post-add' color={color} size={25} />
					)
				}} />
			<Tab.Screen name="MyDeliveredOrders" component={MyDeliveredOrders}
				options={{
					title: "Delivered Orders",
					tabBarLabel: "My Delivered Orders", tabBarIcon: ({ color }) => (
						<AccountIcon name="account-circle" color={color} size={24} />
					)
				}} />
				<Tab.Screen name="PickupOrders" component={PickupOrders}
				options={{
					title: "Pickup",
					tabBarLabel: "Pickup", tabBarIcon: ({ color }) => (
						<AccountIcon name="account-circle" color={color} size={24} />
					)
				}} />
				
		</Tab.Navigator>
	);
}

const AppNavigation = () => {

	const [userDetails, setUserDetails] = React.useState({});
	const { loggedIn, token } = useSelector(state => state.auth);

	useEffect(() => {
		
	}, [loggedIn])


	if (loggedIn === true) {
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{/* <StatusBar backgroundColor='#8B0000' /> */}
					<Stack.Screen name="StackedScreens" component={StackedScreens} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
	else {
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{/* <Stack.Screen name='Splash_Screen' component={SplashScreen} /> */}
					<Stack.Screen name="SignIn" component={SignIn} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
export default AppNavigation;

const style = StyleSheet.create({
	shadowContainer: {
		shadowColor: 'red',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 0.5,
		elevation: 5,
	},
	container: {
		backgroundColor: 'maroon',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	logo: {
		marginTop: 8,
		marginBottom: 2,
		justifyContent: "center",
		alignItems: "center",
		height: 50,
		width: 200
	},
	imgContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'maroon'
	},
	splashLogo: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		backgroundColor: 'maroon'
	},
	header_safe_area: {
		zIndex: 1000
	},
	header: {
		backgroundColor: '#000b44',
		height: 50,
		paddingHorizontal: 16
	},
	header_inner: {
		backgroundColor: '#000b44',
		flex: 1,
		overflow: 'hidden',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	},
})